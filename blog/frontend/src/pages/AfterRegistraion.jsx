import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../features/auth/authApiSlice";
import toast from "react-hot-toast";

const AfterRegistration = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");
  const [bio, setBio] = useState("");

  const navigate = useNavigate();

  const isDisabled = !bio

  const [ updateUser,{isLoading} ] = useUpdateUserMutation();

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const userId = user?._id;

  const handleImageChange = (e) => {
    const file = e.target?.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(!bio.trim()){
      toast.error("Please add your bio");
      return;
    }

    const formData = new FormData();
    formData.append("bio",bio);
    if(profilePic) formData.append("avatar",profilePic)

    try {

      await updateUser({ userId:userId ,formData}).unwrap();
      toast.success("Profile Updated");
      navigate("/feeds");

    } catch (error) {
      console.log("Error in update profile ",error);
      toast.error(error?.data?.message || "Error in updating profile");
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-sm bg-base-100 shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-primary">
          Complete Your Profile
        </h2>

        <div className="flex flex-col items-center mb-4">
          <div className="avatar mb-3">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={preview || "https://avatar.iran.liara.run/public/boy"}
                alt="Preview"
              />
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />
        </div>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Bio</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Tell something about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </label>

        <button className="btn btn-primary w-full mt-5" 
          type="submit" disabled={isLoading || isDisabled}>
          {isLoading ? "Saving..." : "Save & Continue"}
        </button>

        {/* ✅ Skip button */}
        <button
          type="button"
          className="btn btn-ghost w-full mt-2"
          onClick={() => navigate("/")}
        >
          Skip for now →
        </button>
      </form>
    </div>
  );
};

export default AfterRegistration;
