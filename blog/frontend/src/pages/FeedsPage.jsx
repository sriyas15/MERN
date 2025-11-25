
import { useEffect, useState } from "react";
import { Moon, Sun, LogOut, User, Menu, MessageCircle, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGetBlogsQuery, useToggleLikeMutation } from '../features/blog/blogApiSlice';
import toast from "react-hot-toast";

const FeedsPage = () => {

  const [theme, setTheme] = useState("light");
  const [openMenu, setOpenMenu] = useState(false);

  const { data: blogs, isLoading, isError } = useGetBlogsQuery();

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

  const followBtn = async()=>{}

  const toggleLikeBtn = async(id)=>{

    try {

     const likedMsg = await toggleLike(id).unwrap();
     console.log(likedMsg);

    } catch (error) {
      console.log("Like Button failed");
      toast.error(error?.data?.message || "Like button failed");
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
          {/* ✅ Theme toggle */}
          <button onClick={toggleTheme} className="btn btn-ghost btn-sm">
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* ✅ User Menu */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar cursor-pointer"
            >
              <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={userDetails?.avatar?.url || image} alt="User" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-xl shadow p-2 mt-3 w-40"
            >
              <li>
                <Link to="/profile">
                  <User size={16} /> Profile
                </Link>
              </li>
              <li>
                <button>
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
      <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
        {blogData?.map((post) => {
            const isLiked = post.likes?.includes(userDetails?._id);
            return (
          <div
            key={post._id}
            className="card bg-base-100 shadow-md hover:shadow-lg transition"
          >
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
                    src={post.author.avatar?.url}
                    alt={post.author.name}
                    className="w-9 h-9 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{post.author.name}</p>
                    <p className="text-sm opacity-70">@ {post.author.username}</p>
                  </div>
                </div>

                <button
                  className={`btn btn-sm ${post.author.isFollowing ? "btn-outline" : "btn-primary"}`}
                  onClick={followBtn}
                >
                  {post.author.isFollowing ? "Following" : "Follow"}
                </button>
              </div>

              {/* ✅ Blog Preview */}
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="opacity-80">{post.content}</p>

              <p className="text-xs opacity-60 mt-2">{post.createdAt}</p>

              <div className="flex items-center gap-4 mt-2">
                {/* Like */}
                <button
                  className="btn btn-ghost btn-sm flex items-center gap-1"
                  onClick={() => toggleLikeBtn(post._id)}
                >
                  <Heart size={18} fill={isLiked ? "red" : "none"} strokeWidth={2}/>
                  {post.likes?.length}  
                </button>

                {/* Comments */}
                <Link to={`/post/${post._id}`} className="btn btn-ghost btn-sm flex items-center gap-1">
                  <MessageCircle size={18} />
                  {post.comments?.length}
                </Link>
              </div>

              <div className="card-actions justify-end">
                <Link to={`/post/${post._id}`} className="btn btn-link p-0">
                  Read more →
                </Link>
              </div>
            </div>
          </div>
            )
      })}

      </div>
    </div>
  );
};

export default FeedsPage;

