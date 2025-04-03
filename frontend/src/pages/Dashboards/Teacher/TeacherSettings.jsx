import React, { useRef, useState, useEffect } from "react";
import { RiFolderUploadFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import axios from "axios";
import Button from "../../../components/Button";

const TeacherSettings = () => {
  const fileInputRef = useRef(null);
  const [teacherId, setTeacherId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch teacher details from backend
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/v1/teacher/get-teacher-by/${teacherId}`);
        const teacher = response.data;
        
        setTeacherId(teacher.teacherId);
        setName(teacher.teacherName);
        setEmail(teacher.teacherEmail);
        setNumber(teacher.teacherContactno);
        setAddress(teacher.teacherAddress);
        
        // Handle image preview
        if (teacher.image?.imageUrl) {
          setImagePreview(teacher.image.imageUrl);
        } else if (teacher.teacherPhoto) {
          // Convert byte array to image URL if using byte[] storage
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
      }
    };

    if (teacherId) {
      fetchTeacherData();
    }
  }, [teacherId]);

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
        `http://localhost:8085/api/v1/teacher/update/TH_2025_00001`,
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Full response:", response);
      alert("Update successful!");
    } catch (error) {
      console.error("Full error:", error);
      console.error("Error response:", error.response);
      
      if (error.response) {
        alert(`Error ${error.response.status}: ${error.response.data.message || 'Update failed'}`);
      } else if (error.request) {
        alert("No response received from server. Check network connection.");
      } else {
        alert("Error setting up request: " + error.message);
      }
    }
  };

  return (
    <div>
      {/* Image Upload Section */}
      <div className="card" style={{ margin: "2%", padding: "2%", minWidth: "74vw", backgroundColor: "#ffffff" }}>
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "5vw", color: "#287f93" }}>
            <div style={{ display: "flex" }}>
              <div>Upload your photo</div>
              <div style={{ marginLeft: "8vw" }}>
                <RiFolderUploadFill onClick={handleButtonClick} color="#287f93" size={30} />
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: "none" }} 
                  accept="image/*" 
                  onChange={handleFileChange} 
                />
              </div>
            </div>
            <div>Try to upload a photo without background (not compulsory)</div>
          </div>
          <div style={{ marginLeft: "8vw", width: "30vw", height: "40vh" }}>
            {imagePreview && (
              <img 
                src={imagePreview} 
                className="img-fluid rounded-start" 
                alt="Uploaded Preview" 
                style={{ minHeight: "40vh", maxHeight: "40vh", maxWidth: "50vw" }} 
              />
            )}
          </div>
        </div>
      </div>

      {/* Teacher Info Form */}
      <div className="card" style={{ margin: "2%", padding: "2%", minWidth: "74vw", backgroundColor: "#ffffff" }}>
        <div style={{ display: "flex", padding: "1%" }}>
          <div>
            <div style={{ marginBottom: "6.8%" }}>Teacher ID :</div>
            <div style={{ marginBottom: "6.8%" }}>Your name :</div>
            <div style={{ marginBottom: "6.8%" }}>Email address :</div>
            <div style={{ marginBottom: "6.8%" }}>Your phone number :</div>
            <div style={{ marginBottom: "6.8%" }}>Address :</div>
          </div>
          <div style={{ width: "48vw", marginLeft: "8vw" }}>
            <input 
              type="text" 
              value={teacherId} 
              placeholder="Teacher ID" 
              style={{ width: "48vw", border: "2px #287f93 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} 
              disabled 
            />
            <input 
              type="text" 
              maxLength="13" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Your name" 
              style={{ width: "48vw", border: "2px #287f93 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} 
            />
            <div style={{ display: "flex" }}>
              <MdEmail color="#287f93" size={25} style={{ marginTop: "0.5%", marginRight: "1%" }} />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email address" 
                style={{ width: "46vw", border: "2px #287f93 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} 
              />
            </div>
            <div style={{ display: "flex" }}>
              <BsFillTelephoneFill color="#287f93" size={22} style={{ marginTop: "0.5%", marginRight: "1%" }} />
              <input 
                type="tel" 
                value={number} 
                onChange={(e) => setNumber(e.target.value)} 
                placeholder="Your phone number" 
                style={{ width: "46vw", border: "2px #287f93 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} 
              />
            </div>
            <div>
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="Address" 
                style={{ width: "48vw", border: "2px #287f93 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} 
              />
            </div>
            <div style={{ marginLeft: "75%" }}>
              <Button 
                name="Update" 
                fontColor="#ffffff" 
                backgroundColor="#287f93" 
                action={handleUpdate} 
                cornerRadius={false} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSettings;