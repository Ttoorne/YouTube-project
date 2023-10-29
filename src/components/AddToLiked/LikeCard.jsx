import React from "react";
import { useNavigate } from "react-router-dom";
import "./likeCard.css";
import moment from "moment";

moment.locale("ru");

const pluralize = (count, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[
    count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
  ];
};

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

const LikeCard = ({ item }) => {
  const navigate = useNavigate();
  const formattedDate = formatRelativeTime(item.createdAt);

  return (
    <div
      className="like-card"
      title={item.title}
      onClick={() => navigate(`/details/${item.id}`)}
    >
      <img className="like-card__img" src={item.preview} alt="" />
      <div className="like-card__right">
        <p className="like-card__title">{item.title}</p>
        <div className="like-card__descr">
          <p>{item.userName}</p>
          <p>*</p>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default LikeCard;
