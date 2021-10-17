import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { useCallback, useEffect } from "react";
import useFormInput from "../hooks/useFormInput";
import useGetPosts from "../hooks/useGetPosts";
import useEditVotes from "../hooks/useEditVotes";
import dateString from "../dateString";

function PostsWrapper() {
  const [filter, onFilterChange] = useFormInput("");
  const [order, onOrderChange] = useFormInput("newest");

  return (
    <div className="container mx-auto p-4 sm:p-12">
      <div className="flex">
        <div className="flex-1 text-5xl font-bold">Posts</div>
        <Link
          to="/new_post"
          className="rounded-lg bg-black text-white px-6 text-xl font-bold hover:bg-gray-700 flex items-center"
        >
          New Post
        </Link>
      </div>
      <form className="flex flex-col sm:flex-row items-center mt-5">
        <input
          type="text"
          placeholder="Search"
          value={filter}
          onChange={onFilterChange}
          className="rounded-md w-full sm:flex-1 sm:mr-5 border border-gray-300 py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="mt-3 sm:mt-0 flex">
          <div className="font-bold mr-1">Sort By:</div>
          <select
            value={order}
            onChange={onOrderChange}
            className="text-center focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="most_votes">Most Votes</option>
            <option value="least_votes">Least Votes</option>
          </select>
        </div>
      </form>
      <Posts filter={filter} order={order} />
    </div>
  );
}

function Posts({ filter, order }) {
  const queryClient = useQueryClient();
  const { isLoading, data } = useGetPosts();
  const { isLoading: mutationLoading, mutate } = useEditVotes();

  const filterFn = useCallback(
    (post) => {
      const { title, username, content, votes } = post;
      const total = (title + username + content + votes).toLowerCase();
      return total.includes(filter.toLowerCase());
    },
    [filter]
  );

  const sortFn = useCallback(
    (a, b) => {
      if (order === "newest") {
        if (b.date - a.date === 0) return b.votes - a.votes;
        else return b.date - a.date;
      } else if (order === "oldest") {
        if (a.date - b.date === 0) return a.votes - b.dates;
        else return a.date - b.date;
      } else if (order === "most_votes") {
        if (b.votes - a.votes === 0) return b.date - a.date;
        else return b.votes - a.votes;
      } else {
        if (a.votes - b.votes === 0) return b.date - a.date;
        else return a.votes - b.votes;
      }
    },
    [order]
  );

  useEffect(() => {
    for (const [key, data] of queryClient.getQueriesData({ active: false }))
      if (!data) queryClient.removeQueries(key);
  }, [queryClient]);

  if (isLoading)
    return (
      <div className="h-52 flex justify-center items-center">
        <div
          style={{ borderTopColor: "transparent" }}
          className="animate-spin rounded-full h-16 w-16 border-4 border-black"
        ></div>
      </div>
    );

  return (
    <div className="mt-5">
      {data
        .filter(filterFn)
        .sort(sortFn)
        .map((p) => (
          <Link
            key={p.id}
            to={`/${p.id}`}
            className={`flex p-5 mt-5 border border-gray-300 hover:bg-gray-100 ${
              mutationLoading && "pointer-events-none"
            }`}
          >
            <div className="flex flex-col items-center mr-5 self-center">
              <button
                onClick={(event) => {
                  mutate({ id: p.id, votes: p.votes + 1 });
                  event.preventDefault();
                }}
                disabled={mutationLoading}
              >
                <GoArrowUp className="transform scale-165 cursor-pointer hover:text-green-500" />
              </button>
              <div className="my-3 font-bold">{p.votes}</div>
              <button
                onClick={(event) => {
                  mutate({ id: p.id, votes: p.votes - 1 });
                  event.preventDefault();
                }}
                disabled={mutationLoading}
              >
                <GoArrowDown className="transform scale-165 cursor-pointer hover:text-red-500" />
              </button>
            </div>
            <div className="flex-1">
              <div className="text-xl font-bold">{p.title}</div>
              <div className="text-gray-500 mt-1">{p.username}</div>
              <div className="mt-3">{p.content}</div>
            </div>
            <div>
              {(() => {
                const { time, day } = dateString(p.date);
                return (
                  <>
                    <div>{time}</div>
                    <div>{day}</div>
                  </>
                );
              })()}
            </div>
          </Link>
        ))}
    </div>
  );
}

export default PostsWrapper;
