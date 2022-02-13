import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import { fetchUserList } from "../../logic/fetchUserList";
import { getPhotoURL } from "../../logic/getPhotoURL";
import { getShortString } from "../../logic/getShortString";
import { db } from "../../firebase/config";
import { addDocument } from "../../firebase/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";

function AddMemberModal({ setOpenAddMember }) {
  const { currentRoom } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [keyword, setKeyword] = useState("");
  const [choosers, setChoosers] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchUserList(keyword, currentRoom.members, user).then((newResults) => {
      setResults(newResults);
    });
  }, [currentRoom.members, keyword, user]);

  const reduceChoosers = (chooserRefs) => {
    const tmp = [];
    let i = 0,
      j = 0;
    tmp[i] = [];
    chooserRefs.forEach((chooserRef) => {
      if (j === 6) {
        i++;
        tmp[i] = [];
        tmp[i].push(chooserRef);
        j = 1;
      } else {
        tmp[i].push(chooserRef);
        j++;
      }
    });
    return tmp;
  };

  const handleToggleCheckBox = (userChoosed) => {
    if (
      choosers.filter((chooser) => chooser.uid === userChoosed.uid).length === 1
    ) {
      setChoosers(
        choosers.filter((chooser) => chooser.uid !== userChoosed.uid)
      );
    } else {
      if (choosers.length + currentRoom.members.length === 10) {
        alert("Phòng chỉ hỗ trợ tối đa 10 thành viên!");
      } else {
        setChoosers((oldChoosers) => [...oldChoosers, userChoosed]);
      }
    }
  };

  const handleRemoveChooser = (chooser) => {
    setChoosers((oldChoosers) =>
      oldChoosers.filter((oldChooser) => oldChooser.uid !== chooser.uid)
    );
  };

  const handleSubmit = () => {
    if (choosers.length === 0) return;
    const roomRef = db.collection("rooms").doc(currentRoom.id);
    roomRef.update({
      members: [
        ...choosers.map((chooser) => chooser.uid),
        ...currentRoom.members.map((member) => member.uid),
      ],
    });
    addDocument("messages", {
      uid: user.uid,
      rid: currentRoom.id,
      displayName: user.displayName,
      type: "log5",
      readed: [user.uid],
    });
    setOpenAddMember(false);
  };

  return (
    <div className="fixed top-0 right-[0] flex justify-center items-center bottom-0 left-0 z-[1000] before:top-0 before:absolute before:content-[''] before:right-[0] before:bottom-0 before:left-0 before:bg-[#fff] before:opacity-[60%] before:z-[0]">
      <div className="relative z-[1000] bg-white border w-[548px] shadow rounded-[8px]">
        <div className="flex h-[60px] relative items-center justify-center leading-[1.34] border-b">
          <h2 className="text-[1.25rem] font-bold">Thêm người</h2>
          <div className="absolute h-[60px] right-0 top-0 flex justify-center items-center pr-[16px]">
            <div className="w-[36px] h-[36px] flex justify-center items-center cursor-pointer bg-[#f5f5f5] rounded-full pointer hover:bg-[#eee]">
              <div
                className="w-[20px] h-[20px] flex justify-center items-center"
                onClick={() => setOpenAddMember(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="px-[16px] pt-[16px] pb-[8px]">
            <div className="flex rounded-[8px] border">
              <div className="flex justify-center items-center p-[8px]">
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  className="font-medium text-[.9375rem] block outline-none h-[36px]"
                  placeholder="Tìm kiếm"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value.trim())}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col h-[300px]">
            <div className="">
              {reduceChoosers(choosers).map((reduceChooser, index) => (
                <ul key={index} className="flex flex-start px-[16px] py-[8px]">
                  {reduceChooser.map((chooser) => (
                    <li
                      key={chooser.uid}
                      className="flex flex-col items-center justify-content w-[16.66666%]"
                    >
                      <div className="relative">
                        <img
                          src={getPhotoURL(chooser)}
                          alt=""
                          className="w-[40px] h-[40px] rounded-full"
                        />
                        <div
                          className="absolute flex justify-center items-center top-[-5px] cursor-pointer right-[-5px] w-[20px] h-[20px] rounded-full bg-[#eee] shadow"
                          onClick={() => handleRemoveChooser(chooser)}
                        >
                          <div className="w-[12px] h-[12px] flex justify-center items-center">
                            <FontAwesomeIcon icon={faTimes} />
                          </div>
                        </div>
                      </div>
                      <div className="text-[.75rem] font-medium text-[#65676B] pt-[8px]">
                        {getShortString(chooser.displayName, 10)}
                      </div>
                    </li>
                  ))}
                </ul>
              ))}
            </div>

            <div className="overflow-y-auto">
              <ul className="">
                <h3 className="px-[16px] pb-[6px] pt-[16px] text-[.9375rem] text-[#65676B] leading-[1.3333] font-bold">
                  Gợi ý
                </h3>
                {results.map((result) => (
                  <li
                    key={result.uid}
                    className="h-[52px] px-[8px] flex items-center w-full"
                  >
                    <div
                      className="px-[8px] flex justify-between rounded-[8px] w-full cursor-pointer hover:bg-[#eee]"
                      onClick={() => handleToggleCheckBox(result)}
                    >
                      <div className="flex items-center">
                        <div className="flex justify-center items-center py-[8px] pr-[12px]">
                          <img
                            src={getPhotoURL(result)}
                            alt=""
                            className="w-[36px] h-[36px] rounded-full"
                          />
                        </div>
                        <div className="text-[.9375rem] font-medium">
                          {result.displayName}
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="w-[20px] h-[20px] cursor-pointer"
                          checked={
                            choosers.filter(
                              (chooser) => chooser.uid === result.uid
                            ).length === 1
                          }
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-[16px] shadow">
            <div
              className="bg-[#0099FF] h-[36px] text-white text-center rounded-[6px] flex justify-center items-center hover:bg-[#3578E5] cursor-pointer"
              style={
                choosers.length === 0
                  ? {
                      backgroundColor: "#eee",
                      color: "#65676B",
                      cursor: "not-allowed",
                    }
                  : {}
              }
              onClick={handleSubmit}
            >
              <div className="text-[.9375rem] font-semibold leading-[1.3333]">
                Thêm người
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMemberModal;
