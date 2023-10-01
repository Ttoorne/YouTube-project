import React, { useState } from "react"; // Import useState
import { useAuth } from "../../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import "./register.css";
import {
  Alert,
  AlertTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const navigate = useNavigate();
  const {
    email,
    password,
    avatar,
    userName,
    setEmail,
    setPassword,
    setAvatar,
    setUserName,
    handleRegister,
    loading,
  } = useAuth();

  const [checkUsername, setCheckUsername] = useState("");
  const [checkAvatar, setCheckAvatar] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  // password
  const handleNavigateAfterDelay = () => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [focused, setFocused] = useState(false);
  const [focusedOne, setFocusedOne] = useState(false);
  const [focusedTwo, setFocusedTwo] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleFocusOne = () => {
    setFocusedOne(true);
  };

  const handleBlurOne = () => {
    setFocusedOne(false);
  };

  const handleFocusTwo = () => {
    setFocusedTwo(true);
  };

  const handleBlurTwo = () => {
    setFocusedTwo(false);
  };

  // alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const hideAlertAfterDelay = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  function isUrl(str) {
    const urlPattern =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    return urlPattern.test(str);
  }
  console.log(checkUsername);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("userName", userName);
    formData.append("avatar", avatar);

    const newUserName = formData.get("userName");
    const newAvatar = formData.get("avatar");

    setUserName(newUserName);
    setAvatar(newAvatar);

    try {
      if (
        !email.trim() ||
        !password.trim() ||
        !checkUsername.trim() ||
        !checkAvatar.trim()
      ) {
        setAlertMessage("Заполните все поля!");
        setAlertSeverity("warning");
        setShowAlert(true);
        hideAlertAfterDelay();
        return;
      } else if (password.trim() !== checkPassword.trim()) {
        setAlertMessage("Пароли не совпадают!");
        setAlertSeverity("error");
        setShowAlert(true);
        hideAlertAfterDelay();
        return;
      }

      const avatarIsUrl = isUrl(checkAvatar);
      if (!avatarIsUrl) {
        setAlertMessage("Изображение должно быть ссылочной");
        setAlertSeverity("warning");
        setShowAlert(true);
        hideAlertAfterDelay();
        return;
      }

      const result = await handleRegister();

      if (result === "registered") {
        setAlertMessage("Аккаунт успешно создан!");
        setAlertSeverity("success");
        setShowAlert(true);
        hideAlertAfterDelay();
        handleNavigateAfterDelay();
      } else if (result === "error") {
        setAlertMessage("Произошла ошибка регистрации.");
        setAlertSeverity("error");
        setShowAlert(true);
        hideAlertAfterDelay();
      } else {
        setAlertMessage(result);
        setAlertSeverity("error");
        setShowAlert(true);
        hideAlertAfterDelay();
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="reg__container">
      <h2 className="reg__title">Создать аккаунт</h2>
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
          <Alert
            color={alertSeverity === "success" ? "info" : null}
            severity={alertSeverity}
            variant="filled"
          >
            <AlertTitle>
              {alertSeverity === "success" ? "Успех!" : "Ошибка!"}
            </AlertTitle>
            {alertMessage}
          </Alert>
        )}
      </div>
      <form onSubmit={handleSubmit} className="reg__form">
        <TextField
          label="Введите почту"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="reg__inputs"
          onFocus={handleFocus}
          onBlur={handleBlur}
          InputProps={{
            style: { color: "#f1f1f1" }, // Стили для текста
          }}
          InputLabelProps={{
            sx: { color: focused ? "blue" : "gray" }, // Стили для метки при фокусе
          }}
        />

        <FormControl className="reg__inputs" variant="outlined">
          <InputLabel
            sx={{ color: "gray" }}
            htmlFor="outlined-adornment-password"
          >
            Пароль
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{ color: "#f1f1f1" }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            sx={{
              "& input": {
                color: "#f1f1f1",
              },
            }}
            label="Пароль"
          />
        </FormControl>

        <FormControl className="reg__inputs" variant="outlined">
          <InputLabel
            sx={{ color: "gray" }}
            htmlFor="outlined-adornment-password"
          >
            Потвердите пароль
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{ color: "#f1f1f1" }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            sx={{
              "& input": {
                color: "#f1f1f1",
              },
            }}
            label="Пароль"
          />
        </FormControl>

        <TextField
          label="Введите логин"
          variant="outlined"
          name="userName"
          value={userName} // Use local userName state
          onChange={(e) => {
            setUserName(e.target.value);
            setCheckUsername(e.target.value);
          }} // Update local state
          className="reg__inputs"
          onFocus={handleFocusOne}
          onBlur={handleBlurOne}
          InputProps={{
            style: { color: "#f1f1f1" }, // Стили для текста
          }}
          InputLabelProps={{
            sx: { color: focusedOne ? "blue" : "gray" }, // Стили для метки при фокусе
          }}
        />
        <TextField
          label="Введите ссылку на картинку для профиля"
          variant="outlined"
          name="avatar"
          value={avatar} // Use local avatar state
          onChange={(e) => {
            setAvatar(e.target.value);
            setCheckAvatar(e.target.value);
          }} // Update local state
          className="reg__inputs"
          onFocus={handleFocusTwo}
          onBlur={handleBlurTwo}
          InputProps={{
            style: { color: "#f1f1f1" }, // Стили для текста
          }}
          InputLabelProps={{
            sx: { color: focusedTwo ? "blue" : "gray" }, // Стили для метки при фокусе
          }}
        />

        <div className="reg__bottom">
          <p className="reg__link" onClick={() => navigate("/auth")}>
            Есть аккаунт?
          </p>
          <button
            type="submit"
            disabled={loading}
            className="reg__btn"
            onClick={handleSubmit}
          >
            Создать
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
