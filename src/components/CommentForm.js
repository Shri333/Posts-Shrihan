import { useParams, Redirect, Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useState } from "react";
import useFormInput from "../hooks/useFormInput";
import useCreateComment from "../hooks/useCreateComment";

function CommentForm() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [username, onUsernameChange] = useFormInput("");
  const [text, onTextChange] = useFormInput("");
  const [loading, setLoading] = useState(null);
  const mutate = useCreateComment(Number(id), setLoading)

  const post = queryClient.getQueryData(["post", Number(id)]);
  if (!post) return <Redirect to={`/${id}`} />;

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    mutate({ username, text });
  };

  const className = `resize-none 
  rounded-md border border-gray-300 
  block w-full md:w-5/6 lg:w-3/4 
  xl:w-1/2 focus:outline-none 
  focus:ring focus:border-blue-300 
  px-3 py-2 mt-2 mb-5`;

  return (
    <div className="container mx-auto p-12">
      <Link to={`/${id}`} className="text-blue-500">
        &lt; Back
      </Link>
      <div className="text-4xl font-bold mt-10">Comment</div>
      <form onSubmit={onSubmit} className="mt-5">
        <div className="ml-3 font-bold">Username:</div>
        <textarea
          rows="1"
          type="text"
          placeholder="Username"
          value={username}
          onChange={onUsernameChange}
          className={className}
        ></textarea>
        <div className="ml-3 font-bold">Text:</div>
        <textarea
          rows="1"
          type="text"
          placeholder="Text"
          value={text}
          onChange={onTextChange}
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

export default CommentForm;
