import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { deleteDoc, doc, getDoc, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import { Card } from "./ui/card";
import { Label } from "./ui/label";

const Message = ({ obj }) => {
  const date =
    obj.timestamp.toDate().toString().split(" ")[2] +
    " " +
    obj.timestamp.toDate().toString().split(" ")[1] +
    " " +
    obj.timestamp.toDate().toString().split(" ")[4];
  const { roomID } = useSelector((state) => state.app);

  const [detailsButtonShow, setDetailsButtonShow] = useState(false);
  const [showMessageOptions, setShowMessageOptions] = useState(false);

  const handleDeleteMessage = async () => {
    // await deleteDoc(q);
  };
  return (
    <Card
      onMouseEnter={() => setDetailsButtonShow(true)}
      onMouseLeave={() => {
        setDetailsButtonShow(false);
        setShowMessageOptions(false);
      }}
      className="m-3 flex flex-col items-start justify-center gap-3 scroll-smooth rounded-xl px-6 py-6 shadow-md transition-all"
    >
      <div className="flex items-center justify-center gap-3">
        <UserCircleIcon className="h-12 w-12" />
        <h1 className="font-slackfont text-lg font-semibold">{obj.userName}</h1>
        <p>{date}</p>
        {detailsButtonShow && (
          <div className="relative">
            <EllipsisVerticalIcon
              onClick={() => setShowMessageOptions(!showMessageOptions)}
              className="h-8 w-8 cursor-pointer rounded-full p-1 transition-all active:bg-slate-800"
            />
            {showMessageOptions && (
              <div className="absolute left-0 mt-2 w-48 origin-top-left cursor-pointer divide-y divide-gray-100 rounded-md border border-gray-300 bg-red-700 shadow-lg transition-all hover:bg-red-800">
                <button onClick={handleDeleteMessage} className="px-4 py-2">
                  <Label className="font-semibold">Delete message</Label>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <p className="px-16">{obj.message}</p>
      </div>
    </Card>
  );
};

export default Message;
