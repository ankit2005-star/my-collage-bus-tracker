import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const DEFAULT_AVATAR = "https://via.placeholder.com/150";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const storedPhoto = localStorage.getItem("profileImage");
  const [name, setName] = useState(user.displayName || "");
  const [photoURL, setPhotoURL] = useState(
    storedPhoto || user.photoURL || DEFAULT_AVATAR
  );
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

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
    setUploading(true);
    localStorage.setItem("profileName", name);
    localStorage.setItem("profileImage", photoURL);
    alert("Profile updated successfully!");
    setIsEditing(false);
    setUploading(false);
  };

  const handleRemoveProfilePicture = () => {
    if (!photoURL || photoURL === DEFAULT_AVATAR) {
      alert("No profile picture to remove.");
      return;
    }
    localStorage.removeItem("profileImage");
    setPhotoURL(DEFAULT_AVATAR);
    alert("Profile picture removed.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-b from-blue-50 to-blue-100">
      <Header />
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 text-center">
        <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-4 border-blue-500">
          <img
            src={photoURL}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <label
            htmlFor="fileInput"
            className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md cursor-pointer"
          >
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
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded-md w-full mt-2"
            placeholder="Enter new name"
          />
        ) : (
          <h2 className="text-xl font-bold">
            {name || user.displayName || "User"}
          </h2>
        )}
       
        <div className="mt-4 flex flex-col gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdateProfile}
                className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all"
                disabled={uploading}
              >
                {uploading ? "Updating..." : "Save Changes"}
              </button>
              <button
                onClick={handleRemoveProfilePicture}
                className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
              >
                Remove Profile Picture
              </button>
              
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
            >
              Edit Profile
            </button>
          )}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
