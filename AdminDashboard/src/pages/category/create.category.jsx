import { useState } from "react";
import { useCreateCategoryMutation } from "../../components/Redux/category.apiSlice";
import Select from "react-select";
import { useGetShopsActiveQuery } from "../../components/Redux/Shop.apiSlice";
export default function CreateCategory() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    parent: "",
    shop: "",
    isGlobal: false,
    isActive: true,
  });
  const [search, setSearch] = useState("");
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const { data, isFetching } = useGetShopsActiveQuery()
console.log("Shops:", data);
  

  const options =
    data?.shops?.map((shop) => ({
      label: shop.name,
      value: shop._id,
    })) || [];
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        parent: form.parent || null,
        shop: form.isGlobal ? null : form.shop,
      };

      const res = await createCategory(payload).unwrap();
      console.log("Created:", res);

      // reset
      setForm({
        name: "",
        description: "",
        parent: "",
        shop: "",
        isGlobal: false,
        isActive: true,
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

        {/* Parent */}
        <input
          type="text"
          name="parent"
          value={form.parent}
          onChange={handleChange}
          placeholder="Parent Category ID"
          className="w-full border p-2 rounded"
        />
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
          <Select
  options={options}
  value={options.find((opt) => opt.value === form.shop) || null}
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
        )}

        {/* isGlobal */}

        {/* isActive */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Active
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {isLoading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}
