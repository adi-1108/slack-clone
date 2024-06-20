import { HashtagIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";
import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Card } from "./ui/card";
import { Label } from "./ui/label";

const ChannelCard = ({ name, id }) => {
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);

  const selectChannel = (id) => {
    if (id) {
      dispatch(
        enterRoom({
          roomID: id,
        }),
      );
    }
  };

  const handleDeleteChannel = async () => {
    if (confirm("Do you really want to delete this channel?"))
      await deleteDoc(doc(db, "channels", id));
  };

  return (
    <Card
      onClick={() => selectChannel(id)}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      className="mt-2 flex cursor-pointer items-center justify-between gap-4 px-3 py-4 hover:bg-primary"
    >
      <div className="flex items-center justify-center">
        <HashtagIcon className="h-4 w-4" />
        <Label className="font-slackfont flex-1 pl-5 font-semibold">
          {name}
        </Label>
      </div>
      <Label className="font-slackfont font-semibold">#{id}</Label>
      {showDelete && (
        <TrashIcon
          onClick={handleDeleteChannel}
          className="h-5 w-5 cursor-pointer object-contain text-white hover:text-red-500"
        />
      )}
    </Card>
  );
};

export default ChannelCard;
