import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useSignupMutation } from "../features/auth/authApiSlice";
import { Link,useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const isDisabled = !name || !username || !email || !password || !confirmPassword;

  const [ signup, { isLoading } ] = useSignupMutation()

  const registerFormHandler = async(e) => {
    e.preventDefault();
    
    if( !name.trim() || !username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()){
      toast.error("Please fill all the fields to proceed!");
      return;
    }

    if( password !== confirmPassword ){
      toast.error("Passwords do not match");
      return;
    }

    try {
      
      await signup({name,username,email,password}).unwrap();

      toast.success("New Account Created");

      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/userDetails");

    } catch (error) {
      
      console.log("Error in Sign up ",error)
      toast.error(error?.data?.message || "Registration failed");
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <form
        className="card w-full max-w-sm bg-base-100 shadow-xl p-6"
        onSubmit={registerFormHandler}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-secondary">
          Create Account
        </h2>

        <label className="form-control w-full mb-4">
          <div className="label">
            <span className="label-text">Full Name</span>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full mb-4">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username..."
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full mb-4">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password..."
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

        <label className="form-control w-full mb-2">
          <div className="label">
            <span className="label-text">Confirm Password</span>
          </div>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password..."
              className="input input-bordered w-full pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/70 hover:text-base-content"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </label>

        <button className="btn btn-secondary w-full mt-4" 
          type="submit" disabled={isLoading || isDisabled}>
          {isLoading ? "Creating" : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-4 opacity-70">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Login
          </Link>

        </p>
      </form>
    </div>
  );
};

export default SignUp;
