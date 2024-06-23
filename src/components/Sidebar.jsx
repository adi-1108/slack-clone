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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "./ui/card";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import CustomDialog from "./CustomDialog";

const Sidebar = () => {
  const [channelShow, setChannelShow] = useState(false);
  const [channels, setChannels] = useState([]);
  const [channelNameInput, setChannelNameInput] = useState("");
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
    <Card className="h-[calc(100vh-110px)] bg-background px-4 py-2">
      <Card className="bg- flex items-center justify-between border-b-2 p-4">
        <div className="flex flex-col items-start justify-center gap-2 px-2">
          <Label className="text-md">Channel Name</Label>
          <Label className="text-md">{userName}</Label>
        </div>
        <PencilSquareIcon className="h-6 w-6 cursor-pointer text-white" />
      </Card>

      <Card className="my-4 flex items-center justify-between border-b-2 p-4">
        <div className="flex flex-col items-start justify-center">
          <Label className="text-md px-2">Favourite 🌟</Label>
        </div>
      </Card>

      <Card className="mt-3 flex items-center justify-between border-b-2 p-4">
        <Accordion
          type="single"
          className="max-h-[calc(100vh-365px)] w-full"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger
              className="pl-2"
              onClick={() => setChannelShow(!channelShow)}
            >
              Show Channels
            </AccordionTrigger>
            <AccordionContent>
              {channelShow && (
                <div className="max-h-[calc(100vh-410px)] overflow-y-scroll scrollbar-hide">
                  <div className="flex cursor-pointer items-center justify-between border-b-2 p-4 transition-all">
                    <CustomDialog
                      channelNameInput={channelNameInput}
                      setChannelNameInput={setChannelNameInput}
                      channelID={channelID}
                      setChannelID={setChannelID}
                      handleAddChannel={handleAddChannel}
                    ></CustomDialog>
                  </div>
                  {search.searchAvailable ? (
                    search.searchResults?.map((item) => (
                      <ChannelCard
                        id={item.id}
                        key={item.id}
                        name={item.channelName}
                      />
                    ))
                  ) : (
                    <div className="max-h-[calc(100vh-410px)] overflow-y-auto scrollbar-hide">
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </Card>
  );
};

export default Sidebar;
