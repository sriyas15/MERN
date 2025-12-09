import { useState } from "react";
import ReactQuill from "react-quill-new";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "react-quill-new/dist/quill.snow.css";
import { useEditBlogMutation } from "../features/blog/blogApiSlice";


const EditBlogPage = () => {

  const location = useLocation();
  const blog = location.state || {};

  const [title, setTitle] = useState(blog?.post?.title);
  const [content, setContent] = useState(blog?.post?.content);
  const [coverImage, setCoverImage] = useState(blog?.post?.coverImage?.url || null);
  const [preview, setPreview] = useState(blog?.post?.coverImage?.url || null);

  

  const [ editBlog,{isLoading} ] = useEditBlogMutation();

  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setCoverImage(null);
    setPreview(null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();

    formData.append("title",title);
    formData.append("content",content);

    if (coverImage instanceof File) {
    formData.append("coverImage", coverImage);
  }


    try {
      
      const res = await editBlog({blogId:blog?.post?._id,formData}).unwrap();
      toast.success("Blog was updated");
      navigate("/feeds");
    } catch (error) {
      console.log("Error in updating the Blog");
      toast.error(error?.data?.message);
    }
  };

  // 📌 Quill Editor Toolbar Options
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center px-4 py-10">
      <div className="max-w-3xl w-full bg-base-100 shadow-xl rounded-xl p-6 space-y-6">

        <h1 className="text-2xl font-bold mb-4">Write a Blog ✍️</h1>

        <form onSubmit={submitHandler} className="space-y-5">

          {/* Title */}
          <div>
            <label className="label font-semibold">Title</label>
            <input
              type="text"
              placeholder="Enter your blog title..."
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="label font-semibold">Cover Image</label>

            {preview ? (
              <div className="relative w-full">
                <img
                  src={preview}
                  className="rounded-lg w-full h-60 object-cover border"
                  alt="Preview"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="btn btn-sm btn-error absolute top-2 right-2"
                >
                  Remove
                </button>
              </div>
            ) : (
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
                onChange={handleImage}
              />
            )}
          </div>

          {/* Text Editor */}
          <div>
            <label className="label font-semibold">Content</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={modules}
              className="bg-white rounded-xl"
              theme="snow"
            />
          </div>

          {/* Submit */}
          <button disabled={isLoading} type="submit" className="btn btn-primary btn-block mt-4">
            {isLoading ? "Updating" : "Update Blog"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditBlogPage;
