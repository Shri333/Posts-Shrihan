import { useQuery } from "react-query";
import axios from "axios";

function useGetPosts() {
  const { isLoading, data } = useQuery("posts", async () => {
    const response = await axios.get(process.env.REACT_APP_API_URL);
    return response.data;
  });

  return { isLoading, data };
}

export default useGetPosts;
