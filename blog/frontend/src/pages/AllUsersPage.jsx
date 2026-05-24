import { Ellipsis, Trash } from "lucide-react";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../features/auth/authApiSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AllUsersPage = () => {
  const { data: getAllUsers, isLoading } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const allUsers = (getAllUsers?.users || []).filter((u) => !u.isAdmin);

  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/552/552721.png";

  // ✅ FIX 2: track open menu by user ID, not a single boolean
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => setOpenMenuId((prev) => (prev === id ? null : id));

  const deleteUserHandler = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      setOpenMenuId(null);
      return;
    }
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted");
      setOpenMenuId(null);
    } catch (error) {
      toast.error(error?.data?.message || "Error deleting user");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          All Users
          <span className="ml-3 badge badge-primary badge-lg align-middle">
            {allUsers.length}
          </span>
        </h1>
        <p className="text-base-content/50 text-sm mt-1">
          Manage your platform's users
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        {allUsers.length === 0 ? (
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body items-center text-center py-16">
              <div className="text-5xl mb-3">👤</div>
              <h3 className="card-title text-base-content/70">No users found</h3>
              <p className="text-sm text-base-content/40">
                Registered users will appear here
              </p>
            </div>
          </div>
        ) : (
          allUsers.map((user) => (
            <div
              key={user._id}
              className="card bg-base-200 shadow-sm hover:shadow-md hover:bg-base-300 transition-all duration-200"
            >
              <div className="card-body p-4 flex-row items-center gap-4">
                {/* Avatar */}
                <Link to={`/profile/${user._id}`} className="shrink-0">
                  <div className="avatar">
                    <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={user?.avatar?.url || defaultAvatar}
                        alt={user.name}
                      />
                    </div>
                  </div>
                </Link>

                {/* ✅ FIX 1: ID in the URL */}
                <Link
                  to={`/profile/${user._id}`}
                  className="flex-1 min-w-0 group"
                >
                  <h2 className="font-bold text-base leading-tight group-hover:text-primary transition-colors truncate">
                    {user.name}
                  </h2>
                  <p className="text-sm text-base-content/50 truncate">
                    @{user.username}
                  </p>
                </Link>

                {/* ✅ FIX 2: per-card menu via ID */}
                <div className="shrink-0 relative">
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => toggleMenu(user._id)}
                  >
                    <Ellipsis className="w-5 h-5" />
                  </button>

                  {openMenuId === user._id && (
                    <ul className="absolute right-0 mt-1 menu p-2 shadow-lg bg-base-100 rounded-xl w-44 z-50 border border-base-300">
                      <li>
                        <button
                          className="text-error flex items-center gap-2"
                          onClick={() => deleteUserHandler(user._id)}
                        >
                          <Trash className="w-4 h-4" /> Delete User
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllUsersPage;