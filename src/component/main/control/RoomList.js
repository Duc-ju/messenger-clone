import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import { AuthContext } from "../../../context/AuthProvider";
import { getRoomName } from "../../../logic/getRoomName";
import { getPhotoURL } from "../../../logic/getPhotoURL";
import { getShortString } from "../../../logic/getShortString";
import { getMessageLog } from "../../../logic/getMessageLog";
import { getRangeOfTimeToCurrent } from "../../../logic/getRangeOfTimeToCurrent";
import { getUserName } from "../../../logic/getUserName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./scrollBar.css";

function RoomList() {
  const [height, setHeight] = useState(window.innerHeight - 196);
  const {
    rooms,
    currentRoom,
    setCurrentRoom,
    isOpenCreateRoom,
    setIsOpenCreateRoom,
    setOpenInfo,
    choosers,
  } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight - 196);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggerCreateRoom = () => {
    setIsOpenCreateRoom((old) => {
      if (old) {
        if (rooms.length > 0) {
          let check = false;
          setCurrentRoom(() => {
            setOpenInfo(true);
            let newRoom;
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
            return newRoom;
          });
        } else {
          setOpenInfo(false);
          setCurrentRoom();
        }
      } else {
        setOpenInfo(false);
      }
      return !old;
    });
  };

  const handleChooseRoom = (room) => {
    setCurrentRoom(room);
    setIsOpenCreateRoom(false);
  };

  return (
    <div
      className="mt-[138px] px-[8px] overflow-y-scroll snap-y relative z-0"
      style={{
        height: `${height}px`,
      }}
      id="style-7"
    >
      <ul>
        {isOpenCreateRoom && (
          <li className="p-[8px] rounded-[8px] hover:bg-[#f5f5f5] cursor-pointer">
            <div className="grid grid-cols-10">
              <div className="col-span-2">
                {choosers.length === 0 && (
                  <img
                    src={getPhotoURL()}
                    alt=""
                    className="w-[56px] h-[56px] rounded-full"
                  />
                )}
                {choosers.length === 1 && (
                  <img
                    src={getPhotoURL(choosers[0])}
                    alt=""
                    className="w-[56px] h-[56px] rounded-full"
                  />
                )}
                {choosers.length > 1 && (
                  <div className="relative w-[56px] h-[56px]">
                    <div className="absolute right-0 top-0">
                      <img
                        src={getPhotoURL(choosers[0])}
                        alt=""
                        className="w-[38px] h-[38px] rounded-full"
                      />
                    </div>
                    <div className="absolute left-0 bottom-0">
                      <img
                        src={getPhotoURL(choosers[1])}
                        alt=""
                        className="w-[38px] h-[38px] rounded-full border-2 border-white"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="col-span-7 text-left flex items-center">
                <h3 className="text-[.9375rem] font-medium">
                  Tin nhắn mới{" "}
                  <span>
                    {choosers.length > 0 &&
                      " đến " + getShortString(choosers[0].displayName, 10)}
                  </span>
                </h3>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <div
                  className="hover:bg-[#eee] rounded-full flex items-center justify-center w-[24px] h-[24px] text-[12px]"
                  onClick={handleToggerCreateRoom}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
            </div>
          </li>
        )}
        {rooms.map((room) => (
          <li
            key={room.id}
            className="p-[8px] rounded-[8px] hover:bg-[#f5f5f5] cursor-pointer"
            style={{
              backgroundColor:
                currentRoom && currentRoom.id === room.id ? "#f5f5f5" : "",
            }}
            onClick={() => handleChooseRoom(room)}
          >
            <div className="grid grid-cols-10 relative">
              <div className="col-span-2">
                {room.members.length === 2 && (
                  <img
                    src={getPhotoURL(
                      room.members.filter(
                        (member) => member.uid !== user.uid
                      )[0]
                    )}
                    alt=""
                    className="w-[56px] h-[56px] rounded-full"
                  />
                )}
                {room.members.length > 2 && room.photoURL && (
                  <img
                    src={room.photoURL}
                    alt=""
                    className="w-[56px] h-[56px] rounded-full"
                  />
                )}
                {room.members.length > 2 && !room.photoURL && (
                  <div className="relative w-[56px] h-[56px]">
                    <div className="absolute right-0 top-0">
                      <img
                        src={getPhotoURL(
                          room.members.filter(
                            (member) => member.uid !== user.uid
                          )[0]
                        )}
                        alt=""
                        className="w-[38px] h-[38px] rounded-full"
                      />
                    </div>
                    <div className="absolute left-0 bottom-0">
                      <img
                        src={getPhotoURL(
                          room.members.filter(
                            (member) => member.uid !== user.uid
                          )[1]
                        )}
                        alt=""
                        className="w-[38px] h-[38px] rounded-full border-2 border-white"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="col-span-8 text-left">
                <h3
                  className="text-[.9375rem]"
                  style={{
                    fontWeight:
                      room.lastestMessage &&
                      room.lastestMessage.uid !== user.uid &&
                      room.lastestMessage.readed.filter(
                        (r) => r.uid === user.uid
                      ).length === 0
                        ? "600"
                        : "",
                  }}
                >
                  {getRoomName(room, user.uid)}
                </h3>
                {room.lastestMessage && (
                  <span
                    style={{
                      fontWeight:
                        room.lastestMessage &&
                        room.lastestMessage.uid !== user.uid &&
                        room.lastestMessage.readed.filter(
                          (r) => r.uid === user.uid
                        ).length === 0
                          ? "600"
                          : "",
                    }}
                  >
                    <span className="text-[.8125rem]">
                      {room.lastestMessage.content
                        ? (room.lastestMessage.uid === user.uid
                            ? "Bạn"
                            : getUserName(room.lastestMessage)) +
                          ": " +
                          getShortString(room.lastestMessage.content, 18)
                        : getShortString(
                            getMessageLog(room.lastestMessage, user),
                            18
                          )}
                    </span>
                    <span className="mx-[6px]">·</span>
                    {room.lastestMessage.createAt && (
                      <span className="text-[.8125rem]">
                        {getRangeOfTimeToCurrent(
                          room.lastestMessage.createAt.seconds
                        )}
                      </span>
                    )}
                  </span>
                )}
              </div>
              {room.lastestMessage && (
                <div className="right-0 top-[50%] translate-y-[-50%] absolute flex items-center justify-end text-[#8A8D91]">
                  {room.lastestMessage.uid === user.uid &&
                    room.lastestMessage.readed.length === 1 && (
                      <FontAwesomeIcon icon={faCheckCircle} />
                    )}
                  {room.lastestMessage.uid === user.uid &&
                    room.lastestMessage.readed
                      .filter((r) => r.uid !== user.uid)
                      .slice(0, 3)
                      .map((r, index, arr) => (
                        <img
                          key={r.uid}
                          src={getPhotoURL(r)}
                          className="w-[16px] h-[16px] rounded-full"
                          alt=""
                          style={{
                            transform:
                              arr.length > 1 && index < arr.length - 1
                                ? `translateX(${
                                    (arr.length - index - 1) * 4
                                  }px)`
                                : "0",
                            zIndex: arr.length - index,
                          }}
                        />
                      ))}
                  {room.lastestMessage &&
                    room.lastestMessage.uid !== user.uid &&
                    room.lastestMessage.readed.filter((r) => r.uid === user.uid)
                      .length === 0 && (
                      <img
                        src={process.env.PUBLIC_URL + "/img/active.png"}
                        className="w-[8px] h-[8px]"
                        alt=""
                      />
                    )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default RoomList;
