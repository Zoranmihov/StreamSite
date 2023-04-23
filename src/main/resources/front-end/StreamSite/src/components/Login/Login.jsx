import React, { useEffect, useState } from "react";
import "./Login.css";

import Loading from '../Loading/Loading';
import { loginUser, reverseRouteGuard } from "../../services/userService";

export default function Login() {
  // States
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [loaded, setLoading] = useState(false);
  let [error, setError] = useState(
    new URLSearchParams(window.location.search).get("error")
  );

  useEffect(() => {
    reverseRouteGuard();
    
    setTimeout(() => {
      setLoading(true);
    }, 1000);

  }, []);

  return loaded ? (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-form-container">
        <form
          className="login-form"
          onSubmit={(e) => loginUser(e, username, password)}
        >
          <span>Welcome</span>
          {error == null ? null : error == "invalid" ? (
            <p className="login-error-message">Invalid credentials</p>
          ) : (
            <p className="login-error-message">User does not exsist</p>
          )}
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="login-form-input"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="login-form-input"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-form-submit">
            Login
          </button>
        </form>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
