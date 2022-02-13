import { useState, useCallback, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { AppContext } from "../../../context/AppProvider";
import { getPhotoURL } from "../../../logic/getPhotoURL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faVideo,
  faEdit,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import PopUp from "./PopUp";

function Header() {
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const { user } = useContext(AuthContext);
  const { setIsOpenCreateRoom, setOpenInfo, rooms, setCurrentRoom } =
    useContext(AppContext);

  const handleClosePopUp = useCallback(() => {
    setDisplayPopUp(false);
  }, []);

  const handleToggerCreateRoom = () => {
    setIsOpenCreateRoom((old) => {
      if (old) {
        if (rooms.length > 0) {
          setIsOpenCreateRoom((old) => {
            if (old) {
              if (rooms.length > 0) {
                let check = false;
                setCurrentRoom(() => {
                  let newRoom;
                  rooms.forEach((room) => {
                    if (
                      !check &&
                      room &&
                      room.lastestMessage &&
                      room.lastestMessage.readed &&
                      room.lastestMessage.readed.filter(
                        (r) => r.uid === user.uid
                      ).length > 0
                    ) {
                      newRoom = room;
                      check = true;
                    }
                  });
                  return newRoom;
                });
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
          setOpenInfo(true);
        } else {
          setCurrentRoom();
          setOpenInfo(false);
        }
      } else {
        setOpenInfo(false);
        setCurrentRoom();
      }
      return !old;
    });
  };

  return (
    <div className="fixed top-0 left-0 w-[28%] bg-white border-r z-[1000]">
      <div className="flex justify-between relative z-[1000]">
        <div className="pt-[20px] px-[16px] pb-[12px] flex items-center">
          <img
            src={getPhotoURL(user)}
            alt=""
            className="w-[36px] h-[36px] rounded-full"
          />
          <h3 className="font-bold text-2xl ml-3">Chat</h3>
        </div>
        <div className="flex items-center mr-3 relative z-[1000]">
          {displayPopUp && <PopUp handleClosePopUp={handleClosePopUp} />}
          <div
            className="cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] bg-[#f5f5f5] rounded-full hover:bg-[#eee]"
            onClick={() => {
              !displayPopUp && setDisplayPopUp(true);
            }}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </div>
          <div className="cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] bg-[#f5f5f5] rounded-full ml-3 hover:bg-[#eee]">
            <FontAwesomeIcon icon={faVideo} />
          </div>
          <div
            className="cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] bg-[#f5f5f5] rounded-full ml-3 hover:bg-[#eee]"
            onClick={handleToggerCreateRoom}
          >
            <FontAwesomeIcon icon={faEdit} />
          </div>
        </div>
      </div>
      <div className="p-4 relative">
        <span className="absolute w-[40px] h-[40px] flex items-center justify-center pl-[10px]">
          <FontAwesomeIcon
            className="inline-block text-[#444]"
            icon={faSearch}
          />
        </span>
        <input
          type="text"
          placeholder="Tìm kiếm trên messenger"
          className="w-full pt-[7px] pr-[6px] pl-[40px] pb-[9px] text-[0.9375rem] rounded-[50px] outline-none bg-[#eee]"
        />
      </div>
    </div>
  );
}

export default Header;
