import React, { useEffect, useState } from "react";
import "./yourVideos.css";
import { useProduct } from "../../contexts/ProductContextProvider";
import { useAuth } from "../../contexts/AuthContextProvider";
import YourVideoCard from "./YourVideoCard";

const YourVideos = () => {
  const { getVideos, videos } = useProduct();
  const {
    user: { email },
  } = useAuth();

  useEffect(() => {
    getVideos();
  }, []);

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const yourVideos = videos.filter((item) => item.email === email);
    setFiltered(yourVideos);
  }, [videos, email]);

  return (
    <div className="your-videos__list">
      {filtered.map((item) => (
        <YourVideoCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default YourVideos;
