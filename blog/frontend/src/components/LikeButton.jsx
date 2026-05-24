import { Heart } from "lucide-react";
import { useToggleLikeMutation } from "../features/blog/blogApiSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const LikeButton = ({ blogId, initialLikes, userId }) => {

  const [likes, setLikes] = useState(initialLikes);
  const [toggleLike] = useToggleLikeMutation();

  const isLiked = likes.some((id)=>id._id === userId)

  const handleLike = async () => {
    try {
      if (isLiked) {
        setLikes(likes.filter(uid => uid._id !== userId));
      } else {
        setLikes([...likes, {_id:userId}]);
      }

      await toggleLike(blogId).unwrap();

    } catch (err) {
      setLikes(initialLikes);
      toast.error("Like failed");
    }
  };

  return (
    <>
      <div className="absolute right-16 bottom-4 flex items-center">
        <button onClick={handleLike}
          className="btn btn-ghost btn-sm">
          <Heart size={18} fill={isLiked ? "red" : "none"} strokeWidth={2}/>
        </button>
        <Link to={`/blog/${blogId}/likes`} state={{initialLikes}} className="">{likes.length}</Link>
      </div>
    </>
  );
};

export default LikeButton;
