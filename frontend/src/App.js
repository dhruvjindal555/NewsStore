import Favourites from "./Components/Favourites";
import LatestNews from "./Components/LatestNews";
import LogIn from "./Components/LogIn";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <div className="bg-my-gradient-1 dark:bg-my-gradient-2 min-h-screen">
        <Navbar />
        <Routes>
          <Route element={<SignUp/>} path="/SignUp"></Route>
          <Route element={<LogIn/> } path="/LogIn"></Route>
          <Route element={<LatestNews/>} path="/" />
          <Route element={<Favourites/>} path="/favourites" />
        </Routes>
        </div>
        
      </Router>
    </>
  );
}

export default App;
