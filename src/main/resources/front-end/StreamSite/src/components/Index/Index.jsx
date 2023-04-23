import React, { useState, useContext, useEffect } from "react";
import "./Index.css";

import Loading from "../Loading/Loading";
import { userContext } from "../../contexts/UserContext";

export default function Index() {
  let [loaded, setLoaded] = useState(true);
  let { info, setInfo } = useContext(userContext);

  return (
    <>
      {loaded == false ? (
        <Loading />
      ) : (
        <div className="index-container">
          <div className="video-info-card">
            <div className="video-thumbnail"></div>
            <div className="video-info">
              <p className="title">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor
              </p>
              <div className="user-info">
                <p>Username</p>
                <p>12 months ago</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
