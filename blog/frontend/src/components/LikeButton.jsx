import { Heart } from "lucide-react";
import { useToggleLikeMutation } from "../features/blog/blogApiSlice";
import { useState } from "react";
import toast from "react-hot-toast";

const LikeButton = ({ blogId, initialLikes, userId }) => {

  const [likes, setLikes] = useState(initialLikes);
  const [toggleLike] = useToggleLikeMutation();

  const isLiked = likes.includes(userId);

  const handleLike = async () => {
    try {
      if (isLiked) {
        setLikes(likes.filter(uid => uid !== userId));
      } else {
        setLikes([...likes, userId]);
      }

      await toggleLike(blogId).unwrap();

    } catch (err) {
      toast.error("Like failed");
    }
  };

  return (
    <button
      onClick={handleLike}
      className="btn btn-ghost btn-sm flex items-center gap-1"
    >
      <Heart size={18} fill={isLiked ? "red" : "none"} strokeWidth={2}/>
      {likes.length}
    </button>
  );
};

export default LikeButton;
