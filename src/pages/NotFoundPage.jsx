import React from "react";
import "./notFound.css";
import { useLocation, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();

  return (
    <div className="not-found__container">
      <img
        src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png"
        alt=""
        className="not-found__img"
      />

      {pathName === "/" ? (
        <p className="not-found__title">
          Список видео пуст. <br /> Будьте первыми, загрузив видео!
          <button
            style={{
              fontSize: "1.2rem",
              color: "#fff",
              background: "green",
              borderRadius: "10px",
              border: "1px solid #fff",
              padding: "2% 3%",
              marginTop: "2%",
              cursor: "pointer",
            }}
            onClick={() => navigate("/add")}
          >
            Загрузить
          </button>
        </p>
      ) : pathName === "/playlist" ? (
        <p className="not-found__title">
          <br /> Ваш плейлист пуст
        </p>
      ) : (
        <p className="not-found__title">
          Эта страница недоступна. <br /> Может, поискать что-нибудь другое?
        </p>
      )}
    </div>
  );
};

export default NotFoundPage;
