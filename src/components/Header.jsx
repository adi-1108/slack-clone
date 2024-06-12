import {
  UserCircleIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";

const Header = () => {
  return (
    <div className="bg-slack-Auberginie sticky top-0 z-50 grid grid-cols-3 px-5 py-5 shadow-md md:px-10">
      <div className="flex items-center justify-start">
        <UserCircleIcon class="h-8 w-8 text-white" />
      </div>

      <div className="flex items-center justify-between rounded-xl border-2 px-4 py-2">
        <MagnifyingGlassIcon class="h-6 w-6 text-white" />
        <input
          type="text"
          className="font-slackfont bg-slack-Auberginie flex-1 pl-4 text-gray-200 opacity-70 focus:opacity-100 focus:outline-none"
          placeholder="Seach CHANNEL NAME"
        />
      </div>

      <div className="flex items-center justify-end">
        <QuestionMarkCircleIcon class="h-8 w-8 text-white" />
      </div>
    </div>
  );
};

export default Header;
