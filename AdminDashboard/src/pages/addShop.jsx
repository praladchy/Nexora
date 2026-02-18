import { useState } from "react";
import axios from "axios";

const CreateShop = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    owner: "",
    admins: "",
    description: "",
    logo: "",
    address: "",
    isActive: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      admins: formData.admins.split(",").map(id => id.trim())
    };

    try {
      await axios.post("http://localhost:5000/api/shops", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      alert("Shop created successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating shop");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Create New Shop</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Shop Name"
            className="input"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Shop Email"
            className="input"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="input"
            onChange={handleChange}
          />

          <input
            type="text"
            name="owner"
            placeholder="Owner User ID"
            className="input"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="admins"
            placeholder="Admin IDs (comma separated)"
            className="input col-span-2"
            onChange={handleChange}
          />

          <input
            type="text"
            name="logo"
            placeholder="Logo URL"
            className="input col-span-2"
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Shop Description"
            className="input col-span-2 h-24"
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Shop Address"
            className="input col-span-2 h-20"
            onChange={handleChange}
          />

          <div className="col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={() =>
                setFormData({ ...formData, isActive: !formData.isActive })
              }
            />
            <span>Is Active</span>
          </div>

          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Create Shop
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateShop;
