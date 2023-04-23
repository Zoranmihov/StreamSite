import React, { useContext } from "react";
import "./Nav.css";

import { userContext } from "../../contexts/UserContext";
import { toggle } from "../../services/displayService";

export default function Nav() {
  let { info, setInfo } = useContext(userContext);

  return (
    <nav>
      <p id="Logo">StreamSite</p>
      <form className="nav-form">
        <input type="text" className="nav-input" />
        <button className="nav-submit">&#128269;</button>
      </form>
      {info.loggedin == true ? (
        <div className="dropdown">
          <button onClick={() => toggle()} className="nav-dropbtn">
            Menu
          </button>
          <div id="myDropdown" className="dropdown-content">
            <a href="/" className="nav-links">Home</a>
            <a href="/myprofile" className="nav-links">Profile</a>
            <a href="/upload" className="nav-links">Upload</a>
          </div>
        </div>
      ) : (
        <div className="nav-links">
          <a href="/login" className="nav-link">
            Login
          </a>
          <a href="/register" className="nav-link">
            Register
          </a>
        </div>
      )}
    </nav>
  );
}
