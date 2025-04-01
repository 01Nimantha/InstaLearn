import React, { useRef, useState, useEffect } from "react";
import { RiFolderUploadFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { imageAction } from "../../../store/imageSlice";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { studentAction } from "../../../store/studentSlice";
import Button from "../../../components/Button";

const TeacherSettings = () => {
  const ImgURL = useSelector((store) => store.imagereducer.imagePath);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger hidden input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(imageAction.addImage(URL.createObjectURL(file)));
    }
  };

  // Local state to hold the form values
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  // Select the first student object from the Redux store
  const student = useSelector((store) => store.studentreducer.studentArr[0]);

  // Set the initial form values when the student data is available
  useEffect(() => {
    if (student) {
      setID(student.Id);
      setName(student.Name);
      setEmail(student.Email);
      setNumber(student.Number);
      setAddress(student.Address);
    }
  }, [student]); // This effect runs every time the student data changes

  const fun = () => {
    dispatch(
      studentAction.updateStudent([
        {
          Id: id,
          Name: name,
          Email: email,
          Number: number,
          Address: address,
          ParentName: pName,
          ParentNumber: pNumber,
        },
      ])
    );

    // Reset form fields after dispatching the action
    setID("");
    setName("");
    setEmail("");
    setNumber("");
    setAddress("");
    setPName("");
    setPNumber("");
  };

  return (
    <div>
      <div className="card" style={{ margin: "2%", padding: "2%", minWidth: "74vw", maxWidth: "74vw", backgroundColor: "#ffffff" }}>
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "5vw", color: "#287f93" }}>
            <div style={{ display: "flex" }}>
              <div>Upload your photo</div>
              <div style={{ marginLeft: "8vw" }}>
                <RiFolderUploadFill onClick={handleButtonClick} color="#287f93" size={30} />
                <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange} />
              </div>
            </div>
            <div>{ImgURL}</div>
            <div>Try to upload a photo without background (not compulsory)</div>
          </div>
          <div style={{ marginLeft: "8vw", width: "30vw", height: "40vh" }}>
            <img src={ImgURL} className="img-fluid rounded-start" alt="Uploaded Preview" style={{ minHeight: "40vh", maxHeight: "40vh", maxWidth: "50vw" }} />
          </div>
        </div>
      </div>

      <div className="card" style={{ margin: "2%", padding: "2%", minWidth: "74vw", maxWidth: "74vw", backgroundColor: "#ffffff" }}>
        <div style={{ display: "flex", padding: "1%" }}>
          <div>
            <div style={{ marginBottom: "6.8%" }}>Index number :</div>
            <div style={{ marginBottom: "6.8%" }}>Your name :</div>
            <div style={{ marginBottom: "6.8%" }}>Email address :</div>
            <div style={{ marginBottom: "6.8%" }}>Your phone number :</div>
            <div style={{ marginBottom: "6.8%" }}>Address :</div>
          </div>
          <div style={{ width: "48vw", marginLeft: "8vw" }}>
            <input type="text" value={id} onChange={(e) => setID(e.target.value)} placeholder={student?.Id || "Index number"} style={{ width: "48vw", border: "2px #287f93 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} disabled />
            <input type="text" maxLength="13" value={name} onChange={(e) => setName(e.target.value)} placeholder={student?.Name || "Your name"} style={{ width: "48vw", border: "2px #287f93 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} />
            <div style={{ display: "flex" }}>
              <MdEmail color="#287f93" size={25} style={{ marginTop: "0.5%", marginRight: "1%" }} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={student?.Email || "Email address"} style={{ width: "46vw", border: "2px #287f93 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} />
            </div>
            <div style={{ display: "flex" }}>
            <BsFillTelephoneFill color="#287f93" size={22} style={{ marginTop: "0.5%", marginRight: "1%" }} />
            <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder={student?.Number || "Your phone number"} style={{ width: "46vw", border: "2px #287f93 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} />
          </div>
          <div>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={student?.Address || "Address"} style={{ width: "48vw", border: "2px #287f93 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} />
          </div>
            <div style={{ marginLeft: "75%" }}>
              <Button name="Update" fontColor="#ffffff" backgroundColor="#287f93" action={fun} cornerRadius={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSettings;
