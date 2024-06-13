import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { auth } from "./firebase/firebase";
import { Provider } from "react-redux";
import store from "./app/store";
import { useSelector } from "react-redux";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { useEffect, useState } from "react";


const App = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user.refreshToken);
  console.log("USER FROM REDUX ", );

  return (
    <div className="m-0 h-[calc(100vh-10px)] overflow-hidden bg-blue-900">
      
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Signin />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route index path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
