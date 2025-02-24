import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const DEFAULT_AVATAR = "https://via.placeholder.com/150";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!user) {
    navigate("/login");
    return null;
  }

  // If there's a profile image in localStorage, use it; otherwise, fallback to user.photoURL or default
  const storedPhoto = localStorage.getItem("profileImage");
  const [name, setName] = useState(user.displayName || "");
  const [photoURL, setPhotoURL] = useState(
    storedPhoto || user.photoURL || DEFAULT_AVATAR
  );
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Convert file to Base64 and store it in localStorage
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      localStorage.setItem("profileImage", dataUrl);
      setPhotoURL(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = () => {
    try {
      setUploading(true);

      // Use the stored data URL (if available) for updating the profile
      const newPhotoURL = photoURL; // Already updated from localStorage via handleImageChange

      // Save the new name and photo URL to localStorage
      localStorage.setItem("profileName", name);
      localStorage.setItem("profileImage", newPhotoURL);

      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Failed to update profile.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveProfilePicture = () => {
    try {
      if (!photoURL || photoURL === DEFAULT_AVATAR) {
        alert("No profile picture to remove.");
        return;
      }

      // Remove from localStorage and update state
      localStorage.removeItem("profileImage");
      setPhotoURL(DEFAULT_AVATAR);

      alert("Profile picture removed.");
    } catch (error) {
      console.error("Error removing profile picture:", error.message);
      alert("Failed to remove profile picture.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Header />
      <h1 className="text-3xl font-bold">Profile Page</h1>
      {user ? (
        <div className="mt-4 p-6 bg-white shadow-md rounded-lg text-center">
          <div
            className="relative w-24 h-24 mx-auto mb-3"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <img
              src={photoURL}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2" // Change from stroke-width to strokeWidth
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
          {isEditing ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded-md w-full mt-2"
                placeholder="Enter new name"
              />
              <input
                type="file"
                id="fileInput"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                onClick={handleUpdateProfile}
                className={`mt-4 px-6 py-2 rounded-md text-white ${
                  uploading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                }`}
                disabled={uploading}
              >
                {uploading ? "Updating..." : "Save Changes"}
              </button>
              <button
                onClick={handleRemoveProfilePicture}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Remove Profile Picture
              </button>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold">
                {name || user.displayName || "User"}
              </p>
              <p className="text-gray-600">{user.email}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </>
          )}
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-lg text-red-500">User not logged in</p>
      )}
    </div>
  );
};

export default ProfilePage;
