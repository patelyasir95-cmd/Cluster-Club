export const onRequest: PagesFunction = async (context) => {
  const { request, env } = context;

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = env.MAILERLITE_API_KEY;

    if (!apiKey) {
      console.error("MAILERLITE_API_KEY not set");
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          fields: {
            name,
            last_name: "",
          },
          groups: ["184584279598040389"],
        }),
      });
    } catch (error) {
      console.error("MailerLite error:", error);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};
