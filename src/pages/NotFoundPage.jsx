import React from "react";
import "./notFound.css";

const NotFoundPage = () => {
  return (
    <div className="not-found__container">
      <img
        src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png"
        alt=""
        className="not-found__img"
      />
      <p className="not-found__title">
        Эта страница недоступна. <br /> Может, поискать что-нибудь другое?
      </p>
    </div>
  );
};

export default NotFoundPage;
