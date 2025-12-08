
import { useState } from "react";
import { MessageCircle, Heart, Ellipsis, Edit, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeleteBlogMutation, useEditBlogMutation, useGetBlogsQuery, useToggleLikeMutation } from '../features/blog/blogApiSlice';
import toast from "react-hot-toast";
import { useLazyGetCommentsQuery } from "../features/comments/commentsApiSlice";
import { useFollowMutation, useGetProfileQuery } from "../features/auth/authApiSlice";
import CommentsCard from "../components/CommentsCard";
import { timeAgo } from "../utils/timeAgo";

const FeedsPage = () => {

  const [openCommentsId, setOpenCommentsId] = useState(null);

  //User RTK Quries
  const [ follow,{followLoads} ] = useFollowMutation();
  const { data: getProfile, isLoading: profileLoading } = useGetProfileQuery(); 

  //Blog RTK Querie
  const { data: blogs, isLoading, isError } = useGetBlogsQuery();
  const [ editBlog ] = useEditBlogMutation();
  const [ deleteBlog ] = useDeleteBlogMutation();

  //Coment RTK Queries
  const [ triggerComment,{ data:commentData, isLoading:commentsLoading } ] = useLazyGetCommentsQuery();

  const userDetails = getProfile?.user;
  console.log(blogs);

  const image = "https://cdn-icons-png.flaticon.com/512/552/552721.png";

  const blogData = (blogs?.getAll);

  const [ toggleLike ] = useToggleLikeMutation();

  const followBtn = async(blogAuthor)=>{

    try {
      
      const followData = await follow(blogAuthor._id).unwrap();
      console.log(followData)
      if(followData.message === "Following")
        toast.success(`${blogAuthor.name} added to following list`);

      else toast.success(`Unfollowed ${blogAuthor.name}`);
      
    } catch (error) {
      console.log(`Error in following`);
      toast.error(error?.data?.message);
    }
  }

  const toggleLikeBtn = async(id)=>{

    try {

     const likedMsg = await toggleLike(id).unwrap();
     console.log(likedMsg);

    } catch (error) {
      console.log("Like Button failed");
      toast.error(error?.data?.message || "Like button failed");
    }

  }

  const commentsHandler = async(id)=>{

    try {
      
      await triggerComment(id).unwrap();

    } catch (error) {
      console.log("Error in fetching comments");
      toast.error(error?.data?.message);
    }
  }

  const deleteBlogHandler = async(id)=>{

    if(!window.confirm("Are you sure want to delete the blog?"))
      return;

    try {
      
      await deleteBlog(id).unwrap();

      toast.success("Blog Deleted");
    } catch (error) {
      console.log("Error in Deletion of Blog");
      toast.error(error?.data?.message);
    }
  }

  return (
    <div className="min-h-screen bg-base-200">

      {/* ✅ Feed */}
      <div className="relative max-w-3xl mx-auto py-8 px-4 space-y-6">

        {blogData?.map((post) => {

            const isLiked = post.likes?.includes(userDetails?._id);
            const isFollowing = userDetails?.following?.includes(post.author._id);

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
                      src={post.author.avatar?.url || image}
                      alt={post.author.name}
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{post.author.name} <span className="text-gray-400 text-sm ml-2">{post?.author?._id === userDetails._id && "You"}</span></p>
                      <p className="text-sm opacity-70">@ {post.author.username}</p>
                    </div>
                  </div>
                </Link>

                <button
                  className={`btn btn-sm ${isFollowing ? "btn-outline" : "btn-primary"}`}
                  onClick={()=>followBtn(post.author)}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>

              {/* ✅ Blog Preview */}
              <h2 className="text-xl font-bold">{post.title}</h2>
              <div className="opacity-80" dangerouslySetInnerHTML={{ __html: post.content }}>
                
              </div>

              <p className="text-xs opacity-60 mt-2">{timeAgo(post.createdAt)}</p>

              {userDetails._id === post.author._id || userDetails.isAdmin ? (
              <div className="dropdown dropdown-right absolute right-2 bottom-8 z-20">

                {/* Trigger Button */}
                <button tabIndex={0} className="btn btn-sm btn-ghost">
                  <Ellipsis size={20} />
                </button>

                {/* Dropdown Menu */}
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-xl w-40">

                  <li>
                    <Link to={"/edit-blog"} state={{post}} className="flex items-center gap-2">
                      <Edit size={16} /> Edit
                    </Link>
                  </li>

                  <li>
                    <button onClick={()=>deleteBlogHandler(post._id)} className="text-red-500 flex items-center gap-2">
                      <Trash size={16}/> Delete
                    </button>
                  </li>

                </ul>
              </div>

            ):null}

              <div className="card-actions justify-end">
                <Link to={`/feeds/blog/${post._id}`} className="btn btn-link p-0" state={{blog:post}}>
                  Read more →
                </Link>
              </div>

              <div className="flex items-center gap-4 ">

                {/* Like */}
                <button className="btn btn-ghost btn-sm flex items-center gap-1"
                  onClick={() => toggleLikeBtn(post._id)}>
                  <Heart size={18} fill={isLiked ? "red" : "none"} strokeWidth={2}/>
                  {post.likes?.length}  
                </button>

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

