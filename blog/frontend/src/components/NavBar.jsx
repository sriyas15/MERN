import { Link, useNavigate } from "react-router-dom"
import { Moon, Sun, Dessert, TreePine, LogOut, User, Menu } from "lucide-react";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const NavBar = () => {

  const [ openMenu, setOpenMenu ] = useState(false);
  const [ themeMenu, setThemeMenu ] = useState(false);
  const [ theme,setTheme ] = useState("cupcake");

  useEffect(()=>{
    const themeFrmStrg = JSON.parse(localStorage.getItem("theme")) || "cupcake";
    document.documentElement.setAttribute("data-theme",themeFrmStrg);
  },[])

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

  const CurrentTheme = ()=>{

    const themeFrmStrg = JSON.parse(localStorage.getItem("theme")) || "cupcake"
    
      if(themeFrmStrg === "light") return <Sun className="text-yellow-500"/>
      else if(themeFrmStrg === "cupcake") return <Dessert className="text-pink-600"/>
      else if(themeFrmStrg === "dark") return <Moon className="text-gray-400"/>
      else if(themeFrmStrg === "forest") return <TreePine className="text-green-600"/>
    
  }

  const toggleTheme = (newTheme)=>{
    setTheme(newTheme)
    document.documentElement.setAttribute("data-theme",newTheme);
    localStorage.setItem("theme",JSON.stringify(newTheme));

    setThemeMenu(false);
  }

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
          

          <div className="dropdown dropdown-end">

            <button onClick={()=>setThemeMenu(!themeMenu)} className="btn btn-ghost btn-sm" tabIndex={0}>
               Themes <CurrentTheme/>
            </button>

            {themeMenu && (
              <ul className="menu dropdown-content bg-base-100 rounded-xl shadow p-2 mt-3 w-40 z-50">
              <li><button className="text-yellow-500" onClick={()=>toggleTheme("light")}><Sun/> Light</button></li>
              <li><button className="text-pink-600" onClick={()=>toggleTheme("cupcake")}><Dessert/> Cupcake</button></li>
              <li><button className="text-gray-400" onClick={()=>toggleTheme("dark")}><Moon/> Dark</button></li>
              <li><button className="text-green-600" onClick={()=>toggleTheme("forest")}><TreePine/> Forest</button></li>
            </ul>
            )}
          </div>

          {/* ✅ User Menu */}
          <div className="dropdown dropdown-end">

            <div tabIndex={0} role="button" onClick={()=>setOpenMenu(!openMenu)} className="avatar cursor-pointer">

              <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={userDetails?.avatar?.url || defaultAvatar} alt="User" />
              </div>

            </div>

            {openMenu && (
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
            )}
          </div>

          {/* <button
            className="md:hidden btn btn-ghost btn-sm"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <Menu size={20} h/>
          </button> */}
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