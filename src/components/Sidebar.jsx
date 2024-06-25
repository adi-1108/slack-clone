import {
  PencilSquareIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import ChannelCard from "./ChannelCard";
import { useEffect, useState } from "react";
import { fa, faker } from "@faker-js/faker";
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
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import CustomDialog from "./CustomDialog";

const Sidebar = () => {
  const [channelShow, setChannelShow] = useState(false);
  const [channels, setChannels] = useState([]);
  const [channelNameInput, setChannelNameInput] = useState("");
  const [userName, setUserName] = useState("");
  const [channelID, setChannelID] = useState(0);
  const currentUser = useSelector((state) => state.user.user);
  const search = useSelector((state) => state.search);
  const fav = useSelector((state) => state.favourite.favouriteChannels);
  const [favChannels, setFavChannels] = useState([]);
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

  useEffect(() => {
    const userQuery = query(
      collection(db, "channels"),
      or(
        where("currentUser", "==", currentUser.uid),
        where("otherUser", "array-contains", currentUser.uid),
      ),
    );
    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      let channelData = [];
      snapshot.forEach((doc) => {
        channelData.push({ ...doc.data() });
      });
      setChannels(channelData);
      const favChannelsList = channelData.filter((channel) =>
        fav.includes(channel.id),
      );
      setFavChannels(favChannelsList);
      dispatch(addChannels(channelData));
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser, db, dispatch, fav]);

  useEffect(() => {
    const getUser = async () => {
      if (currentUser?.uid) {
        try {
          const userID = currentUser.uid;
          const docRef = doc(db, "Users", userID);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserName(`${docSnap.data().fname} ${docSnap.data().lname}`);
          } else {
            console.log("No such document!");
            // Handle the case where the user document does not exist
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    getUser();
  }, [currentUser, db]);

  return (
    <Card className="flex max-h-[calc(100vh-120px)] flex-col gap-4 bg-background px-4 py-2">
      {/* Upper Card */}
      <Card className="flex items-center justify-between border-b-2 p-4">
        <div className="flex flex-col items-start justify-center gap-2 px-2">
          <Label className="text-md">Channel Name</Label>
          <Label className="text-md">{userName}</Label>
        </div>
        <PencilSquareIcon className="h-6 w-6 cursor-pointer" />
      </Card>

      {/* Favourites */}
      <Card className="flex-shrink-0 border-b-2 px-4 py-2">
        <Accordion type="single" className="w-full" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="pl-2">Favourites ⭐</AccordionTrigger>
            <AccordionContent>
              <div className="max-h-40 overflow-y-auto scrollbar-hide">
                {favChannels.map((item) => (
                  <ChannelCard
                    id={item.id}
                    key={item.id}
                    name={item.channelName}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* Channels */}
      <Card className="flex flex-1 flex-col overflow-hidden border-b-2 p-4">
        <Accordion type="single" className="flex w-full flex-1 flex-col">
          <AccordionItem value="item-1">
            <AccordionTrigger
              className="pl-2"
              onClick={() => setChannelShow(!channelShow)}
            >
              Show Channels
            </AccordionTrigger>
            <AccordionContent className="flex flex-1 flex-col overflow-hidden">
              {channelShow && (
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                  <div className="flex cursor-pointer items-center justify-between border-b-2 p-4">
                    <CustomDialog
                      channelNameInput={channelNameInput}
                      setChannelNameInput={setChannelNameInput}
                      channelID={channelID}
                      setChannelID={setChannelID}
                      handleAddChannel={handleAddChannel}
                    />
                  </div>
                  {search.searchAvailable ? (
                    <ScrollArea className="flex-1 overflow-y-auto">
                      {search.searchResults?.map((item) => (
                        <ChannelCard
                          id={item.id}
                          key={item.id}
                          name={item.channelName}
                        />
                      ))}
                    </ScrollArea>
                  ) : (
                    <ScrollArea className="max-h-80 flex-1 overflow-y-auto scrollbar-hide">
                      {channels?.map((item) => (
                        <ChannelCard
                          id={item.id}
                          key={item.id}
                          name={item.channelName}
                        />
                      ))}
                      <ScrollBar oreientation="vertical" />
                    </ScrollArea>
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
