import { transporter } from "../config/email.config.js";

export const sendEmail = async ({ email ,otp }) => {
  console.log("mail",email,otp);

  
  return transporter.sendMail({
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
