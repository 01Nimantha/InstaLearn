import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { studentAction } from "../store/studentSlice";
import { useState, useEffect } from "react";
import Button from "./Button";
import { parentAction } from "../store/parentSlice";

const ParentUploadParentDetailsCard = () => {
  // Local state to hold the form values
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pName, setPName] = useState("");
  const [pNumber, setPNumber] = useState("");

  // Select the first student object from the Redux store
  const student = useSelector((store) => store.parentreducer.parentArr[0]);
  const dispatch = useDispatch();


  // Set the initial form values when the student data is available
  useEffect(() => {
    if (student) {
      setID(student.Id);
      setName(student.Name);
      setEmail(student.Email);
      setNumber(student.Number);
      setAddress(student.Address);
      setPName(student.ParentName);
      setPNumber(student.ParentNumber);
    }
  }, [student]); // This effect runs every time the student data changes

  const fun = () => {
    dispatch(parentAction.updateparent([{
      Id: id,
      Name: name,
      Email: email,
      Number: number,
      Address: address,
      ParentName: pName,
      ParentNumber: pNumber
    }]));

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
    <div className="card" style={{ margin: "2%", padding: "2%", minWidth: "74vw", maxWidth: "74vw", backgroundColor: "#ffffff" }}>
      <div style={{ display: "flex", padding: "1%" }}>
        <div>
          <div style={{ marginBottom: "6.8%" }}>Index number :</div>
          <div style={{ marginBottom: "6.8%" }}>Your name :</div>
          <div style={{ marginBottom: "6.8%" }}>Email address :</div>
          <div style={{ marginBottom: "6.8%" }}>Your phone number :</div>
          <div style={{ marginBottom: "6.8%" }}>Address :</div>
          {/* <div style={{ marginBottom: "6.8%" }}>Parent name :</div>
          <div style={{ marginBottom: "6.8%" }}>Parent phone number :</div> */}
        </div>
        <div style={{ width: "48vw", marginLeft: "8vw" }}>
          <div>
            <input type="text" value={id} onChange={(e) => setID(e.target.value)} placeholder={student?.Id || "Index number"} style={{ width: "48vw", border: "2px #7B78D9 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} disabled />
          </div>
          <div>
            <input type="text" maxlength="13" value={name} onChange={(e) => setName(e.target.value)} placeholder={student?.Name || "Your name"} style={{ width: "48vw", border: "2px #7B78D9 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} />
          </div>
          <div style={{ display: "flex" }}>
            <MdEmail color="#7B78D9" size={25} style={{ marginTop: "0.5%", marginRight: "1%" }} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Let them type freely
              onBlur={() => {
                const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
                if (!isValidEmail && email !== "") {
                  alert("Please enter a valid email address.");
                }
              }}
              placeholder={student?.Email || "Email address"}
              style={{
                width: "46vw",
                border: "2px #7B78D9 solid",
                borderRadius: "5px",
                marginBottom: "1%",
                paddingLeft: "2%"
              }}
            />


          </div>
          <div style={{ display: "flex" }}>
            <BsFillTelephoneFill color="#7B78D9" size={22} style={{ marginTop: "0.5%", marginRight: "1%" }} />
            <input type="number" value={number} onChange={(e) => {// Allow only up to 10 digits
                            if (e.target.value.length <= 10) {
                              setNumber(e.target.value);
                            }
                          }}
              placeholder={student?.Number || "Your phone number"}
              style={{
                width: "46vw",
                border: "2px #7B78D9 solid",
                borderRadius: "5px",
                marginBottom: "1%",
                paddingLeft: "2%"
              }}
            />

          </div>
          <div>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={student?.Address || "Address"} style={{ width: "48vw", border: "2px #7B78D9 solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} />
          </div>
          {/* <div>
            <input type="text" value={pName} onChange={(e) => setPName(e.target.value)} placeholder={student?.ParentName || "Parent name"} style={{ width: "48vw", border: "2px #A4D9CF solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} />
          </div> */}
          {/* <div style={{ display: "flex" }}>
            <BsFillTelephoneFill color="#13A68A" size={22} style={{ marginTop: "0.5%", marginRight: "1%" }} />
            <input type="number" value={pNumber} onChange={(e) => setPNumber(e.target.value)} placeholder={student?.ParentNumber || "Parent phone number"} style={{ width: "46vw", border: "2px #A4D9CF solid", borderRadius: "5px", marginBottom: "1%", paddingLeft: "2%" }} />
          </div> */}
          <div style={{ marginLeft: "75%" }}>
            <Button name={"Update"} fontColor={"#ffffff"} backgroundColor={"#7B78D9"} action={fun} cornerRadius={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentUploadParentDetailsCard;
