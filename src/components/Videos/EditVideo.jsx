import React, { useEffect, useState } from "react";
import "./editVideo.css";
import { Alert, AlertTitle } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContextProvider";
import { useProduct } from "../../contexts/ProductContextProvider";

const EditVideo = () => {
  // alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const hideAlertAfterDelay = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const navigate = useNavigate();

  const handleNavigateAfterDelay = () => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  // edit
  const { getVideoDetails, updateVideo, videoDetails } = useProduct();

  const { id } = useParams();

  useEffect(() => {
    getVideoDetails(id);
  }, []);

  useEffect(() => {
    if (videoDetails) {
      setTitle(videoDetails.title);
      setDescription(videoDetails.description);
      setPreview(videoDetails.preview);
      setVideoUrl(videoDetails.videoUrl);
    }
  }, [videoDetails]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const isYouTubeLink = (url) => {
    const youtubeUrlRegex =
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})$/;
    return youtubeUrlRegex.test(url);
  };

  const handleSave = () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !preview.trim() ||
      !videoUrl.trim()
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
    if (!urlRegex.test(preview.trim())) {
      setAlertMessage("Превью должно быть ссылкой!");
      setAlertSeverity("warning");
      setShowAlert(true);
      hideAlertAfterDelay();

      return;
    }

    if (!isYouTubeLink(videoUrl)) {
      setAlertMessage("Ссылка должна быть с YouTube!");
      setAlertSeverity("warning");
      setShowAlert(true);
      hideAlertAfterDelay();

      return;
    }

    try {
      const newVideo = { title, description, preview, videoUrl };
      updateVideo(id, newVideo);

      setAlertMessage("Видео успешно изменено — проверьте его!");
      setAlertSeverity("success");
      setShowAlert(true);
      handleNavigateAfterDelay();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-video">
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
      <h2>Изменить видео</h2>
      <div className="edit-video__container">
        <input
          type="text"
          className="edit-video__inputs"
          title="Заголовок видео"
          name="title"
          placeholder="Заголовок видео"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="edit-video__inputs"
          title="Описание видео"
          name="description"
          placeholder="Описание видео"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          className="edit-video__inputs"
          title="Превью (изображение)"
          name="preview"
          placeholder="Превью (изображение)"
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
        />
        <input
          type="text"
          className="edit-video__inputs"
          title="Ссылка на видео"
          name="videoUrl"
          placeholder="Ссылка на видео"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>
      <button className="edit-video__button" onClick={handleSave}>
        Изменить
      </button>
    </div>
  );
};

export default EditVideo;
