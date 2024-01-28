import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddPage from "../pages/AddPage";
import "./mainRoutes.css";
import { useProduct } from "../contexts/ProductContextProvider";
import VideoDetails from "../components/oneVideoDetails/VideoDetails";
import AuthPage from "../pages/AuthPage";
import Register from "../components/Auth/Register";
import EditPage from "../pages/EditPage";
import NotFoundPage from "../pages/NotFoundPage";
import YourVideoPage from "../pages/YourVideoPage";
import { useAuth } from "../contexts/AuthContextProvider";
import HistoryPage from "../pages/HistoryPage";
import LikedPage from "../pages/LikedPage";
import WatchLaterPage from "../pages/WatchLaterPage";
import SearchPage from "../pages/SearchPage";

const MainRoute = () => {
  const { showLeftBar, showLeftBarDetails, handleLeftBarDetails } =
    useProduct();
  const { user } = useAuth();

  const PUBLIC_ROUTES = [
    { link: "/", element: <HomePage />, id: 1 },
    {
      link: "/details/:id",
      element: <VideoDetails />,
      id: 2,
    },
    { link: "*", element: <NotFoundPage />, id: 3 },
    { link: "/auth", element: <AuthPage />, id: 4 },
    { link: "/register", element: <Register />, id: 5 },
    { link: "/search", element: <SearchPage />, id: 6 },
  ];

  const PRIVATE_ROUTES = [
    { link: "/edit/:id", element: <EditPage />, id: 1 },
    { link: "/add", element: <AddPage />, id: 2 },
    { link: "/your-videos", element: <YourVideoPage />, id: 3 },
    { link: "/history", element: <HistoryPage />, id: 4 },
    { link: "/liked", element: <LikedPage />, id: 5 },
    { link: "/playlist", element: <WatchLaterPage />, id: 6 },
  ];

  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div
      className={
        pathName.includes(`/details/`) ? "main-routes__details" : "main-routes"
      }
      style={
        !showLeftBar && !pathName.includes(`/details/`)
          ? { width: "90%" }
          : showLeftBarDetails && pathName.includes(`/details/`)
          ? {
              filter: "brightness(35%)",
              pointer: "none",
              maxHeight: "100vh",
              overflow: "hidden",
            }
          : null
      }
      onClick={() => {
        if (showLeftBarDetails) {
          handleLeftBarDetails();
        }
      }}
    >
      <Routes>
        {PUBLIC_ROUTES.map((page) => (
          <Route path={page.link} element={page.element} key={page.id} />
        ))}
        {user
          ? PRIVATE_ROUTES.map((page) => (
              <Route
                key={page.id}
                path={page.link}
                element={user ? page.element : <Navigate to="*" />}
              />
            ))
          : null}
      </Routes>
    </div>
  );
};

export default MainRoute;
