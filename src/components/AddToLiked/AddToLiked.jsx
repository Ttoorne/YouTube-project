import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContextProvider";
import { useGetVideosQuery } from "../../contexts/apiSlice";
import { ColorRing } from "react-loader-spinner";
import LikeCard from "./LikeCard";
import "./likeContainer.css";
import { useNavigate } from "react-router-dom";

const AddToLiked = () => {
  const { data: videos, isLoading, error } = useGetVideosQuery();
  const navigate = useNavigate();

  const {
    user: { email },
    getUserName,
  } = useAuth();

  const [likedVideos, setLikedVideos] = useState([]);

  useEffect(() => {
    const newVideos = [];
    const likedVideo = videos?.filter((item) =>
      item.likedUsers.some((user) =>
        user === email ? newVideos.push(item) : null
      )
    );
    setLikedVideos(newVideos);
  }, [videos]);

  const [username, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUserName = await getUserName();
      setUserName(fetchedUserName);
    };

    fetchData();
  }, [getUserName]);

  if (isLoading) {
    return (
      <div
        style={{
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ColorRing
          visible={true}
          height="90"
          width="90"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  if (error) {
    return <p>Ошибка: {error.message}</p>;
  }

  return (
    <div className="liked__container">
      <div className="liked__left">
        <div
          className="blured-picture"
          style={{
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(15, 15, 15, 1) 90%), url("${likedVideos[0]?.preview}")`,
          }}
        ></div>

        <img
          className="liked__left_img"
          src={likedVideos[0]?.preview}
          alt=""
          title="Воспроизвести"
          onClick={() => navigate(`/details/${likedVideos[0].id}`)}
        />
        <h3>Понравившиеся</h3>
        <div className="liked__left_username-block">
          <p id="liked__left_username">{username}</p>
          <p id="liked__left_length">{likedVideos?.length} видео</p>
        </div>
        <div
          className="liked__left_play"
          title="Воспроизвести"
          onClick={() => navigate(`/details/${likedVideos[0].id}`)}
        >
          <div className="liked__left_play-block">
            <yt-icon style={{ width: "24px", height: "24px" }}>
              <yt-icon-shape class="style-scope yt-icon">
                <icon-shape class="yt-spec-icon-shape">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      fill: "black",
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
                    >
                      <path d="m7 4 12 8-12 8V4z"></path>
                    </svg>
                  </div>
                </icon-shape>
              </yt-icon-shape>
            </yt-icon>
          </div>
          <span>Воспроизвести</span>
        </div>
      </div>
      <div className="liked__right">
        {likedVideos?.length > 0 ? (
          likedVideos.map((item) => <LikeCard item={item} key={item.id} />)
        ) : (
          <div className="history__empty">
            <img
              className="history__img"
              src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png"
              alt=""
            />
            <h2>У вас нет понравившихся видео!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToLiked;
