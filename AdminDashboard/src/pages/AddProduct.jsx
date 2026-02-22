import { useState, useEffect } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    finalPrice: "",
    discount: "",
    category: "",
    subCategory: "",
    brand: "",
    stock: "",
    shop: "",
    sku: "",
    stockLimit: "",
    status: "active",
    vendor: "",
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [shops, setShops] = useState([]);
  const [vendors, setVendors] = useState([]);

  const [loading, setLoading] = useState(false);

  // 🔹 Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = { ...formData, [name]: value };

    // Auto calculate finalPrice
    if (name === "price" || name === "discount") {
      const price = name === "price" ? value : formData.price;
      const discount = name === "discount" ? value : formData.discount;

      if (price && discount) {
        const final =
          parseFloat(price) -
          (parseFloat(price) * parseFloat(discount)) / 100;

        updatedData.finalPrice = final.toFixed(2);
      }
    }

    setFormData(updatedData);
  };

  // 🔹 Fetch Dropdown Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetch("http://localhost:5000/api/category");
        const shopRes = await fetch("http://localhost:5000/api/shop");
        const vendorRes = await fetch("http://localhost:5000/api/vendor");

        const catData = await catRes.json();
        const shopData = await shopRes.json();
        const vendorData = await vendorRes.json();

        setCategories(catData?.data || []);
        setShops(shopData?.data || []);
        setVendors(vendorData?.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      alert("Name, Category, Price and Stock are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Product created successfully");
        setFormData({
          name: "",
          description: "",
          price: "",
          finalPrice: "",
          discount: "",
          category: "",
          subCategory: "",
          brand: "",
          stock: "",
          shop: "",
          sku: "",
          stockLimit: "",
          status: "active",
          vendor: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="flex gap-6">
        {/* LEFT SIDE */}
        <div className="w-[60%] flex flex-col gap-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="input"
              />

              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleChange}
                className="input"
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                name="shop"
                value={formData.shop}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Shop</option>
                {shops.map((shop) => (
                  <option key={shop._id} value={shop._id}>
                    {shop.name}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              name="description"
              rows="4"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="input mt-4 w-full"
            />
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-lg font-semibold mb-4">Product Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="input"
              />

              <input
                type="number"
                name="discount"
                placeholder="Discount %"
                value={formData.discount}
                onChange={handleChange}
                className="input"
              />

              <input
                type="number"
                name="finalPrice"
                placeholder="Final Price"
                value={formData.finalPrice}
                readOnly
                className="input bg-gray-100"
              />

              <input
                type="text"
                name="sku"
                placeholder="SKU"
                value={formData.sku}
                onChange={handleChange}
                className="input"
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                className="input"
              />

              <input
                type="number"
                name="stockLimit"
                placeholder="Stock Limit"
                value={formData.stockLimit}
                onChange={handleChange}
                className="input"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <select
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Vendor</option>
                {vendors.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg"
            >
              {loading ? "Creating..." : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
