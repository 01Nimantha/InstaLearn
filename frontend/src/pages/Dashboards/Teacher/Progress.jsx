import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

const Progress = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [marks, setMarks] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMarks();
  }, [page]); // Fetch marks whenever the page changes

  const fetchMarks = async (id = "") => {
    try {
      if (id) {
        const response = await axios.get(`http://localhost:8085/api/v1/excel/get-by-id`, { params: { id } });
        setMarks(groupMarks([response.data])); // Convert object to array and group
        setTotalPages(1);
      } else {
        const response = await axios.get(`http://localhost:8085/api/v1/excel/marks`, {
          params: { page, size: 5 },
        });
        setMarks(groupMarks(response.data.content)); // Group data correctly
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching marks:", error);
      setMarks([]);
    }
  };

  const handleSearch = () => {
    fetchMarks(searchTerm.trim());
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post("http://localhost:8085/api/v1/excel/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("File uploaded successfully!");
      fetchMarks();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed: " + error.message);
    }
  };

  // ✅ Group marks by studentId & format months correctly
  const groupMarks = (marksList) => {
    const grouped = {};
    
    marksList.forEach(({ studentId, marks, month }) => {
      if (!grouped[studentId]) {
        grouped[studentId] = { studentId };
      }
      grouped[studentId][month.toLowerCase()] = marks; // Ensure case consistency
    });

    return Object.values(grouped); // Convert object to array
  };

  return (
    <div className="d-flex">
      <div className="p-4 w-full">
        <h2 className="text-xl font-bold">Progress</h2>

        <div className="flex justify-between items-center">
          <div className="w-1/2 py-5 ml-5">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <button onClick={handleSearch} className="ml-2 bg-[#287f93] text-white py-2 px-4 rounded">Search</button>
          </div>

          <div className="flex gap-2">
            <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer bg-[#287f93] text-white py-2 px-4 rounded">Choose File</label>
            <button onClick={handleUpload} className="bg-green-700 text-white py-2 px-4 rounded">Upload</button>
          </div>
        </div>

        <section>
          <table className="shadow mt-10" style={{ margin: "2%", padding: "2%", minWidth: "74vw", backgroundColor: "#ffffff" }}>
            <thead className="bg-[#EBEBEB] h-16">
              <tr className="text-center">
                <th>Student Id</th>
                <th>January</th>
                <th>February</th>
                <th>March</th>
                <th>April</th>
              </tr>
            </thead>
            <tbody>
              {marks.length > 0 ? (
                marks.map(({ studentId, january, february, march, april }, index) => (
                  <tr key={studentId} className={index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#EBEBEB] h-16 text-center"}>
                    <td>{studentId}</td>
                    <td>{january || "-"}</td>
                    <td>{february || "-"}</td>
                    <td>{march || "-"}</td>
                    <td>{april || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                className={`px-4 py-2 mx-2 rounded ${page === 0 ? "bg-gray-300" : "bg-[#287f93] text-white"}`}
              >
                Previous
              </button>
              <span className="px-4 py-2">Page {page + 1} of {totalPages}</span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages - 1}
                className={`px-4 py-2 mx-2 rounded ${page === totalPages - 1 ? "bg-gray-300" : "bg-[#287f93] text-white"}`}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Progress;
