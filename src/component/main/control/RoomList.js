import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import { AuthContext } from "../../../context/AuthProvider";
import { getRoomName } from "../../../logic/getRoomName";
import { getPhotoURL } from "../../../logic/getPhotoURL";
import { getShortString } from "../../../logic/getShortString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellSlash, faTimes } from "@fortawesome/free-solid-svg-icons";
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
          setCurrentRoom(rooms[0]);
          setOpenInfo(true);
        } else {
          setCurrentRoom();
          setOpenInfo(false);
        }
      } else {
        setOpenInfo(false);
      }
      return !old;
    });
  };

  const handleChooseRoom = (room) => {
    setCurrentRoom(room);
    setIsOpenCreateRoom(false)
  }

  return (
    <div
      className="mt-[138px] px-[8px] overflow-y-scroll snap-y"
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
                        alt={choosers[0].displayName
                          ?.charAt(0)
                          .toUpperCase()}
                        className="w-[38px] h-[38px] rounded-full"
                      />
                    </div>
                    <div className="absolute left-0 bottom-0">
                      <img
                        src={getPhotoURL(choosers[1])}
                        alt={choosers[1].displayName
                          ?.charAt(0)
                          .toUpperCase()}
                        className="w-[38px] h-[38px] rounded-full border-2 border-white"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="col-span-7 text-left flex items-center">
                <h3 className="text-[.9375rem] font-medium">Tin nhắn mới <span>{choosers.length>0&&' đến '+getShortString(choosers[0].displayName,10)}</span></h3>
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
            <div className="grid grid-cols-10">
              <div className="col-span-2">
                {room.members.length === 2 && (
                  <img
                    src={getPhotoURL(room.members.filter(member => member.uid!==user.uid)[0])}
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
                        src={getPhotoURL(room.members.filter(member => member.uid!==user.uid)[0])}
                        alt={room.members[0].displayName
                          ?.charAt(0)
                          .toUpperCase()}
                        className="w-[38px] h-[38px] rounded-full"
                      />
                    </div>
                    <div className="absolute left-0 bottom-0">
                      <img
                        src={getPhotoURL(room.members.filter(member => member.uid!==user.uid)[1])}
                        alt={room.members[1].displayName
                          ?.charAt(0)
                          .toUpperCase()}
                        className="w-[38px] h-[38px] rounded-full border-2 border-white"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="col-span-7 text-left">
                <h3 className="text-[.9375rem]">
                  {getRoomName(room, user.uid)}
                </h3>
                <span className="text-[.8125rem]">Xin chào hôm nay...</span>
                <span className="mx-[6px]">·</span>
                <span className="text-[.8125rem]">57 phút</span>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <FontAwesomeIcon icon={faBellSlash} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default RoomList;
