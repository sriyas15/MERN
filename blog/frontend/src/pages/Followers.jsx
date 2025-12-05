import { useLocation, Link } from "react-router-dom";

const Followers = () => {
  const location = useLocation();
  const followers = location.state?.followers || [];
console.log(followers)
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/552/552721.png";

  return (
    <div className="min-h-screen bg-base-100 py-6">
      <h1 className="text-center text-2xl font-bold text-primary mb-6">
        Followers
      </h1>

      <div className="bg-base-200 shadow-lg rounded-xl mx-auto max-w-4xl p-4">
        
        {/* Empty state */}
        {followers.length === 0 && (
          <p className="text-center text-gray-500 py-10 text-lg">
            No followers yet.
          </p>
        )}

        {/* Followers list */}
        <div className="divide-y divide-gray-300">
          {followers.map((person) => (
            <>
              <Link to={`/profile/${person._id}`} key={person._id}
                className="flex items-center gap-4 py-4 px-2 hover:bg-base-300 rounded-lg transition-all cursor-pointer">
                <img className="w-16 h-16 rounded-full ring ring-primary/40"
                  src={person?.avatar?.url || defaultImage} alt={person.name}/>

                <div>
                  <h2 className="text-lg font-semibold">{person.name}</h2>
                  <p className="text-sm text-gray-500">@{person.username}</p>
                </div>
              </Link>
              
            </>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Followers;
