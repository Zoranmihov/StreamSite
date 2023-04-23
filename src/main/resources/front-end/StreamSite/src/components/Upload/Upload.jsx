import React, {useEffect, useState} from "react";
import "./Upload.css";

import { clickThumbnail, clickVideo } from "../../services/displayService";
import { uploadVideo } from "../../services/videoService";

export default function Upload() {
  let [title, setTitle] = useState(false)
  let [description, setDescription] = useState(false)
    let [thumname, setThumName] = useState(false)
    let [vidname, setVidName] = useState(false)

  return (
    <div className="upload-cointainer">
      <h1>Upload a video</h1>
      <form className="upload-form" onSubmit={(e) => uploadVideo(e, title, description)}>
        <span>Title</span>
        <input type="text" className="upload-input" name="title" onChange={(e) => setTitle(e.target.value)} required />
        <span>Description</span>
        <textarea name="description" onChange={(e) => setDescription(e.target.value)}></textarea>
        <input
          type="file"
          accept="image/png, image/jpeg, image/png, image/jpg"
          className="file-input"
          id="thumbnail-input"
          onChange={(e) => {
            setThumName(e.target.files[0])
        }}
        />
        <input
          type="file"
          accept="video/mp4, video/webm"
          required
          className="file-input"
          id="video-input"
          onChange={(e) => {
            setVidName(e.target.value.split('\\')[2])
        }}
        />
        {thumname ? (<img id="uploaded-img" src={URL.createObjectURL(thumname)} />) : null}
        <button
          type="button"
          className="upload-button"
          onClick={(e) => {clickThumbnail(e)}}
        >
          Chose a thumbnail
        </button>
        {vidname ? (<p className="file-upload-text">Video: {vidname}</p>) : null}
        <button
          type="button"
          className="upload-button"
          onClick={() => clickVideo()}
        >
          Chose a video
        </button>
        <button type="submit" className="upload-button">
          Upload
        </button>
      </form>
    </div>
  );
}
