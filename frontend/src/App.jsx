import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Home from "./components/Home";
import Show from "./components/Show";
import Register from "./components/Register";
import Login from "./components/Login";
import Addfav from "./components/Addfav";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Show />} />
        <Route path="/log" element={<Register />} />
        <Route path="/logg" element={<Login />} />
        <Route path="/addfav" element={<Addfav />} />
      </Routes>
    </Router>
  );
};

export default App;
