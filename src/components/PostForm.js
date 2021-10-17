import { Link } from "react-router-dom";
import { useState } from "react";
import useFormInput from "../hooks/useFormInput";
import useCreatePost from "../hooks/useCreatePost";

function PostForm() {
  const [title, onTitleChange] = useFormInput("");
  const [username, onUsernameChange] = useFormInput("");
  const [content, onContentChange] = useFormInput("");
  const [loading, setLoading] = useState(false);
  const mutate = useCreatePost(setLoading);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    mutate({ title, username, content });
  };

  const className = `resize-none 
  rounded-md border border-gray-300 
  block w-full md:w-5/6 lg:w-3/4 
  xl:w-1/2 focus:outline-none 
  focus:ring focus:border-blue-300 
  px-3 py-2 mt-2 mb-5`;

  return (
    <div className="container mx-auto p-12">
      <Link to="/" className="text-blue-500">
        &lt; Back
      </Link>
      <div className="text-4xl font-bold mt-5">Create New Post</div>
      <form onSubmit={onSubmit} className="mt-5">
        <div className="ml-3 font-bold">Title:</div>
        <textarea
          rows="1"
          type="text"
          placeholder="Title"
          value={title}
          onChange={onTitleChange}
          className={className}
        ></textarea>
        <div className="ml-3 font-bold">Username:</div>
        <textarea
          rows="1"
          type="text"
          placeholder="Username"
          value={username}
          onChange={onUsernameChange}
          className={className}
        ></textarea>
        <div className="ml-3 font-bold">Content:</div>
        <textarea
          rows="5"
          type="text"
          placeholder="Content"
          value={content}
          onChange={onContentChange}
          className={className}
        ></textarea>
        <button
          type="submit"
          className={`rounded-lg px-6 py-2 mt-1 text-white font-bold hover:bg-gray-500 ${
            loading ? "bg-gray-500" : "bg-black"
          }`}
        >
          {loading ? (
            <div className="flex items-center">
              <div
                style={{ borderTopColor: "transparent" }}
                className="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2"
              ></div>
              Loading...
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}

export default PostForm;
