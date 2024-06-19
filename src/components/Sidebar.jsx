import {
  PencilSquareIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import ChannelCard from "./ChannelCard";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Modal from "./Modal";
import { query, update } from "firebase/database";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  getDocs,
  where,
  updateDoc,
  or,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addChannels } from "../features/searchSlice";

const Sidebar = () => {
  const [channelShow, setChannelShow] = useState(false);
  const [channels, setChannels] = useState([]);
  const [channelNameInput, setChannelNameInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [channelID, setChannelID] = useState(0);
  const currentUser = useSelector((state) => state.user.user);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const handleAddChannel = async (e) => {
    e.preventDefault();
    const newChannel = {
      id: faker.string.numeric(7),
      channelName: channelNameInput,
      currentUser: currentUser.uid,
      otherUser: [],
    };
    if (channelNameInput !== "") {
      await setDoc(doc(db, "channels", newChannel.id), newChannel);
      setChannelNameInput("");
      setShowModal(false);
    }

    if (channelID !== 0) {
      const docRef = doc(db, "channels", channelID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(doc(db, "channels", channelID), {
          otherUser: [...docSnap.data().otherUser, currentUser.uid],
        });
        setChannelNameInput("");
        setChannelID(0);
        setShowModal(false);
      } else {
      }
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const userQuery = query(
      collection(db, "channels"),
      or(
        where("currentUser", "==", currentUser.uid),
        where("otherUser", "array-contains", currentUser.uid),
      ),
    );
    onSnapshot(userQuery, (snapshot) => {
      let channelData = [];
      snapshot.forEach((doc) => {
        channelData.push({ ...doc.data() });
      });
      setChannels(channelData);
      dispatch(addChannels(channelData));
    });
    const getUser = async () => {
      const userID = currentUser.uid;
      const docRef = doc(db, "Users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserName(`${docSnap.data().fname} ${docSnap.data().lname}`);
      } else {
      }
    };
    setTimeout(() => {
      getUser();
    }, 400);
  }, []);

  return (
    <div className="h-[calc(100vh-80px)] bg-slack-Auberginie">
      <div className="flex items-center justify-between border-b-2 p-4">
        <div className="flex flex-col items-start justify-center">
          <h3 className="font-slackfont font-semibold text-white">
            Channel Name
          </h3>
          <p className="font-slackfont font-semibold text-white">{userName}</p>
        </div>
        <PencilSquareIcon className="h-6 w-6 cursor-pointer text-white" />
      </div>

      <div className="flex items-center justify-between border-b-2 p-4">
        <div className="flex flex-col items-start justify-center">
          <h3 className="font-slackfont font-semibold text-white">
            Favourite 🌟
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-between border-b-2 p-4">
        <ChevronDownIcon
          className="ml-4 h-6 w-6 cursor-pointer text-white"
          onClick={() => setChannelShow(!channelShow)}
        />
        <div className="flex flex-1 flex-col items-start justify-center pl-5">
          <h3 className="font-slackfont text-white">CHANNEL NAME</h3>
          <p className="font-slackfont text-white">{userName}</p>
        </div>
      </div>

      {channelShow && (
        <div>
          <div className="flex cursor-pointer items-center justify-between border-b-2 p-4 transition-all hover:bg-slack-Auberginie-darker">
            <PlusIcon className="ml-4 h-6 w-6 cursor-pointer text-white" />
            <h3
              onClick={() => setShowModal(true)}
              className="flex-1 pl-6 font-slackfont text-white"
            >
              Add a Channel
            </h3>
          </div>
          {search.searchAvailable ? (
            search.searchResults?.map((item) => (
              <ChannelCard id={item.id} key={item.id} name={item.channelName} />
            ))
          ) : (
            <div>
              {channels?.map((item) => {
                return (
                  <ChannelCard
                    id={item.id}
                    key={item.id}
                    name={item.channelName}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      <Modal show={showModal} onClose={toggleModal}>
        <form
          onSubmit={handleAddChannel}
          className="flex flex-col gap-5"
          
        >
          <label className="mt-3 pl-4 font-slackfont font-semibold" htmlFor="">
            Enter a Channel Name
          </label>
          <input
            value={channelNameInput}
            onChange={(e) => setChannelNameInput(e.target.value)}
            type="text"
            className="rounded-full px-4 py-2 font-slackfont shadow-lg focus:outline-none"
          />
          <label className="mt-3 pl-4 font-slackfont font-semibold" htmlFor="">
            Or a Channel ID
          </label>
          <input
            value={channelID}
            onChange={(e) => setChannelID(e.target.value)}
            type="text"
            className="rounded-full px-4 py-2 font-slackfont shadow-lg focus:outline-none"
          />
          <button className="w-1/2 rounded-full bg-slack-blue py-2 font-slackfont font-semibold text-white shadow-lg hover:bg-slack-blue-dark">
            Sumbit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Sidebar;
