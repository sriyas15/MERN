import { Link } from "react-router-dom";
import { Users, Edit, FileText,Rss } from "lucide-react";
import { useGetProfileQuery } from "../features/auth/authApiSlice";
import { useDeleteBlogMutation, useEditBlogMutation, useGetBlogsQuery, useToggleLikeMutation } from '../features/blog/blogApiSlice';

const ProfilePage = () => {

  const { data: getProfile, isLoading: profileLoading } = useGetProfileQuery();
  const { data: blogs, isLoading, isError } = useGetBlogsQuery();
  
  const len = blogs?.getAll ? blogs.getAll.filter((post)=>post.author._id === getProfile?.user?._id).length : 0;
  console.log(getProfile?.user)
  const loggedInUser = JSON.parse(localStorage.getItem("user")); 
  const isOwner = loggedInUser?._id === getProfile?.user?._id;

  const followers = getProfile?.user?.followers;
  const following = getProfile?.user?.following;

  if (profileLoading) return <div className="flex justify-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">

      {/* TOP CARD */}
      <div className="card bg-base-200 shadow-xl p-6 rounded-xl">

        <div className="flex flex-col items-center gap-4">
          
          {/* Avatar */}
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={getProfile?.user?.avatar.url || "/default-avatar.png"}
                alt="avatar"
              />
            </div>
          </div>

          {/* Name + Username */}
          <h2 className="text-2xl font-bold">{getProfile?.user?.name}</h2>
          <p className="text-gray-500">@{getProfile?.user?.username}</p>

          {/* Bio */}
          {getProfile?.user?.bio && (
            <p className="text-center text-gray-700 max-w-xl">{getProfile?.user?.bio}</p>
          )}

          {/* Counts */}
          <div className="flex gap-6 mt-3 items-center">
            <div className="text-center">
              <p className="font-bold">{len}</p>
              <Link to={"/following"} className="btn btn-ghost"><Rss/> Blogs</Link>
            </div>

            <div className="text-center">
              <p className="font-bold">{getProfile?.user?.followers?.length || 0}</p>
              <Link to={"/profile/followers"} state={{followers}} className="btn btn-ghost"><Users/> Followers</Link>
            </div>

            <div className="text-center">
              <p className="font-bold">{getProfile?.user?.following?.length || 0}</p>
              <Link to={"/profile/following"} state={{following}} className="btn btn-ghost"><Users/> Following</Link>
            </div>
          </div>

          {/* Edit getProfile?.user? for owner */}
          {isOwner && (
            <Link to="/profile/update" className="btn btn-primary btn-sm mt-4 flex gap-2">
              <Edit size={16} /> Edit Profile?
            </Link>
          )}
        </div>
      </div>

      {/* BLOG LIST */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <FileText size={20} /> Blogs by {getProfile?.user?.name}
        </h3>

          {blogs?.getAll
            ?.filter((post) => post.author._id === getProfile?.user?._id)
            .map((post) => (
              <Link to={`/blog/${post._id}`} key={post._id} className="card bg-base-100 shadow-md p-5 hover:shadow-lg transition mb-3">
                <h4 className="text-lg font-bold">{post.title}</h4>
                <div className="opacity-80 text-gray-600 mt-1 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.content }}>
                </div>
              </Link>
            ))
          }

          {blogs?.getAll?.filter((post) => post.author._id === getProfile?.user?._id).length === 0 && (
            <p className="text-gray-500">No blogs yet.</p>
          )}
        </div>
        
      </div>

    
  );
};

export default ProfilePage;
