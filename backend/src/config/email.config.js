import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
console.log("dfghlkjnm", process.env.GMAIL_USER, process.env.GMAIL_PASS);

export const transporter = nodemailer.createTransport({
  // host: "smtp.gmail.com",
  // port: 465,
  // secure: true, // MUST be false for 587
  // auth: {
  //   user: process.env.GMAIL_USER,
  //   pass: process.env.GMAIL_PASS, // App Password only
  // },
 host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // STARTTLS on 587
  auth: {
    user: process.env.BREVO_USER,       // your Brevo login email
    pass: process.env.BREVO_SMTP_KEY,   // SMTP key (Brevo dashboard → SMTP & API → SMTP Key, NOT your account password)
  },



});
