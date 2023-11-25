import React, { useEffect, useRef, useState } from "react";
import "./yourVideoCard.css";
import { useNavigate } from "react-router-dom";
import videoDeleteWhite from "../../assets/video__delete_white.svg";
import videoDeleteRed from "../../assets/video__delete_red.svg";
import videoEditWhite from "../../assets/edit-svg-white.svg";
import videoEditBlue from "../../assets/edit-svg-blue.svg";
import { useProduct } from "../../contexts/ProductContextProvider";
import { useFormat } from "../../contexts/FormattedContextProvider";

const YourVideoCard = ({ item }) => {
  const navigate = useNavigate();
  const { formatRelativeTime, formatViews } = useFormat();

  const formattedDate = formatRelativeTime(item.createdAt);
  const formattedViews = formatViews(item.views);

  const { deleteVideo } = useProduct();

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

    return () => {
      if (titleRef.current) {
        titleRef.current.innerText = item.title;
      }
    };
  }, [item.title, MAX_HEIGHT]);
  // item.title

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);

  return (
    <div className="your-video-card">
      <div className="your-video-card__container">
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
          <p className="your-video-card__title" ref={titleRef}>
            {truncatedTitle}
          </p>
          <p className="your-video-card__user">{item.userName}</p>
          <div className="video-card__bottom">
            <p className="your-video-card__date">{formattedDate}</p>
            <p>{"•"}</p>
            <p className="your-video-card__date">{formattedViews}</p>
          </div>
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
