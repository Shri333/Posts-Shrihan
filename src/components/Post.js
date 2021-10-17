import { useParams, Link, Redirect } from "react-router-dom";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import useGetPost from "../hooks/useGetPost";
import useEditVotes from "../hooks/useEditVotes";
import dateString from "../dateString";

function Post() {
  const { id } = useParams();
  const { isLoading, isError, data } = useGetPost(Number(id));
  const { isLoading: mutationLoading, mutate } = useEditVotes();

  if (isLoading) return null;

  if (isError) return <Redirect to="/" />;

  const { time, day } = dateString(data.date);

  return (
    <div className="container mx-auto p-6 sm:p-12">
      <Link to="/" className="text-blue-500">
        &lt; Back
      </Link>
      <div className="flex mt-10">
        <div className="flex flex-col items-center mr-7 mt-2">
          <button
            onClick={() => mutate({ id: data.id, votes: data.votes + 1 })}
            disabled={mutationLoading}
          >
            <GoArrowUp className="transform scale-200 cursor-pointer hover:text-green-500" />
          </button>
          <div className="my-3 font-bold text-xl">{data.votes}</div>
          <button
            onClick={() => mutate({ id: data.id, votes: data.votes - 1 })}
            disabled={mutationLoading}
          >
            <GoArrowDown className="transform scale-200 cursor-pointer hover:text-red-500" />
          </button>
        </div>
        <div className="flex-1">
          <div className="text-4xl font-bold">{data.title}</div>
          <div className="sm:hidden text-xl mt-1">
            <div>{time + " " + day}</div>
          </div>
          <div className="text-xl text-gray-500 mt-1">{data.username}</div>
          <div className="text-xl mt-3">{data.content}</div>
          <div className="text-4xl font-bold mt-10 mb-5">Comments</div>
          <ul className="my-7 list-disc ml-5">
            {data.comments.map((c) => (
              <li key={c.id} className="mt-2">
                <div>{c.text}</div>
                <div className="text-gray-500">{c.username}</div>
              </li>
            ))}
          </ul>
          <Link
            to={`/${id}/new_comment`}
            className="rounded-lg px-6 py-3 font-bold bg-black text-white"
          >
            Comment
          </Link>
        </div>
        <div className="hidden sm:block text-xl text-right">
          <div>{time}</div>
          <div>{day}</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
