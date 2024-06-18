import {
  UserCircleIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { auth, db } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { resetRoom } from "../features/appSlice";

import { useNavigate } from "react-router-dom";
import { appSlice } from "./../features/appSlice";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { addChannels, resetChannels } from "../features/searchSlice";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSignOut = () => {
    auth.signOut().then(() => console.log("User signed out"));
    dispatch(logout());
    dispatch2(resetRoom());
    navigate("/signin");
  };

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      if (searchInput.length < 3) {
        dispatch(resetChannels());
      }
      const searchChannels = async () => {
        if (searchInput.length >= 3) {
          const q = query(
            collection(db, "channels"),
            orderBy("channelName"),
            startAt(searchInput.charAt(0)),
          );

          let channelData = [];
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            channelData.push({ ...doc.data() });
          });

          console.log(channelData);
          setTimeout(() => {
            dispatch(addChannels(channelData));
          }, 300);
        }
      };

      searchChannels();
    }, 500);

    return () => clearTimeout(debounceFetch);
  }, [searchInput]);

  return (
    <div className="sticky top-0 z-50 grid grid-cols-3 bg-slack-Auberginie px-5 py-5 shadow-md md:px-10">
      <div className="flex items-center justify-start gap-5">
        <UserCircleIcon className="h-8 w-8 text-white" />
        {user && (
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
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
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
