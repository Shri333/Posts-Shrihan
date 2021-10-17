import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

function useEditVotes() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async (data) => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/${data.id}/votes`,
        data
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        const post = queryClient.getQueryData(["post", data.id]);
        if (post)
          queryClient.setQueryData(["post", data.id], {
            ...data,
            comments: post.comments
          });
        const posts = queryClient.getQueryData("posts");
        if (posts)
          queryClient.setQueryData(
            "posts",
            posts.map((p) => (p.id === data.id ? data : p))
          );
      }
    }
  );

  return { isLoading, mutate };
}

export default useEditVotes;
