import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { logger } from "../lib/logger";

const resend = new Resend(process.env.RESEND_API_KEY);

const router: IRouter = Router();

router.post("/contacts", async (req, res): Promise<void> => {
  const { name, email, service, budget, message } = req.body ?? {};

  if (!name || typeof name !== "string" || name.trim() === "") {
    res.status(400).json({ error: "Name is required" });
    return;
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Valid email is required" });
    return;
  }
  if (!message || typeof message !== "string" || message.trim() === "") {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  try {
    const { error } = await resend.emails.send({
      from: "Trimmic Studio <hello@trimmic.com>",
      to: ["hello@trimmic.com"],
      replyTo: email,
      subject: `New project inquiry from ${name.trim()}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="margin-top:0">New Project Inquiry</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;font-weight:bold;width:120px">Name</td><td>${name.trim()}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:bold">Service</td><td>${service || "Not specified"}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold">Budget</td><td>${budget || "Not specified"}</td></tr>
          </table>
          <hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
          <p style="font-weight:bold;margin-bottom:8px">Message</p>
          <p style="white-space:pre-wrap;margin:0">${message.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        </div>
      `,
    });

    if (error) {
      logger.warn({ error }, "Resend email failed");
      res.status(500).json({ error: "Failed to send email" });
      return;
    }

    logger.info({ to: "hello@trimmic.com", from: email }, "Contact email sent");
    res.status(201).json({ success: true });
  } catch (err) {
    logger.error(err, "Contact route threw");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
