exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let name, email, message;
  try {
    const body = JSON.parse(event.body);
    name = body.name;
    email = body.email;
    message = body.message;
  } catch {
    return { statusCode: 400, body: "Invalid request" };
  }

  if (!name || !email || !message) {
    return { statusCode: 400, body: "All fields are required" };
  }

  const apiKey = process.env.MAILERLITE_API_KEY;

  // Add sender to MailerLite with their message as a note
  try {
    await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${apiKey}`,
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
  } catch {
    // Don't fail if MailerLite is down
  }

  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
