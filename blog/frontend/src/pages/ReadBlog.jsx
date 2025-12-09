import { useLocation } from "react-router-dom";
import defaultCover from "../assets/default-cover.png";
import { timeAgo } from "../utils/timeAgo";
import { useGetProfileQuery } from "../features/auth/authApiSlice";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import CommentsCard from "../components/CommentsCard";
import { useLazyGetCommentsQuery } from "../features/comments/commentsApiSlice";
import toast from "react-hot-toast";
import defaultAvatar from "../assets/defaultAvatar.png"
import BlogActions from "../components/BlogActions";
import LikeButton from "../components/LikeButton";
import FollowButton from "../components/FollowButton";

const ReadblogData = () => {

const location = useLocation();
const { blog } = location.state || {}

const { data:getProfile } = useGetProfileQuery();
const [ triggerComment,{ data:commentData, isLoading:commentsLoading } ] = useLazyGetCommentsQuery();

const userDetails = getProfile?.user;

const [openCommentsId, setOpenCommentsId] = useState(null);

if (!blog){
    return (
        <div className="text-center text-red-500 mt-20 text-xl">
        Blog data not found.
        </div>
    );
}

  const commentsHandler = async(id)=>{
  
      try {
        await triggerComment(id).unwrap();
      } catch (error) {
        console.log("Error in fetching comments");
        toast.error(error?.data?.message);
      }
  }
    
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">

      {/* Cover Image */}
      <div className="w-full rounded-xl overflow-hidden shadow-md mb-6">
        <img src={blog?.coverImage?.url || defaultCover} alt="blog Cover" className="w-full h-72 object-cover"/>
      </div>

      <div className="relative">

        { (userDetails?._id === blog?.author?._id || userDetails?.isAdmin) && (
          <BlogActions blog={blog} user={userDetails}/>
      ) }

      </div>

      {/* Title */}
      <div className="relative">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {blog?.title}
        </h1>
        <LikeButton blogId={blog?._id} initialLikes={blog?.likes} userId={userDetails?._id}/>
        <button className="absolute right-1 bottom-4 btn btn-ghost btn-sm flex items-center gap-1" onClick={()=>{
          commentsHandler(blog._id),
          setOpenCommentsId(openCommentsId === blog._id ? null : blog._id)
        }}>
          <MessageCircle size={16} />
          {blog.comments?.length}
      </button>
      </div>

      {openCommentsId === blog._id && (
        <div>
          <CommentsCard commentData={commentData} blogId={blog._id}
            userDetails={getProfile?.user}/>
        </div>
      )}

      {/* Author */}
      <div className="relative flex items-center gap-3 mb-6 border-b pb-4">

        <img src={blog?.author?.avatar?.url || defaultAvatar}
          alt="Author Avatar"
          className="w-12 h-12 rounded-full ring ring-primary ring-offset-2"/>
        <div>
          <p className="font-semibold text-lg">{blog?.author?.name}</p>
          <p className="text-gray-500 text-sm">@{blog?.author?.username}</p>
          <p className="text-xs text-gray-400">Posted {timeAgo(blog?.createdAt)}</p>
          <FollowButton author={blog?.author} currentUser={userDetails}/>
        </div>

      </div>

      {/* Content */}
      <div
        className="prose max-w-none prose-img:rounded-xl prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: blog?.content }}
      ></div>

    </div>
  );
};


export default ReadblogData;
