import React from "react";
import { useNavigate } from "react-router-dom";
import "./likeCard.css";
import { useFormat } from "../../contexts/FormattedContextProvider";

const LikeCard = ({ item }) => {
  const navigate = useNavigate();
  const { formatRelativeTime, formatViews } = useFormat();

  const formattedDate = formatRelativeTime(item.createdAt);
  const formattedViews = formatViews(item.views);

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
          <p>{"•"}</p>
          <p>{formattedDate}</p>
          <p>{"•"}</p>
          <p>{formattedViews}</p>
        </div>
      </div>
    </div>
  );
};

export default LikeCard;
