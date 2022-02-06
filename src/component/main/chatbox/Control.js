import { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../../../context/AppProvider";
import { AuthContext } from "../../../context/AuthProvider";
import { addDocument } from "../../../firebase/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faImage,
  faStickyNote,
  faGift,
  faThumbsUp,
  faSmile,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

function Control() {
  const [message, setMessage] = useState("");
  const [isTyped, setIsTyped] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const inputElement = useRef();
  const {
    currentRoom,
    openInfo,
    setOpenInfo,
    isOpenCreateRoom,
    choosers,
    setChoosers,
    rooms,
    setCurrentRoom,
    setIsOpenCreateRoom,
  } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const handleButtonSubmit = () => {
    if (isOpenCreateRoom) {
      if (message.replace(/\s/g, "").length) {
        addDocument("rooms", {
          members: [...choosers, user].map((member) => member.uid),
        });
        setIsOpenCreateRoom(false)
        setCurrentRoom()
        setIsPending(true);
        setChoosers([])
        setOpenInfo(true)
      }
    } else {
      if (message.replace(/\s/g, "").length) {
        addDocument("messages", {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          rid: currentRoom.id,
          content: message,
        });
        setMessage("");
      }
    }
    setIsTyped(false);
  };
  useEffect(() => {
    if(isPending){
      setIsOpenCreateRoom(false);
      setCurrentRoom(rooms[0]);
      addDocument("messages", {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        rid: rooms[0].id,
        content: message,
      });
      setIsPending(false);
    }
  }, [rooms]);

  const handleSubmit = (e) => {
    if (e.code === "Enter") {
      handleButtonSubmit();
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value.replace(/\s/g, "").length) setIsTyped(true);
    else setIsTyped(false);
  };

  return (
    <div
      className="fixed bottom-0 py-[12px] border-r bg-white"
      style={{
        width: openInfo ? "47%" : "72%",
      }}
    >
      <div className="flex">
        <div className="mx-[6px] flex justify-around">
          <div className="flex items-center">
            <div className="text-[#00e5ff] cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]">
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
          </div>
          {!isTyped && (
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="text-[#00e5ff] cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]">
                  <FontAwesomeIcon icon={faImage} />
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-[#00e5ff] cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]">
                  <FontAwesomeIcon icon={faStickyNote} />
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-[#00e5ff] cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]">
                  <FontAwesomeIcon icon={faGift} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex items-center relative">
          <input
            type="text"
            placeholder="Aa"
            ref={inputElement}
            onChange={(e) => handleChange(e)}
            onKeyUp={(e) => handleSubmit(e)}
            value={message}
            className="w-full pt-[7px] pl-[12px] pr-[6px] pb-[9px] text-[0.9375rem] rounded-[50px] outline-none bg-[#eee]"
          />
          <div className="text-[#00e5ff] cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee] absolute right-0">
            <FontAwesomeIcon icon={faSmile} />
          </div>
        </div>
        {isTyped && (
          <div className="w-[40px] flex items-center mx-[6px]">
            <div
              className="text-[#00e5ff] cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]"
              onClick={handleButtonSubmit}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
          </div>
        )}
        {!isTyped && (
          <div className="w-[40px] flex items-center mx-[6px]">
            <div className="text-[#00e5ff] cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]">
              <FontAwesomeIcon icon={faThumbsUp} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Control;
