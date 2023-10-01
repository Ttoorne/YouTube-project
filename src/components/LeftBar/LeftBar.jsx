import React from "react";
import { useNavigate } from "react-router-dom";
import "./leftBar.css";
import { useAuth } from "../../contexts/AuthContextProvider";

const LeftBar = () => {
  const navigate = useNavigate();
  const pathName = window.location.pathname;

  const {
    user: { email },
  } = useAuth();

  return (
    <div className="left-bar">
      <div className="left-bar__middle">
        <ul className="left-bar__middle_first">
          <li
            className={
              pathName === "/"
                ? "left-bar__middle_first-items onPath"
                : "left-bar__middle_first-items"
            }
            title="Главная"
            onClick={() => navigate("/")}
          >
            {/* svg */}
            {pathName === "/" ? (
              <div
                className="left-bar__middle_items-icons"
                style={{
                  fill: "#f1f1f1",
                }}
              >
                <svg
                  enableBackground="new 0 0 24 24"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  focusable="false"
                  style={{
                    pointerEvents: "none",
                    display: "block",
                    width: "100%",
                    height: "100%",
                  }}
                  className="left-bar__middle_items-svg"
                >
                  <g>
                    <path d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z"></path>
                  </g>
                </svg>
              </div>
            ) : (
              <div
                className="left-bar__middle_items-icons"
                style={{
                  fill: "#f1f1f1",
                }}
              >
                <svg
                  enableBackground="new 0 0 24 24"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  focusable="false"
                  style={{
                    pointerEvents: "none",
                    display: "block",
                    width: "100%",
                    height: "100%",
                  }}
                  className="left-bar__middle_items-svg"
                >
                  <path d="m12 4.44 7 6.09V20h-4v-6H9v6H5v-9.47l7-6.09m0-1.32-8 6.96V21h6v-6h4v6h6V10.08l-8-6.96z"></path>
                </svg>
              </div>
            )}

            {/* svg */}
            <p>Главная</p>
          </li>
          {email ? (
            <div>
              <li
                className={
                  pathName === "/your-videos"
                    ? "left-bar__middle_first-items onPath"
                    : "left-bar__middle_first-items"
                }
                title="Ваши видео"
                onClick={() => navigate("/your-videos")}
              >
                {/* svg */}
                <div
                  className="left-bar__middle_items-icons"
                  style={{
                    fill: pathName === "/your-videos" ? "red" : "#f1f1f1",
                  }}
                >
                  <svg
                    enableBackground="new 0 0 24 24"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    focusable="false"
                    style={{
                      pointerEvents: "none",
                      display: "block",
                      width: "100%",
                      height: "100%",
                    }}
                    className="left-bar__middle_items-svg"
                  >
                    <path d="m10 8 6 4-6 4V8zm11-5v18H3V3h18zm-1 1H4v16h16V4z"></path>
                  </svg>
                </div>
                {/* svg */}
                <p>Ваши видео</p>
              </li>
              <li
                className={
                  pathName === "/history"
                    ? "left-bar__middle_first-items onPath"
                    : "left-bar__middle_first-items"
                }
                title="История просмотров"
                onClick={() => navigate("/history")}
              >
                {/* svg */}
                {pathName === "/history" ? (
                  <div
                    className="left-bar__middle_items-icons"
                    style={{
                      fill: "#f1f1f1",
                    }}
                  >
                    <svg
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      focusable="false"
                      style={{
                        pointerEvents: "none",
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                      className="left-bar__middle_items-svg"
                    >
                      <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 2C8.73 2 5.8 3.44 4 5.83V3.02H2V9h6V7H5.62C7.08 5.09 9.36 4 12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8H2c0 5.51 4.49 10 10 10s10-4.49 10-10S17.51 2 12 2z"></path>
                    </svg>
                  </div>
                ) : (
                  <div
                    className="left-bar__middle_items-icons"
                    style={{
                      fill: "#f1f1f1",
                    }}
                  >
                    <svg
                      height="24"
                      style={{
                        pointerEvents: "none",
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                      className="left-bar__middle_items-svg"
                      viewBox="0 0 24 24"
                      width="24"
                      focusable="false"
                    >
                      <g>
                        <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.38c-.11.18-.22.37-.31.56L3.94 8H8v1H1.96V3h1v4.74c.04-.09.07-.17.11-.25.11-.22.23-.42.35-.63C5.22 3.86 8.51 2 12 2c5.51 0 10 4.49 10 10z"></path>
                      </g>
                    </svg>
                  </div>
                )}
                {/* svg */}
                <p>История</p>
              </li>
              <li
                className={
                  pathName === "/playlist"
                    ? "left-bar__middle_first-items onPath"
                    : "left-bar__middle_first-items"
                }
                title="Смотреть позже"
                onClick={() => navigate("/playlist")}
              >
                {/* svg */}
                {pathName === "/playlist" ? (
                  <div
                    className="left-bar__middle_items-icons"
                    style={{
                      fill: "#f1f1f1",
                    }}
                  >
                    <svg
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      focusable="false"
                      style={{
                        pointerEvents: "none",
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                      className="left-bar__middle_items-svg"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.97 14.95L10 13.87V7h2v5.76l4.03 2.49-1.06 1.7z"></path>
                    </svg>
                  </div>
                ) : (
                  <div
                    className="left-bar__middle_items-icons"
                    style={{
                      fill: "#f1f1f1",
                    }}
                  >
                    <svg
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      focusable="false"
                      style={{
                        pointerEvents: "none",
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                      className="left-bar__middle_items-svg"
                    >
                      <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"></path>
                    </svg>
                  </div>
                )}

                {/* svg */}
                <p>Смотреть позже</p>
              </li>
              <li
                className={
                  pathName === "/liked"
                    ? "left-bar__middle_first-items onPath"
                    : "left-bar__middle_first-items"
                }
                title="Понравившиеся"
                onClick={() => navigate("/liked")}
              >
                {/* svg */}
                {pathName === "/liked" ? (
                  <div
                    className="left-bar__middle_items-icons"
                    style={{
                      fill: "#f1f1f1",
                    }}
                  >
                    <svg
                      enableBackground="new 0 0 24 24"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      focusable="false"
                      style={{
                        pointerEvents: "none",
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                      className="left-bar__middle_items-svg"
                    >
                      <path d="M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z"></path>
                    </svg>
                  </div>
                ) : (
                  <div
                    className="left-bar__middle_items-icons"
                    style={{
                      fill: "#f1f1f1",
                    }}
                  >
                    <svg
                      enableBackground="new 0 0 24 24"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      focusable="false"
                      style={{
                        pointerEvents: "none",
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                      className="left-bar__middle_items-svg"
                    >
                      <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
                    </svg>
                  </div>
                )}
                {/* svg */}
                <p>Понравившиеся</p>
              </li>
            </div>
          ) : null}
        </ul>
        <div className="border__bottom"></div>
        {/* middle end */}
        <ul className="left-bar__bottom">
          <li className="left-bar__bottom_title">Другие возможности</li>
          <li className="left-bar__bottom_items">
            {/* svg */}
            <div
              className="left-bar__bottom_items-icons"
              style={{
                fill: "#f1f1f1",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                focusable="false"
                style={{
                  pointerEvents: "none",
                  display: "block",
                  width: "100%",
                  height: "100%",
                }}
                className="left-bar__bottom_items-svg"
              >
                <path
                  fill="red"
                  d="M11.13 1.21c.48-.28 1.26-.28 1.74 0l8.01 4.64c.48.28.87.97.87 1.53v9.24c0 .56-.39 1.25-.87 1.53l-8.01 4.64c-.48.28-1.26.28-1.74 0l-8.01-4.64c-.48-.28-.87-.97-.87-1.53V7.38c0-.56.39-1.25.87-1.53l8.01-4.64z"
                ></path>
                <path
                  fill="#fff"
                  d="m12.71 18.98 4.9-2.83c.41-.24.64-.77.64-1.24V9.24c0-.47-.23-1-.64-1.24l-4.9-2.82c-.41-.23-1.02-.23-1.42 0L6.39 8c-.4.23-.64.77-.64 1.24v5.67c0 .47.24 1 .64 1.24l4.9 2.83c.2.12.46.18.71.18.26-.01.51-.07.71-.18z"
                ></path>
                <path
                  fill="red"
                  d="m12.32 5.73 4.89 2.83c.16.09.41.31.41.67v5.67c0 .37-.25.54-.41.64l-4.89 2.83c-.16.09-.48.09-.64 0l-4.89-2.83c-.16-.09-.41-.34-.41-.64V9.24c.02-.37.25-.58.41-.68l4.89-2.83c.08-.05.2-.07.32-.07s.24.02.32.07z"
                ></path>
                <path fill="#fff" d="M9.88 15.25 15.5 12 9.88 8.75z"></path>
              </svg>
            </div>
            {/* svg */}
            <p>Творческая студия</p>
          </li>
          <li className="left-bar__bottom_items">
            {/* svg */}
            <div
              className="left-bar__bottom_items-icons"
              style={{
                fill: "#f1f1f1",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                focusable="false"
                style={{
                  pointerEvents: "none",
                  display: "block",
                  width: "100%",
                  height: "100%",
                }}
                className="left-bar__bottom_items-svg"
              >
                <path
                  fill="#FF0000"
                  d="M21.39,13.19c0-0.08,0-0.15,0-0.22c-0.01-0.86-0.5-5-0.78-5.74c-0.32-0.85-0.76-1.5-1.31-1.91 c-0.9-0.67-1.66-0.82-2.6-0.84l-0.02,0c-0.4,0-3.01,0.32-5.2,0.62C9.28,5.4,6.53,5.8,5.88,6.04c-0.9,0.33-1.62,0.77-2.19,1.33 c-1.05,1.04-1.18,2.11-1.04,3.51c0.1,1.09,0.69,5.37,1.02,6.35c0.45,1.32,1.33,2.12,2.47,2.24c0.28,0.03,0.55,0.05,0.82,0.05 c1,0,1.8-0.21,2.72-0.46c1.45-0.39,3.25-0.87,6.97-0.87l0.09,0h0.02c0.91,0,3.14-0.2,4.16-2.07C21.44,15.12,21.41,13.91,21.39,13.19 z"
                ></path>
                <path
                  fill="#000"
                  d="M21.99,13.26c0-0.08,0-0.16-0.01-0.24c-0.01-0.92-0.54-5.32-0.83-6.11c-0.34-0.91-0.81-1.59-1.4-2.03 C18.81,4.17,17.99,4.02,17,4l-0.02,0c-0.43,0-3.21,0.34-5.54,0.66c-2.33,0.32-5.25,0.75-5.95,1C4.53,6.01,3.76,6.48,3.16,7.08 c-1.12,1.1-1.25,2.25-1.11,3.74c0.11,1.16,0.73,5.71,1.08,6.75c0.48,1.41,1.41,2.25,2.63,2.38C6.06,19.98,6.34,20,6.63,20 c1.07,0,1.91-0.23,2.89-0.49c1.54-0.41,3.46-0.93,7.41-0.93l0.1,0h0.02c0.97,0,3.34-0.21,4.42-2.2 C22.04,15.32,22.01,14.03,21.99,13.26z M20.59,15.91c-0.82,1.51-2.75,1.68-3.56,1.68l-0.1,0c-4.09,0-6.07,0.53-7.67,0.96 C8.31,18.8,7.56,19,6.63,19c-0.25,0-0.5-0.01-0.76-0.04c-1.04-0.11-1.54-0.99-1.79-1.71c-0.3-0.88-0.91-5.21-1.04-6.53 C2.9,9.25,3.1,8.54,3.86,7.79c0.5-0.5,1.15-0.89,1.97-1.19c0.17-0.06,1.1-0.32,5.74-0.95C14.2,5.29,16.64,5.01,16.99,5 c0.83,0.02,1.43,0.13,2.17,0.69c0.43,0.32,0.79,0.86,1.06,1.58c0.22,0.58,0.76,4.78,0.77,5.77l0.01,0.25 C21.01,13.96,21.04,15.08,20.59,15.91z"
                ></path>
                <path
                  fill="#000"
                  d="M11.59,14.76c-0.48,0.36-0.8,0.45-1.01,0.45c-0.16,0-0.25-0.05-0.3-0.08c-0.34-0.18-0.42-0.61-0.5-1.2l-0.01-0.1 c-0.04-0.31-0.26-2.1-0.38-3.16L9.3,9.94C9.26,9.66,9.2,9.19,9.54,8.94c0.32-0.23,0.75-0.09,0.96-0.03c0.53,0.17,3.6,1.23,4.59,1.73 c0.21,0.09,0.67,0.28,0.68,0.83c0.01,0.5-0.38,0.74-0.53,0.82L11.59,14.76z"
                ></path>
                <path
                  fill="#FFF"
                  d="M10.3,9.89c0,0,0.5,4.08,0.51,4.19c0.06-0.04,3.79-2.58,3.79-2.58C13.71,11.07,11.07,10.14,10.3,9.89z"
                ></path>
              </svg>
            </div>
            {/* svg */}
            <p>YouTube Детям</p>
          </li>
        </ul>
        <div className="border__bottom"></div>
        <div className="footer">
          <ul className="footer__info">
            <li className="footer__info_items">
              <a href="https://www.youtube.com/about/" target="_blank">
                О сервисе
              </a>
            </li>
            <li className="footer__info_items">
              <a
                href="https://www.youtube.com/about/copyright/"
                target="_blank"
              >
                Авторские права
              </a>
            </li>
            <li className="footer__info_items">
              <a href="/t/contact_us/" target="_blank">
                Связаться с нами
              </a>
            </li>
            <li className="footer__info_items">
              <a href="https://www.youtube.com/creators/" target="_blank">
                Авторам
              </a>
            </li>
            <li className="footer__info_items">
              <a href="https://www.youtube.com/ads/" target="_blank">
                Рекломадателям
              </a>
            </li>
            <li className="footer__info_items">
              <a href="https://developers.google.com/youtube" target="_blank">
                Разработчикам
              </a>
            </li>
          </ul>
          <ul className="footer__info">
            <li className="footer__info_items">
              <a href="/t/terms" target="_blank">
                Условия использования
              </a>
            </li>

            <li className="footer__info_items">
              <a href="/t/privacy" target="_blank">
                Конфиденциальность
              </a>
            </li>

            <li className="footer__info_items">
              <a href="https://www.youtube.com/about/policies/" target="_blank">
                Правила и безопасность
              </a>
            </li>

            <li className="footer__info_items">
              <a
                href="https://www.youtube.com/howyoutubeworks?utm_campaign=ytgen&utm_source=ythp&utm_medium=LeftNav&utm_content=txt&u=https%3A%2F%2Fwww.youtube.com%2Fhowyoutubeworks%3Futm_source%3Dythp%26utm_medium%3DLeftNav%26utm_campaign%3Dytgen"
                target="_blank"
              >
                Как работает YouTube
              </a>
            </li>

            <li className="footer__info_items">
              <a href="/new" target="_blank">
                Тестирование новых функции
              </a>
            </li>
          </ul>
          <p className="footer__bottom">© 2023 Google LLC</p>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
