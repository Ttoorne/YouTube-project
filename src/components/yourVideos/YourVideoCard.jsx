import React, { useState } from "react";
import "./yourVideoCard.css";
import { useNavigate } from "react-router-dom";
import videoDeleteWhite from "../../assets/video__delete_white.svg";
import videoDeleteRed from "../../assets/video__delete_red.svg";
import videoEditWhite from "../../assets/edit-svg-white.svg";
import videoEditBlue from "../../assets/edit-svg-blue.svg";
import moment from "moment/moment";
import "moment/locale/ru";
import { useProduct } from "../../contexts/ProductContextProvider";
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

const YourVideoCard = ({ item }) => {
  const navigate = useNavigate();

  const formattedDate = formatRelativeTime(item.createdAt);
  const { deleteVideo } = useProduct();

  const truncatedTitle =
    item.title.length > 85 ? item.title.substring(0, 85) + "..." : item.title;

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);

  return (
    <div className="your-video-card">
      <div style={{ overflow: "hidden" }}>
        <img
          src={item.preview}
          alt={item.title}
          className="your-video-card__img"
          onClick={() => navigate(`/details/${item.id}`)}
        />
      </div>

      <div className="your-video-card__info">
        <div className="your-video-card__avatar">
          <img
            src={item.avatar}
            alt={item.userName}
            onClick={() => navigate(`/details/${item.id}`)}
          />
        </div>
        <div
          className="your-video-card__descr"
          onClick={() => navigate(`/details/${item.id}`)}
        >
          <p className="your-video-card__title">{truncatedTitle}</p>
          <p className="your-video-card__user">{item.userName}</p>
          <p className="your-video-card__date">{formattedDate}</p>
        </div>
      </div>

      <div className="your-video-card__func">
        <img
          title="Изменить видео"
          src={isHoveredEdit ? videoEditBlue : videoEditWhite}
          className="your-video-card__edit-svg"
          alt=""
          onMouseEnter={() => setIsHoveredEdit(true)}
          onMouseLeave={() => setIsHoveredEdit(false)}
          onClick={() => navigate(`/edit/${item.id}`)}
        />
        <img
          title="Удалить видео"
          src={isHovered ? videoDeleteRed : videoDeleteWhite}
          className="your-video-card__delete-svg"
          alt=""
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => deleteVideo(item.id)}
        />
      </div>
    </div>
  );
};

export default YourVideoCard;
