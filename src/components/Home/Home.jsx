import React, { useEffect, useState } from "react";
import "./home.css";
import { useProduct } from "../../contexts/ProductContextProvider";
import VideoCard from "../Videos/VideoCard";
import { useGetVideosQuery } from "../../contexts/apiSlice";
import { ColorRing } from "react-loader-spinner";
import NotFoundPage from "../../pages/NotFoundPage";

const Home = () => {
  const { data: videos, isLoading, error } = useGetVideosQuery();

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

  if (error || shuffledVideos?.length == 0) {
    return <NotFoundPage />;
  }

  return (
    <div className="home">
      {shuffledVideos.map((item) => (
        <VideoCard item={item} key={item.id} />
      ))}{" "}
    </div>
  );
};

export default Home;
