import { Link, useLocation } from "react-router-dom";
import { Users, Edit, FileText,Rss, Heart } from "lucide-react";
import { useDeleteBlogMutation, useEditBlogMutation, useGetBlogsQuery, useToggleLikeMutation } from '../features/blog/blogApiSlice';
import { useGetProfileQuery } from "../features/auth/authApiSlice";

const OthersProfile = () => {

  const location = useLocation();
  const { user } = location.state || {};

  const { data:getProfile } = useGetProfileQuery();
  const { data: blogs, isLoading, isError } = useGetBlogsQuery();
  const [ toggleLike ] = useToggleLikeMutation();

  const len = blogs?.getAll ? blogs.getAll.filter((post)=>post.author._id === user._id).length : 0;
  const loggedUser = getProfile?.user;

  const followers = user?.followers;
  const following = user?.following;

  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/552/552721.png";

  const toggleLikeBtn = async(id)=>{

    try {
         const likedMsg = await toggleLike(id).unwrap();
    
        } catch (error) {
          console.log("Like Button failed");
          toast.error(error?.data?.message || "Like button failed");
        }
  }
  

  return (
    <div className="max-w-4xl mx-auto p-4">

      {/* TOP CARD */}
      <div className="card bg-base-200 shadow-xl p-6 rounded-xl">

        <div className="flex flex-col items-center gap-4">
          
          {/* Avatar */}
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user?.avatar?.url || defaultAvatar}
                alt="avatar"
              />
            </div>
          </div>

          {/* Name + Username */}
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">@{user.username}</p>

          {/* Bio */}
          {user.bio && (
            <p className="text-center text-gray-700 max-w-xl">{user.bio}</p>
          )}

          {/* Counts */}
          <div className="flex gap-6 mt-3 items-center">
            <div className="text-center">
              <p className="font-bold">{len}</p>
              <button className="btn btn-ghost"><Rss/> Blogs</button>
            </div>

            <div className="text-center">
              <p className="font-bold">{user.followers?.length || 0}</p>
              <Link to={"/profile/followers"} state={{followers}} className="btn btn-ghost"><Users/> Followers</Link>
            </div>

            <div className="text-center">
              <p className="font-bold">{user.following?.length || 0}</p>
              <Link to={"/profile/following"} state={{following}} className="btn btn-ghost"><Users/> Following</Link>
            </div>
          </div>

        </div>
      </div>

      {/* BLOG LIST */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <FileText size={20} /> Blogs by {user.name}
        </h3>

          {blogs?.getAll
            ?.filter((post) => post.author._id === user._id)
            .map((post) => {
              
              const isLiked = post.likes.includes(loggedUser._id);

               return (
                <div className="relative">
                <Link to={`/feeds/blog/${post._id}`} key={post._id} state={{blog:post}}
                  className="card bg-base-100 shadow-md p-5 hover:shadow-lg transition mb-3">
                  <h4 className="text-lg font-bold">{post.title}</h4>
                  <div className="opacity-80 text-gray-600 mt-1 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.content }}>
                  </div>
                  
                </Link>
                <button className="absolute right-7 bottom-5 flex items-center gap-1" onClick={()=>toggleLikeBtn(post._id)}>
                  <Heart size={18} fill={isLiked ? "red" : "none"} strokeWidth={2}/> {post.likes.length}
                </button>
               </div>
               )
              
              })
          }

          {blogs?.getAll?.filter((post) => post.author._id === user._id).length === 0 && (
            <p className="text-gray-500">No blogs yet.</p>
          )}
        </div>
        
      </div>

    
  );
};

export default OthersProfile;
