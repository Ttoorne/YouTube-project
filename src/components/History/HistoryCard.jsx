import React from "react";
import "./historyCard.css";
import { useNavigate } from "react-router-dom";

const HistoryCard = ({ item }) => {
  const truncatedTitle =
    item.title.length > 66 ? item.title.substring(0, 66) + "..." : item.title;

  const truncatedDescr =
    item.description.length > 360
      ? item.description.substring(0, 360) + "..."
      : item.description;

  const navigate = useNavigate();

  return (
    <div className="history-card">
      <img
        src={item.preview}
        alt=""
        className="history-card__img"
        onClick={() => navigate(`/details/${item.id}`)}
      />
      <div
        className="history-card__info"
        onClick={() => navigate(`/details/${item.id}`)}
      >
        <p className="history-card__title" title={item.title}>
          {truncatedTitle}
        </p>
        <p className="history-card__username" title={item.userName}>
          {item.userName}
        </p>
        <p className="history-card__descr" title={item.description}>
          {truncatedDescr}
        </p>
      </div>
    </div>
  );
};

export default HistoryCard;
