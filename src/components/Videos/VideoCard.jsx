import React, { useEffect, useRef, useState } from "react";
import "./videoCard.css";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../contexts/ProductContextProvider";
import { useAuth } from "../../contexts/AuthContextProvider";
import videoDeleteWhite from "../../assets/video__delete_white.svg";
import videoDeleteRed from "../../assets/video__delete_red.svg";
import videoEditWhite from "../../assets/edit-svg-white.svg";
import videoEditBlue from "../../assets/edit-svg-blue.svg";
import { ADMIN } from "../../helpers/consts";
import AddToPlaylist from "../AddToPlaylist/AddToPlaylist";
import { useDeleteVideoMutation } from "../../contexts/apiSlice";
import { useFormat } from "../../contexts/FormattedContextProvider";

const VideoCard = ({ item }) => {
  const navigate = useNavigate();
  const { formatRelativeTime, formatViews } = useFormat();

  const formattedDate = formatRelativeTime(item.createdAt);
  const formattedViews = formatViews(item.views);

  const [deleteVideo] = useDeleteVideoMutation();
  const {
    user: { email },
    user,
  } = useAuth();

  // item.title
  const MAX_HEIGHT = 45;
  const titleRef = useRef(null);
  const [truncatedTitle, setTruncatedTitle] = useState(item.title);

  useEffect(() => {
    const truncateTextByHeight = () => {
      const element = titleRef.current;
      const originalText = element.innerText;
      let truncatedText = originalText;

      while (element.offsetHeight > MAX_HEIGHT) {
        const lastSpaceIndex = truncatedText.lastIndexOf(" ");
        truncatedText = truncatedText.substring(0, lastSpaceIndex) + "...";
        element.innerText = truncatedText;
      }

      setTruncatedTitle(truncatedText);
    };

    if (titleRef.current) {
      truncateTextByHeight();
    }

    // Cleanup function to restore original text when component unmounts
    return () => {
      if (titleRef.current) {
        titleRef.current.innerText = item.title;
      }
    };
  }, [item.title, MAX_HEIGHT]);
  // item.title

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);

  const [isEntered, setIsEntered] = useState(false);

  return (
    <div className="video-card">
      <div className="video-card__img-container">
        <img
          src={item.preview}
          title={item.title}
          className="video-card__img"
          onMouseEnter={() => setIsEntered(true)}
          onMouseLeave={() => setIsEntered(false)}
          onClick={() => navigate(`/details/${item.id}`)}
        />

        {user && isEntered ? (
          <div
            className="add-playlist"
            onMouseEnter={() => setIsEntered(true)}
            onMouseLeave={() => setIsEntered(false)}
            title={
              item?.watchLater.includes(email)
                ? `Уже добавлено в "Смотреть позже"`
                : `Добавить в "Смотреть позже"`
            }
          >
            <AddToPlaylist item={item} />
          </div>
        ) : null}
      </div>

      <div className="video-card__info">
        <div className="video-card__avatar">
          <img
            src={
              item.avatar
                ? item.avatar
                : `https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg`
            }
            alt={item.userName}
            onClick={() => navigate(`/details/${item.id}`)}
            title={item.userName}
          />
        </div>
        <div
          className="video-card__descr"
          onClick={() => navigate(`/details/${item.id}`)}
        >
          <p className="video-card__title" title={item.title} ref={titleRef}>
            {truncatedTitle}
          </p>
          <p className="video-card__user">{item.userName}</p>
          <div className="video-card__bottom">
            <p className="video-card__views">{formattedViews}</p>
            <p>{"•"}</p>
            <p className="video-card__date">{formattedDate}</p>
          </div>
        </div>
      </div>

      {email === item.email || email === ADMIN ? (
        <div className="video-card__func">
          <img
            title="Изменить видео"
            src={isHoveredEdit ? videoEditBlue : videoEditWhite}
            className="video-card__edit-svg"
            alt=""
            onMouseEnter={() => setIsHoveredEdit(true)}
            onMouseLeave={() => setIsHoveredEdit(false)}
            onClick={() => navigate(`/edit/${item.id}`)}
          />
          <img
            title="Удалить видео"
            src={isHovered ? videoDeleteRed : videoDeleteWhite}
            className="video-card__delete-svg"
            alt=""
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => deleteVideo(item.id)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default VideoCard;
