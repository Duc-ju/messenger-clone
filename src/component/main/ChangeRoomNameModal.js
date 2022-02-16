import { useContext, useState, } from "react";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import { db } from "../../firebase/config";
import { addDocument } from "../../firebase/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function ChangeRoomNameModal({ setOpenChangeRoomName }) {
  const { currentRoom } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [nameInput, setNameInput] = useState(currentRoom.displayName || "");
  const handleChangeRoomName = () => {
    let newName = nameInput.trim();
    if (newName !== currentRoom.displayName) {
      const roomRef = db.collection("rooms").doc(currentRoom.id);
      roomRef.update({
        displayName: newName,
      });
      if(newName.length !==0 ){
        addDocument("messages", {
          uid: user.uid,
          rid: currentRoom.id,
          displayName: user.displayName,
          type: "log2",
          data: newName,
          readed: [user.uid],
        });
      }
      else{
        addDocument("messages", {
          uid: user.uid,
          rid: currentRoom.id,
          displayName: user.displayName,
          type: "log3",
          readed: [user.uid],
        });
      }
    }
    setOpenChangeRoomName(false);
  };
  const handlekeyUp = (e) => {
    if(e.code === 'Enter') handleChangeRoomName()
  }
  return (
    <div className="fixed top-0 right-[0] flex justify-center items-center bottom-0 left-0 z-[1000] before:top-0 before:absolute before:content-[''] before:right-[0] before:bottom-0 before:left-0 before:bg-[#fff] before:opacity-[60%] before:z-[0]">
      <div className="relative z-[1000] bg-white border w-[548px] shadow rounded-[8px]">
        <div className="flex h-[60px] relative items-center justify-center leading-[1.34] border-b">
          <h2 className="text-[1.25rem] font-bold">Đổi tên đoạn chat</h2>
          <div className="absolute h-[60px] right-0 top-0 flex justify-center items-center pr-[16px]">
            <div className="w-[36px] h-[36px] flex justify-center items-center cursor-pointer bg-[#f5f5f5] rounded-full pointer hover:bg-[#eee]">
              <div
                className="w-[20px] h-[20px] flex justify-center items-center"
                onClick={() => setOpenChangeRoomName(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
          </div>
        </div>
        <div className="py-[12px]">
          <div className="flex items-center p-[12px] text-[.8125rem] text-[#050505]">
            <div>Mọi người đều biết khi tên đoạn chat thay đổi</div>
          </div>
          <div className="w-full mb-[4px] pt-[12px] px-[12px]">
            <div className="p-[2px] border-[2px] border-[#0099FF] rounded-[9px]">
              <div className="px-[16px] rounded-[6px] border-[1px] border-[#CED0D4]">
                <div className="">
                  <div className="flex justify-between items-center pt-[8px]">
                    <div className="text-[#0099FF] text-[0.8125rem]">
                      Tên đoạn chat
                    </div>
                    <div className="text-[0.8125rem]">
                      {500 - nameInput.replace(/\s/g, "").length}/500
                    </div>
                  </div>
                  <div className="pb-[10px] mr-[48px]">
                    <input
                      type="text"
                      autoFocus
                      className="outline-[0] block w-full text-[1rem] leading-[1.25]"
                      onChange={(e) => setNameInput(e.target.value)}
                      value={nameInput}
                      onKeyUp={handlekeyUp}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end px-[12px] pt-[12px]">
            <div
              className="px-[12px] mr-[8px] h-[36px] flex justify-center items-center font-semibold bg-[#f5f5f5] text-[.9375rem] rounded-[6px] hover:bg-[#eee] cursor-pointer"
              onClick={() => setOpenChangeRoomName(false)}
            >
              Huỷ
            </div>
            <div
              className="px-[12px] h-[36px] flex justify-center items-center font-semibold bg-[#0099FF] text-white text-[.9375rem] rounded-[6px] hover:bg-[#3578E5] cursor-pointer"
              onClick={handleChangeRoomName}
            >
              Lưu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeRoomNameModal;
