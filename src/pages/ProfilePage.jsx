import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DEFAULT_AVATAR = "https://via.placeholder.com/150";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const storedPhoto = localStorage.getItem("profileImage");
  const storedName =
    localStorage.getItem("profileName") || user?.displayName || "User";

  const [name, setName] = useState(storedName);
  const [photoURL, setPhotoURL] = useState(
    storedPhoto || user?.photoURL || DEFAULT_AVATAR
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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-b from-[#1e293b] to-[#334155] text-white">
      <div className="w-full max-w-md bg-[#1e293b] shadow-lg rounded-lg p-6 text-center border border-[#64748b]">
        {/* Profile Picture */}
        <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#0ea5e9]">
          <img
            src={photoURL}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <label
            htmlFor="fileInput"
            className="absolute bottom-1 right-1 bg-[#0ea5e9] p-2 rounded-full shadow-md cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
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

        {/* Name Input */}
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-[#64748b] p-2 rounded-md w-full bg-[#334155] text-white"
            placeholder="Enter new name"
          />
        ) : (
          <h2 className="text-xl font-semibold">{name}</h2>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdateProfile}
                className="w-full px-4 py-2 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7] transition-all"
                disabled={uploading}
              >
                {uploading ? "Updating..." : "Save Changes"}
              </button>
              <button
                onClick={handleRemoveProfilePicture}
                className="w-full px-4 py-2 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-all"
              >
                Remove Profile Picture
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full px-4 py-2 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7] transition-all"
              >
                Edit Profile
              </button>

              {/* ✅ New "Change Language" button added below "Edit Profile" */}
              <button
                onClick={() => console.log("Change Language Clicked")}
                className="w-full px-4 py-2 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7] transition-all"
              >
                Change Language
              </button>
            </>
          )}

          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
