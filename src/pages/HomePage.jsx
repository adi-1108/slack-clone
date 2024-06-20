import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "./../components/Header";
import Main from "./../components/Main";
import { auth } from "../firebase/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.isAuthenticated) navigate("/signin");
  }, []);
  return (
    <div>
      <Header />
      <div className="flex justify-between pt-2">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25} >
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <Main />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default HomePage;
