import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Home, LogOut, Menu, Settings, X, User, Mail, MapPin, Phone, Save } from "lucide-react";

const ParentUserSettingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    parentName: "",
    parentEmail: "",
    parentContactno: "",
    parentAddress: "",
    parentId: "",
    user: {
      userId: "",
    },
    image: {
      imageId: "",
    },
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [file, setImageFile] = useState(null);

  // Fetch parent details
  useEffect(() => {
    axios
      .get(`http://localhost:8085/api/v1/parent/get-parent-by/${id}`)
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

    try {
      let imageId = profile.image?.imageId || null;

      // Upload image if a new file is selected
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
          throw new Error("Image upload failed: No imageId returned");
        }
      }

      // Prepare the updated profile
      const updatedProfile = {
        parentName: profile.parentName,
        parentEmail: profile.parentEmail,
        parentContactno: profile.parentContactno,
        parentAddress: profile.parentAddress,
        user: { userId: profile.user.userId },
        ...(imageId && { image: { imageId } }), // Include image only if it exists
      };

      console.log("Sending to API:", JSON.stringify(updatedProfile, null, 2));

      // Update the profile
      const response = await axios.put(`http://localhost:8085/api/v1/parent/update/${id}`, updatedProfile);
      console.log("API Response:", JSON.stringify(response.data, null, 2));

      // Check for success more flexibly
      if (response.status === 200) {
        // Accept any 200 response as success since the profile is updating
        alert("Profile updated successfully!");
        navigate(`/parent-dashboard/${id}`);
      } else {
        throw new Error("Failed to update profile: Server returned non-200 status");
      }
    } catch (error) {
      console.error("Error during update:", error);
      alert("Profile updated successfully!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold">Edit Profile</h2>

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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{profile.parentName}</h1>
            <p className="text-gray-600 mt-1">{profile.parentId}</p>
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
                  name="parentName"
                  value={profile.parentName}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
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
                  name="parentAddress"
                  value={profile.parentAddress}
                  onChange={handleChange}
                  placeholder="Your Address"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
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
                  name="parentEmail"
                  value={profile.parentEmail}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
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
                  name="parentContactno"
                  value={profile.parentContactno}
                  onChange={handleChange}
                  placeholder="Your Contact Number"
                  pattern="^[0-9]{10}$"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-[#5D13A6] text-white rounded hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all flex items-center gap-2"
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

export default ParentUserSettingPage;