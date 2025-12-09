import { Link } from "react-router-dom";
import { Ellipsis, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { useDeleteBlogMutation } from "../features/blog/blogApiSlice";
import toast from "react-hot-toast";

const BlogActions = ({ blog, user }) => {

  const [open, setOpen] = useState(false);
  const [deleteBlog] = useDeleteBlogMutation();

  if (!user || !blog) return null;

  const canEdit = user._id === blog.author._id || user.isAdmin;

  if (!canEdit) return null;

  const deleteBlogHandler = async () => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await deleteBlog(blog._id).unwrap();
      toast.success("Blog deleted");
      window.location.href = "/feeds"; // redirect
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="dropdown dropdown-right absolute right-2 top-2 z-20">
      <button className="btn btn-sm btn-ghost" onClick={() => setOpen(!open)}>
        <Ellipsis size={20} />
      </button>

      {open && (
        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-xl w-40">
          <li>
            <Link to="/edit-blog" state={{ blog }} className="flex items-center gap-2">
              <Edit size={16} /> Edit
            </Link>
          </li>
          <li>
            <button onClick={deleteBlogHandler} className="text-red-500 flex items-center gap-2">
              <Trash size={16} /> Delete
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default BlogActions;
