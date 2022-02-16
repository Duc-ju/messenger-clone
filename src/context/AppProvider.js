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
  const [openReactControl, setOpenReactControl] = useState();
  const [openToolTip, setOpenToolTip] = useState();
  const [openReactionList, setOpenReactionList] = useState();
  const [intervalID, setIntervalID] = useState();

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
  }, [rooms.length]);

  useEffect(() => {
    const handleVisibleChange = () => {
      if (!document.hidden) {
        setIntervalID((oldID) => {
          if (oldID) setIntervalID();
          clearInterval(oldID);
        });
        document.title = "Messenger";
      }
    };
    document.addEventListener("visibilitychange", handleVisibleChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibleChange);
  }, []);

  useEffect(() => {
    let collectionRef = db.collection("messages");
    if (
      messageServerConditions &&
      messageServerConditions.compareValue &&
      messageServerConditions.compareValue.length > 0 &&
      messageServerConditions.compareValue.filter(
        (value) => value === undefined
      ) === 0
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
  }, [messageServerConditions]);

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
          if(!a.lastestMessage||!a.lastestMessage.createAt) return -1
          if(!b.lastestMessage||!b.lastestMessage.createAt) return 1
          return (
            b.lastestMessage.createAt.seconds -
            a.lastestMessage.createAt.seconds
          );
        });
        if (rooms) {
          rooms = rooms.map((room) => {
            if (room.lastestMessage && room.lastestMessage.readed) {
              const readed = room.lastestMessage.readed.map(
                (r) => room.members.filter((member) => member.uid === r)[0]
              );
              room.lastestMessage.readed = readed;
            }
            return room;
          });
        }
        if (messagePending) {
          setIsOpenCreateRoom(false);
          setCurrentRoom(rooms[0]);
          setIsOpenCreateRoom(false);
          addDocument("messages", {
            uid: user.uid,
            rid: rooms[0].id,
            displayName: user.displayName,
            type: "log1",
            readed: [user.uid],
          });
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
            like: [],
            readed: [user.uid],
          });

          setMessageServerIsChanged(true);
        } else {
          if(!isOpenCreateRoom){
            
          }
          let check = false;
          setIsOpenCreateRoom(oldState => {
            if(!oldState){
              setCurrentRoom((oldRoom) => {
                let newRoom;
                if (oldRoom === undefined) {
                  rooms.forEach((room) => {
                    if (
                      !check &&
                      room &&
                      room.lastestMessage &&
                      room.lastestMessage.readed &&
                      room.lastestMessage.readed.filter((r) => r.uid === user.uid)
                        .length > 0
                    ) {
                      newRoom = room;
                      check = true;
                    }
                  });
                } else {
                  check = false;
                  rooms.forEach((room) => {
                    if (!check && room.id === oldRoom.id) {
                      newRoom = room;
                      check = true;
                    }
                  });
                }
                return newRoom;
              });
            }
            return oldState
          })
          setRooms(rooms);
          check = false;
          rooms.forEach((room) => {
            if (
              !check &&
              room &&
              room.lastestMessage &&
              room.lastestMessage.readed &&
              room.lastestMessage.readed.filter((r) => r.uid === user.uid)
                .length === 0 &&
              document.hidden
            ) {
              const id = setInterval(() => {
                if (
                  document.title === "Messenger" ||
                  document.title === "(1) Messenger"
                )
                  document.title =
                    room.lastestMessage.displayName + " đã gửi một tin nhắn";
                else document.title = "(1) Messenger";
              }, 2000);
              setIntervalID((oldID) => {
                if (oldID) clearInterval(oldID);
                return id;
              });
              check = true;
            }
          });
        }
      });
    });
    return unsubcribe;
  }, [roomCondition, messagePending, user, messageServerIsChanged, isOpenCreateRoom]);

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
        openReactControl,
        setOpenReactControl,
        openToolTip,
        setOpenToolTip,
        openReactionList,
        setOpenReactionList,
        setMessageServerIsChanged,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AuthProvider;
