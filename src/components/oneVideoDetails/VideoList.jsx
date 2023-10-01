import React, { useEffect, useState } from "react";
import { useProduct } from "../../contexts/ProductContextProvider";
import VideoListCard from "./VideoListCard";
import "./videoList.css";
import { useParams } from "react-router-dom";
import { useGetVideosQuery } from "../../contexts/apiSlice";
import { ColorRing, Vortex } from "react-loader-spinner";

const VideoList = () => {
  const { data: videos, isLoading, error } = useGetVideosQuery();

  const { id } = useParams();

  const [shuffledVideos, setShuffledVideos] = useState([]);

  useEffect(() => {
    const shuffleVideos = async () => {
      if (videos && videos.length > 0) {
        const shuffled = [...videos];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setShuffledVideos(shuffled);
      }
    };

    shuffleVideos();
  }, [id]);

  return (
    <div className="video-list__container">
      {shuffledVideos.map((item) => (
        <VideoListCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default VideoList;
