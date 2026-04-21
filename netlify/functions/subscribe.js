exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let email;
  try {
    const body = JSON.parse(event.body);
    email = body.email;
  } catch {
    return { statusCode: 400, body: "Invalid request" };
  }

  if (!email) {
    return { statusCode: 400, body: "Email is required" };
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = "184584279598040389";

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
      }),
    });

    if (res.ok || res.status === 409) {
      // 409 means already subscribed — still show success
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 500, body: "Failed to subscribe" };
  } catch (err) {
    return { statusCode: 500, body: "Server error" };
  }
};
