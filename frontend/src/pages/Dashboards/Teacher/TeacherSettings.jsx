import React, { useRef, useState, useEffect } from "react";
import { RiFolderUploadFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import axios from "axios";
import Button from "../../../components/Button";

const TeacherSettings = () => {
  const fileInputRef = useRef(null);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null); // Store image file
  const [imagePreview, setImagePreview] = useState(null); // Store image preview URL

  const teacherId = "1"; // Change this to dynamic ID

  // Fetch teacher details from backend
  useEffect(() => {
    axios
      .get(`http://localhost:8085/api/v1/teacher/get-teacher-by/${teacherId}`)
      .then((response) => {
        const teacher = response.data;
        setID(teacher.id);
        setName(teacher.name);
        setEmail(teacher.email);
        setNumber(teacher.number);
        setAddress(teacher.address);
        setImagePreview(teacher.imageUrl); // Assuming backend stores image URL
      })
      .catch((error) => console.error("Error fetching teacher details:", error));
  }, [teacherId]);

  // Handle file selection
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Update teacher details
  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("teacherName", name);
    formData.append("teacherEmail", email);
    formData.append("teacherContactno", number);
    formData.append("teacherAddress", address);
  
    if (image) {
      formData.append("teacherPhoto", image); // Append only if an image is selected
    }
  
    axios
      .put(`http://localhost:8085/api/v1/teacher/update/${teacherId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => alert("Teacher details updated successfully!"))
      .catch((error) => console.error("Error updating teacher details:", error));
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
                <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange} />
              </div>
            </div>
            <div>Try to upload a photo without background (not compulsory)</div>
          </div>
          <div style={{ marginLeft: "8vw", width: "30vw", height: "40vh" }}>
            {imagePreview && <img src={imagePreview} className="img-fluid rounded-start" alt="Uploaded Preview" style={{ minHeight: "40vh", maxHeight: "40vh", maxWidth: "50vw" }} />}
          </div>
        </div>
      </div>

      {/* Teacher Info Form */}
      <div className="card" style={{ margin: "2%", padding: "2%", minWidth: "74vw", backgroundColor: "#ffffff" }}>
        <div style={{ display: "flex", padding: "1%" }}>
          <div>
            <div style={{ marginBottom: "6.8%" }}>Index number :</div>
            <div style={{ marginBottom: "6.8%" }}>Your name :</div>
            <div style={{ marginBottom: "6.8%" }}>Email address :</div>
            <div style={{ marginBottom: "6.8%" }}>Your phone number :</div>
            <div style={{ marginBottom: "6.8%" }}>Address :</div>
          </div>
          <div style={{ width: "48vw", marginLeft: "8vw" }}>
            <input type="text" value={id} onChange={(e) => setID(e.target.value)} placeholder="Index number" style={{ width: "48vw", border: "2px #287f93 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} disabled />
            <input type="text" maxLength="13" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={{ width: "48vw", border: "2px #287f93 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} />
            <div style={{ display: "flex" }}>
              <MdEmail color="#287f93" size={25} style={{ marginTop: "0.5%", marginRight: "1%" }} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" style={{ width: "46vw", border: "2px #287f93 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} />
            </div>
            <div style={{ display: "flex" }}>
              <BsFillTelephoneFill color="#287f93" size={22} style={{ marginTop: "0.5%", marginRight: "1%" }} />
              <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Your phone number" style={{ width: "46vw", border: "2px #287f93 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} />
            </div>
            <div>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" style={{ width: "48vw", border: "2px #287f93 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} />
            </div>
            <div style={{ marginLeft: "75%" }}>
              <Button name="Update" fontColor="#ffffff" backgroundColor="#287f93" action={handleUpdate} cornerRadius={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSettings;
