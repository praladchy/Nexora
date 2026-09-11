import React, { useState } from "react";
import { useCreateShopMutation } from "../../components/Redux/Shop.apiSlice";

const AddShop = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    address: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [submitStatus, setSubmitStatus] = useState({
    type: "",
    message: "",
  });

  const [shopCreate, { isLoading }] = useCreateShopMutation();

  // 🔹 Handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setLogoFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 🔹 Validation
   

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("description", formData.description);
      data.append("address", formData.address);

      if (logoFile) {
        data.append("images", logoFile);
      }

    
     
      const res = await shopCreate(data).unwrap();

      console.log("SUCCESS:", res);

      

      // reset
      setFormData({
        name: "",
        email: "",
        phone: "",
        description: "",
        address: "",
      });

      setLogoFile(null);
      setLogoPreview("");

    } catch (err) {
      console.log("ERROR:", err);

      setSubmitStatus({
        type: "error",
        message: err?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Create Shop</h2>

        {submitStatus.message && (
          <div
            className={`mb-4 p-3 rounded ${
              submitStatus.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Shop Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />

          {/* Email + Phone */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />

          {/* Address */}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />

          {/* Logo */}
          <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />

            {logoPreview && (
              <img
                src={logoPreview}
                alt="preview"
                className="mt-2 h-20 w-20 object-cover rounded"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white p-2 rounded"
          >
            {isLoading ? "Creating..." : "Create Shop"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddShop;