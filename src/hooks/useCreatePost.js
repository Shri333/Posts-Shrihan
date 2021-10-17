import { useQueryClient, useMutation } from "react-query";
import { useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import SetNotificationContext from "../context";

function useCreatePost(setLoading) {
  const queryClient = useQueryClient();
  const setNotification = useContext(SetNotificationContext);
  const history = useHistory();

  const { mutate } = useMutation(
    async (post) => {
      const response = await axios.post(process.env.REACT_APP_API_URL, post);
      return response.data;
    },
    {
      onSuccess: async () => {
        await queryClient.refetchQueries("posts");
        history.push("/");
        setNotification("success", "Post created");
      },
      onError: (error) => {
        setNotification("failure", error.response.data);
        setLoading(false);
      }
    }
  );

  return mutate;
}

export default useCreatePost;
