import React, { useEffect, useState } from "react";
import { useProduct } from "../../contexts/ProductContextProvider";
import VideoListCard from "./VideoListCard";
import "./videoList.css";
import { useParams } from "react-router-dom";
import { useGetVideosQuery } from "../../contexts/apiSlice";
import { ColorRing } from "react-loader-spinner";

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
  }, [videos?.length]);

  if (isLoading) {
    return (
      <div
        style={{
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ColorRing
          visible={true}
          height="90"
          width="90"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  const filteredVideos = shuffledVideos.filter((item) => item.id !== id);

  return (
    <div className="video-list__container">
      {filteredVideos.map((item) => (
        <VideoListCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default VideoList;
