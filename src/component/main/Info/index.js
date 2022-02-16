import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import { AuthContext } from "../../../context/AuthProvider";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  connectStorageEmulator,
  deleteObject 
} from "firebase/storage";
import { db } from '../../../firebase/config'
import { addDocument } from "../../../firebase/services";
import { getRoomName } from "../../../logic/getRoomName";
import { getPhotoURL } from "../../../logic/getPhotoURL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortDown,
  faPen,
  faSortUp,
  faPlus,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

function Info({ setOpenChangeRoomName, setOpenAddMember }) {
  const [height, setHeight] = useState(window.innerHeight);
  const { currentRoom } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [isOpenMembers, setIsOpenMembers] = useState(false);

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChooseFile = (e) => {
    const file = e.target.files[0];
    if(file.type.split('/').length===0 || file.type.split('/')[0] !== 'image'){
      alert('Vui lòng chọn file hình ảnh')
      return
    }
    if(file.size > 1048576){
      alert('Vui lòng chọn ảnh có kích thước dưới 1MB và tỉ lệ 1:1')
      return
    }
    const fileName = (Math.random()+'').split('.')[1]+file.name
    const storage = getStorage();
    if(window.location.hostname === 'localhost'){
        connectStorageEmulator(storage, "localhost", 9199);
    }
    const storageRef = ref(storage, "images/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {},
      () => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if(currentRoom.photoURL&&currentRoom.photoDirectory&&currentRoom.photoURL.length>0&&currentRoom.photoDirectory.length>0){
                const desertRef = ref(storage, currentRoom.photoDirectory);
                deleteObject(desertRef).then(() => {}).catch(() => {});
            }
            const roomRef = db
            .collection("rooms")
            .doc(currentRoom.id);
            roomRef.update({
                photoURL: downloadURL,
                photoDirectory: "images/" + fileName
            });
            addDocument("messages", {
              uid: user.uid,
              rid: currentRoom.id,
              displayName: user.displayName,
              type: "log4",
              readed: [user.uid],
            });
        });
      }
    );
  };

  return (
    <div
      className="overflow-y-scroll snap-y text-[.9375rem]"
      style={{
        height: `${height}px`,
      }}
    >
      <div className="text-center">
        <div className="flex justify-center items-center pt-[16px] pb-[12px]">
          {currentRoom.members.length === 2 && (
            <img
              src={getPhotoURL(
                currentRoom.members.filter(
                  (member) => member.uid !== user.uid
                )[0]
              )}
              alt=""
              className="w-[80px] h-[80px] rounded-full"
            />
          )}
          {currentRoom.members.length > 2 && currentRoom.photoURL && (
            <img
              src={currentRoom.photoURL}
              alt=""
              className="w-[80px] h-[80px] rounded-full"
            />
          )}
          {currentRoom.members.length > 2 && !currentRoom.photoURL && (
            <div className="relative w-[80px] h-[80px]">
              <div className="absolute right-0 top-0">
                <img
                  src={getPhotoURL(
                    currentRoom.members.filter(
                      (member) => member.uid !== user.uid
                    )[0]
                  )}
                  alt=""
                  className="w-[54px] h-[54px] rounded-full"
                />
              </div>
              <div className="absolute left-0 bottom-0">
                <img
                  src={getPhotoURL(
                    currentRoom.members.filter(
                      (member) => member.uid !== user.uid
                    )[1]
                  )}
                  alt=""
                  className="w-[54px] h-[54px] rounded-full border-2 border-white"
                />
              </div>
            </div>
          )}
        </div>
        <h3 className="text-[1.0625rem] font-semibold">
          {getRoomName(currentRoom, user.uid)}
        </h3>
        <p className="text-[.8125rem] font-normal text-[#65676B]">
          Đang hoạt động
        </p>
      </div>
      <div className="py-[20px]">
        {currentRoom.members.length>2&&<div className="px-[8px] text-left rounded-[8px]">
          <div
            className="flex justify-between items-center py-[6px] pl-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer"
            onClick={() => setIsOpenSetting((old) => !old)}
          >
            <div className="font-semibold">Tuỳ chỉnh đoạn chat</div>
            <div className="py-[8px] px-[16px] flex items-center justify-center">
              {!isOpenSetting ? (
                <FontAwesomeIcon className="mr-[8px]" icon={faSortDown} />
              ) : (
                <FontAwesomeIcon className="mr-[8px]" icon={faSortUp} />
              )}
            </div>
          </div>
        </div>}
        {currentRoom.members.length>2&&isOpenSetting && (
          <ul className="px-[8px]">
            <li
              className="flex px-[8px] items-center rounded-[8px] hover:bg-[#eee] cursor-pointer"
              onClick={() => setOpenChangeRoomName(true)}
            >
              <div className="py-[8px] pr-[12px] flex justify-center items-center">
                <div className="w-[24px] h-[24px] flex justify-center items-center">
                  <FontAwesomeIcon className="mr-[8px]" icon={faPen} />
                </div>
              </div>
              <div className="py-[12px] font-medium">Đổi tên đoạn chat</div>
            </li>
            <li
              className="flex px-[8px] items-center rounded-[8px] hover:bg-[#eee] cursor-pointer relative"
              onClick={() => document.getElementById("inputFile").click()}
            >
              <div className="py-[8px] pr-[12px] flex justify-center items-center">
                <div className="w-[24px] h-[24px] flex justify-center items-center">
                  <FontAwesomeIcon className="mr-[8px]" icon={faImage} />
                </div>
              </div>
              <div className="py-[12px] font-medium">Thay đổi ảnh</div>
              <input
                className="hidden"
                type="file"
                id="inputFile"
                onChange={handleChooseFile}
              />
            </li>
          </ul>
        )}

        {currentRoom.members.length > 2 &&<div className="px-[8px] text-left rounded-[8px]">
          <div className="flex justify-between items-center py-[6px] pl-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
            <div className="font-semibold">Tuỳ chọn nhóm</div>
            <div className="py-[8px] px-[16px] flex items-center justify-center">
              <FontAwesomeIcon className="mr-[8px]" icon={faSortDown} />
            </div>
          </div>
        </div>}
        {currentRoom.members.length > 2 &&<div className="px-[8px] text-left rounded-[8px]">
          <div
            className="flex justify-between items-center py-[6px] pl-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer"
            onClick={() => setIsOpenMembers((old) => !old)}
          >
            <div className="font-semibold">Thành viên trong đoạn chat</div>
            <div className="py-[8px] px-[16px] flex items-center justify-center">
              {!isOpenMembers ? (
                <FontAwesomeIcon className="mr-[8px]" icon={faSortDown} />
              ) : (
                <FontAwesomeIcon className="mr-[8px]" icon={faSortUp} />
              )}
            </div>
          </div>
        </div>}
        {currentRoom.members.length>2&&isOpenMembers && (
          <ul className="px-[8px]">
            {currentRoom.members.map((member) => (
              <li 
              className="flex px-[8px] items-center"
              key={member.uid}
              >
                <div className="py-[8px] pr-[12px] flex justify-center items-center">
                  <img
                    className="w-[36px] h-[36px] rounded-full"
                    src={getPhotoURL(member)}
                    alt=""
                  />
                </div>
                <div className="py-[12px] flex flex-col justify-center">
                  <div className="font-medium">{member.displayName}</div>
                  {/* <span class="text-[.8125rem] text-[#65676B]">Thêm bởi abc</span> */}
                </div>
              </li>
            ))}
            <li 
            className="flex px-[8px] items-center rounded-[8px] hover:bg-[#eee] cursor-pointer"
            onClick={() => setOpenAddMember(true)}
            >
              <div className="py-[8px] pr-[12px] flex justify-center items-center">
                <div className="w-[36px] h-[36px] flex justify-center items-center">
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </div>
              <div className="py-[12px] flex flex-col justify-center">
                <div className="font-medium">Thêm người</div>
              </div>
            </li>
          </ul>
        )}
        <div className="px-[8px] text-left rounded-[8px]">
          <div className="flex justify-between items-center py-[6px] pl-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
            <div className="font-semibold">
              File phương tiện, file và liên kết
            </div>
            <div className="py-[8px] px-[16px] flex items-center justify-center">
              <FontAwesomeIcon className="mr-[8px]" icon={faSortDown} />
            </div>
          </div>
        </div>
        <div className="px-[8px] text-left rounded-[8px]">
          <div className="flex justify-between items-center py-[6px] pl-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
            <div className="font-semibold">Quyền riêng tư & hỗ trợ</div>
            <div className="py-[8px] px-[16px] flex items-center justify-center">
              <FontAwesomeIcon className="mr-[8px]" icon={faSortDown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
