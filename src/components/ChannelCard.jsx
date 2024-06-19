import { HashtagIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";
import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
    <div
      onClick={() => selectChannel(id)}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      className="flex cursor-pointer items-center justify-between gap-4 bg-slack-Auberginie px-4 py-3 transition-all hover:scale-[101%] hover:bg-slack-blue hover:shadow-md"
    >
      <div className="flex items-center justify-center">
        <HashtagIcon className="h-4 w-4 text-white" />
        <p className="flex-1 pl-5 font-slackfont font-semibold text-white">
          {name}
        </p>
      </div>
      <p className="font-slackfont font-semibold text-white">#{id}</p>
      {showDelete && (
        <TrashIcon
          onClick={handleDeleteChannel}
          className="h-6 w-6 cursor-pointer text-red-700"
        />
      )}
    </div>
  );
};

export default ChannelCard;
