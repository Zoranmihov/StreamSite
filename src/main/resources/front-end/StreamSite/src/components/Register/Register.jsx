import React, { useState, useEffect } from "react";
import "./Register.css";
import { registerUser, reverseRouteGuard } from "../../services/userService";

import Loading from "../Loading/Loading";

export default function Register() {
  let [username, setUsername] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [cPassword, setCpassword] = useState();
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(
    new URLSearchParams(window.location.search).get("error")
  );

  useEffect(() => {
    reverseRouteGuard();
    
    setTimeout(() => {
      setLoading(true);
    }, 1000);

  }, []);

  // Verification functions

  const verifyEmail = (email) => {
    // Test if it's a valid email
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      document.querySelector(".register-email-text").style.display = "none";
      document.querySelector(".register-form-submit").disabled = false;
      setEmail(email);
    } else {
      document.querySelector(".register-email-text").style.display = "block";
      document.querySelector(".register-form-submit").disabled = true;
    }
  };

  const verifyPassword = (password) => {
    // Test if it's a valid email
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      document.querySelector(".register-password-text").style.display = "none";
      document.querySelector(".register-form-submit").disabled = false;
      setPassword(password);
    } else {
      document.querySelector(".register-password-text").style.display = "block";
      document.querySelector(".register-form-submit").disabled = true;
    }
  };

  const verifyCpassword = (cPassword) => {
    // Test if it's a valid email
    if (cPassword == password) {
      document.querySelector(".register-cPassword-text").style.display = "none";
      document.querySelector(".register-form-submit").disabled = false;
      setCpassword(cPassword);
    } else {
      document.querySelector(".register-cPassword-text").style.display =
        "block";
      document.querySelector(".register-form-submit").disabled = true;
    }
  };

  return loading ? (
    <div className="register-container">
      <h1>Register</h1>
      <div className="register-form-container">
        <form
          className="register-form"
          onSubmit={(e) => registerUser(e, username, email, password)}
        >
          <span>Sign up it's free</span>
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="register-form-input"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          {error == null ? null : (
            <p style={{ display: "block" }} className="register-error-message">
              Username taken
            </p>
          )}
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="register-form-input"
            required
            onChange={(e) => verifyEmail(e.target.value)}
          />
          <p className="register-error-message register-email-text">
            Invalid email
          </p>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="register-form-input"
            required
            onChange={(e) => verifyPassword(e.target.value)}
          />
          <p className="register-error-message register-password-text">
            Password must be minimum eight characters, at least one uppercase
            letter, one lowercase letter and one number
          </p>
          <input
            type="password"
            placeholder="Confirm password"
            className="register-form-input"
            required
            onChange={(e) => verifyCpassword(e.target.value)}
          />
          <p className="register-error-message register-cPassword-text">
            Passwords don't match
          </p>
          <button type="submit" className="register-form-submit">
            Register
          </button>
        </form>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
