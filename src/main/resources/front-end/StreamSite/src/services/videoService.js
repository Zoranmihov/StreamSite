import axios from "axios";

export const uploadVideo = (e, title, description) => {
  e.preventDefault();

  // let formData = new FormData();
  // formData.append("title", title);
  // if (description) {
  //   formData.append("description", description);
  // }
  // if (document.querySelector("#thumbnail-input").files[0] != undefined) {
  //   formData.append(
  //     "thumbnail",
  //     document.querySelector("#thumbnail-input").files[0]
  //   );
  // }
  // formData.append("video", document.querySelector("#video-input").files[0]);

  axios.post("/api/videos/upload", {title}, {
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
  }).then(res => console.log(res)).catch(err => console.log(err));

  
};
