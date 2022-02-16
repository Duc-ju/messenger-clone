import { useContext, useLayoutEffect, useRef } from "react";
import { AppContext } from "../../../context/AppProvider";
import { AuthContext } from "../../../context/AuthProvider";
import { getRoomName } from "../../../logic/getRoomName";
import { getPhotoURL } from "../../../logic/getPhotoURL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faVideo,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

function Header({ setTop }) {
  const { currentRoom, openInfo, setOpenInfo } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const headerElement = useRef()
  useLayoutEffect(() => {
    setTop(headerElement.current.offsetHeight)
  },[])
  return (
    <div
      className="border-b bg-white border-r w-full relative z-[10]"
      ref={headerElement}
    >
      <div className="flex justify-between p-[12px] h-[76px]">
        <div className="flex">
          <div className="p-[6px] flex items-center">
            {currentRoom.members.length === 2 && (
              <img
                src={getPhotoURL(currentRoom.members.filter(member => member.uid!==user.uid)[0])}
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />
            )}
            {currentRoom.members.length > 2 && currentRoom.photoURL && (
              <img
                src={currentRoom.photoURL}
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />
            )}
            {currentRoom.members.length > 2 && !currentRoom.photoURL && (
              <div className="relative w-[40px] h-[40px]">
                <div className="absolute right-0 top-0">
                  <img
                    src={getPhotoURL(currentRoom.members.filter(member => member.uid!==user.uid)[0])}
                    alt=""
                    className="w-[27px] h-[27px] rounded-full"
                  />
                </div>
                <div className="absolute left-0 bottom-0">
                  <img
                    src={getPhotoURL(currentRoom.members.filter(member => member.uid!==user.uid)[1])}
                    alt=""
                    className="w-[27px] h-[27px] rounded-full border-2 border-white"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="text-left">
            <h3 className="text-[1.0625rem] font-semibold">
              {getRoomName(currentRoom,user.uid)}
            </h3>
            <p className="text-[.8125rem]">Đang hoạt động</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="p-[6px]">
            <div className="text-[#ff8fb2] cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]">
              <FontAwesomeIcon icon={faPhoneAlt} />
            </div>
          </div>
          <div className="p-[6px]">
            <div className="text-[#ff8fb2] cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]">
              <FontAwesomeIcon icon={faVideo} />
            </div>
          </div>
          <div className="p-[6px]">
            <div
              className="text-[#ff8fb2] cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]"
              onClick={() => setOpenInfo((prevOpenInfo) => !prevOpenInfo)}
            >
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
