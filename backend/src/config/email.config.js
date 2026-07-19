import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
 

export const transporter = nodemailer.createTransport({
  
//  host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // MUST be false for 587
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS, // App Password only
    
//   },


 host: process.env.BREVO_HOST,
  port: Number(process.env.BREVO_PORT),
  secure: false, // Use false with port 587
  auth: {
    user: process.env.BREVO_LOGIN,
    pass: process.env.BREVO_SMTP_KEY,
  },
}

);
 