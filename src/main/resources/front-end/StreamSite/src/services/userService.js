import axios from "axios";
axios.defaults.withCredentials = true;

export const loginUser = (e, username, password) => {
  e.preventDefault();

  axios
    .post(
      "/api/users/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => (window.location.href = "/"))
    .catch((err) => {
      if (err.response.status == 401) {
        window.location.href = "/login?error=invalid";
      } else {
        window.location.href = "/login?error=notFound";
      }
    });
};

export const registerUser = (e, username, email, password) => {
  e.preventDefault();
  axios
    .post(
      "/api/users/register",
      {
        username,
        email,
        password: "123456789",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => (window.location.href = "/login"))
    .catch((err) => {
      window.location.href = "/register?error=true";
    });
};

export const validateUser = async () => {
  try {
    let data = await axios.get("/api/users/user", {
      withCredentials: true,
    });
    let user = {
      username: data.data.username,
      email: data.data.email,
      loggedin: true,
    };
    return user;
  } catch (error) {
    return {
      loggedin: false,
    };
  }
};

const updateInfo = (data) => {
  axios
    .post("/api/users/updateinfo", data, {
      withCredentials: true,
    })
    .then((res) => window.location.reload());
};

export const changeEmail = (payload, username, type) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(payload)) {
    let data = {
      username,
      payload,
      type,
    };
    updateInfo(data);
  } else {
    document.querySelector(".email-text").style.display = "block";
    document.querySelector(".email-button").disabled = true;
  }
};

export const changePassword = (payload, username, type) => {
  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(payload)) {
    let data = {
      username,
      payload,
      type,
    };
    updateInfo(data);
  } else {
    document.querySelector(".password-text").style.display = "block";
    document.querySelector(".password-button").disabled = true;
  }
};

export const routeGuard = (res) => {
  validateUser().then((res) => {
    if (res.loggedin) {
      return;
    } else {
      window.location.href = "/login";
    }
  });
};

export const reverseRouteGuard = () => {
  validateUser().then((res) => {
    if (!res.loggedin) {
      return;
    } else {
      window.location.href = "/";
    }
  });
};
