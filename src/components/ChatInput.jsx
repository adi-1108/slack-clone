import { Timestamp, doc, setDoc } from "firebase/firestore";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase";

import { faker } from "@faker-js/faker";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const ChatInput = ({ channelName }) => {
  const roomID = useSelector((state) => state.app.roomID);
  const _cuurentUser = useSelector((state) => state.user.user);
  const inputRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!roomID) return;

    await setDoc(
      doc(db, "rooms", roomID, "messages", faker.string.numeric(7)),
      {
        message: inputRef.current.value,
        timestamp: Timestamp.now(),
        userName: _cuurentUser.displayName,
      },
    );
    inputRef.current.value = "";
  };
  return (
    <Card className="w-full px-6 py-4">
      <form
        className="flex items-center gap-x-2"
        onSubmit={sendMessage}
        action=""
      >
        <input
          ref={inputRef}
          className="flex-1 bg-transparent transition-all focus:outline-none"
          type="text"
          placeholder={`message-ROOM`}
        />
        <Button className="" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </Card>
  );
};

export default ChatInput;
