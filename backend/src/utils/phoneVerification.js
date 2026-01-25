import { client } from "../config/twilio.config.js";
export const sendOtpSms = async (phone, otp) => {
  return client.messages.create({
    body: `Your verification code is ${otp}`,
    from: process.env.TWILIO_PHONE,
    to: phone,
  });
};    