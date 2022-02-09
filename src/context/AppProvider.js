import { useContext, useMemo, useState, useEffect } from "react";
import { db } from "../firebase/config";
import { addDocument } from "../firebase/services";
import { AuthContext } from "./AuthProvider";
import React from "react";

async function fetchRoomMembers(room) {
  if (!room || !room.members || !room.members.length) return;
  return db
    .collection("users")
    .where("uid", "in", room.members)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => ({
        displayName: doc.data().displayName,
        uid: doc.data().uid,
        photoURL: doc.data().photoURL,
      }));
    });
}

async function fetchLastestMessage(room) {
  if (!room) return;
  return db
    .collection("messages")
    .where("rid", "==", room.id)
    .orderBy("createAt", "desc")
    .limit(1)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => doc.data());
    });
}

export const AppContext = React.createContext();
function AuthProvider({ children }) {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();
  const [isOpenCreateRoom, setIsOpenCreateRoom] = useState(false);
  const [choosers, setChoosers] = useState([]);
  const [openInfo, setOpenInfo] = useState(false);
  const [searchRoom, setSearchRoom] = useState();
  const [messagePending, setMessagePending] = useState();
  const [messageServerIsChanged, setMessageServerIsChanged] = useState(false);

  const { user } = useContext(AuthContext);

  const roomCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user.uid,
    };
  }, [user.uid]);
  const messageServerConditions = useMemo(() => {
    return {
      fieldName: "rid",
      operator: "in",
      compareValue: rooms.map((room) => room.rid),
    };
  });

  useEffect(() => {
    let collectionRef = db.collection("messages");
    if (
      messageServerConditions &&
      messageServerConditions.compareValue &&
      messageServerConditions.compareValue.length > 0
    ) {
      collectionRef = collectionRef.where(
        messageServerConditions.fieldName,
        messageServerConditions.operator,
        messageServerConditions.compareValue
      );
    }

    const unsubcribe = collectionRef.onSnapshot(() => {
      setMessageServerIsChanged(true);
    });

    return unsubcribe;
  },[]);

  useEffect(() => {
    setMessageServerIsChanged(false);
    let collectionRef = db.collection("rooms").orderBy("createAt", "desc");
    if (
      roomCondition &&
      roomCondition.compareValue &&
      roomCondition.compareValue.length > 0
    ) {
      collectionRef = collectionRef.where(
        roomCondition.fieldName,
        roomCondition.operator,
        roomCondition.compareValue
      );
    }

    const unsubcribe = collectionRef.onSnapshot((snapshot) => {
      setMessagePending();
      let roomRefs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let promises = roomRefs.map(async (roomRef) => {
        await fetchRoomMembers(roomRef).then((members) => {
          roomRef.members = members;
        });
        await fetchLastestMessage(roomRef).then((lastestMessage) => {
          roomRef.lastestMessage = lastestMessage[0];
        });
        return roomRef;
      });
      Promise.all(promises).then((rooms) => {
        rooms.sort((a, b) => {
          return b.lastestMessage.createAt.seconds - a.lastestMessage.createAt.seconds;
        });
        if (messagePending) {
          setIsOpenCreateRoom(false);
          setCurrentRoom(rooms[0]);
          addDocument("messages", {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            rid: rooms[0].id,
            content: messagePending,
            love: [],
            haha: [],
            wow: [],
            sad: [],
            angry: [],
            like: []
          });
        }
        else{
          setRooms(rooms);
        }
      });
    });
    return unsubcribe;
  }, [roomCondition, messagePending, user, messageServerIsChanged]);

  return (
    <AppContext.Provider
      value={{
        rooms,
        setRooms,
        currentRoom,
        setCurrentRoom,
        isOpenCreateRoom,
        setIsOpenCreateRoom,
        choosers,
        setChoosers,
        openInfo,
        setOpenInfo,
        searchRoom,
        setSearchRoom,
        messagePending,
        setMessagePending,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AuthProvider;
