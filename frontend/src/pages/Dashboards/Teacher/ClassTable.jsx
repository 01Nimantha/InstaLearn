// // src/components/ClassTable.jsx
// const ClassTable = ({ classTypes, onDelete, onUpdate }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="px-4 py-2 border">classId</th>
//             <th className="px-4 py-2 border">Name</th>
//             <th className="px-4 py-2 border">Type</th>
//             <th className="px-4 py-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {classTypes.map((cls) => (
//             <tr key={cls.classId} className="text-center">
//               <td className="px-4 py-2 border">{cls.classId}</td>
//               <td className="px-4 py-2 border">{cls.classTypeName}</td>
//               <td className="px-4 py-2 border">{cls.type}</td>
//               <td className="px-4 py-2 border">
//                 <button
//                   onClick={() => onUpdate(cls)}
//                   className="text-blue-500 mr-2"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={() => onDelete(cls.classId)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ClassTable;