import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeGD6J_Xy5fVD21ijmO7O0-J2OYkOarXw",
  authDomain: "you-tube-project-ttorrne.firebaseapp.com",
  projectId: "you-tube-project-ttorrne",
  storageBucket: "you-tube-project-ttorrne.appspot.com",
  messagingSenderId: "182637289004",
  appId: "1:182637289004:web:7d70503defded0dd367b89",
  measurementId: "G-9P5EV121FD",
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
