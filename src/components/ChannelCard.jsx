import { HashtagIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";

const ChannelCard = ({ name, id }) => {
  const dispatch = useDispatch();
  const selectChannel = (id) => {
    if (id) {
      dispatch(
        enterRoom({
          roomID: id,
        }),
      );
    }
  };
  return (
    <div
      onClick={() => selectChannel(id)}
      className="flex items-center justify-between gap-4 bg-slack-Auberginie px-4 py-3 transition-all hover:scale-[101%] hover:bg-slack-blue hover:shadow-md"
    >
      <div className="flex items-center justify-center">
        <HashtagIcon className="h-4 w-4 text-white" />
        <p className="flex-1 pl-5 font-slackfont font-semibold text-white">
          {name}
        </p>
      </div>
      <p className="font-slackfont font-semibold text-white">#{id}</p>
    </div>
  );
};

export default ChannelCard;
