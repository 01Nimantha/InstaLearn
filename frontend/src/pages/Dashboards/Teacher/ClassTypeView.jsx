import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddDetailsFormModel from "./AddDetailsFormModel";
import EditModel from "./EditModel";
import DeleteModel from "./DeleteModel";

const ClassTypeAddDetailsFormModel = ({ onClose }) => (
  <AddDetailsFormModel
    title="Add Class Type"
    btnTitle="Add Class Type"
    saveEndpoint = "http://localhost:8085/classType/save-class-type"
    fields={[
      {
        label: "Class Type Name",
        type: "text",
        name: "classTypeName", // Adjusted to match API field
        placeholder: "Class Type Name",
        required: true,
      },
      {
        label: "Type",
        type: "select",
        name: "type",
        options: [
          { value: "THEORY", label: "THEORY" },
          { value: "PAPER", label: "PAPER" },
        ],
        required: true,
      },
    ]}
    onClose={onClose}
  />
);

const ClassTypeEditModel = ({ onClose, classId }) => (
  <EditModel
    title="Update Class Type"
    apiEndpoints={{
      getEndpoint: `http://localhost:8085/classType/get-class-type-by-id/${classId}`,
      updateEndpoint: `http://localhost:8085/classType/update/${classId}`,
    }}
    fields={[
      {
        label: "Class Type Name",
        name: "classTypeName", // Adjusted to match API field
        type: "text",
        required: true,
      },
      {
        label: "Type",
        name: "type",
        type: "select",
        options: [
          { value: "THEORY", label: "THEORY" },
          { value: "PAPER", label: "PAPER" }
        ],
        required: true,
      },
    ]}
    onClose={onClose}
    entityId={classId}
  />
);

const ClassTypeDeleteModel = ({ onClose, classId }) => (
  <DeleteModel
    title="Delete Class Type"
    apiEndpoints={{
      deleteEndpoint: `http://localhost:8085/classType/delete/${classId}`,
    }}
    onClose={onClose}
    entityId={classId}
  />
);

const ClassTypeView = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [classTypes, setClassTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5);

  useEffect(() => {
    loadClassTypes();
  }, [currentPage]);

  const loadClassTypes = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8085/classType/get-all-classes`
      );
      

      if (result.status === 200) {
        console.log("API Response:", result.data); // Log the response to debug
        // Map the API response to the expected structure
        const mappedData = result.data.map(item => ({
          classId: item.classTypeId,
          classTypeName: item.classTypeName,
          type: item.type,
        }));
        
        setClassTypes(mappedData);
        setTotalPages(result.data.totalPages || 1);
      } else {
        console.error("API Error:", result.status, result.data);
      }
    } catch (error) {
      console.error("Error loading class types:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDelete = async (classId) => {
    try {
      await axios.delete(`http://localhost:8085/classType/delete/${classId}`);
      loadClassTypes(); // Refresh the table
    } catch (error) {
      console.error("Error deleting class type:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#D9D9D9] flex">

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Class</h1>
        </div>
        <div className="flex justify-end mb-4">
          <button
            className="bg-[#287f93] text-white px-4 py-2 rounded hover:bg-[#1e5b6a]"
            onClick={() => setActiveModal("add")}
          >
            Add Class Type
          </button>
        </div>

        <div className="w-full">
          <table className="w-full border-collapse shadow">
            <thead className="bg-[#EBEBEB] h-12">
              <tr className="text-center">
                <th className="border px-4 py-2">Class Id</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2" colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {classTypes
                .filter((classType) => {
                  const classIdStr = classType.classId
                    ? classType.classId.toString()
                    : "";
                  return classIdStr
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase());
                })
                .map((classType, index) => (
                  <tr
                    key={classType.classId}
                    className="h-12 bg-[#FFFFFF] hover:bg-gray-100 border"
                  >
                    <td className="border px-4 py-2">{classType.classId || "N/A"}</td>
                    <td className="border px-4 py-2">{classType.classTypeName || "N/A"}</td>
                    <td className="border px-4 py-2">{classType.type || "N/A"}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                        onClick={() => {
                          setSelectedClassId(classType.classId);
                          setActiveModal("edit");
                        }}
                        disabled={!classType.classId}
                      >
                        Update
                      </button>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                        onClick={() => {
                          setSelectedClassId(classType.classId);
                          setActiveModal("delete");
                        }}
                        disabled={!classType.classId}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-4 gap-4">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <span>Page {currentPage + 1} of {totalPages}</span>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>

        {activeModal === "add" && (
          <ClassTypeAddDetailsFormModel
            onClose={() => {
              setActiveModal(null);
              loadClassTypes();
            }}
          />
        )}
        {activeModal === "edit" && selectedClassId && (
          <ClassTypeEditModel
            classId={selectedClassId}
            onClose={() => {
              setSelectedClassId(null);
              setActiveModal(null);
              loadClassTypes();
            }}
          />
        )}
        {activeModal === "delete" && selectedClassId && (
          <ClassTypeDeleteModel
            classId={selectedClassId}
            onClose={() => {
              setSelectedClassId(null);
              setActiveModal(null);
              loadClassTypes();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ClassTypeView;