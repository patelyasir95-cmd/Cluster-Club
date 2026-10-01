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

  let name: string, email: string, message: string;
  try {
    ({ name, email, message } = await request.json());
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  if (!name || !email || !message) {
    return json({ error: "All fields are required" }, 400);
  }

  // Email the message to info@ via the Google Apps Script in google-apps-script/contact-mailer.gs.
  // This must succeed, otherwise the message is lost.
  try {
    const res = await fetch(env.CONTACT_MAILER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: env.CONTACT_MAILER_SECRET, name, email, message }),
    });

    // Apps Script answers 200 even on failure, so check the body too
    const result: any = await res.json().catch(() => null);
    if (!res.ok || !result?.success) {
      console.error("Contact mailer error:", res.status, JSON.stringify(result));
      return json({ error: "Failed to send message" }, 502);
    }
  } catch (error) {
    console.error("Contact email error:", error);
    return json({ error: "Server error" }, 500);
  }

  // Also add the sender to MailerLite. Best-effort: the message has already been delivered.
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
        fields: { name, last_name: "" },
        groups: ["184584279598040389"],
      }),
    });
    if (!res.ok) console.error("MailerLite error:", res.status, await res.text());
  } catch (error) {
    console.error("MailerLite error:", error);
  }

  return json({ success: true }, 200);
};
