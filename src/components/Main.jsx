import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Loading from "./Loading";
import { ScrollArea } from "@/components/ui/scroll-area";

const Main = () => {
  const { roomID } = useSelector((state) => state.app);
  const user = useSelector((state) => state.user.user);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const msgRef = useRef(null);
  useEffect(() => {
    if (!roomID) return;
    setLoading(true);
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
      setLoading(false);
      msgRef?.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [roomID]);

  if (loading) return <Loading />;

  return (
    <>
      {roomID ? (
        <div className="flex h-[calc(100vh-80px)] flex-col px-4 scrollbar-hide">
          <ChatHeader />

          <div className="h-[calc(100vh-270px)] overflow-auto pb-40 scrollbar-hide">
            {messages?.map((item) => (
              <Message key={item.timestamp} obj={item} />
            ))}
          </div>
          <div ref={msgRef}></div>
          <ChatInput />
        </div>
      ) : (
        <p className="flex h-[calc(100vh-110px)] w-full items-center justify-center">
          Select a room to chat
        </p>
      )}
    </>
  );
};

export default Main;
