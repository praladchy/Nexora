import { transporter } from "../config/email.config.js";

export const sendEmail = async ({ email ,otp }) => {
  console.log("mail asdvfg",email,otp);
const mailTransporter = await transporter();
  return mailTransporter.sendMail({
    from: process.env.MAIL_FROM,
    to:email,
    subject: "Your OTP Code",

    html: `
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>Valid for 5 minutes</p>
      `,
  });
};

// import { BrevoClient } from "@getbrevo/brevo";

// const brevo = new BrevoClient({
//   apiKey: process.env.BREVO_API_KEY,
//   // timeoutInSeconds: 30,
//   // maxRetries: 3,
// });
// export const sendEmail = async ({ email, otp }) => {
//   console.log("mail asdvfg", process.env.BREVO_API_KEY, process.env.BREVO_GMAIL, email, otp);
//   try {
//     const result = await brevo.transactionalEmails.sendTransacEmail({
//       subject: "Hello from Nexora!, Your OTP Code",
//       htmlContent: `
//         <h2>Email Verification</h2>
//         <p>Your OTP is:</p>
//         <h1>${otp}</h1>
//         <p>Valid for 30 minutes</p>
//       `,
//       sender: { email: process.env.BREVO_EMAIL, name: "Nexora" },
//       to: [{ email }],
//     });

//     console.log("Email sent. Message ID:", result.messageId);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };



// import { Resend } from "resend";
// import dotenv from "dotenv";

// dotenv.config();

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendEmail = async ({ email, otp }) => {
//   console.log(
//     "Sending email:",
//     process.env.RESEND_API_KEY,
//     email,
//     otp
//   );

//   try {
//     const { data, error } = await resend.emails.send({
//       from: process.env.RESEND_GMAIL, // Use this for testing
//       to: email,
//       subject: "Hello from Nexora! Your OTP Code",
//       html: `
//         <h2>Email Verification</h2>
//         <p>Your OTP is:</p>
//         <h1>${otp}</h1>
//         <p>Valid for 30 minutes</p>
//       `,
//     });

//     if (error) {
//       console.error("Resend Error:", error);
//       return;
//     }

//     console.log("Email sent:", data);
//   } catch (err) {
//     console.error("Error sending email:", err);
//   }
// };