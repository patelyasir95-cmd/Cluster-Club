/* eslint-disable @typescript-eslint/no-explicit-any */
const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const onRequest = async (context: any) => {
  const { request, env } = context;

  if (request.method !== "POST") {
    return json({ error: "Method Not Allowed" }, 405);
  }

  let email: string;
  try {
    ({ email } = await request.json());
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  if (!email) {
    return json({ error: "Email is required" }, 400);
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${env.MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        groups: ["184584279598040389"],
      }),
    });

    // MailerLite returns 200 for an existing subscriber and 201 for a new one
    if (!res.ok) {
      console.error("MailerLite error:", res.status, await res.text());
      return json({ error: "Failed to subscribe" }, 502);
    }

    return json({ success: true }, 200);
  } catch (error) {
    console.error("Subscribe error:", error);
    return json({ error: "Server error" }, 500);
  }
};
