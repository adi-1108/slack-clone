import { FieldValue, Timestamp, doc, setDoc } from "firebase/firestore";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import firebase from "firebase/compat/app";
import { serverTimestamp } from "firebase/database";
import { faker } from "@faker-js/faker";

const ChatInput = ({ channelName }) => {
  const roomID = useSelector((state) => state.app.roomID);
  const _cuurentUser = useSelector((state) => state.user.user);
  const inputRef = useRef(null);
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!roomID) return;
    console.log("Time stamp", Timestamp.now());
    await setDoc(
      doc(db, "rooms", roomID, "messages", faker.string.numeric(7)),
      {
        message: inputRef.current.value,
        timestamp: Timestamp.now(),
        userName: _cuurentUser.uid,
      },
    );
    inputRef.current.value = "";
    console.log("DATA PUSHED SUCCESFULLY");
  };
  return (
    <div className="px-10 py-3">
      <form onSubmit={sendMessage} action="">
        <input
          ref={inputRef}
          className="fixed bottom-8 w-[60%] border-2 border-gray-400 px-6 py-4 font-slackfont shadow-md transition-all hover:bg-slate-100 focus:outline-none"
          type="text"
          placeholder={`message-ROOM`}
        />
        <button className="hidden" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
