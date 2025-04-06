// src/components/DeleteModel.jsx
import React from "react";
import axios from "axios";

const DeleteModel = ({ title, apiEndpoints, onClose, entityId }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(apiEndpoints.deleteEndpoint);
      onClose();
    } catch (error) {
      console.error(`Error deleting ${title.toLowerCase()}:`, error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p>Are you sure you want to delete this class type?</p>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-[#287f93] text-white px-4 py-2 rounded hover:bg-[#1e5b6a]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;