import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { useUpdateVideoMutation } from "../../contexts/apiSlice";

const AddToPlaylist = ({ item }) => {
  const navigate = useNavigate();
  const [updateVideo, { isLoading: isUpdateLoading }] =
    useUpdateVideoMutation();

  const [watchLater, setWatchLater] = useState([]);
  const {
    user: { email },
  } = useAuth();

  const [isAddedToWatchLater, setIsAddedToWatchLater] = useState(
    item?.watchLater.includes(email)
  );

  useEffect(() => {
    setIsAddedToWatchLater(item?.watchLater.includes(email));
  }, [item.watchLater, email]);

  const handleAddVideo = async () => {
    if (email) {
      let updatedWatchLater;

      if (!item?.watchLater.includes(email) && !isAddedToWatchLater) {
        updatedWatchLater = [...watchLater, email];
      } else {
        updatedWatchLater = watchLater.filter(
          (emailInList) => emailInList !== email
        );
      }

      setWatchLater(updatedWatchLater);

      try {
        const newVideo = {
          id: item.id,
          editedVideo: { watchLater: updatedWatchLater },
        };
        const response = await updateVideo(newVideo);
        setIsAddedToWatchLater(!isAddedToWatchLater);
      } catch (error) {
        console.log("Error updating video:", error);
      }
    } else {
      console.log(
        "Вы не авторизованы. Для добавления в плейлист вам нужно войти в систему."
      );
      navigate("/auth");
    }
  };

  return (
    <div
      onClick={handleAddVideo}
      className="playlist-icon"
      style={{
        fill: "#f1f1f1",
      }}
    >
      {isAddedToWatchLater ? (
        <svg
          fill="#ffffff"
          viewBox="0 0 1920 1920"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
          className="playlist-icon"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M960 1807.059c-467.125 0-847.059-379.934-847.059-847.059 0-467.125 379.934-847.059 847.059-847.059 467.125 0 847.059 379.934 847.059 847.059 0 467.125-379.934 847.059-847.059 847.059M960 0C430.645 0 0 430.645 0 960s430.645 960 960 960 960-430.645 960-960S1489.355 0 960 0M854.344 1157.975 583.059 886.69l-79.85 79.85 351.135 351.133L1454.4 717.617l-79.85-79.85-520.206 520.208Z"
              fillRule="evenodd"
            ></path>{" "}
          </g>
        </svg>
      ) : (
        <svg
          height="24"
          viewBox="0 0 24 24"
          width="24"
          focusable="false"
          style={{
            pointerEvents: "none",
            display: "block",
            width: "100%",
            height: "100%",
          }}
          className="playlist-icon"
        >
          <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"></path>
        </svg>
      )}
    </div>
  );
};

export default AddToPlaylist;
