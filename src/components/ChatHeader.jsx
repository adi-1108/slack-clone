import React, { useEffect, useState } from "react";
import { StarIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import firebase from "firebase/compat/app";
import {Card} from "./ui/card";
import {Label} from "./ui/label";
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
        
      }
    };

    roomID ? getChannelName() : "";
    
  }, [roomID]);
  return (
    <Card className="sticky top-0 shadow-md bg-secondary flex items-center justify-between  px-8 py-6">
      <div className="flex items-center justify-center gap-4">
        <Label><strong>{channelName}</strong></Label>
        <StarIcon className="h-6 w-6 cursor-pointer" />
      </div>

      <div className="flex items-center justify-center gap-3">
        <InformationCircleIcon className="h-6 w-6 cursor-pointer" />
        <Label>Details</Label>
      </div>
    </Card>
  );
};

export default ChatHeader;
