import React, { createContext, useContext, useReducer, useState } from "react";
import { ACTIONS, API } from "../helpers/consts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const productContext = createContext();
export const useProduct = () => useContext(productContext);

const INIT_STATE = {
  videos: [],
  videoDetails: null,
  playlist: [],
  history: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_VIDEOS:
      return { ...state, videos: action.payload };

    case ACTIONS.GET_VIDEO_DETAILS:
      return { ...state, videoDetails: action.payload };

    case ACTIONS.GET_PLAYLIST:
      return { ...state, playlist: action.payload };

    case ACTIONS.ADD_TO_HISTORY:
      return { ...state, history: action.payload };

    case ACTIONS.GET_HISTORY:
      return { ...state, history: action.payload };

    default:
      return state;
  }
};

const ProductContextProvider = ({ children }) => {
  // left bar
  const [showLeftBar, setShowLeftBar] = useState(false);

  function handleLeftBar() {
    setShowLeftBar(!showLeftBar);
  }

  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const navigate = useNavigate();

  //! post request (CREATE)
  const addVideo = async (newVideo) => {
    await axios.post(`${API}/videos/`, newVideo);
  };

  const addVideoPlaylist = async (newVideo) => {
    await axios.post(`${API}/favorites/`, newVideo);
  };

  //! get request (READ)
  const getVideos = async () => {
    try {
      const { data } = await axios(`${API}/videos/${window.location.search}`);
      dispatch({ type: ACTIONS.GET_VIDEOS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const getVideosPlaylist = async () => {
    try {
      const { data } = await axios(
        `${API}/favorites/${window.location.search}`
      );
      dispatch({ type: ACTIONS.GET_PLAYLIST, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  // ! update request (UPDATE)
  async function updateVideo(id, editedVideo) {
    try {
      await axios.patch(`${API}/videos/${id}`, editedVideo);
    } catch (error) {
      console.log(error);
    }
  }

  async function updatePlaylistVideo(id, editedVideo) {
    try {
      await axios.patch(`${API}/favorites/${id}`, editedVideo);
    } catch (error) {
      console.log(error);
    }
  }

  //! delete request (DELETE)
  const deleteVideo = async (id) => {
    await axios.delete(`${API}/videos/${id}`);
    getVideos();
  };

  //! get one video info
  const getVideoDetails = async (id) => {
    try {
      const { data } = await axios(`${API}/videos/${id}`);
      dispatch({ type: ACTIONS.GET_VIDEO_DETAILS, payload: data });
      const updatedHistory = state.history.filter(
        (video) => video.id !== data.id
      );

      updatedHistory.unshift(data);
      dispatch({
        type: ACTIONS.ADD_TO_HISTORY,
        payload: updatedHistory,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    handleLeftBar,
    showLeftBar,

    addVideo,
    getVideos,
    videos: state.videos,
    deleteVideo,

    getVideoDetails,
    videoDetails: state.videoDetails,
    updateVideo,

    history: state.history,

    addVideoPlaylist,
    getVideosPlaylist,
    playlist: state.playlist,
  };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;