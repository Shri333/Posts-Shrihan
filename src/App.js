import { useState, useRef } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PostForm from "./components/PostForm";
import CommentForm from "./components/CommentForm";
import Post from "./components/Post";
import Posts from "./components/Posts";
import Notification from "./components/Notification";
import SetNotificationContext from "./context";

function App() {
  const [type, setType] = useState(null);
  const [message, setMessage] = useState("");
  const id = useRef();

  const setNotification = (type, message) => {
    if (id.current) clearTimeout(id.current);
    setType(type);
    setMessage(message);
    id.current = setTimeout(() => {
      setType(null);
      setMessage("");
    }, 3000);
  };

  return (
    <SetNotificationContext.Provider value={setNotification}>
      <Switch>
        <Route path="/new_post">
          <PostForm />
        </Route>
        <Route path="/:id/new_comment">
          <CommentForm />
        </Route>
        <Route path="/:id">
          <Post />
        </Route>
        <Route path="/" exact>
          <Posts />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
      <Notification type={type} message={message} />
    </SetNotificationContext.Provider>
  );
}

export default App;
