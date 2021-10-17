import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useHistory } from "react-router";
import { useContext } from "react";
import SetNotificationContext from "../context";

function useCreateComment(id, setLoading) {
  const queryClient = useQueryClient();
  const history = useHistory();
  const setNotification = useContext(SetNotificationContext);

  const { mutate } = useMutation(
    async (data) => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/${id}/comments`,
        data
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        const post = queryClient.getQueryData(["post", id]);
        queryClient.setQueryData(["post", id], { ...post, comments: data });
        setNotification("success", "Comment created");
        history.push(`/${id}`);
      },
      onError: (error) => {
        setNotification("failure", error.response.data);
        setLoading(false);
      }
    }
  );

  return mutate;
}

export default useCreateComment;