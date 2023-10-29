import React, { useEffect, useState } from "react";
import { useProduct } from "../../contexts/ProductContextProvider";
import { useNavigate } from "react-router-dom";
import "./addVideo.css";
import { Alert, AlertTitle, Stack } from "@mui/material";
import { useAuth } from "../../contexts/AuthContextProvider";
import { useAddVideoMutation } from "../../contexts/apiSlice";

const AddVideo = () => {
  const currentDate = new Date();

  // alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const hideAlertAfterDelay = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleNavigateAfterDelay = () => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const [userAvatar, setAvatar] = useState("");
  const [username, setUserName] = useState("");

  const {
    getAvatar,
    getUserName,
    user: { email },
  } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAvatar = await getAvatar();
      const fetchedUserName = await getUserName();
      setAvatar(fetchedAvatar);
      setUserName(fetchedUserName);
    };

    fetchData();
  }, [getAvatar, getUserName]);

  const [video, setVideo] = useState({
    title: "",
    description: "",
    userName: username,
    avatar: userAvatar,
    email: email,
    preview: "",
    videoUrl: "",
    likes: 0,
    comments: [],
    likedUsers: [],
    watchLater: [],
    views: 0,
  });

  const [addVideo, { isLoading }] = useAddVideoMutation();

  const isYouTubeLink = (url) => {
    const youtubeUrlRegex =
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})$/;
    return youtubeUrlRegex.test(url);
  };

  const handleInp = (e) => {
    let obj = {
      ...video,
      [e.target.name]: e.target.value,
      avatar: userAvatar,
      userName: username,
      email: email,
      createdAt: currentDate,
    };
    setVideo(obj);
  };

  const handleAddVideo = async () => {
    if (
      !video.title.trim() ||
      !video.description.trim() ||
      !video.preview.trim() ||
      !video.videoUrl.trim()
    ) {
      setAlertMessage("Все поля должны быть заполнены!");
      setAlertSeverity("warning");
      setShowAlert(true);
      hideAlertAfterDelay();
      return;
    }

    // проверка на ссылочность preview
    const urlRegex =
      /^(https?:\/\/)?(www\.)?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]+$/i;
    if (!urlRegex.test(video.preview.trim())) {
      setAlertMessage("Превью должно быть ссылкой!");
      setAlertSeverity("warning");
      setShowAlert(true);
      hideAlertAfterDelay();

      return;
    }

    if (!isYouTubeLink(video.videoUrl)) {
      setAlertMessage("Ссылка должна быть с YouTube!");
      setAlertSeverity("warning");
      setShowAlert(true);
      hideAlertAfterDelay();

      return;
    }

    try {
      await Promise.all([getAvatar(), getUserName()]);

      addVideo(video);
      setVideo({
        title: "",
        description: "",
        userName: username,
        avatar: userAvatar,
        preview: "",
        videoUrl: "",
        likes: 0,
        comments: [],
        email: email,
        likedUsers: [],
        watchLater: [],
        views: 0,
      });

      setAlertMessage("Видео успешно добавлено — проверьте его!");
      setAlertSeverity("success");
      setShowAlert(true);
      handleNavigateAfterDelay();
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="add-video">
      <div
        style={{
          position: "absolute",
          top: "100px",
          left: "38%",
          width: "30%",
          animation: "slide-in 2s forwards",
        }}
      >
        {showAlert && (
          <Alert severity={alertSeverity}>
            <AlertTitle>
              {alertSeverity === "success" ? "Успех!" : "Ошибка!"}
            </AlertTitle>
            {alertMessage}
          </Alert>
        )}
      </div>
      <h2>Добавить видео</h2>
      <div className="add-video__container">
        <input
          type="text"
          className="add-video__inputs"
          title="Заголовок видео"
          name="title"
          placeholder="Заголовок видео"
          value={video.title}
          onChange={handleInp}
        />
        <input
          type="text"
          className="add-video__inputs"
          title="Описание видео"
          name="description"
          placeholder="Описание видео"
          value={video.description}
          onChange={handleInp}
        />
        <input
          type="text"
          className="add-video__inputs"
          title="Превью (изображение)"
          name="preview"
          placeholder="Превью (изображение)"
          value={video.preview}
          onChange={handleInp}
        />
        <input
          type="text"
          className="add-video__inputs"
          title="Ссылка на видео"
          name="videoUrl"
          placeholder="Ссылка на видео"
          value={video.videoUrl}
          onChange={handleInp}
        />
      </div>
      <button
        className="add-video__button"
        onClick={() => {
          handleAddVideo();
        }}
        disabled={isLoading}
      >
        {isLoading ? "Добавление..." : "Добавить"}
      </button>
    </div>
  );
};

export default AddVideo;
