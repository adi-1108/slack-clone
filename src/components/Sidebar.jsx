import { PencilSquareIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import ChannelCard from "./ChannelCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enterRoom } from "../features/appSlice";

const channels = ["Youtube", "SLACK", "ADITYA"];

const Sidebar = () => {
  const dispatch = useDispatch();
  const [channelShow, setChannelShow] = useState(false);

  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        }),
      );
    }
  };
  return (
    <div className="bg-slack-Auberginie">
      <div className="flex items-center justify-between border-b-2 p-4">
        <div className="flex flex-col items-start justify-center">
          <h3 className="text-white">CHANNEL NAME</h3>
          <p className="text-white">MY NAME</p>
        </div>
        <PencilSquareIcon class="h-6 w-6 cursor-pointer text-white" />
      </div>

      <div className="flex items-center justify-between border-b-2 p-4">
        <ChevronDownIcon
          className="ml-4 h-6 w-6 cursor-pointer text-white"
          onClick={() => setChannelShow(!channelShow)}
        />
        <div className="flex flex-1 flex-col items-start justify-center pl-5">
          <h3 className="text-white">CHANNEL NAME</h3>
          <p className="text-white">MY NAME</p>
        </div>
      </div>

      {channelShow &&
        channels.map((item) => <ChannelCard channelName={item} />)}
    </div>
  );
};

export default Sidebar;
