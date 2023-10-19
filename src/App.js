import React, { useEffect, useState } from "react";
import MainRoute from "./routes/MainRoute";
import "./app.css";
import Navbar from "./components/Navbar/Navbar";
import LeftBar from "./components/LeftBar/LeftBar";
import { useProduct } from "./contexts/ProductContextProvider";
import LeftBarFalse from "./components/LeftBar/LeftBarFalse";
import LeftBarDetails from "./components/LeftBar/LeftBarDetails";
import { useLocation } from "react-router-dom";

const App = () => {
  const { showLeftBar, showLeftBarDetails, handleLeftBarDetails } =
    useProduct();

  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    if (showLeftBarDetails === true && !pathName.includes(`/details/`)) {
      handleLeftBarDetails();
    }
  }, [pathName]);

  return (
    <React.StrictMode>
      <div style={{ position: "relative" }}>
        <Navbar />
        <div style={{ display: "flex" }}>
          {!pathName.includes(`/details/`) ? (
            showLeftBar ? (
              <LeftBar />
            ) : (
              <LeftBarFalse />
            )
          ) : showLeftBarDetails ? (
            <LeftBarDetails />
          ) : null}

          <MainRoute />
        </div>
      </div>
    </React.StrictMode>
  );
};

export default App;
