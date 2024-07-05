import Favourites from "./Components/Favourites";
import LatestNews from "./Components/LatestNews";
import LogIn from "./Components/LogIn";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<SignUp/>} path="/SignUp"></Route>
          <Route element={<LogIn/> } path="/LogIn"></Route>
          <Route element={<LatestNews/>} path="/" />
          <Route element={<Favourites/>} path="/favourites" />
        </Routes>
        
      </Router>
    </>
  );
}

export default App;
