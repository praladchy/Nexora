import { google } from "googleapis";
import oauth2Client from "../config/email.config.js";

export const sendEmail = async ({ email, otp }) => {
  const gmail = google.gmail({
    version: "v1",
    auth: oauth2Client,
  });

  const message = [
    `From: Nexora <${process.env.GMAIL_USER}>`,
    `To: ${email}`,
    "Subject: Your OTP Code",
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "",
    `
      <h2>Email Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>Valid for 5 minutes</p>
    `,
  ].join("\n");

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const result = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage,
    },
  });

  console.log("Email sent:", result.data);
};