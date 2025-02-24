import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

const Progress = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      await handleUpload(selectedFile);
    }
  };

  const handleUpload = async (selectedFile) => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
      const response = await axios.post("http://localhost:8085/api/v1/excel/upload", formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });
      console.log("Upload Response:", response);
      alert("File uploaded successfully!");
  } catch (error) {
      console.error("Error uploading file:", error.response?.data || error.message);
      alert("Upload failed! Check console for details.");
  }
};

  return (
    <div className="d-flex">
      <div className="p-4 w-full">
        <h2 className="text-xl font-bold">Progress</h2>

        <div className="d-flex justify-between items-center w-full py-5 ml-5">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* Single button for choosing and uploading file */}
          <label className="cursor-pointer bg-[#287f93] text-white py-2 px-4 rounded">
            Upload Excel Sheet
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <section>
          <table
            className="shadow mt-10"
            style={{
              margin: "2%",
              padding: "2%",
              minWidth: "74vw",
              maxWidth: "74vw",
              backgroundColor: "#ffffff",
            }}
          >
            <thead className="bg-[#EBEBEB] h-16">
              <tr className="text-center">
                <th>Student Id</th>
                <th>January</th>
                <th>February</th>
                <th>March</th>
                <th>April</th>
              </tr>
            </thead>
            <tbody className="bg-[#ffffff] h-16">
              <tr className="text-center">
                <th>ST000001</th>
                <th>85</th>
                <th>78</th>
                <th>67</th>
                <th>80</th>
              </tr>
            </tbody>

            <tbody className="bg-[#EBEBEB] h-16">
              <tr className="text-center">
                <th>ST000002</th>
                <th>95</th>
                <th>78</th>
                <th>67</th>
                <th>80</th>
              </tr>
            </tbody>

            <tbody className="bg-[#ffffff] h-16">
              <tr className="text-center">
                <th>ST000003</th>
                <th>85</th>
                <th>78</th>
                <th>67</th>
                <th>80</th>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Progress;
