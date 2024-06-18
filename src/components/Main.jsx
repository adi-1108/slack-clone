import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Main = () => {
  const { roomID } = useSelector((state) => state.app);
  const user = useSelector((state) => state.user.user);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!roomID) return;
    const q = query(
      collection(db, "rooms", roomID, "messages"),
      orderBy("timestamp"),
    );
    onSnapshot(q, (snapShot) => {
      let messageData = [];
      snapShot.forEach((doc) => {
        messageData.push({ ...doc.data() });
      });
      setMessages(messageData);
    });

    console.log(messages);
  }, [roomID]);
  return (
    <>
      {roomID ? (
        <div className="h-[calc(100vh-80px)] w-full overflow-scroll pb-28">
          <ChatHeader />
          <div className="">
            {messages?.map((item) => (
              <Message obj={item} />
            ))}
          </div>
          <ChatInput />
        </div>
      ) : (
        <p>Select a room to chat</p>
      )}
    </>
  );
};

export default Main;
