import React from "react";
import { useState } from "react";
import validator from "validator";
import styles from "./EditUser.module.css";
import Button from "../../Button/Button";
import axios from "axios";
const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  function toHex(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    return result;
  }
  function checkInputs(inputs) {
    var filled = true;
    inputs.forEach(function (input) {
      if (input.value === "") {
        filled = false;
      }
    });
    return filled;
  }
  const inputs = document.querySelectorAll("input");
  const button = document.querySelector("button");
  inputs.forEach(function (input) {
    input.addEventListener("keyup", function () {
      if (checkInputs(inputs)) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    });
  });
  const validate = async (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Password accepted");
    } else {
      setErrorMessage(
        "your password must be at least 8 characters long, one special character, one uppercase and one lowercase letter"
      );
    }
  };
  const [newPassword, setnewPassword] = useState();
  const [lastPassword, setLastPassword] = useState();
  const URL = "http://192.168.1.101/v1/Update";
  const api = axios.create({
    baseURL: URL,
  });
  const returnSignature = async () => {
    const permission = await window.cardano.nami.enable();
    if (permission) {
      const address = await window.cardano.getChangeAddress();
      const signature = await window.cardano.signData(
        address,
        toHex(
          JSON.stringify({
            last_password: lastPassword,
            new_password: newPassword,
          })
        )
      );
      return {
        last_password: lastPassword,
        new_password: newPassword,
        signature: signature,
        address: address,
      };
    } else {
      setErrorMessage(
        "not is possible get your nami address! please, try again!"
      );
      setInterval(() => {
        setErrorMessage("");
      }, 4000);
    }
  };
  const setData = async (e) => {
    e.preventDefault();
    api
      .put(URL, await returnSignature())
      .then((response) => {
        setSuccessMsg("User saved!");
        setInterval(() => {
          setSuccessMsg("");
          window.location.assign("http://localhost:3000/Login");
        }, 2000);
      })
      .catch((error) => {
        if (Object.keys(error.response.data).includes("error")) {
          if (error.response.data.error === "Wrong password.") {
            setErrorMessage("Wrong password.");
            setInterval(() => {
              setErrorMessage("");
            }, 4000);
          } else if (
            error.response.data.error == "Please send the correct input."
          ) {
            setErrorMessage("Please, send the correct input.");
            setInterval(() => {
              setErrorMessage("");
            }, 4000);
          } else if (error.response.data.error === "Good try...") {
            window.location.href("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
          }
        } else {
          setErrorMessage("Error connecting to server");
          setInterval(() => {
            setErrorMessage("");
          }, 4000);
        }
      });
  };
  return (
    <div className={styles.center}>
      <h1>Edit password</h1>
      <form className={styles.form} onSubmit={setData}>
        <div className="last_pass-input">
          <label htmlFor="last_password">Last password:</label>
          <input
            type="password"
            className="last_pass-input"
            id="last_password"
            placeholder="Password@22"
            onChange={(e) => setLastPassword(e.target.value)}
          />
        </div>
        <div className="pass-input">
          <label htmlFor="password" className={styles.pass}>
            New password:
          </label>
          <input
            type="password"
            className="pass-input"
            id="password"
            placeholder="NewPassword@22"
            onChange={(e) => {
              validate(e.target.value);
              setnewPassword(e.target.value);
            }}
          />
          <span className={styles.msg_error}>{errorMessage}</span>
          <span className={styles.msg_success}>{successMsg}</span>
        </div>
        <Button value="Save" />
      </form>
    </div>
  );
};
export default SignUp;
