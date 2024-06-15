import {
  PencilSquareIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import ChannelCard from "./ChannelCard";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Modal from "./Modal";
import { query, set } from "firebase/database";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { data } from "autoprefixer";

const Sidebar = () => {
  const [channelShow, setChannelShow] = useState(true);
  const [channels, setChannels] = useState([]);
  const [channelNameInput, setChannelNameInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAddChannel = async (e) => {
    e.preventDefault();
    const newChannel = {
      id: faker.string.numeric(7),
      channelName: channelNameInput,
    };
    await setDoc(doc(db, "channels", newChannel.id), newChannel);
    const _data = [];
    const q = query(collection(db, "channels"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      _data.push(doc.data());
    });
    // setChannels((prev) => [...channels, data]);
    console.log(_data)
    console.log(channels);
    setChannelNameInput("");
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // useEffect(() => {
  //   const getChannels = async () => {
  //     const _data = [];
  //     const q = query(collection(db, "channels"));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       _data.push(doc.data());
  //     });
  //     // setChannels((prev) => [...prev, ..._data]);
  //     console.log("DAATATA", _data);
  //     // const docRef = doc(db, "channels", newChannel.id);
  //     // const docSnap = await getDoc(docRef);
  //     // if (docSnap.exists()) {
  //     //   setChannels([...channels, docSnap.data()]);
  //     // }
  //   };
  //   getChannels();
  // }, []);
  return (
    <div className="bg-slack-Auberginie">
      <div className="flex items-center justify-between border-b-2 p-4">
        <div className="flex flex-col items-start justify-center">
          <h3 className="text-white">CHANNEL NAME</h3>
          <p className="text-white">MY NAME</p>
        </div>
        <PencilSquareIcon className="h-6 w-6 cursor-pointer text-white" />
      </div>

      <div className="flex items-center justify-between border-b-2 p-4">
        <ChevronDownIcon
          className="ml-4 h-6 w-6 cursor-pointer text-white"
          onClick={() => setChannelShow(!channelShow)}
        />
        <div className="flex flex-1 flex-col items-start justify-center pl-5">
          <h3 className="font-slackfont text-white">CHANNEL NAME</h3>
          <p className="font-slackfont text-white">Aditya Vishwakarma</p>
        </div>
      </div>

      {channelShow && (
        <div>
          <div className="hover:bg-slack-Auberginie-darker flex cursor-pointer items-center justify-between border-b-2 p-4 transition-all">
            <PlusIcon className="ml-4 h-6 w-6 cursor-pointer text-white" />
            <h3
              onClick={() => setShowModal(true)}
              className="flex-1 pl-6 font-slackfont text-white"
            >
              Add a Channel
            </h3>
          </div>
          <div className="overflow-y-scroll">
            {channels.map((item) => (
              <ChannelCard channel={item} />
            ))}
          </div>
        </div>
      )}

      <Modal show={showModal} onClose={toggleModal}>
        <form
          onSubmit={handleAddChannel}
          className="flex flex-col gap-5"
          action=""
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
          <button className="hover:bg-slack-blue-dark w-1/2 rounded-full bg-slack-blue py-2 font-slackfont font-semibold text-white shadow-lg">
            Sumbit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Sidebar;
