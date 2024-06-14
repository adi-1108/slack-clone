import {
  UserCircleIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(logout());
  };
  return (
    <div className="sticky top-0 z-50 grid grid-cols-3 bg-slack-Auberginie px-5 py-5 shadow-md md:px-10">
      <div className="flex items-center justify-start gap-5">
        <UserCircleIcon className="h-8 w-8 text-white" />
        {user.isAuthenticated && (
          <button
            className="rounded-xl bg-red-700 px-4 py-2 font-slackfont text-white shadow-lg"
            onClick={handleSignOut}
          >
            Logout
          </button>
        )}
      </div>

      <div className="flex items-center justify-between rounded-xl border-2 px-4 py-2">
        <MagnifyingGlassIcon className="h-6 w-6 text-white" />
        <input
          type="text"
          className="flex-1 bg-slack-Auberginie pl-4 font-slackfont text-gray-200 opacity-70 focus:opacity-100 focus:outline-none"
          placeholder="Seach CHANNEL NAME"
        />
      </div>

      <div className="flex items-center justify-end">
        <QuestionMarkCircleIcon className="h-8 w-8 text-white" />
      </div>
    </div>
  );
};

export default Header;
