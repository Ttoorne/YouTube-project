import React, { useEffect, useRef, useState } from "react";
import "./videoListCard.css";
import { useNavigate } from "react-router-dom";
import { useFormat } from "../../contexts/FormattedContextProvider";

const VideoListCard = ({ item }) => {
  const navigate = useNavigate();
  const { formatRelativeTime, formatViews } = useFormat();

  const formattedDate = formatRelativeTime(item.createdAt);
  const formattedViews = formatViews(item.views);

  // item.title
  const MAX_HEIGHT = 40;
  const titleRef = useRef(null);
  const [truncatedTitle, setTruncatedTitle] = useState("");

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

  return (
    <div
      title={item.title}
      className="video-list-card"
      onClick={() => navigate(`/details/${item.id}`)}
    >
      <img src={item.preview} alt="" className="video-list-card__img" />
      <div className="video-list-card__info">
        <p className="video-list-card__title" ref={titleRef}>
          {truncatedTitle}
        </p>
        <p className="video-list-card__username">{item.userName}</p>
        <div className="video-list-card__bottom">
          <p className="video-list-card__views">{formattedViews}</p>
          <p>{"•"}</p>
          <p className="video-list-card__date">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoListCard;
