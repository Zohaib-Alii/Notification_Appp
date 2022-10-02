import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { AuthContext } from "./context/AuthContext";
import "./App.css";

// app component (All routes are here) && usecontext here
function App() {
  // here  you can fatch current user if thats not exist you can redirect to login
  const { currentUser } = useContext(AuthContext);
  // authantication func
  const RequiredAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      {/* wrapper can wrap the route*/}
      <Route
        path="/"
        element={
          <RequiredAuth>
            {/* here we send the currentUser by a prop*/}
            <Home currentUser={currentUser} />
          </RequiredAuth>
        }
      />
    </Routes>
  );
}

export default App;
