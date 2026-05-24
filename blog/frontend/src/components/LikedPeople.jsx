import { Link, useLocation } from "react-router-dom";
import defaultAvatar from "../assets/defaultAvatar.png";
import FollowButton from "../components/FollowButton";
import { useGetProfileQuery } from "../features/auth/authApiSlice";

const LikedPeople = () => {
  const location = useLocation();
  const likes = location.state || {};
  const likedPerson = likes?.initialLikes || [];

  const { data: getProfile } = useGetProfileQuery();
  const user = getProfile?.user;

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Liked By
          <span className="ml-3 badge badge-primary badge-lg align-middle">
            {likedPerson.length}
          </span>
        </h1>
        <p className="text-base-content/50 text-sm mt-1">
          People who liked this post
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        {/* Empty state */}
        {likedPerson.length === 0 && (
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body items-center text-center py-16">
              <div className="text-5xl mb-3">🤍</div>
              <h3 className="card-title text-base-content/70">No likes yet</h3>
              <p className="text-sm text-base-content/40">
                Be the first to like this post
              </p>
            </div>
          </div>
        )}

        {/* People list */}
        {likedPerson.map((person) => (
          <div
            key={person?._id}
            className="card bg-base-200 shadow-sm hover:shadow-md hover:bg-base-300 transition-all duration-200"
          >
            <div className="card-body p-4 flex-row items-center gap-4">
              {/* Avatar */}
              <Link to={`/profile/${person._id}`} className="shrink-0">
                <div className="avatar">
                  <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={person?.avatar?.url || defaultAvatar}
                      alt={person?.name}
                    />
                  </div>
                </div>
              </Link>

              {/* Info */}
              <Link to={`/profile/${person._id}`} className="flex-1 min-w-0 group">
                <h2 className="font-bold text-base leading-tight group-hover:text-primary transition-colors truncate">
                  {person?.name}
                </h2>
                <p className="text-sm text-base-content/50 truncate">
                  @{person?.username}
                </p>
              </Link>

              {/* Follow button */}
              <div className="shrink-0">
                <FollowButton author={person} currentUser={user} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedPeople;