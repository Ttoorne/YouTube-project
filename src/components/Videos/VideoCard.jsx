import React, { useRef, useState } from "react";
import "./videoCard.css";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import "moment/locale/ru";
import { useProduct } from "../../contexts/ProductContextProvider";
import { useAuth } from "../../contexts/AuthContextProvider";
import videoDeleteWhite from "../../assets/video__delete_white.svg";
import videoDeleteRed from "../../assets/video__delete_red.svg";
import videoEditWhite from "../../assets/edit-svg-white.svg";
import videoEditBlue from "../../assets/edit-svg-blue.svg";
import { ADMIN } from "../../helpers/consts";
import AddToPlaylist from "../AddToPlaylist/AddToPlaylist";
import { useDeleteVideoMutation } from "../../contexts/apiSlice";

moment.locale("ru");

const formatRelativeTime = (date) => {
  const diff = moment().diff(date, "minutes");
  if (diff === 0) {
    return "только что";
  } else if (diff < 60) {
    return `${diff} ${pluralize(diff, ["минуту", "минуты", "минут"])} назад`;
  } else if (diff < 1440) {
    const hours = Math.floor(diff / 60);
    return `${hours} ${pluralize(hours, ["час", "часа", "часов"])} назад`;
  } else if (diff < 10080) {
    // 7 days * 24 hours * 60 minutes
    const days = Math.floor(diff / 1440);
    return `${days} ${pluralize(days, ["день", "дня", "дней"])} назад`;
  } else if (diff < 43200) {
    const weeks = Math.floor(diff / 10080);
    return `${weeks} ${pluralize(weeks, ["неделю", "недели", "недель"])} назад`;
  } else if (diff < 525600) {
    // 365 days * 24 hours * 60 minutes
    const months = Math.floor(diff / 43200);
    return `${months} ${pluralize(months, [
      "месяц",
      "месяца",
      "месяцев",
    ])} назад`;
  } else {
    const years = Math.floor(diff / 525600);
    return `${years} ${pluralize(years, ["год", "года", "лет"])} назад`;
  }
};

const pluralize = (count, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[
    count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
  ];
};
const VideoCard = ({ item }) => {
  const navigate = useNavigate();
  const formattedDate = formatRelativeTime(item.createdAt);

  const [deleteVideo] = useDeleteVideoMutation();
  const {
    user: { email },
    user,
  } = useAuth();

  const truncatedTitle =
    item.title.length > 85 ? item.title.substring(0, 85) + "..." : item.title;

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);

  const [isEntered, setIsEntered] = useState(false);

  return (
    <div className="video-card">
      <div className="video-card__img-container" style={{ overflow: "hidden" }}>
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
            title={`Добавить в "Смотреть позже"`}
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
          <p className="video-card__title" title={item.title}>
            {truncatedTitle}
          </p>
          <p className="video-card__user">{item.userName}</p>
          <p className="video-card__date">{formattedDate}</p>
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
