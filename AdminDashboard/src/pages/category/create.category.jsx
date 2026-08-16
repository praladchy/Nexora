import { useState } from "react";
import Select from "react-select";
import {
  useCreateCategoryMutation,
  useGetParentCategoryQuery,
} from "../../components/Redux/category.apiSlice";
import { useGetShopsActiveQuery } from "../../components/Redux/Shop.apiSlice";

export default function CreateCategory() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    parent: "",
    shop: "",
    isParent: true,
    isGlobal: false,
    isActive: true,
    images: null,
  });

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const { data: shopData, isFetching } = useGetShopsActiveQuery();
  const { data: categoryData } = useGetParentCategoryQuery();
console.log(categoryData);
  const shopOptions =
    shopData?.shops?.map((shop) => ({
      label: shop.name,
      value: shop._id,
    })) || [];

  const parentOptions =
    categoryData?.category?.map((cat) => ({
      label: cat.name,
      value: cat._id,
    })) || [];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
      ...(name === "isParent" && checked ? { parent: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("parent", form.isParent ? "" : form.parent);
      formData.append("shop", form.isGlobal ? "" : form.shop);
      formData.append("isGlobal", form.isGlobal);
      formData.append("isActive", form.isActive);
      formData.append("isParent", form.isParent);


      if (form.images) {
        formData.append("images", form.images);
      }

      const res = await createCategory(formData).unwrap();
      console.log("Created:", res);

      setForm({
        name: "",
        description: "",
        parent: "",
        shop: "",
        isParent: true,
        isGlobal: false,
        isActive: true,
        images: null,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Create Category</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Category Name"
          className="w-full border p-2 rounded"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />

        {/* Is Parent Category */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isParent"
            checked={form.isParent}
            onChange={handleChange}
          />
          Is Parent Category
        </label>

        {/* Parent Category */}
        {!form.isParent && (
          <div>
            <label className="block mb-1 font-medium">Parent Category</label>
            <Select
              options={parentOptions}
              value={
                parentOptions.find((opt) => opt.value === form.parent) || null
              }
              onChange={(selected) =>
                setForm((prev) => ({
                  ...prev,
                  parent: selected ? selected.value : "",
                }))
              }
              isSearchable
              placeholder="Select Parent Category..."
              noOptionsMessage={() => "No parent category found"}
            />
          </div>
        )}

        {/* Global Category */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isGlobal"
            checked={form.isGlobal}
            onChange={handleChange}
          />
          Global Category
        </label>

        {/* Shop */}
        {!form.isGlobal && (
          <div>
            <label className="block mb-1 font-medium">Select Shop</label>
            <Select
              options={shopOptions}
              value={shopOptions.find((opt) => opt.value === form.shop) || null}
              onChange={(selected) =>
                setForm((prev) => ({
                  ...prev,
                  shop: selected ? selected.value : "",
                }))
              }
              isSearchable
              isLoading={isFetching}
              placeholder="Select shop..."
              noOptionsMessage={() => "No shops found"}
            />
          </div>
        )}

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Category Image</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {form.images && (
            <img
              src={URL.createObjectURL(form.images)}
              alt="Preview"
              className="mt-3 h-24 w-24 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Active */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Active
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isLoading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}