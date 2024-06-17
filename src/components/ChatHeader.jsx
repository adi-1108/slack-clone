import React, { useEffect, useState } from "react";
import { StarIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
const ChatHeader = () => {
  const { roomID } = useSelector((state) => state.app);
  const [channelName, setChannelName] = useState("");
  useEffect(() => {
    const getChannelName = async () => {
      const docRef = doc(db, "channels", roomID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setChannelName(docSnap.data().channelName);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };

    roomID ? getChannelName() : "";
    console.log(roomID);
  }, [roomID]);
  return (
    <div className="flex items-center justify-between border-b-2 px-8 py-6">
      <div className="flex items-center justify-center gap-4">
        <strong>{channelName}</strong>
        <StarIcon className="h-6 w-6 cursor-pointer" />
      </div>

      <div className="flex items-center justify-center gap-3">
        <InformationCircleIcon className="h-6 w-6 cursor-pointer" />
        <p>Details</p>
      </div>
    </div>
  );
};

export default ChatHeader;
