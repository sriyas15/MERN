
import { useState } from "react";
import { Moon, Sun, LogOut, User, Menu, MessageCircle, Heart, Ellipsis, Edit, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteBlogMutation, useEditBlogMutation, useGetBlogsQuery, useToggleLikeMutation } from '../features/blog/blogApiSlice';
import toast from "react-hot-toast";
import { useLazyGetCommentsQuery } from "../features/comments/commentsApiSlice";
import { useFollowMutation, useLogoutMutation } from "../features/auth/authApiSlice";
import CommentsCard from "../components/CommentsCard";
import { timeAgo } from "../utils/timeAgo";

const FeedsPage = () => {

  const [theme, setTheme] = useState("light");
  const [openMenu, setOpenMenu] = useState(false);
  const [openCommentsId, setOpenCommentsId] = useState(null);

  //User RTK Quries
  const [ follow,{followLoads} ] = useFollowMutation();
  const [ logout ] = useLogoutMutation();

  //Blog RTK Querie
  const { data: blogs, isLoading, isError } = useGetBlogsQuery();
  const [ editBlog ] = useEditBlogMutation();
  const [ deleteBlog ] = useDeleteBlogMutation();

  //Coment RTK Queries
  const [ triggerComment,{ data:commentData, isLoading:commentsLoading } ] = useLazyGetCommentsQuery();

  const userDetails = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  console.log(blogs);

  const image = "https://cdn-icons-png.flaticon.com/512/552/552721.png";

  const blogData = blogs?.getAll;

  const [ toggleLike ] = useToggleLikeMutation()

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const followBtn = async(blogAuthor)=>{

    try {
      
      const followData = await follow(blogAuthor._id).unwrap();
      console.log(userDetails)
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

  const logoutHandler = async()=>{

    try {
      
      await logout().unwrap();
      localStorage.removeItem("user")
      toast.success("Logged Out");
      navigate("/");

    } catch (error) {
      console.log("Error in Logout");
      toast.error(error?.data?.message);
    }
  }

  const editBlogHandler = async(id)=>{

    try {
      
    } catch (error) {
      
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
      {/* ✅ Navbar */}
      <nav className="navbar bg-base-100 shadow-sm px-4">
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold text-primary">
            MyBlog
          </Link>
        </div>

        <div className="flex-none gap-3 relative">
          <Link to={"/post"} className="">Post</Link>
          {/* ✅ Theme toggle */}
          <button onClick={toggleTheme} className="btn btn-ghost btn-sm">
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* ✅ User Menu */}
          <div className="dropdown dropdown-end">

            <div tabIndex={0} role="button" className="avatar cursor-pointer">

              <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={userDetails?.avatar?.url || image} alt="User" />
              </div>

            </div>

            <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-xl shadow p-2 mt-3 w-40">
              <li>
                <Link to="/profile" state={{userDetails}}>
                  <User size={16} /> Profile
                </Link>
              </li>
              <li>
                <button onClick={logoutHandler}>
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </ul>
          </div>

          <button
            className="md:hidden btn btn-ghost btn-sm"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* ✅ Feed */}
      <div className="relative max-w-3xl mx-auto py-8 px-4 space-y-6">

        {blogData?.map((post) => {

            const isLiked = post.likes?.includes(userDetails?._id);

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
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar?.url || image}
                    alt={post.author.name}
                    className="w-9 h-9 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{post.author.name} <span className="text-gray-400 text-sm ml-2">{post.author._id === userDetails._id && "You"}</span></p>
                    <p className="text-sm opacity-70">@ {post.author.username}</p>
                  </div>
                </div>

                <button
                  className={`btn btn-sm ${post.author.followers.includes(userDetails?._id) ? "btn-outline" : "btn-primary"}`}
                  onClick={()=>followBtn(post.author)}
                >
                  {post.author.followers.includes(userDetails?._id) ? "Following" : "Follow"}
                </button>
              </div>

              {/* ✅ Blog Preview */}
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="opacity-80">{post.content}</p>

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
                    <button onClick={()=>editBlogHandler(post._id)} className="flex items-center gap-2">
                      <Edit size={16} /> Edit
                    </button>
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
                <Link to={`/post/${post._id}`} className="btn btn-link p-0">
                  Read more →
                </Link>
              </div>

              <div className="flex items-center gap-4 ">
                {/* Like */}
                <button
                  className="btn btn-ghost btn-sm flex items-center gap-1"
                  onClick={() => toggleLikeBtn(post._id)}
                >
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

