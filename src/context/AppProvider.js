import { useContext, useMemo, useState, useEffect } from "react";
import { db } from "../firebase/config"
import { AuthContext } from "./AuthProvider";
import React from "react";

async function fetchRoomMembers(room) {
  if(!room||!room.members||!room.members.length) return
  return db
    .collection("users")
    .where("uid", "in", room.members)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          displayName: doc.data().displayName,
          uid: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
    });
}

export const AppContext = React.createContext();
function AuthProvider({ children }) {
  const [rooms, setRooms] = useState([])
  const [currentRoom, setCurrentRoom] = useState();
  const [isOpenCreateRoom, setIsOpenCreateRoom] = useState(false);
  const [choosers, setChoosers] = useState([])
  const [openInfo, setOpenInfo] = useState(false)
  const [searchRoom, setSearchRoom] = useState()

  const {
    user: { uid },
  } = useContext(AuthContext);

  const roomCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);
  useEffect(() =>{
    let collectionRef = db.collection('rooms').orderBy('createAt');
    if(roomCondition && roomCondition.compareValue && roomCondition.compareValue.length > 0) {
        collectionRef = collectionRef.where(roomCondition.fieldName, roomCondition.operator, roomCondition.compareValue)
    }

    const unsubcribe = collectionRef.onSnapshot(snapshot => {
        let roomRefs = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
        let promises = roomRefs.map(async roomRef => {
          await fetchRoomMembers(roomRef).then((members) => {
            roomRef.members = members
          })
          return roomRef
        })
        Promise.all(promises).then((rooms) => {
          console.log('read room list');
          setRooms(rooms)
        })
    })
    return unsubcribe
  },[roomCondition])

  return (
    <AppContext.Provider value={{ 
      rooms,
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
      }}>
      {children}
    </AppContext.Provider>
  );
}

export default AuthProvider;
