import React, { useState } from "react";
import axios from "axios"; // Import Axios for API calls

const Modal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  // State for form fields
  const [formData, setFormData] = useState({
    noticeId: 0, // Default value
    title: "",
    body: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "noticeId") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } 
   };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the POST request to Spring Boot API
      const response = await axios.post("http://localhost:8085/api/v1/notice/save", formData);

      console.log("Notice Saved:", response.data); // Log response
      alert("Notice added successfully!");

      // Clear form after successful submission
      setFormData({ title: "", body: "" });

      onClose(); // Close modal after submission
    } catch (error) {
      console.error("Error saving notice:", error);
      alert("Failed to add notice!");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10"
      id="wrapper"
      onClick={(e) => e.target.id === "wrapper" && onClose()}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Add Notice</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Notice Title Field */}
          <div>
            <label className="block text-gray-700 font-medium">Notice Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black"
              placeholder="Enter notice title"
              required
            />
          </div>

          {/* Notice Body Field */}
          <div>
            <label className="block text-gray-700 font-medium">Notice Body</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black"
              rows="3"
              placeholder="Enter notice details"
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#287f93] text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

