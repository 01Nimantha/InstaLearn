// src/components/EditModel.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditModel = ({ title, apiEndpoints, fields, onClose, entityId }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await axios.get(apiEndpoints.getEndpoint);
        const data = response.data;
        console.log("Fetched classType:", data); 
        const initialData = fields.reduce((acc, field) => {
          acc[field.name] = data[field.name] || "";
          return acc;
        }, {});
        setFormData(initialData);
      } catch (error) {
        console.error(`Error fetching ${title.toLowerCase()}:`, error);
      }
    };
    if (entityId) fetchEntity();
  }, [entityId, apiEndpoints.getEndpoint, fields, title]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(apiEndpoints.updateEndpoint, formData);
      onClose();
    } catch (error) {
      console.error(`Error updating ${title.toLowerCase()}:`, error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 mb-2">{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required={field.required}
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required={field.required}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#287f93] text-white px-4 py-2 rounded hover:bg-[#1e5b6a]"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModel;