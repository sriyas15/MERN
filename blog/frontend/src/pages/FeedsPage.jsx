
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from '../features/blog/blogApiSlice';
import toast from "react-hot-toast";
import { useLazyGetCommentsQuery } from "../features/comments/commentsApiSlice";
import { useGetProfileQuery } from "../features/auth/authApiSlice";
import CommentsCard from "../components/CommentsCard";
import { timeAgo } from "../utils/timeAgo";
import defaultAvatar from "../assets/defaultAvatar.png"
import BlogActions from "../components/BlogActions";
import LikeButton from "../components/LikeButton";
import FollowButton from "../components/FollowButton";

const FeedsPage = () => {

  const [openCommentsId, setOpenCommentsId] = useState(null);

  //User RTK Quries
  const { data: getProfile, isLoading: profileLoading } = useGetProfileQuery(); 

  //Blog RTK Querie
  const { data: blogs, isLoading, isError } = useGetBlogsQuery();

  //Coment RTK Queries
  const [ triggerComment,{ data:commentData, isLoading:commentsLoading } ] = useLazyGetCommentsQuery();

  const userDetails = getProfile?.user;
  const blogData = (blogs?.getAll);

  const commentsHandler = async(id)=>{

    try {
      
      await triggerComment(id).unwrap();

    } catch (error) {
      console.log("Error in fetching comments");
      toast.error(error?.data?.message);
    }
  }

  return (
    <div className="min-h-screen bg-base-200">

      {/* ✅ Feed */}
      <div className="relative max-w-3xl mx-auto py-8 px-4 space-y-6">

        {blogData?.map((post) => {

            return (
          <div key={post._id}
            className="card bg-base-100 shadow-md hover:shadow-lg transition">
            {post.coverImage && (
              <figure>
                <img src={post.coverImage.url} alt={post.title} className="w-full" />
              </figure>
            )}

            <div className="card-body">
              {/* ✅ Author Info + Follow */}
              <div className="flex items-center justify-between mb-2">
                <Link to={"/profile"} state={{user:post.author}}>
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar?.url || defaultAvatar}
                      alt={post.author.name}
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{post.author.name} <span className="text-gray-400 text-sm ml-2">{post?.author?._id === userDetails._id && "You"}</span></p>
                      <p className="text-sm opacity-70">@ {post.author.username}</p>
                    </div>
                  </div>
                </Link>

                <FollowButton author={post.author} currentUser={userDetails}/>

              </div>

              {/* ✅ Blog Preview */}
              <h2 className="text-xl font-bold">{post.title}</h2>
              <div className="opacity-80" dangerouslySetInnerHTML={{ __html: post.content }}>
                
              </div>

              <p className="text-xs opacity-60 mt-2">{timeAgo(post.createdAt)}</p>

              {/* Blog's Delete/Edit */}
              {userDetails._id === post.author._id || userDetails.isAdmin ? (
              <BlogActions blog={post} user={userDetails} />
            ):null}

              <div className="card-actions justify-end">
                <Link to={`/feeds/blog/${post._id}`} className="btn btn-link p-0" state={{blog:post}}>
                  Read more →
                </Link>
              </div>

              <div className="flex items-center gap-4 ">

                {/* Like Button Component*/}
                <LikeButton blogId={post._id} initialLikes={post.likes} userId={userDetails?._id}/>

                {/* Comments */}
                <button className="btn btn-ghost btn-sm flex items-center gap-1" onClick={()=>{
                  commentsHandler(post._id),
                  setOpenCommentsId(openCommentsId === post._id ? null : post._id)
                }}>
                  <MessageCircle size={18} />
                  {post.comments?.length}
                </button>
              </div>
              {openCommentsId === post._id && (
                  <div>
                    <CommentsCard commentData={commentData} blogId={post._id}
                      userDetails={userDetails}/>
                  </div>
                )}

            </div>
          </div>
            )
      })}

      </div>
    </div>
  );
};

export default FeedsPage;

