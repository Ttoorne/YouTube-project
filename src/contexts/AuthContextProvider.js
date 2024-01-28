import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../helpers/consts";
import fire from "../helpers/fire";

export const authContext = createContext();
export const useAuth = () => useContext(authContext);

const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  async function handleRegister() {
    setLoading(true);
    clearErrors();

    try {
      const authUser = await fire
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const userUid = authUser.user.uid;

      const userRef = fire.firestore().collection("users").doc(userUid);
      await userRef.set({
        email: email,
        userName: userName,
        avatar: avatar,
      });
      setLoading(false);
      return "registered";
    } catch (error) {
      let errorRegMessage = "";
      console.log(error.code);
      switch (error.code) {
        case "auth/email-already-in-use":
          errorRegMessage = "Такой email уже занят";
          break;

        case "auth/invalid-email":
          errorRegMessage = "Такой почты не существует";
          break;

        case "auth/weak-password":
          errorRegMessage = "Слабый пароль";
          break;

        default:
          console.error("Ошибка регистрации", error);
          break;
      }
      setLoading(false);
      return errorRegMessage || "error";
    }
  }

  const handleLogin = async () => {
    setLoading(true);
    clearErrors();

    try {
      await fire.auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
      return "logged";
    } catch (error) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/user-disabled":
          errorMessage = "Не активный пользователь";
          break;
        case "auth/invalid-email":
          errorMessage = "Неверный email";
          break;
        case "auth/user-not-found":
          errorMessage = "Такого пользователя не существует";
          break;
        case "auth/too-many-requests":
          errorMessage = "Слишком много попыток, подождите";
          break;
        case "auth/wrong-password":
          errorMessage = "Неверный пароль";
          break;
        default:
          break;
      }
      setLoading(false);
      return errorMessage || "error";
    }
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const getAvatar = async () => {
    const user = fire.auth().currentUser;
    try {
      if (user) {
        const userDoc = await fire
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get();
        return userDoc.data().avatar || "";
      }
      return "";
    } catch (error) {
      console.log(error);
    }
  };

  const getUserName = async () => {
    const user = fire.auth().currentUser;
    try {
      if (user) {
        const userDoc = await fire
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get();
        return userDoc.data().userName || "";
      }
      return "";
    } catch (error) {
      console.log(error);
    }
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  const values = {
    email,
    password,
    user,

    emailError,
    passwordError,
    hasAccount,

    setEmail,
    setPassword,
    setAvatar,
    setUserName,
    setHasAccount,

    handleRegister,
    handleLogin,
    handleLogout,

    getAvatar,
    getUserName,

    loading,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
