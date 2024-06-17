import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

const Main = () => {
  const { roomID } = useSelector((state) => state.app);
  return (
    <>
      {roomID ? (
        <div className="h-[calc(100vh-80px)] w-full">
          <ChatHeader />
          <ChatInput />
        </div>
      ) : (
        <p>Select a room to chat</p>
      )}
    </>
  );
};

export default Main;
