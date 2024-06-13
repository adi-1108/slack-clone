import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "./../components/Header";
import Main from "./../components/Main";
import { auth } from "../firebase/firebase";
import { Navigate, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const _user = auth.currentUser;

    if (_user === null) {
      navigate("/signin");
    }
  }, []);
  return (
    <div>
      <Header />
      <div className="flex items-center justify-between">
        <div className="flex-[0.3]">
          <Sidebar />
        </div>
        <div className="flex-1">
          <Main />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
