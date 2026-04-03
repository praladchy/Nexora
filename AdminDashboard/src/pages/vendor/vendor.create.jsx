import { useState } from "react";
import {
  useVendorUserCreateMutation,
  useEmailVerificationMutation,
  useEmailVerificationOtpMutation,
  usePhoneVerificationMutation,
  usePhoneVerificationOtpMutation,
} from "../../components/Redux/vendor.apiSlice";

const CreateVendor = () => {
  const [formData, setFormData] = useState({
    vendorName: "",
    email: "",
    phone: "",
    commissionRate: "",
  });

  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");

  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(true);

  const [message, setMessage] = useState("");

  const [sendEmailOtpApi] = useEmailVerificationMutation();
  const [verifyEmailOtpApi] = useEmailVerificationOtpMutation();

  const [sendPhoneOtpApi] = usePhoneVerificationMutation();
  const [verifyPhoneOtpApi] = usePhoneVerificationOtpMutation();

  const [createVendor, { isLoading }] = useVendorUserCreateMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // SEND EMAIL OTP
  const sendEmailOtp = async () => {
    try {
      const res = await sendEmailOtpApi({ email: formData.email }).unwrap();

      setEmailOtpSent(true);
      setMessage(res.message);
    } catch (error) {
      setMessage(error?.data?.message || "Email OTP failed");
    }
  };

  // VERIFY EMAIL OTP
  const verifyEmailOtp = async () => {
    try {
      const res = await verifyEmailOtpApi({
        email: formData.email,
        otp: emailOtp,
      }).unwrap();

      setEmailVerified(true);
      setMessage(res.message);
    } catch (error) {
      setMessage(error?.data?.message || "Invalid Email OTP");
    }
  };

  // SEND PHONE OTP
  const sendPhoneOtp = async () => {
    try {
      const res = await sendPhoneOtpApi({ phone: formData.phone }).unwrap();

      setPhoneOtpSent(true);
      setMessage(res.message);
    } catch (error) {
      setMessage(error?.data?.message || "Phone OTP failed");
    }
  };

  // VERIFY PHONE OTP
  const verifyPhoneOtp = async () => {
    try {
      const res = await verifyPhoneOtpApi({
        phone: formData.phone,
        otp: phoneOtp,
      }).unwrap();

      setPhoneVerified(true);
      setMessage(res.message);
    } catch (error) {
      setMessage(error?.data?.message || "Invalid Phone OTP");
    }
  };

  // CREATE VENDOR
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailVerified || !phoneVerified) {
      setMessage("Please verify Email and Phone first");
      return;
    }

    try {
      const res = await createVendor(formData).unwrap();

      setMessage(res.message);

      setFormData({
        vendorName: "",
        email: "",
        phone: "",
        commissionRate: "",
      });

      setEmailOtp("");
      setPhoneOtp("");

      setEmailVerified(false);
      // setPhoneVerified(false);

      setEmailOtpSent(false);
      // setPhoneOtpSent(true);
    } catch (error) {
      setMessage(error?.data?.message || "Vendor creation failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Vendor</h2>

      {message && (
        <p className="text-center text-sm text-blue-600 mb-4">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Vendor Name */}
        <div>
          <label className="block text-sm font-medium">Vendor Name</label>
          <input
            type="text"
            name="vendorName"
            value={formData.vendorName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Business Email</label>

          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />

            {!emailVerified && (
              <button
                type="button"
                onClick={sendEmailOtp}
                className="bg-green-600 text-white px-3 rounded disabled:bg-gray-400"
              >
               {emailOtpSent ? "Resend OTP" : "Send OTP"} 
              </button>
            )}
          </div>

          {emailOtpSent && !emailVerified && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Enter OTP"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                className="w-full p-2 border rounded"
              />

              <button
                type="button"
                onClick={verifyEmailOtp}
                className="bg-blue-600 text-white px-3 rounded"
              >
                Verify
              </button>
            </div>
          )}

          {emailVerified && (
            <p className="text-green-600 text-sm mt-1">
              Email Verified ✔
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium">Phone Number</label>

          <div className="flex gap-2">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />

            {!phoneVerified && (
              <button
                type="button"
                onClick={sendPhoneOtp}
                className="bg-green-600 text-white px-3 rounded disabled:bg-gray-400"
              >
               {phoneOtpSent? "Resend OTP" : "Send OTP"}  
              </button>
            )}
          </div>

          {phoneOtpSent && !phoneVerified && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Enter OTP"
                value={phoneOtp}
                onChange={(e) => setPhoneOtp(e.target.value)}
                className="w-full p-2 border rounded"
              />

              <button
                type="button"
                onClick={verifyPhoneOtp}
                className="bg-blue-600 text-white px-3 rounded"
              >
                Verify
              </button>
            </div>
          )}

          {phoneVerified && (
            <p className="text-green-600 text-sm mt-1">
              Phone Verified ✔
            </p>
          )}
        </div>

        {/* Commission */}
        <div>
          <label className="block text-sm font-medium">
            Commission Rate (%)
          </label>
          <input
            type="number"
            name="commissionRate"
            value={formData.commissionRate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!emailVerified  }
          className="w-full bg-blue-600 text-white py-2 rounded-md disabled:bg-gray-400"
        >
          {/* {isLoading ? "Creating..." : "Create Vendor"} */}
          create vendor
        </button>

      </form>
    </div>
  );
};

export default CreateVendor;