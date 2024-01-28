import React, { useEffect, useState } from "react";
import "./search.scss";
import { useGetVideosQuery } from "../../contexts/apiSlice";
import { ColorRing } from "react-loader-spinner";
import SearchCard from "./SearchCard";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation().search;
  const [searchQuery, setSearchQuery] = useState(location || "");

  useEffect(() => {
    const queryParams = new URLSearchParams(location);
    const query = queryParams.get("query");
    setSearchQuery(query || "");
  }, [location]);

  useEffect(() => {
    const savedQuery = localStorage.getItem("searchQuery");
    if (savedQuery) {
      setSearchQuery(savedQuery);
    }
  }, []);

  const { data: videos, isLoading, error } = useGetVideosQuery();

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

  console.log("Original searchQuery:", searchQuery);
  const normalizedQuery = searchQuery.toLowerCase();
  console.log("Normalized query:", normalizedQuery);
  const filteredVideos = videos?.filter(
    (item) =>
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.userName.toLowerCase().includes(normalizedQuery)
  );

  return (
    <div className="search__block">
      {filteredVideos?.length > 0 ? (
        filteredVideos.map((item) => <SearchCard item={item} key={item.id} />)
      ) : (
        <p>Нет результатов по вашему запросу</p>
      )}
    </div>
  );
};

export default Search;
