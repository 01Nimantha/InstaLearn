import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, MapPin, Phone, Save } from "lucide-react";

const UserSettingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    studentName: "",
    studentEmail: "",
    studentContactno: "",
    studentAddress: "",
    studentId: "",
    user: { userId: "" },
    classTypes: { classTypeId: "" },
    image: { imageId: "" },
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [file, setImageFile] = useState(null);

  // Fetch student details
  useEffect(() => {
    axios
      .get(`http://localhost:8085/api/v1/student/get-student-by/${id}`)
      .then((response) => {
        setProfile(response.data);
        if (response.data.image?.imageId) {
          setImagePreview(`http://localhost:8085/api/v1/image/get-image/${response.data.image.imageId}`);
        }
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageId = profile.image?.imageId || "";

    // Upload image if selected
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const imageResponse = await axios.post(
        `http://localhost:8085/api/v1/image/save/${profile.user.userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      imageId = imageResponse.data.imageId || imageId; // Use existing ID if upload fails
    }

    // Prepare updated profile
    const updatedProfile = {
      studentName: profile.studentName,
      studentEmail: profile.studentEmail,
      studentContactno: profile.studentContactno,
      studentAddress: profile.studentAddress,
      image: { imageId },
    };

    // Update profile
    await axios.put(`http://localhost:8085/api/v1/student/update/${id}`, updatedProfile)
      .then(() => {
        alert("Profile updated successfully!");
        navigate(`/student-dashboard/${id}`);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Profile updated successfully!");
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 p-6">
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-6">Edit Profile</h2>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8 p-6 bg-white rounded-xl shadow-md">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="imageInput"
            />
            <img
              src={imagePreview || "https://th.bing.com/th/id/OIP.ZMB81W_uLDsEIxaMWxDljAHaHa?rs=1&pid=ImgDetMain"}
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg cursor-pointer"
              onClick={() => document.getElementById("imageInput").click()}
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{profile.studentName}</h1>
            <p className="text-gray-600 mt-1">{profile.studentId}</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="studentName"
                  value={profile.studentName}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="studentAddress"
                  value={profile.studentAddress}
                  onChange={handleChange}
                  placeholder="Your Address"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-500" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="studentEmail"
                  value={profile.studentEmail}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Contact No */}
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-500" />
                  Contact No
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="studentContactno"
                  value={profile.studentContactno}
                  onChange={handleChange}
                  placeholder="Your Contact Number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-[#6dce99] text-white rounded hover:bg-[#78D9C6] flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSettingPage;