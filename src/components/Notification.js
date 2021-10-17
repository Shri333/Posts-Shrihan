import { useContext } from "react";
import { IoCloseCircle } from "react-icons/io5";
import SetNotificationContext from "../context";

function Notification({ type, message }) {
  const setNotification = useContext(SetNotificationContext);

  if (!type) return null;

  return (
    <div
      className={`absolute ease-in-out rounded-xl inset-x-0 bottom-0 w-max mx-auto ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } flex justify-center items-center px-6 py-3 mb-3`}
    >
      <div className="font-bold mr-2">{message}</div>
      <button
        onClick={() => setNotification(null, "")}
      >
        <IoCloseCircle className="transform scale-125" />
      </button>
    </div>
  );
}

export default Notification;
