import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";
import { db } from "../../firebase/config"
import { countReaction } from "../../logic/countReaction";
import { getPhotoURL } from "../../logic/getPhotoURL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
function ReactionList() {
  const { openReactionList, setOpenReactionList } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [currentReaction, setCurrentReaction] = useState();
  const renderDatas = [
    {
      id: 1,
      reactionName: "love",
      data: openReactionList.love.map((l) => ({ reactionName: "love", ...l })),
    },
    {
      id: 2,
      reactionName: "haha",
      data: openReactionList.haha.map((l) => ({ reactionName: "haha", ...l })),
    },
    {
      id: 3,
      reactionName: "wow",
      data: openReactionList.wow.map((l) => ({ reactionName: "wow", ...l })),
    },
    {
      id: 4,
      reactionName: "sad",
      data: openReactionList.sad.map((l) => ({ reactionName: "sad", ...l })),
    },
    {
      id: 5,
      reactionName: "angry",
      data: openReactionList.angry.map((l) => ({
        reactionName: "angry",
        ...l,
      })),
    },
    {
      id: 6,
      reactionName: "like",
      data: openReactionList.like.map((l) => ({ reactionName: "like", ...l })),
    },
  ];
  const handleCancelReaction = (reactionName) => {
    const messageRef = db
      .collection("messages")
      .doc(openReactionList.id);
    const reaction = renderDatas
      .filter((data) => data.reactionName === reactionName)[0]
      .data.filter((reactList) => reactList.uid !== user.uid)
      .map((reactList) => reactList.uid);
    messageRef.update({
      [reactionName]: reaction,
    });
    setOpenReactionList()
  };
  const getCurrentReactionList = () => {
    if (!currentReaction)
      return renderDatas
        .filter((renderData) => renderData.data.length > 0)
        .reduce((prev, current) => [...prev, ...current.data], [])
        .sort((a, b) => {
          if (a.uid === user.uid) return -1;
          if (b.uid === user.uid) return 1;
          return 0
        });
    return currentReaction.data;
  };
  const currentReactionList = getCurrentReactionList();
  return (
    <div className="fixed top-0 right-[0] flex justify-center items-center bottom-0 left-0 z-[1000] before:top-0 before:absolute before:content-[''] before:right-[0] before:bottom-0 before:left-0 before:bg-[#fff] before:opacity-[60%] before:z-[0]">
      <div className="relative z-[1000] bg-white border w-[548px] max-h-[548px] shadow rounded-[8px]">
        <div className="flex h-[60px] relative items-center justify-center leading-[1.34] border-b">
          <h2 className="text-[1.25rem] font-bold">Cảm xúc về tin nhắn</h2>
          <div className="absolute h-[60px] right-0 top-0 flex justify-center items-center pr-[16px]">
            <div
              className="w-[36px] h-[36px] flex justify-center items-center cursor-pointer bg-[#f5f5f5] rounded-full pointer hover:bg-[#eee]"
              onClick={() => setOpenReactionList()}
            >
              <div className="w-[20px] h-[20px] flex justify-center items-center">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div
            className="flex justify-center cursor-pointer items-center h-[60px]"
            style={{
              borderBottom: currentReaction ? "" : "3px solid #0099FF",
            }}
            onClick={() => setCurrentReaction()}
          >
            <div
              className="px-[16px] flex justify-center items-center color-[#0099FF]"
              style={{
                color: currentReaction ? "#65676B" : "#0099FF",
              }}
            >
              <div className="text-[15px] font-semibold">
                Tất cả <span>{countReaction(openReactionList)}</span>
              </div>
            </div>
          </div>
          {renderDatas
            .filter((renderData) => renderData.data.length > 0)
            .map((renderData) => (
              <div
                key={renderData.id}
                className="flex cursor-pointer justify-center items-center h-[60px]"
                style={{
                  borderBottom:
                    currentReaction && currentReaction.id === renderData.id
                      ? "3px solid #0099FF"
                      : "",
                }}
                onClick={() => setCurrentReaction(renderData)}
              >
                <div className="p-[16px] flex justify-center items-center rounded-[6px] hover:bg-[#eee]">
                  <div className="flex justify-center items-center">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/img/" +
                        renderData.reactionName +
                        ".png"
                      }
                      className="w-[20px] h-[20px]"
                      alt=""
                    />
                  </div>
                  <div
                    className="pl-[4px] font-semibold"
                    style={{
                      color:
                        currentReaction && currentReaction.id === renderData.id
                          ? "#0099FF"
                          : "#65676B",
                    }}
                  >
                    {renderData.data.length}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="w-full overflow-y-auto min-h-[200px] max-h-[400px] mb-[4px]">
          <ul className="flex flex-col w-full">
            {currentReactionList.map((react) => (
              <li key={react.uid} className="mx-[8px] flex items-center">
                <div
                  className="flex justify-between w-full rounded-[8px] p-[8px]"
                  style={{
                    cursor: react.uid === user.uid ? "pointer" : "",
                  }}
                  onClick={() => handleCancelReaction(react.reactionName)}
                >
                  <div className="flex">
                    <div className="flex justify-center items-center px-[8px]">
                      <img
                        src={getPhotoURL(react)}
                        className="w-[40px] h-[40px] rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="font-medium text-[.9375rem]">
                        {react.displayName}
                      </div>
                      {react.uid === user.uid && (
                        <div className="text-[.8125rem] leading-[1.2308] font-normal text-[#8A8D91]">
                          Nhấn để gỡ
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="pl-[16px] flex items-center justify-center">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/img/" +
                          react.reactionName +
                          ".png"
                        }
                        className="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ReactionList;
