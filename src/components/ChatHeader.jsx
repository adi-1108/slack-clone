import React, { useEffect, useState } from "react";
import { StarIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import firebase from "firebase/compat/app";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { toast, ToastContainer } from "react-toastify";
import { addFavourite, removeFavourite } from "@/features/favouriteSlice";
import clsx from "clsx";

const ChatHeader = () => {
  const { roomID } = useSelector((state) => state.app);
  const user = useSelector((state) => state.user.user);
  const [channelName, setChannelName] = useState("");
  const dispatch = useDispatch();
  const fav = useSelector((state) => state.favourite.favouriteChannels);
  const [favourite, setFavourite] = useState(false);
  useEffect(() => {
    const getChannelName = async () => {
      const docRef = doc(db, "channels", roomID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setChannelName(docSnap.data().channelName);
      } else {
      }
    };

    if (fav.includes(roomID)) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
    roomID ? getChannelName() : "";
  }, [roomID]);

  const handleCopytext = () => {
    navigator.clipboard.writeText(roomID);
    toast("Room ID copied to clipboard", {
      type: "success",
      position: "bottom-right",
    });
  };

  const handleAddFavourite = () => {
    dispatch(addFavourite(roomID));
    setFavourite(true);
  };

  const handleRemoveFavourite = () => {
    dispatch(removeFavourite(roomID));
    setFavourite(false);
  };

  return (
    <>
      <Card className="sticky top-0 flex items-center justify-between bg-secondary px-8 py-6 shadow-md">
        <div className="flex items-center justify-center gap-4">
          <Label>
            <strong>{channelName}</strong>
          </Label>
          <StarIcon
            onClick={favourite ? handleRemoveFavourite : handleAddFavourite}
            className={clsx("h-6 w-6 cursor-pointer", {
              ["fill-yellow-400 text-yellow-400 shadow-xl hover:fill-yellow-200 hover:text-yellow-200"]:
                favourite,
              ["text-gray-400 shadow-md hover:text-gray-200"]: !favourite,
            })}
          />
        </div>

        <Popover>
          <PopoverTrigger className="flex items-center justify-center gap-3 rounded-lg px-4 py-2 hover:bg-primary-foreground">
            <InformationCircleIcon className="h-6 w-6 cursor-pointer" />
            <Label>Details</Label>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Label>Created By : </Label>
                <Label>{user.displayName}</Label>
              </div>
              <div className="flex gap-2">
                <Label>Room Id : </Label>
                <Label>{roomID}</Label>
              </div>
              <div>
                <Button onClick={handleCopytext}>Copy to clipboard</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Card>
      <ToastContainer />
    </>
  );
};

export default ChatHeader;
