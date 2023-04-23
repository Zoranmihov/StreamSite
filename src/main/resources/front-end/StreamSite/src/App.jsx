import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Index from "./components/Index/Index";
import Nav from "./components/Nav/Nav";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Loading from "./components/Loading/Loading";
import MyProfile from "./components/MyProfile/MyProfile";
import Upload from "./components/Upload/Upload";

import { userContext } from "./contexts/UserContext";
import { validateUser } from "./services/userService";
import { closeDropdown } from "./services/displayService";


function App() {
  let [loaded, setLoaded] = useState(false);
  let [info, setInfo] = useState(false);
  useEffect(() => {
    validateUser().then((res) => {
      setInfo(res);
      setLoaded(true);
    });
  }, []);

  return (
    <div className="App" onClick={() => closeDropdown()}>
      {loaded ? (
        <userContext.Provider value={{ info, setInfo }}>
          <Nav />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </userContext.Provider>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
