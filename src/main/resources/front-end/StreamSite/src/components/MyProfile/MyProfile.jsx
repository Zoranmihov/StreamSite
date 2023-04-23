import React, { useState, useContext, useEffect } from "react";
import "./MyProfile.css";

import { userContext } from "../../contexts/UserContext";
import Loading from "../Loading/Loading";

import {
  changePassword,
  changeEmail,
  routeGuard,
} from "../../services/userService";

export default function MyProfile() {
  let [loaded, setLoaded] = useState(false);
  let [password, setPassword] = useState();
  let [email, setEmail] = useState();
  let { info } = useContext(userContext);

  useEffect(() => {
    routeGuard();
    setLoaded(true);
  });

  // Verification functions

  const verifyEmail = (email) => {
    // Test if it's a valid email
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      document.querySelector(".email-text").style.display = "none";
      document.querySelector(".email-button").disabled = false;
      setEmail(email);
    } else {
      document.querySelector(".email-text").style.display = "block";
      document.querySelector(".email-button").disabled = true;
    }
  };

  const verifyPassword = (password) => {
    // Test if it's a valid email
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      document.querySelector(".password-text").style.display = "none";
      document.querySelector(".password-button").disabled = false;
      setPassword(password);
    } else {
      document.querySelector(".password-text").style.display = "block";
      document.querySelector(".password-button").disabled = true;
    }
  };

  return (
    <>
      {loaded ? (
        <div className="myProfile-container">
          <form className="profile-form">
            <span className="profile-form-span">Username:</span>
            <input
              type="text"
              className="profile-input"
              value={info.username}
              disabled
            />
            <span className="profile-form-span">Email:</span>
            <input
              type="text"
              className="profile-input"
              value={info.email}
              disabled
            />
            <span className="profile-form-span">Set new email:</span>
            <input
              type="text"
              className="profile-input"
              onChange={(e) => verifyEmail(e.target.value)}
            />
            <p className="error-text email-text">Invalid email</p>
            <button
              type="button"
              className="profile-submit email-button"
              onClick={() => changeEmail(email, info.username, "email")}
            >
              Set email
            </button>
            <span className="profile-form-span">Set new password:</span>
            <input
              type="password"
              className="profile-input"
              onChange={(e) => verifyPassword(e.target.value)}
            />
            <p className="error-text password-text">
              Password must be minimum eight characters, at least one uppercase
              letter, one lowercase letter and one number
            </p>
            <button
              type="button"
              className="profile-submit password-button"
              onClick={() =>
                changePassword(password, info.username, "password")
              }
            >
              Set password
            </button>
          </form>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
