import { useState } from "react"
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate,Link } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApiSlice";

export const LoginPage = () => {

const [ showPassword, setShowPassword ] = useState(false);

const [ identifier, setIdentifier ] = useState("");
const [ password, setPassword ] = useState("");

const navigate = useNavigate();

const isDisabled = !identifier || !password 

const [ login, { isLoading } ] = useLoginMutation()

const loginHandler = async(e)=>{

  e.preventDefault();
  
  if(!identifier.trim() || !password.trim()){
    toast.error("Please fill all the fields to proceed!");
    return;
  }

  try {

    const data = await login( {identifier,password} ).unwrap();
    console.log(data.loggedUser);
    localStorage.setItem("user",JSON.stringify(data.loggedUser));
    toast.success("Logged In");
    setIdentifier("");
    setPassword("");

    navigate("/feeds");
    
  } catch (error) {
      console.log("Error in Log In",error)
      toast.error(error?.data?.message || "Log In failed");
  }
}

return (
<div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <div className="card w-full max-w-sm bg-base-100 shadow-xl p-6">
    <h2 className="text-2xl font-bold text-center mb-6 text-primary">Welcome Back</h2>


    <form onSubmit={loginHandler}>
      <label className="form-control w-full mb-4">
      <div className="label">
      <span className="label-text">Email or Username</span>
      </div>
        <input
          type="text"
          value={identifier}
          onChange={(e)=>setIdentifier(e.target.value)}
          placeholder="Enter email or username..."
          className="input input-bordered w-full"
        />
    </label>


      <label className="form-control w-full mb-2">
      <div className="label">
        <span className="label-text">Password</span>
      </div>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="Enter password..."
        className="input input-bordered w-full pr-10"
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/70 hover:text-base-content"
        onClick={() => setShowPassword(!showPassword)}
      >
       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
    </label>

    <button className="btn btn-primary w-full mt-4" type="submit" disabled={isLoading || isDisabled}>
      {isLoading ? "Logging In" : "Log In"}
    </button>

    </form>
    <p className="text-sm text-center mt-4 opacity-70">
      Don't have an account? <Link to="/register" className="link link-secondary">Sign Up</Link>
    </p>
    
    </div>
</div>
)};

export default LoginPage