import { UserCircleIcon } from "@heroicons/react/24/solid";

const Message = ({ obj }) => {
  const date = obj.timestamp.toDate().toString().split(" ")[4];
  return (
    <div className="flex flex-col items-start justify-center gap-3 rounded-lg px-8 py-6 shadow-sm">
      <div className="flex items-center justify-center gap-3">
        <UserCircleIcon className="h-12 w-12" />
        <h1 className="font-slackfont text-lg font-semibold">{obj.userName}</h1>
        <p>{date}</p>
      </div>

      <div className="flex flex-col">
        <p className="px-16">{obj.message}</p>
      </div>
    </div>
  );
};

export default Message;
