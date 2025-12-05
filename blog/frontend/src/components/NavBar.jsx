import { Link, useNavigate } from "react-router-dom"
import { Moon, Sun, LogOut, User, Menu } from "lucide-react";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import toast from "react-hot-toast";
import { useState } from "react";


const NavBar = () => {

  const [openMenu, setOpenMenu] = useState(false);

  const userDetails = JSON.parse(localStorage.getItem("user"));

  const isAdmin = userDetails?.isAdmin;

  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/552/552721.png";

  const [ logout ] = useLogoutMutation();

  const navigate = useNavigate();

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

  const toggleTheme = ()=>{}

  return (
    <div className="bg-base-100">
        <nav className="navbar bg-base-100 shadow-sm px-4">
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold text-primary">
            MyBlog
          </Link>
        </div>

        {userDetails ? (
          <div className="flex-none gap-3 relative">

          {isAdmin && (<Link className="btn btn-ghost btn-sm" to={"/admin/allUsers"}>Users</Link>)}
          
          <Link className="btn btn-ghost btn-sm" to={"/post"}>Post</Link>

          {/* ✅ Theme toggle */}
          <button onClick={toggleTheme} className="btn btn-ghost btn-sm">
            Themes
          </button>

          {/* ✅ User Menu */}
          <div className="dropdown dropdown-end">

            <div tabIndex={0} role="button" className="avatar cursor-pointer">

              <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={userDetails?.avatar?.url || defaultAvatar} alt="User" />
              </div>

            </div>

            <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-xl shadow p-2 mt-3 w-40">
              <li>
                <Link to="/my-profile" state={{userDetails}}>
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
        ):(
          <div className="flex gap-3">
          <a href="/login" className="btn btn-ghost">Login</a>
          <a href="/signup" className="btn btn-primary">Sign Up</a>
        </div>
        )}
      </nav>
    </div>
  )
}

export default NavBar