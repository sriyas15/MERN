import { useLocation } from "react-router-dom";
import defaultCover from "../assets/default-cover.png";
import { timeAgo } from "../utils/timeAgo";

const ReadblogData = () => {


const location = useLocation();
const { blog } = location.state || {}
console.log(blog);

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/552/552721.png";


if (!blog){
    return (
        <div className="text-center text-red-500 mt-20 text-xl">
        Blog data not found.
        </div>
    );
}

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">

      {/* Cover Image */}
      <div className="w-full rounded-xl overflow-hidden shadow-md mb-6">
        <img
          src={blog?.coverImage?.url || defaultCover}
          alt="blog Cover"
          className="w-full h-72 object-cover"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        {blog?.title}
      </h1>

      {/* Author */}
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <img
          src={blog?.author?.avatar?.url || defaultAvatar}
          alt="Author Avatar"
          className="w-12 h-12 rounded-full ring ring-primary ring-offset-2"
        />
        <div>
          <p className="font-semibold text-lg">{blog?.author?.name}</p>
          <p className="text-gray-500 text-sm">@{blog?.author?.username}</p>
          <p className="text-xs text-gray-400">Posted {timeAgo(blog?.createdAt)}</p>
        </div>
      </div>

      {/* Content */}
      <div
        className="prose max-w-none prose-img:rounded-xl prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: blog?.content }}
      ></div>

    </div>
  );
};


export default ReadblogData;
