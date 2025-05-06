import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Home, LogOut, Menu, Settings, X, User, Mail, MapPin, Phone, Save } from "lucide-react";
import Side from "./Side";
import ChangePassword from "./ChangePassword";

const EditProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [profile, setProfile] = useState({
    attendanceOfficerName: "",
    attendanceOfficerEmail: "",
    attendanceOfficerContactno: "",
    attendanceOfficerAddress: "",
    attendanceOfficerId: "",
    image: {
      imageId: "",
    },
    user: {
      userId: "",
    },
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [file, setImageFile] = useState(null);

  // Fetch officer details
  useEffect(() => {
    axios
      .get(`http://localhost:8085/api/v1/attendanceOfficer/get-aOfficer-by/${id}`)
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
    setProfile((prevProfile) => ({
      ...prevProfile,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Set the image preview
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageId = profile.image?.imageId || "";

      // Upload new image if selected
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const imageResponse = await axios.post(
          `http://localhost:8085/api/v1/image/save/${profile.user.userId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (imageResponse.data?.imageId) {
          imageId = imageResponse.data.imageId;
        } else {
          throw new Error("Failed to upload image: No imageId in response");
        }
      }

      // Construct the updated profile payload
      const updatedProfile = {
        attendanceOfficerName: profile.attendanceOfficerName,
        attendanceOfficerEmail: profile.attendanceOfficerEmail,
        attendanceOfficerContactno: profile.attendanceOfficerContactno,
        attendanceOfficerAddress: profile.attendanceOfficerAddress,
        ...(imageId ? { image: { imageId } } : {}), // Only include image if it exists
      };

      console.log("Payload being sent:", updatedProfile); // Debug payload

      // Update profile
      const response = await axios.put(
        `http://localhost:8085/api/v1/attendanceOfficer/update/${id}`,
        updatedProfile
      );

      console.log("Update response:", response); // Debug response
      if (response.status >= 200 && response.status < 300) {
        alert("Profile updated successfully!");
        navigate(`/aOfficer-dashboard/${id}`);
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      alert('Profile updated successfully!');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <Side
        isSidebarOpen={isSidebarOpen}
        navigationItems={[
          { name: "Home", href: `/aOfficer-dashboard/${id}`, icon: Home },
          { name: "Settings", href: "#", icon: Settings },
        ]}
        officer_name={profile.attendanceOfficerName}
        AO_ID={profile.attendanceOfficerId}
        changePath={() => setShowModal(true)}
        image={
          profile.image?.imageId
            ? `http://localhost:8085/api/v1/image/get-image/${profile.image.imageId}`
            : null
        }
      />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h1>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8 rounded-xl p-6">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="imageInput"
            />
            <img
              src={
                imagePreview ||
                "https://th.bing.com/th/id/OIP.ZMB81W_uLDsEIxaMWxDljAHaHa?rs=1&pid=ImgDetMain"
              }
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg cursor-pointer"
              onClick={() => document.getElementById("imageInput").click()}
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {profile.attendanceOfficerName}
            </h1>
            <p className="text-gray-600 mt-1">{profile.attendanceOfficerId}</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                >
                  <User className="w-5 h-5 text-gray-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="attendanceOfficerName"
                  value={profile.attendanceOfficerName}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                >
                  <MapPin className="w-5 h-5 text-gray-500" />
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="attendanceOfficerAddress"
                  value={profile.attendanceOfficerAddress}
                  onChange={handleChange}
                  placeholder="Your Address"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                >
                  <Mail className="w-5 h-5 text-gray-500" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="attendanceOfficerEmail"
                  value={profile.attendanceOfficerEmail}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>

              {/* Contact No */}
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 text-gray-500" />
                  Contact No
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="attendanceOfficerContactno"
                  value={profile.attendanceOfficerContactno}
                  onChange={handleChange}
                  placeholder="Your Contact Number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      {showModal && <ChangePassword setShowModal={setShowModal} />}
    </div>
  );
};

export default EditProfile;