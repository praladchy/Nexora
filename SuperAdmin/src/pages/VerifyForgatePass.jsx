import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useVerificationMutation,
  useReSendOtpMutation,
} from "../components/Redux/auth.slice";
const VerifyForgatePassword = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [verifyOtp] = useVerificationMutation();
  const [resendOtp] = useReSendOtpMutation();
  const navigate = useNavigate();

  const { userId } = useParams();
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next
    if (index < 3) {
      e.target.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    try {
      const res = await verifyOtp({ userId, otp: finalOtp }).unwrap();
      navigate(`/forgot-password/${userId}`);
      setOtp(["", "", "", ""]);
      alert(res.message);
      // localStorage.setItem("accessToken", res.accessToken);
    } catch (error) {
      console.log("user not verified server error", error.message);
    }
  };
  const handleResend = async () => {
    try {
      const res = await resendOtp({ userId }).unwrap();
      alert(res.message);
    } catch (error) {
      alert("Failed to resend OTP");
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h2>
          <p className="text-gray-600 mb-6">
            Enter the 4-digit code sent to your device.
          </p>
          <div className="flex justify-center gap-4 mb-6">
            {[0, 1, 2, 3].map((_, index) => (
              <input
                key={index}
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center text-xl font-bold border rounded-lg"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Verify & Proceed
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500">
          Didn't receive code?{" "}
          <button onClick={handleResend} className="text-blue-600 font-medium">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyForgatePassword;
