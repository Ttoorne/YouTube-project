import React from "react";
import "./history.css";
import { useProduct } from "../../contexts/ProductContextProvider";
import HistoryCard from "./HistoryCard";

const History = () => {
  const { history } = useProduct();
  console.log(history);

  return history.length > 0 ? (
    <div className="history__container">
      {history.map((item) => (
        <HistoryCard item={item} key={item.id} />
      ))}
    </div>
  ) : (
    <div className="history__empty">
      <img
        className="history__img"
        src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png"
        alt=""
      />
      <h2>Ваша история пуста!</h2>
    </div>
  );
};

export default History;
