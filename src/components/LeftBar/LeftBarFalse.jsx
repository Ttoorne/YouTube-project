import React from "react";
import "./leftBarFalse.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContextProvider";

const LeftBarFalse = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const pathName = location.pathname;

  const {
    user: { email },
  } = useAuth();

  return (
    <div className="left-bar__false">
      <ul className="left-bar__list">
        <li
          className="left-bar__false_items"
          title="Главная"
          onClick={() => navigate("/")}
        >
          {/* svg */}
          {pathName === "/" ? (
            <div
              className="left-bar__false_items-icons"
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
              className="left-bar__false_items-icons"
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
                className="left-bar__false_items-svg"
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
              className="left-bar__false_items"
              title="История просмотров"
              onClick={() => navigate("/history")}
            >
              {/* svg */}
              {pathName === "/history" ? (
                <div
                  className="left-bar__false_items-icons"
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
                    className="left-bar__false_items-svg"
                  >
                    <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 2C8.73 2 5.8 3.44 4 5.83V3.02H2V9h6V7H5.62C7.08 5.09 9.36 4 12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8H2c0 5.51 4.49 10 10 10s10-4.49 10-10S17.51 2 12 2z"></path>
                  </svg>
                </div>
              ) : (
                <div
                  className="left-bar__false_items-icons"
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
                    className="left-bar__false_items-svg"
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
              className="left-bar__false_items"
              title="Смотреть позже"
              onClick={() => navigate("/playlist")}
            >
              {/* svg */}
              {pathName === "/playlist" ? (
                <div
                  className="left-bar__false_items-icons"
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
                    className="left-bar__false_items-svg"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.97 14.95L10 13.87V7h2v5.76l4.03 2.49-1.06 1.7z"></path>
                  </svg>
                </div>
              ) : (
                <div
                  className="left-bar__false_items-icons"
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
                    className="left-bar__false_items-svg"
                  >
                    <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"></path>
                  </svg>
                </div>
              )}

              {/* svg */}
              <p>Смотреть позже</p>
            </li>
            <li
              className="left-bar__false_items"
              title="Понравившиеся"
              onClick={() => navigate("/liked")}
            >
              {/* svg */}
              {pathName === "/liked" ? (
                <div
                  className="left-bar__false_items-icons"
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
                    className="left-bar__false_items-svg"
                  >
                    <path d="M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z"></path>
                  </svg>
                </div>
              ) : (
                <div
                  className="left-bar__false_items-icons"
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
                    className="left-bar__false_items-svg"
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
    </div>
  );
};

export default LeftBarFalse;
