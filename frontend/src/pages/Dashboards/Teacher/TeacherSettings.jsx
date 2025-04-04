import React, { useRef, useState, useEffect } from "react";
import { RiFolderUploadFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import axios from "axios";
import Button from "../../../components/Button";
import { useParams } from "react-router-dom";

const TeacherSettings = () => {
  const fileInputRef = useRef(null);
  const [teacherId, setTeacherId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { id } = useParams();

  // Fetch teacher details
  useEffect(() => {
    const fetchTeacherData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8085/api/v1/teacher/get-teacher-by/${id}`);
        const teacher = response.data;
        
        setTeacherId(teacher.teacherId || "");
        setName(teacher.teacherName || "");
        setEmail(teacher.teacherEmail || "");
        setNumber(teacher.teacherContactno || "");
        setAddress(teacher.teacherAddress || "");
        
        if (teacher.image?.imageUrl) {
          setImagePreview(teacher.image.imageUrl);
        } else if (teacher.teacherPhoto) {
          const base64String = btoa(
            new Uint8Array(teacher.teacherPhoto).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          setImagePreview(`data:image/jpeg;base64,${base64String}`);
        }
      } catch (error) {
        console.error("Error fetching teacher details:", error);
        alert("Failed to load teacher data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeacherData();
  }, [id]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("teacherName", name);
      formData.append("teacherEmail", email);
      formData.append("teacherContactno", number);
      formData.append("teacherAddress", address);
      if (image) {
        formData.append("teacherPhoto", image);
      }
  
      const response = await axios.put(
        `http://localhost:8085/api/v1/teacher/update/${teacherId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Update successful:", response.data);
      alert("Profile updated successfully!");
      // Optionally, navigate back to the dashboard after update
      // window.location.href = `/teacher-dashboard/${teacherId}`;
    } catch (error) {
      console.error("Update error:", error);
      if (error.response) {
        alert(`Error ${error.response.status}: ${error.response.data.message || 'Update failed'}`);
      } else {
        alert("Network error: Unable to update profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Image Upload Section */}
      <div className="card shadow-md" style={{ padding: "2rem", backgroundColor: "#ffffff" }}>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="text-[#287f93]">
            <h3 className="text-lg font-semibold mb-2">Upload your photo</h3>
            <p className="text-sm">Try to upload a photo without background (optional)</p>
            <RiFolderUploadFill 
              onClick={handleButtonClick} 
              className="mt-4 cursor-pointer" 
              size={30} 
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="rounded-lg object-cover"
              style={{ maxHeight: "300px", maxWidth: "100%" }}
            />
          )}
        </div>
      </div>

      {/* Teacher Info Form */}
      <div className="card shadow-md mt-6" style={{ padding: "2rem", backgroundColor: "#ffffff" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
          <div style={{ marginBottom: "6.8%" }}>Index number :</div>
          <div style={{ marginBottom: "6.8%" }}>Your name :</div>
          <div style={{ marginBottom: "6.8%" }}>Email address :</div>
          <div style={{ marginBottom: "6.8%" }}>Your phone number :</div>
          <div style={{ marginBottom: "6.8%" }}>Address :</div>
          </div>
          <div style={{ width: "48vw", marginLeft: "-15vw" }}>
            <input
              type="text"
              value={teacherId}
              disabled
              className="w-full p-2 border-2 border-[#287f93] rounded-md bg-gray-100"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full p-2 border-2 border-[#287f93] rounded-md"
            />
            <div className="flex items-center gap-2">
              <MdEmail color="#287f93" size={25} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full p-2 border-2 border-[#287f93] rounded-md"
              />
            </div>
            <div className="flex items-center gap-2">
              <BsFillTelephoneFill color="#287f93" size={22} />
              <input
                type="tel"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Your phone number"
                className="w-full p-2 border-2 border-[#287f93] rounded-md"
              />
            </div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="w-full p-2 border-2 border-[#287f93] rounded-md"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            name={isLoading ? "Updating..." : "Update"}
            fontColor="#ffffff"
            backgroundColor="#287f93"
            action={handleUpdate}
            cornerRadius={false}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherSettings;