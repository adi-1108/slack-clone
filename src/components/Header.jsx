import {
  UserCircleIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { auth, db } from "../firebase/firebase";
import { resetRoom } from "../features/appSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import {
  addChannels,
  addSearchChannels,
  resetChannels,
} from "../features/searchSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "./ui/card";
import {ModeToggle} from "./mode-toggle";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const { currentChannels } = useSelector((state) => state.search);
  const handleSignOut = () => {
    auth.signOut().then(() => console.log("User signed out"));
    dispatch(logout());
    dispatch2(resetRoom());
    navigate("/signin");
  };
  useEffect(() => {
    if (searchInput.length > 2) {
      const result = currentChannels.filter(
        (obj) =>
          obj.channelName.toLowerCase().substring(0, searchInput.length) ===
          searchInput.toLowerCase().substring(0, searchInput.length),
      );
      dispatch(addSearchChannels(result));
    } else {
      dispatch(resetChannels());
    }
  }, [searchInput]);
  return (
    <Card className="sticky top-0 z-50 grid grid-cols-3 bg-slack-Auberginie px-5 py-5 shadow-md md:px-10 bg-primary my-2 ">
      <div className="flex items-center justify-start gap-5">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {user && (
          <button
            className="rounded-xl bg-red-700 px-4 py-2 font-slackfont text-white shadow-lg"
            onClick={handleSignOut}
          >
            Logout
          </button>
        )}
        <ModeToggle />
      </div>

      <Card className="flex items-center justify-between rounded-xl border-2 px-4 py-2 ">
        <MagnifyingGlassIcon className="h-6 w-6 text-card-foreground" />
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          className="flex-1 bg-slack-Auberginie pl-4 bg-transparent text-card-foreground focus:outline-none"
          placeholder="Seach CHANNEL NAME"
        />
      </Card>

      <div className="flex items-center justify-end">
        <QuestionMarkCircleIcon className="h-8 w-8 text-white" />
      </div>
    </Card>
  );
};

export default Header;
