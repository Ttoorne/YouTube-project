import React, { useState } from "react";
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

  const handleAddVideo = async () => {
    if (email) {
      if (!item?.watchLater.includes(email)) {
        const updatedWatchLater = [...watchLater, email];
        setWatchLater(updatedWatchLater);

        try {
          const newVideo = {
            id: item.id,
            editedVideo: { watchLater: updatedWatchLater },
          };
          const response = await updateVideo(newVideo);
        } catch (error) {
          console.log("Error updating video:", error);
        }
      } else {
        console.log("Вы уже поставили лайк для этого видео.");
      }
    } else {
      console.log(
        "Вы не авторизованы. Для постановки лайка вам нужно войти в систему."
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
    </div>
  );
};

export default AddToPlaylist;
