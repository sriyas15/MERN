import { useState } from "react";
import { useDeleteCommentMutation, useEditCommentMutation, usePostCommentMutation } from "../features/comments/commentsApiSlice";
import toast from "react-hot-toast";
import { timeAgo } from "../utils/timeAgo";
import { Edit, Trash, Ellipsis } from "lucide-react";
import defaultAvatar from "../assets/defaultAvatar.png"

const CommentsCard = ({ commentData, blogId, userDetails }) => {

  const [commentText, setCommentText] = useState("");
  const [editedComment, setEditedComment] = useState("");

  const [postComment, { isLoading }] = usePostCommentMutation();
  const [editComment] = useEditCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const isDisabled = !commentText.trim();

  // ⭐ For handling dropdown toggle
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleAddComment = async (blogId) => {
    if (!commentText.trim()) {
      toast.error("Write your comment");
      return;
    }
    try {
      await postComment({ blogId, content: commentText }).unwrap();
      setCommentText("");
      toast.success("Comment added");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const commentEditBtn = async (commentText,id) => {

    if (!editedComment.trim()) {
      toast.error("Please enter your comment");
      return;
    }

    try {
      await editComment({ editedComment, id }).unwrap();
      toast.success("Comment Updated");
      setEditedComment("");
      setOpenMenuId(null);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const commentDeleteBtn = async (id) => {
    if (!window.confirm("Are you sure,want to delete your comment?")) {
      return;
    }

    try {
      await deleteComment(id).unwrap();
      toast.success("Comment Deleted");
      setOpenMenuId(null);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="p-4 border rounded-xl my-4">

      {/* Show existing comments */}
      {commentData?.getAllComm?.length > 0 ? (
        commentData.getAllComm.map((c) => (
          <div className="mb-8 border-b pb-6 relative" key={c._id}>

            {/* ⭐ Dots menu for owner */}
            {(userDetails.username === c.author.username || userDetails.isAdmin) && (
              <div className="absolute right-2 top-2">

                <button onClick={() => toggleMenu(c._id)}>
                  <Ellipsis className="cursor-pointer" />
                </button>

                {openMenuId === c._id && (
                  <ul className="menu bg-base-100 absolute right-0 mt-2 rounded-xl shadow-xl p-2 z-50 w-40">

                    <li>
                      <button onClick={() => {commentEditBtn(commentText,c._id),setCommentText(commentText)}}>
                        <Edit /> Edit
                      </button>
                    </li>

                    <li>
                      <button className="text-red-500" onClick={() => commentDeleteBtn(c._id)}>
                        <Trash /> Delete
                      </button>
                    </li>

                  </ul>
                )}
              </div>
            )}

            {/* COMMENT CONTENT */}
            <div className="flex gap-3">
              <img
                src={c.author.avatar?.url || defaultAvatar}
                alt={c.author.name}
                className="w-9 h-9 rounded-full"
              />
              <div>
                <h1 className="text-lg font-semibold">{c.author.name}</h1>
                <p className="text-xs text-gray-500 -mt-1">@{c.author.username}</p>
              </div>

              <span className="absolute right-2 bottom-1 text-xs text-gray-500">
                {timeAgo(c.updatedAt)}
              </span>
            </div>

            <p className="text-sm py-2 mt-1">{c.content}</p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No comments yet</p>
      )}

      {/* ADD COMMENT */}
      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="w-full mt-3 p-2 border rounded-lg"
        />

        <button
          onClick={() => handleAddComment(blogId)}
          disabled={isLoading || isDisabled}
          className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>

    </div>
  );
};

export default CommentsCard;
