import { Newspaper, PenTool, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import FeedsPage from "./FeedsPage";

const LoggedInHome = () => {
  return (
    <div className="min-h-screen px-6 py-10 bg-base-100">
      {/* Welcome Section */}
      <h1 className="text-4xl font-bold mb-2">Welcome Back 👋</h1>
      <p className="opacity-70 mb-8">Here’s what’s happening today</p>

      {/* 3 quick cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        
        {/* Feed */}
        <Link to="/feeds">
          <div className="card bg-base-200 p-6 hover:shadow-xl cursor-pointer">
            <Newspaper className="w-10 h-10 mb-3 text-primary" />
            <h3 className="font-semibold text-xl">Your Feed</h3>
            <p className="opacity-70">Blogs from authors you follow.</p>
          </div>
        </Link>

        {/* Your Blogs */}
        <Link to="/my-profile">
          <div className="card bg-base-200 p-6 hover:shadow-xl cursor-pointer">
            <PenTool className="w-10 h-10 mb-3 text-secondary" />
            <h3 className="font-semibold text-xl">Your Blogs</h3>
            <p className="opacity-70">Manage & update your published blogs.</p>
          </div>
        </Link>

      </div>

      {/* Feed Preview Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Latest from your feed</h2>

        {/* Placeholder, will show "Blogs List" */}
        <div className="space-y-4">
          <FeedsPage/>
        </div>
      </section>
    </div>
  );
};

export default LoggedInHome;
