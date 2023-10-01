import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContextProvider";
import "./login.css";
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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const { email, password, setEmail, setPassword, handleLogin } = useAuth();

  const navigate = useNavigate();

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

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!email.trim() || !password.trim()) {
        setAlertMessage("Заполните все поля!");
        setAlertSeverity("warning");
        setShowAlert(true);
        hideAlertAfterDelay();
        return;
      }

      const result = await handleLogin();

      if (result === "logged") {
        setAlertMessage("Вы успешно вошли!");
        setAlertSeverity("success");
        setShowAlert(true);
        hideAlertAfterDelay();
        handleNavigateAfterDelay();
      } else if (result === "error") {
        setAlertMessage("Произошла ошибка входа.");
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
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="login__container">
      <h2 className="login__title">Вход</h2>
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
      <div className={"login__form"}>
        <TextField
          label="Введите почту"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login__inputs"
          onFocus={handleFocus}
          onBlur={handleBlur}
          InputProps={{
            style: { color: "#f1f1f1" }, // Стили для текста
          }}
          InputLabelProps={{
            sx: { color: focused ? "blue" : "gray" }, // Стили для метки при фокусе
          }}
        />

        <FormControl className="login__inputs" variant="outlined">
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
        <div className="login__bottom">
          <p className="login__link" onClick={() => navigate("/register")}>
            Создать аккаунт
          </p>
          <button className="login__btn" onClick={handleSubmit}>
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
