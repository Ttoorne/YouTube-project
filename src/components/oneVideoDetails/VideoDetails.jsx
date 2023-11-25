import React, { useEffect, useRef, useState } from "react";
import "./videoDetails.css";
import { useProduct } from "../../contexts/ProductContextProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import VideoList from "./VideoList";
import {
  useGetVideoDetailsQuery,
  useUpdateVideoMutation,
} from "../../contexts/apiSlice";
import { ColorRing } from "react-loader-spinner";
import { useAuth } from "../../contexts/AuthContextProvider";
import NotFoundPage from "../../pages/NotFoundPage";
import { useFormat } from "../../contexts/FormattedContextProvider";

const VideoDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { formatRelativeTime, formatViews } = useFormat();

  const location = useLocation();
  const pathName = location.pathname;

  const {
    data: videoDetails,
    isLoading,
    isError,
  } = useGetVideoDetailsQuery(id);

  const formattedDate = formatRelativeTime(videoDetails?.createdAt);
  const formattedViews = formatViews(videoDetails?.views);

  // not important start
  const moment = require("moment");
  const [originalDate, setOriginalDate] = useState(videoDetails?.createdAt);
  const date = moment(originalDate).format("DD MMM YYYY");

  const [originalViews, setOriginalViews] = useState(videoDetails?.views);
  const newViews = originalViews?.toLocaleString("en-US").replace(/,/g, " ");
  // not important end

  const {
    user: { email },
  } = useAuth();

  const { showLeftBarDetails } = useProduct();

  const [updateVideo, { isLoading: isUpdateLoading }] =
    useUpdateVideoMutation();

  const [likedUsers, setLikedUsers] = useState([]);
  const [viewsIncreased, setViewsIncreased] = useState(false);

  const increaseViews = async () => {
    try {
      if (videoDetails && !viewsIncreased) {
        const newVideo = {
          id,
          editedVideo: { views: videoDetails.views + 1 },
        };
        const response = await updateVideo(newVideo);
        setViewsIncreased(true);
      }
    } catch (error) {
      console.log("Error updating video:", error);
    }
  };

  useEffect(() => {
    if (videoDetails) {
      increaseViews();
    }
  }, [videoDetails, viewsIncreased]);

  const handleLike = async () => {
    if (email) {
      if (!videoDetails?.likedUsers.includes(email)) {
        let sum = videoDetails?.likes + 1;
        const updatedLikedUsers = [...likedUsers, email];
        setLikedUsers(updatedLikedUsers);

        try {
          const newVideo = {
            id,
            editedVideo: { likes: sum, likedUsers: updatedLikedUsers },
          };
          const response = await updateVideo(newVideo);
        } catch (error) {
          console.log("Error updating video:", error);
        }
      } else {
        console.log("Вы уже поставили лайк для этого видео.");
      }
    } else {
      console.log(
        "Вы не авторизованы. Для постановки лайка вам нужно войти в систему."
      );
      navigate("/auth");
    }
  };

  const handleUnlike = async () => {
    if (email) {
      if (videoDetails?.likedUsers.includes(email)) {
        let sum = videoDetails?.likes - 1;
        const updatedLikedUsers = likedUsers.filter(
          (userEmail) => userEmail !== email
        );
        setLikedUsers(updatedLikedUsers);

        try {
          const newVideo = {
            id,
            editedVideo: { likes: sum, likedUsers: updatedLikedUsers },
          };
          const response = await updateVideo(newVideo);
        } catch (error) {
          console.log("Error updating video:", error);
        }
      } else {
        console.log("Вы ещё не поставили лайк для этого видео.");
      }
    } else {
      console.log(
        "Вы не авторизованы. Для удаления лайка вам нужно войти в систему."
      );
      navigate("/auth");
    }
  };

  // item.title
  const MAX_HEIGHT = 50;
  const descrRef = useRef(null);
  const [truncatedDescription, setTruncatedDescription] = useState("");

  useEffect(() => {
    const truncateTextByHeight = () => {
      const element = descrRef.current;
      const originalText = videoDetails?.description || "";
      let truncatedText = originalText;

      while (element.offsetHeight > MAX_HEIGHT) {
        const lastSpaceIndex = truncatedText.lastIndexOf(" ");
        truncatedText = truncatedText.substring(0, lastSpaceIndex) + " ...еще";
        element.innerText = truncatedText;
      }

      setTruncatedDescription(truncatedText);
    };

    if (descrRef.current) {
      truncateTextByHeight();
    }
  }, [videoDetails?.description, MAX_HEIGHT, id]);
  // item.title

  const [showDescription, setShowDescription] = useState(false);

  const handleShowDescr = () => {
    setShowDescription(true);
  };

  const handleCloseDescr = () => {
    if (showDescription) {
      setTimeout(() => {
        setShowDescription(false);
      }, 0);
    }
  };

  useEffect(() => {
    setShowDescription(false);
  }, [pathName, id]);

  const getEmbeddedTrailer = () => {
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

    if (isError) {
      return <NotFoundPage />;
    }

    const urlVideo = videoDetails?.videoUrl;

    if (!videoDetails || !urlVideo) {
      return <NotFoundPage />;
    }

    const videoIdMatch = urlVideo.match(/([a-zA-Z0-9_-]{11})$/);
    if (!videoIdMatch) {
      return <NotFoundPage />;
    }

    if (urlVideo) {
      const videoId = urlVideo.match(/([a-zA-Z0-9_-]{11})$/)[0];

      return (
        <div
          className="video-details__container"
          style={showLeftBarDetails ? { pointerEvents: "none" } : null}
        >
          <div className="video-details__main">
            <iframe
              width="100%"
              height="480"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={videoDetails?.title}
              allowFullScreen
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              muted
              className="video-details__video"
            />
            <p className="video-details__title">{videoDetails?.title}</p>
            {/* description top*/}
            <div className="video-details__descr">
              <div className="video-details__user">
                <img
                  src={videoDetails?.avatar}
                  alt=""
                  className="video-details__avatar"
                />
                <p>{videoDetails?.userName}</p>
              </div>
              <div className="video-details__likes">
                <div className="like-div" title="Нравится" onClick={handleLike}>
                  {videoDetails?.likedUsers.includes(email) ? (
                    <svg
                      className="like-svg"
                      fill="#ffffff"
                      width="75px"
                      height="75px"
                      viewBox="0 0 24.00 24.00"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M3,21a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H6V21ZM19.949,10H14.178V5c0-2-3.076-2-3.076-2s0,4-1.026,5C9.52,8.543,8.669,10.348,8,11V21H18.644a2.036,2.036,0,0,0,2.017-1.642l1.3-7A2.015,2.015,0,0,0,19.949,10Z"></path>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      className="like-svg"
                      width="75px"
                      height="75px"
                      viewBox="0 0 24.00 24.00"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(0)"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#CCCCCC"
                        strokeWidth="0.048"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                          stroke="#fff"
                          strokeWidth="0.8399999999999999"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  )}

                  <p className="likes-count">{videoDetails?.likes}</p>
                </div>
                <div className="like-square"></div>
                <div
                  className="dislike-div"
                  title="Не нравится"
                  onClick={handleUnlike}
                >
                  <svg
                    className="dislike-svg"
                    width="75px"
                    height="75px"
                    viewBox="0 0 24.00 24.00"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    transform="rotate(180)"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#CCCCCC"
                      strokeWidth="0.048"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                        stroke="#fff"
                        strokeWidth="0.8399999999999999"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            {/* description start */}
            <div
              className="video-details__descr-bottom"
              onClick={() =>
                showDescription && videoDetails?.description.length < 350
                  ? null
                  : handleShowDescr()
              }
            >
              <div
                className="video-details__descr-bottom_views"
                title={`${newViews || videoDetails?.views} просмотров  ${date}`}
              >
                <p>{formattedViews}</p>
                <p>{formattedDate}</p>
              </div>
              <div className="video-details__descr-bottom_description">
                {showDescription ? (
                  <div>
                    <p className="video-details__descr-bottom_description-p">
                      {videoDetails?.description}
                    </p>
                    {showDescription && (
                      <p
                        className="video-details__descr-bottom_description-close"
                        onClick={handleCloseDescr}
                      >
                        Свернуть
                      </p>
                    )}
                  </div>
                ) : (
                  <p
                    className="video-details__descr-bottom_description-p"
                    ref={descrRef}
                  >
                    {truncatedDescription.length < 350 &&
                    truncatedDescription === videoDetails?.description &&
                    truncatedDescription.includes("...еще")
                      ? truncatedDescription
                      : truncatedDescription.length >= 350
                      ? truncatedDescription.slice(0, 350) + " ...еще"
                      : truncatedDescription}
                  </p>
                )}
              </div>
            </div>
            {/* description end */}
          </div>
          <VideoList />
        </div>
      );
    }

    return null;
  };

  return <div>{getEmbeddedTrailer()}</div>;
};

export default VideoDetails;
