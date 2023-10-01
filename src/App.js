import React, { Suspense, useEffect, useState } from "react";
import MainRoute from "./routes/MainRoute";
import "./app.css";
import Navbar from "./components/Navbar/Navbar";
import LeftBar from "./components/LeftBar/LeftBar";
import { useProduct } from "./contexts/ProductContextProvider";
import LeftBarFalse from "./components/LeftBar/LeftBarFalse";

const App = () => {
  const { showLeftBar } = useProduct();
  const pathName = window.location.pathname;

  return (
    <React.StrictMode>
      <div style={{ position: "relative" }}>
        <Navbar />
        <div style={{ display: "flex" }}>
          {!pathName.includes(`/details`) ? (
            showLeftBar ? (
              <LeftBar />
            ) : (
              <LeftBarFalse />
            )
          ) : null}

          <MainRoute />
        </div>
      </div>
    </React.StrictMode>
  );
};

export default App;
