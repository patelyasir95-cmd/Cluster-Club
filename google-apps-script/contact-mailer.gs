/**
 * Cluster Club contact form mailer (Google Apps Script).
 *
 * Emails website contact form messages to yas@clusterclub.co.uk, sent from
 * the Google Workspace account that deploys it (yas@clusterclub.co.uk).
 * Called by functions/api/contact.ts.
 *
 * Setup (logged in as yas@clusterclub.co.uk):
 *   1. script.google.com → New project → paste this file, set SHARED_SECRET
 *      to the same value as the CONTACT_MAILER_SECRET secret on Cloudflare.
 *   2. Deploy → New deployment → Web app.
 *      Execute as: Me. Who has access: Anyone.
 *   3. Authorise when asked, then copy the Web app URL into the
 *      CONTACT_MAILER_URL secret on Cloudflare.
 * After editing the script, use Deploy → Manage deployments → Edit → New
 * version, so the URL stays the same.
 */
const SHARED_SECRET = "PASTE_SECRET_HERE";
const CONTACT_TO = "yas@clusterclub.co.uk";
const MAX_MESSAGE_LENGTH = 5000;

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ error: "Invalid request" });
  }

  if (data.secret !== SHARED_SECRET) {
    return reply({ error: "Unauthorised" });
  }

  const name = String(data.name || "").replace(/[\r\n]+/g, " ").slice(0, 100);
  const email = String(data.email || "").trim().slice(0, 200);
  const message = String(data.message || "").slice(0, MAX_MESSAGE_LENGTH);

  if (!name || !email || !message) {
    return reply({ error: "All fields are required" });
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  MailApp.sendEmail({
    to: CONTACT_TO,
    replyTo: isValidEmail ? email : CONTACT_TO,
    name: "Cluster Club Website",
    subject: "Website message from " + name,
    body:
      "Name: " + name + "\n" +
      "Email: " + email + "\n\n" +
      message + "\n\n" +
      "—\nSent from the contact form at clusterclub.co.uk. " +
      "Reply to this email to answer " + name + " directly.",
  });

  return reply({ success: true });
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
