import { Ellipsis, Trash } from "lucide-react";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../features/auth/authApiSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AllUsersPage = () => {

  const { data: getAllUsers, isLoading } = useGetAllUsersQuery();
  const [ deleteUser, deleteLoad ] = useDeleteUserMutation();

  const allUsers = (getAllUsers?.users || []).filter((admin)=>!admin.isAdmin)

  const adminUser = JSON.parse(localStorage.getItem("user")) || {};

  const [ openMenu,setOpenMenu ] = useState(false);

  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/552/552721.png";

  const deleteUserHandler = async (id) => {

    if(!window.confirm("Are you sure want to delete?")){
        setOpenMenu(false);
        return;
    }
        

    try {
        await deleteUser(id).unwrap();

        toast.success("Deleted");
    } catch (error) {
        console.log("Error in Deleting User");
        toast.error(error?.data?.message || "Error in Deleting User");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Users</h1>

        {allUsers.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          allUsers.map((user) => (
            
            <div
              key={user._id}
              className="relative bg-base-100 shadow-md rounded-xl p-4 mb-4 flex items-center gap-4 border border-base-300 hover:shadow-lg transition"
            >
              {/* Avatar */}
                <img
                className="w-16 h-16 rounded-full ring ring-primary ring-offset-2"
                src={user?.avatar?.url || defaultAvatar}
                alt="avatar"
              />

              {/* Info */}
              <Link to={`/profile`} state={{user}}>
              <div>
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-gray-500 text-sm">@{user.username}</p>
              </div>
              </Link>

              {/* Dropdown */}
              <div className="absolute right-3 top-3 dropdown dropdown-right">
                <button tabIndex={0} className="btn btn-sm btn-ghost" onClick={()=>setOpenMenu(!openMenu)}>
                  <Ellipsis className="w-5 h-5" />
                </button>

                {openMenu && (
                    <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-xl w-40"
                >
                  <li>
                    <button
                      className="text-red-600 flex items-center gap-2"
                      onClick={()=>deleteUserHandler(user._id)}
                    >
                      <Trash className="w-4 h-4" /> Delete User
                    </button>
                  </li>
                </ul>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllUsersPage;
