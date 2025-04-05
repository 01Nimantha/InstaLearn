// // src/components/AddClassModal.jsx
// import { useState } from "react";
// import axios from "axios";

// const AddClassModal = ({ onClose, onAdd }) => {
//   const [classTypeName, setClassTypeName] = useState("");
//   const [classType, setClassType] = useState("THEORY");

//   const API_BASE_URL = "http://localhost:8085/classType";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_BASE_URL}/save-class-type`, {
//         classTypeName,
//         type: classType,
//       });
//       onAdd(); // Call the onAdd callback to refresh the table and close the modal
//     } catch (error) {
//       console.error("Error adding class type:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Add Class</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Class Name</label>
//             <input
//               type="text"
//               value={classTypeName}
//               onChange={(e) => setClassTypeName(e.target.value)}
//               placeholder="Your Class Name"
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Class Type</label>
//             <select
//               value={classType}
//               onChange={(e) => setClassType(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//             >
//               <option value="THEORY">THEORY</option>
//               <option value="PAPER">PAPER</option>
//               <option value="REVISION">REVISION</option>
//             </select>
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//             >
//               Add Class
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddClassModal;