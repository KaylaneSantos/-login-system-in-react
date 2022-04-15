import Button from "../../Button/Button";
import { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  //States for data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  //user data
  const user = {
    username: username,
    password: password,
  };
  const URL = "http://192.168.1.101/v1/Login";
  //creating endpoint for requests in axios
  const api = axios.create({
    baseURL: URL,
  });
  //handling the error message and success message
  const setData = async (e) => {
    e.preventDefault();
    await api
      .post(URL, user)
      .then((response) => {
        if (response.status === 200) {
          const auth_token = response.data.auth_token;
          localStorage.setItem("token", auth_token);
          setSuccessMsg("Loading...");
          setInterval(function () {
            setSuccessMsg("");
            window.location.assign("http://localhost:3000/update");
          }, 2000);
        }
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 400) {
          setErrorMsg("wrong username or password!");
          setInterval(function () {
            setErrorMsg("");
          }, 4000);
        }
      });
  };
  return (
    //Form to user data
    <div className={styles.center}>
      <h1>Hello, there!</h1>
      <form className={styles.border} onSubmit={setData}>
        <div className="email-input">
          <label htmlFor="nickName">Username:</label>
          <input
            type="text"
            className="email-input"
            id="nickName"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="pass-input">
          <label htmlFor="password" className={styles.pass}>
            Password:
          </label>
          <input
            type="password"
            className="pass-input"
            id="password"
            placeholder="password@22"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className={styles.signup}>
            Don't have account? <Link to={"/signUp"}> Sign up </Link>
          </p>
        </div>
        <span className={styles.msg_success}>{successMsg}</span>
        <span className={styles.msg_error}>{errorMsg}</span>
        <Button value="Login" />
      </form>
    </div>
  );
};
export default Login;
