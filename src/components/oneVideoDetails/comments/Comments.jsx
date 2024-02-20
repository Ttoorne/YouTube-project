import React, { useEffect, useState } from "react";
import "./comments.scss";
import { useAuth } from "../../../contexts/AuthContextProvider";
import { useUpdateVideoMutation } from "../../../contexts/apiSlice";
import { useParams } from "react-router-dom";
import { useFormat } from "../../../contexts/FormattedContextProvider";
import { ColorRing } from "react-loader-spinner";

const Comments = ({ item }) => {
  // user
  const {
    user: { email },
    getUserName,
    getAvatar,
  } = useAuth();

  const [userAvatar, setAvatar] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAvatar = await getAvatar();
      const fetchedUserName = await getUserName();
      setAvatar(fetchedAvatar);
      setUserName(fetchedUserName);
    };

    fetchData();
    setShowModal(false);
    setCommentInput("");
  }, [getAvatar, getUserName]);

  // update

  const [updateVideo, { isLoading: isUpdateLoading }] =
    useUpdateVideoMutation();
  const { id } = useParams();

  const [commentInput, setCommentInput] = useState("");
  const [hoveredCommentIndex, setHoveredCommentIndex] = useState(null); // Состояние для отслеживания наведения на комментарий
  const [editingCommentIndex, setEditingCommentIndex] = useState(null); // Состояние для отслеживания редактируемого комментария
  const [editingCommentText, setEditingCommentText] = useState(""); // Состояние для хранения текста редактируемого комментария
  const currentDate = new Date();
  const { formatRelativeTime } = useFormat();

  const handleCommentInputChange = (e) => {
    setCommentInput(e.target.value);
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      if (commentInput.trim()) {
        const newComment = {
          email,
          userAvatar,
          userName,
          comment: commentInput,
          createdTime: currentDate,
        };
        const updatedComments = [...item.comments, newComment];
        const updatedItem = { ...item, comments: updatedComments };
        const newVideo = { id, editedVideo: { comments: updatedComments } }; // Обновляем только поле comments
        const response = await updateVideo(newVideo);
        console.log("Добавлено");
        setCommentInput("");
      }
    } catch (error) {
      console.log("Error updating video:", error);
    }
  };

  const lastNum = item.comments.length % 10;

  // modal
  const [showModal, setShowModal] = useState(false);

  const handleDeleteComment = async (index) => {
    try {
      const updatedComments = [...item.comments];
      updatedComments.splice(index, 1); // Удаляем комментарий из массива по индексу
      const newVideo = { id, editedVideo: { comments: updatedComments } };
      const response = await updateVideo(newVideo);

      setShowModal(false);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = (index) => {
    setEditingCommentIndex(index);
    setEditingCommentText(item.comments[index].comment);
  };

  const saveEditedComment = async () => {
    try {
      const updatedComments = item.comments.map((comm, index) => {
        if (index === editingCommentIndex) {
          return { ...comm, comment: editingCommentText };
        }
        return comm;
      });
      const newVideo = { id, editedVideo: { comments: updatedComments } };
      const response = await updateVideo(newVideo);
      setEditingCommentIndex(null);
      setEditingCommentText("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const cancelEditComment = () => {
    setEditingCommentIndex(null);
    setEditingCommentText("");
  };

  return (
    <div className="comments">
      <h4>
        {item.comments.length}{" "}
        {lastNum === 1
          ? "комментарий"
          : lastNum >= 2 && lastNum <= 4
          ? "комментария"
          : "комментариев"}
      </h4>
      {email && (
        <div className="comments__input">
          <img src={userAvatar} alt="" />

          {isUpdateLoading ? (
            <div
              style={{
                height: "35px",
                width: "35px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              <ColorRing
                visible={true}
                height="100%"
                width="100%"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#f1f1f1", "#f1f1f1", "#f1f1f1", "#f1f1f1", "#f1f1f1"]}
              />
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Введите комментарий"
                value={commentInput}
                onChange={handleCommentInputChange}
              />
              <div
                className="comments__input_button"
                style={{ display: commentInput.trim() ? "flex" : "none" }}
              >
                <button onClick={() => setCommentInput("")}>Отмена</button>
                <button onClick={addComment}>Оставить комментарий</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* comments */}
      <div className="comments-block">
        {item.comments.map((comm, index) => (
          <div
            key={index}
            className="comment-section"
            onMouseEnter={() => setHoveredCommentIndex(index)} // При наведении на комментарий устанавливаем его индекс
            onMouseLeave={() => setHoveredCommentIndex(null)} // При уходе курсора с комментария сбрасываем индекс
          >
            <img src={comm.userAvatar} alt="" />
            <div className="comment-section__descr">
              <p>
                {comm.userName}
                {""}
                <span>{formatRelativeTime(comm.createdTime)}</span>
              </p>
              {editingCommentIndex === index ? (
                <div className="comment-section__descr_edit">
                  <input
                    value={editingCommentText}
                    onChange={(e) => setEditingCommentText(e.target.value)}
                  />
                  <div
                    className="comment-section__descr_edit-button"
                    style={{
                      display: editingCommentText.trim() ? "flex" : "none",
                    }}
                  >
                    <button onClick={cancelEditComment}>Отмена</button>
                    <button onClick={saveEditedComment}>
                      Изменить комментарий
                    </button>
                  </div>
                </div>
              ) : (
                <p>{comm.comment}</p>
              )}
            </div>

            {hoveredCommentIndex === index && email === comm.email && (
              <svg
                className="comments-options"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setShowModal(true)}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm0-6a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm0 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"
                    fill="#fff"
                  ></path>
                </g>
              </svg>
            )}
            {showModal && hoveredCommentIndex === index ? (
              <div
                className="comm-modal"
                onMouseLeave={() => setShowModal(false)}
              >
                <p onClick={() => handleEditComment(index)}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M15 6.5L17.5 9M4 20V17.5L16.75 4.75C17.4404 4.05964 18.5596 4.05964 19.25 4.75V4.75C19.9404 5.44036 19.9404 6.55964 19.25 7.25L6.5 20H4Z"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                  <span> Изменить</span>
                </p>
                <p onClick={() => handleDeleteComment(index)}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M10 11V17"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                      <path
                        d="M14 11V17"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                      <path
                        d="M4 7H20"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                      <path
                        d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                      <path
                        d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                  <span>Удалить</span>
                </p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
