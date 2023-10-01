import React from "react";
import "./videoListCard.css";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import "moment/locale/ru";
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

const VideoListCard = ({ item }) => {
  const navigate = useNavigate();
  const formattedDate = formatRelativeTime(item.createdAt);

  const truncatedTitle =
    item.title.length > 60 ? item.title.substring(0, 60) + "..." : item.title;

  return (
    <div
      title={item.title}
      className="video-list-card"
      onClick={() => navigate(`/details/${item.id}`)}
    >
      <img src={item.preview} alt="" className="video-list-card__img" />
      <div className="video-list-card__info">
        <p className="video-list-card__title">{truncatedTitle}</p>
        <p className="video-list-card__username">{item.userName}</p>
        <p className="video-list-card__date">{formattedDate}</p>
      </div>
    </div>
  );
};

export default VideoListCard;
