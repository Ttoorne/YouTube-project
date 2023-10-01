import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContextProvider";

const AddToLiked = () => {
  const navigate = useNavigate();

  const handleNavigateAfterDelay = () => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const {
    user: { email },
  } = useAuth();

  return <div>AddToLiked</div>;
};

export default AddToLiked;
