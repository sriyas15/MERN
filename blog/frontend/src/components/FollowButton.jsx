import { useFollowMutation } from "../features/auth/authApiSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const FollowButton = ({ author, currentUser }) => {

  const [follow] = useFollowMutation();

  // Local UI update
  const isFollowingInitial = currentUser?.following?.some((user) => user._id === author?._id);
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);

  useEffect(() => {
    setIsFollowing(isFollowingInitial);
  }, [isFollowingInitial]);

  const handleFollow = async () => {
    setIsFollowing(!isFollowing); // optimistic update
    try {
      const result = await follow(author?._id).unwrap();
      toast.success(result?.message === "Following"
        ? `Following ${author?.name}`
        : `Unfollowed ${author?.name}`
      );
    } catch (error) {
      setIsFollowing(isFollowing); // revert on failure
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
