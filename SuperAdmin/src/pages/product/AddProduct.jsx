import { useState } from "react";
import { useGetShopsActiveQuery } from "../../components/Redux/Shop.apiSlice";
import { useGetCategoryQuery } from "../../components/Redux/category.apiSlice";
import { useCreateproductMutation } from "../../components/Redux/Product.apiSlice";

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
  });

  // IMAGE STATE
  const [images, setImages] = useState([]);

  const { data: shopData } = useGetShopsActiveQuery();
  const shops = shopData?.shops || [];

  const { data: categoryData } = useGetCategoryQuery();
  const categories = categoryData?.category || [];

  const [productCreate, { isLoading }] = useCreateproductMutation();

  // NORMAL INPUT CHANGE
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

  // IMAGE CHANGE (MAX 5 + APPEND)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    // append old + new images
    setImages((prev) => [...prev, ...files]);
  };

  // REMOVE IMAGE
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.stock
    ) {
      alert("Name, Category, Price and Stock are required");
      return;
    }

    try {
      // FormData for image upload
      const submitData = new FormData();

      // append text fields
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      // append multiple images
      images.forEach((image) => {
        submitData.append("images", image);
      });

      const res = await productCreate(submitData).unwrap();

      alert(res.message);

      if (res.success) {
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
        });

        setImages([]);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="flex gap-6">
        <div className="w-[60%] flex flex-col gap-6">

          {/* BASIC INFO */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-lg font-semibold mb-4">
              Basic Information
            </h3>

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

          {/* PRODUCT DETAILS */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-lg font-semibold mb-4">
              Product Details
            </h3>

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
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-lg font-semibold mb-4">
              Product Images (Max 5)
            </h3>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="input"
            />

            {/* IMAGE PREVIEW */}
            <div className="flex gap-4 flex-wrap mt-4">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white px-2 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg"
            >
              {isLoading ? "Creating..." : "Add Product"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddProduct;