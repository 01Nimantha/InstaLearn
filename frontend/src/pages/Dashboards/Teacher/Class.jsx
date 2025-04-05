// // src/App.jsx
// import { useState, useEffect } from "react";
// import ClassTable from "./ClassTable";
// import AddClassModal from "./AddClassModal";
// import UpdateClassModal from "./UpdateClassModal";
// import axios from "axios";

// function App() {
//   const [classTypes, setClassTypes] = useState([]);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedClassType, setSelectedClassType] = useState(null);

//   // Base URL for the API
//   const API_BASE_URL = "http://localhost:8085/classType";

//   // Fetch all class types
//   const fetchClassTypes = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/get-all-class-types`);
//       setClassTypes(response.data);
//     } catch (error) {
//       console.error("Error fetching class types:", error);
//     }
//   };

//   // Delete a class type
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/delete/${id}`);
//       setClassTypes(classTypes.filter((cls) => cls.classId !== id));
//     } catch (error) {
//       console.error("Error deleting class type:", error);
//     }
//   };

//   // Open the update modal with the selected class type
//   const handleUpdate = (classType) => {
//     setSelectedClassType(classType);
//     setIsUpdateModalOpen(true);
//   };

//   // Fetch class types on component mount
//   useEffect(() => {
//     fetchClassTypes();
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex justify-end mb-4">
//       <div className="mb-6">
//           <h1 className="text-2xl font-bold">Class</h1>
//         </div><br></br>
//         <button
//           onClick={() => setIsAddModalOpen(true)}
//           className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Add Class
//         </button>
//       </div>
//       <ClassTable
//         classTypes={classTypes}
//         onDelete={handleDelete}
//         onUpdate={handleUpdate}
//       />
//       {isAddModalOpen && (
//         <AddClassModal
//           onClose={() => setIsAddModalOpen(false)}
//           onAdd={() => {
//             fetchClassTypes(); // Refresh the table after adding
//             setIsAddModalOpen(false);
//           }}
//         />
//       )}
//       {isUpdateModalOpen && (
//         <UpdateClassModal
//           classType={selectedClassType}
//           onClose={() => setIsUpdateModalOpen(false)}
//           onUpdate={() => {
//             fetchClassTypes(); // Refresh the table after updating
//             setIsUpdateModalOpen(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default App;