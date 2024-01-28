import React, { useEffect, useRef, useState } from "react";
import "./searchCard.scss";
import { useNavigate } from "react-router-dom";
import { useFormat } from "../../contexts/FormattedContextProvider";

const SearchCard = ({ item }) => {
  const navigate = useNavigate();

  const { formatRelativeTime, formatViews } = useFormat();

  const formattedDate = formatRelativeTime(item.createdAt);
  const formattedViews = formatViews(item.views);

  return (
    <div className="search-card">
      <img
        className="search-card__img"
        src={item.preview}
        alt=""
        onClick={() => navigate(`/details/${item.id}`)}
      />
      <div
        className="search-card__descr"
        onClick={() => navigate(`/details/${item.id}`)}
      >
        <p className="search-title">{item.title}</p>
        <p className="search-view">
          {formattedViews} • {formattedDate}
        </p>
        <div className="search-card__descr_user">
          <img src={item.avatar} alt="" />
          <p>{item.userName}</p>
        </div>
        <p className="search-descr" title={item.description}>
          {item.description.slice(0, 100)}
          {item.description.length > 100 ? "..." : ""}
        </p>
      </div>
    </div>
  );
};

export default SearchCard;
