import React, { useState, useEffect, useRef } from 'react';

// Reusable MultiSelect component with checkboxes
const MultiSelect = ({ options, selectedValues, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newSelected);
  };

  const getSelectedLabels = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      const user = options.find((opt) => opt.value === selectedValues[0]);
      return user ? user.label : '';
    }
    return `${selectedValues.length} admins selected`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <span className="text-gray-700">{getSelectedLabels()}</span>
        <span className="float-right"></span>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => toggleOption(option.value)}
              className="flex items-center px-3 py-2 hover:bg-indigo-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => {}} // handled by div click
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                onClick={(e) => e.stopPropagation()}
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AddShop = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    owner: '',
    admins: [],
    description: '',
    address: '',
    isActive: true,
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Fetch users for dropdowns
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Adjust endpoint
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error('Error fetching users:', error);  
      }
    };
    fetchUsers();
  }, []);

  // Prepare options for dropdowns
  const userOptions = users.map((user) => ({
    value: user._id,
    label: `${user.name} (${user.email})`,
  }));

  // Handle text/select inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoFile(null);
      setLogoPreview('');
    }
  };

  // Validate form
  const validateForm = () => {
    const { name, email, phone } = formData;
    if (!name.trim()) return 'Shop name is required';
    if (!email.trim() && !phone.trim()) return 'Email or phone is required';
    return null;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setSubmitStatus({ type: 'error', message: error });
      return;
    }

    setLoading(true);
    setSubmitStatus({ type: '', message: '' });

    // Prepare data – convert image to base64 string
    let logoData = '';
    if (logoFile) {
      logoData = logoPreview; // base64 string
    }

    const payload = {
      ...formData,
      logo: logoData,
    };

    try {
      const response = await fetch('/api/shops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Shop created successfully!' });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          owner: '',
          admins: [],
          description: '',
          address: '',
          isActive: true,
        });
        setLogoFile(null);
        setLogoPreview('');
      } else {
        setSubmitStatus({ type: 'error', message: result.message || 'Failed to create shop' });
      }
    } catch (err) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Add New Shop</h2>

          {submitStatus.message && (
            <div
              className={`mb-4 p-3 rounded ${
                submitStatus.type === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Shop Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Shop Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Owner Dropdown */}
            <div>
              <label htmlFor="owner" className="block text-sm font-medium text-gray-700">
                Owner *
              </label>
              <select
                id="owner"
                name="owner"
                value={formData.owner}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select an owner</option>
                {userOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Admins MultiSelect with checkboxes */}
            <div>
              <label htmlFor="admins" className="block text-sm font-medium text-gray-700">
                Admins
              </label>
              <MultiSelect
                options={userOptions}
                selectedValues={formData.admins}
                onChange={(selected) => setFormData((prev) => ({ ...prev, admins: selected }))}
                placeholder="Select admins"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Logo Upload with Preview */}
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                Logo
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <input
                  type="file"
                  id="logo"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {logoPreview && (
                  <div className="flex-shrink-0">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="h-16 w-16 object-cover rounded-md border border-gray-300"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Active Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Shop is active
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
              >
                {loading ? 'Creating...' : 'Create Shop'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddShop;