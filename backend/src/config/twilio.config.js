import twilio from "twilio";
console.log("TWILIO_SID:", process.env.TWILIO_SID);
export const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);