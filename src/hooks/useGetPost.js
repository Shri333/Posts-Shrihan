import { useQuery } from "react-query";
import axios from "axios";

function useGetPost(id) {
  const { isLoading, isError, data } = useQuery(
    ["post", id],
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/${id}`
      );
      return response.data;
    },
    { retry: false }
  );

  return { isLoading, isError, data };
}

export default useGetPost;
