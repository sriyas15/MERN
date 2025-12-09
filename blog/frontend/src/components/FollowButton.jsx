import { useFollowMutation } from "../features/auth/authApiSlice";
import toast from "react-hot-toast";
import { useState } from "react";

const FollowButton = ({ author, currentUser }) => {

  const [follow] = useFollowMutation();

  // Local UI update
  const isFollowingInitial = currentUser?.following?.includes(author?._id);
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);

  const handleFollow = async () => {
    try {
      setIsFollowing(!isFollowing);

      const result = await follow(author._id).unwrap();

      if (result.message === "Following") 
        toast.success(`Following ${author.name}`);
      else 
        toast.success(`Unfollowed ${author.name}`);

    } catch (error) {
      toast.error("Failed to follow");
    }
  };

  // Don’t show follow button for your own account
  if (currentUser?._id === author?._id) return null;

  return (
    <button
      className={`btn btn-sm ${isFollowing ? "btn-outline" : "btn-primary"}`}
      onClick={handleFollow}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
