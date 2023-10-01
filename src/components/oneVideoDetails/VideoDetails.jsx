import React, { useEffect } from "react";
import "./videoDetails.css";
import { useProduct } from "../../contexts/ProductContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import VideoList from "./VideoList";
import { useGetVideoDetailsQuery } from "../../contexts/apiSlice";
import { ColorRing } from "react-loader-spinner";

const VideoDetails = () => {
  const { id } = useParams();

  const {
    data: videoDetails,
    isLoading,
    isError,
  } = useGetVideoDetailsQuery(id);

  const getEmbeddedTrailer = () => {
    const urlVideo = videoDetails?.videoUrl;

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
      return <div>Ошибка: {isError.message}</div>;
    }

    if (urlVideo) {
      const videoId = urlVideo.match(/([a-zA-Z0-9_-]{11})$/)[0];
      return (
        <div className="video-details__container">
          <div className="video-details__main">
            <iframe
              width="100%"
              height="480"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Product-Video"
              allowFullScreen
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              muted
              className="video-details__video"
            />
            <p className="video-details__title">{videoDetails?.title}</p>
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
                <div className="like-div">
                  <svg
                    className="like-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 270 270"
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                      width: "100%",
                      height: "100%",
                      transform: "translate3d(0px, 0px, 0px)",
                    }}
                  >
                    <defs>
                      <clipPath id="__lottie_element_41">
                        <rect width="270" height="270" x="0" y="0"></rect>
                      </clipPath>
                      <clipPath id="__lottie_element_43">
                        <path d="M0,0 L120,0 L120,120 L0,120z"></path>
                      </clipPath>
                      <clipPath id="__lottie_element_57">
                        <path d="M0,0 L128,0 L128,128 L0,128z"></path>
                      </clipPath>
                    </defs>
                    <g clipPath="url(#__lottie_element_41)">
                      <g
                        clipPath="url(#__lottie_element_43)"
                        transform="matrix(1.0880000591278076,0,0,1.0880000591278076,69.95299530029297,67.9433822631836)"
                        opacity="1"
                      >
                        <g transform="matrix(1,0,0,1,60,60)" opacity="1">
                          <path
                            strokeLinecap="butt"
                            strokeLinejoin="miter"
                            fillOpacity="0"
                            strokeMiterlimit="4"
                            stroke="rgb(255,255,255)"
                            strokeOpacity="1"
                            strokeWidth="4"
                            d=" M25.025999069213867,-4.00600004196167 C25.025999069213867,-4.00600004196167 5.992000102996826,-3.996999979019165 5.992000102996826,-3.996999979019165 C5.992000102996826,-3.996999979019165 11.012999534606934,-22.983999252319336 11.012999534606934,-22.983999252319336 C12.230999946594238,-26.90399932861328 13,-31.94300079345703 8.994000434875488,-31.981000900268555 C7,-32 5,-32 4.021999835968018,-31.007999420166016 C4.021999835968018,-31.007999420166016 -19.993000030517578,-5.03000020980835 -19.993000030517578,-5.03000020980835 C-19.993000030517578,-5.03000020980835 -20.027999877929688,32.025001525878906 -20.027999877929688,32.025001525878906 C-20.027999877929688,32.025001525878906 20.97599983215332,31.986000061035156 20.97599983215332,31.986000061035156 C25.010000228881836,31.986000061035156 26.198999404907227,29.562000274658203 26.99799919128418,25.985000610351562 C26.99799919128418,25.985000610351562 31.972000122070312,4.026000022888184 31.972000122070312,4.026000022888184 C33,-0.6930000185966492 30.392000198364258,-4.00600004196167 25.025999069213867,-4.00600004196167z"
                          ></path>
                        </g>
                        <g transform="matrix(1,0,0,1,60,60)" opacity="1">
                          <path
                            strokeLinecap="butt"
                            strokeLinejoin="miter"
                            fillOpacity="0"
                            strokeMiterlimit="4"
                            stroke="rgb(255,255,255)"
                            strokeOpacity="1"
                            strokeWidth="4"
                            d=" M-19.986000061035156,-4.03000020980835 C-19.986000061035156,-4.03000020980835 -36.020999908447266,-3.996999979019165 -36.020999908447266,-3.996999979019165 C-36.020999908447266,-3.996999979019165 -36.00199890136719,31.993000030517578 -36.00199890136719,31.993000030517578 C-36.00199890136719,31.993000030517578 -20.030000686645508,32.02299880981445 -20.030000686645508,32.02299880981445 C-20.030000686645508,32.02299880981445 -19.986000061035156,-4.03000020980835 -19.986000061035156,-4.03000020980835z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <div></div>
              </div>
            </div>
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
