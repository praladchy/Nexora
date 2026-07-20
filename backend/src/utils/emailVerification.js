// import { transporter } from "../config/email.config.js";

// export const sendEmail = async ({ email ,otp }) => {
//   console.log("mail asdvfg",email,otp);

//   return transporter.sendMail({
//     from: process.env.MAIL_FROM,
//     to:email,
//     subject: "Your OTP Code",

//     html: `
//         <h2>Email Verification</h2>
//         <p>Your OTP is:</p>
//         <h1>${otp}</h1>
//         <p>Valid for 5 minutes</p>
//       `,
//   });
// };

import { BrevoClient } from "@getbrevo/brevo";

const brevo = new BrevoClient({
  apiKey: "your-api-key",
  // timeoutInSeconds: 30,
  // maxRetries: 3,
});
export const sendEmail = async ({ email, otp }) => {
  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject: "Hello from Nexora!, Your OTP Code",
      htmlContent: `
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>Valid for 30 minutes</p>
      `,
      sender: { email: process.env.BREVO_EMAIL, name: "Nexora" },
      to: [{ email }],
    });

    console.log("Email sent. Message ID:", result.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
