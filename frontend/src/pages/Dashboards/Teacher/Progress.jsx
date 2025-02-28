import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

const Progress = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
};

const handleUpload = async (event) => {
  const formData = new FormData();
  formData.append("file", event.target.files[0]);

  try {
      const response = await fetch("http://localhost:8085/api/v1/excel/upload", {
          method: "POST",
          body: formData,
      });

      if (!response.ok) {
          throw new Error("Upload failed");
      }

      // Trigger success message if file is uploaded successfully
      alert("File uploaded successfully!");
  } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file: " + error.message);
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
            {/* Upload Excel Sheet */}
            <input type="file" onChange={handleUpload} />
{/* <button onClick={handleUpload}></button> */}

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
