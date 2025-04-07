// src/components/AddDetailsFormModel.jsx
import React, { useState } from "react";
import axios from "axios";

const AddDetailsFormModel = ({ title, btnTitle, saveEndpoint, fields, onClose }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim?.() ?? value])
    );

    try {
      await axios.post(saveEndpoint, trimmedData);
      onClose(); // Close the modal after success
    } catch (error) {
      console.error(`❌ Error saving ${title.toLowerCase()}:`, error);
      alert("Something went wrong while saving. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor={field.name}>
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required={field.required}
                >
                  <option value="" disabled>
                    -- Select {field.label} --
                  </option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 border rounded"
                  required={field.required}
                />
              )}
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#287f93] text-white px-4 py-2 rounded hover:bg-[#1e5b6a]"
            >
              {btnTitle}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDetailsFormModel;
