import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

const Progress = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [marks, setMarks] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ Fetch marks from API
  useEffect(() => {
    fetchMarks();
  }, [page]); // Runs whenever page changes

  const fetchMarks = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/v1/excel/marks`, {
        params: { page, size: 5, studentId: searchTerm.trim() }, // Include studentId in API request
      });
  
      console.log("Fetched Data:", response.data.content);
      const processedMarks = groupMarks(response.data.content);
      console.log("Processed Data:", processedMarks);
  
      setMarks(processedMarks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching marks:", error);
      setMarks([]); // Set empty marks if API fails
    }
  };
  

  // ✅ Group marks by studentId & assign marks to the correct month
  const groupMarks = (marksList) => {
    const grouped = {};

    marksList.forEach(({ studentId, marks, month }) => {
      if (!grouped[studentId]) {
        grouped[studentId] = { studentId, january: "-", february: "-", march: "-", april: "-" };
      }

      const monthKey = month.toLowerCase(); // Normalize month name
      if (grouped[studentId].hasOwnProperty(monthKey)) {
        grouped[studentId][monthKey] = marks;
      }
    });

    return Object.values(grouped);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      fetchMarks(); // Fetch marks for entered studentId
    } else {
      alert("Please enter a Student ID");
    }
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

  return (
    <div className="d-flex">
      <div className="p-4 w-full">
        <h2 className="text-xl font-bold">Progress</h2>

        <div className="flex justify-between items-center">
          <div className="w-1/2 py-5 ml-5">
            {/* <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <button onClick={handleSearch} className="ml-2 bg-[#287f93] text-white py-2 px-4 rounded">Search</button> */}
            <input
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Enter Student ID"
  className="border px-4 py-2"
/>
<button onClick={handleSearch} className="ml-2 bg-[#287f93] text-white py-2 px-4 rounded">
  Search
</button>

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
      <tr
        key={studentId}
        className={`text-center ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#EBEBEB]"}`}
      >
        <td className="py-3 px-4">{studentId}</td>
        <td className="py-3 px-4">{january || "-"}</td>
        <td className="py-3 px-4">{february || "-"}</td>
        <td className="py-3 px-4">{march || "-"}</td>
        <td className="py-3 px-4">{april || "-"}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center py-4">No data available</td>
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
