import { useState, useEffect } from "react";
import { Camera,User,Mail,Shield,Users,Eye,EyeOff,Edit } from "lucide-react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetProfileQuery,useUpdateUserMutation } from "../features/auth/authApiSlice";
import defaultAvatar from "../assets/defaultAvatar.png"

const UserProfileUpdate = () => {
  const { data: getProfile, isLoading: profileLoading } = useGetProfileQuery();
  const { state } = useLocation();

  // Logged-in user stored in localStorage
  const localUser = JSON.parse(localStorage.getItem("user"));

  // Ensure UI reads from backend fetched user (NOT localStorage)
  const initialUser = state?.userDetails || localUser;

  const [profileUser, setProfileUser] = useState(initialUser);
  const [editBtn, setEditBtn] = useState(false);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  // Editable fields
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Load data from backend into form fields
  useEffect(() => {
    if (getProfile?.user) {
      setName(getProfile.user.name);
      setUsername(getProfile.user.username);
      setEmail(getProfile.user.email);
      setProfileUser(getProfile.user);
    }
  }, [getProfile]);

  const isOwner = localUser?._id === getProfile?.user?._id;

  const avatarPreview = avatar ? URL.createObjectURL(avatar) : getProfile?.user?.avatar?.url || defaultAvatar;

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!name.trim() || !username.trim() || !email.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    
    if (password.trim()) formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);

    try {
      const res = await updateUser({
        userId: getProfile?.user?._id,
        formData,
      }).unwrap();

      localStorage.setItem("user", JSON.stringify(res.updatedUser));

      setProfileUser(res.updatedUser);
      setAvatar(null);
      setEditBtn(false);

      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  if (profileLoading || !getProfile)
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading profile...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-base-200 rounded-2xl shadow-lg">
      {/* PROFILE HEADER */}
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <img
            src={avatarPreview}
            alt="avatar"
            className="w-full h-full object-cover rounded-full border-4 border-primary shadow-md"
          />

          {isOwner && (
            <label className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full cursor-pointer shadow-md hover:scale-105 transition">
              <Camera size={18} />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </label>
          )}
        </div>

        <h1 className="text-2xl font-bold mt-4">{profileUser?.name}</h1>
        <p className="text-sm text-gray-500">@{profileUser?.username}</p>
      </div>

      {/* EDIT FORM */}
      {isOwner && (
        <div className="relative mt-10 bg-base-100 p-6 rounded-xl shadow space-y-4">
          <button
            className="absolute right-5"
            onClick={() => {
              if (!window.confirm("Edit your profile?")) return;
              setEditBtn(!editBtn);
            }}
          >
            <Edit />
          </button>

          <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

          {/* Name */}
          <label className="form-control">
            <span className="label-text font-semibold">Name</span>
            <div className="input input-bordered flex items-center gap-2">
              <User size={18} />
              <input
                type="text"
                className="grow"
                value={name}
                disabled={!editBtn}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </label>

          {/* Username */}
          <label className="form-control">
            <span className="label-text font-semibold">Username</span>
            <div className="input input-bordered flex items-center gap-2">
              <User size={18} />
              <input
                type="text"
                className="grow"
                value={username}
                disabled={!editBtn}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </label>

          {/* Email */}
          <label className="form-control">
            <span className="label-text font-semibold">Email</span>
            <div className="input input-bordered flex items-center gap-2">
              <Mail size={18} />
              <input
                type="email"
                className="grow"
                value={email}
                disabled={!editBtn}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>

          {/* Role */}
          <label className="form-control">
            <span className="label-text font-semibold">Role</span>
            <div className="input input-bordered flex items-center gap-2 bg-base-200">
              <Shield size={18} />
              <input
                type="text"
                className="grow"
                value={profileUser?.isAdmin ? "Admin" : "Normal User"}
                disabled
              />
            </div>
          </label>

          {/* Password */}
          <label className="form-control">
            <span className="label-text font-semibold">New Password</span>
            <div className="input input-bordered flex items-center gap-2">
              {showPassword ? (
                <EyeOff
                  size={18}
                  className="cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  size={18}
                  className="cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}

              <input
                type={showPassword ? "text" : "password"}
                className="grow"
                value={password}
                disabled={!editBtn}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
          </label>

          <button
            className="btn btn-primary w-full mt-4"
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading || !editBtn}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileUpdate;
