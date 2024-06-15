import { HashtagIcon } from "@heroicons/react/24/solid";

const ChannelCard = ({ item }) => {
  return (
    <div className="flex items-center justify-between gap-4 bg-red-400 px-4 py-3">
      <HashtagIcon className="h-4 w-4 text-white" />
      <p className="flex-1 pl-5 text-white">{item.channelName}</p>
    </div>
  );
};

export default ChannelCard;
