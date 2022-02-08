import { useState, useEffect, useRef, useContext, useMemo } from "react";
import { getPhotoURL } from "../../../logic/getPhotoURL";
import { getRoomName } from "../../../logic/getRoomName";
import { convertTime } from "../../../logic/convertTime";
import useFirestore from "../../../hooks/useFirestore";
import { AppContext } from "../../../context/AppProvider";
import { AuthContext } from "../../../context/AuthProvider";

function messageReducer(messages, uid) {
  messages = messages.filter(message => message&&message.createAt);
  if (!messages||!messages.length)return [];
  let newMess = [];
  newMess = [
    {
      id: messages[0].id,
      uid: messages[0].uid,
      displayName: messages[0].displayName,
      photoURL: messages[0].photoURL,
      isOwnMess: messages[0].uid === uid,
      createAt: messages[0].createAt,
      contents: [{
        id: messages[0].id,
        message: messages[0].content,
        createAt: messages[0].createAt
      }],
    },
  ];
  let j = 1;
  for (let i = 1; i < messages.length; i++) {
    if (messages[i].uid === newMess[j - 1].uid && Math.abs(messages[i].createAt.seconds-newMess[j - 1].createAt.seconds)<3600) {
      newMess[j - 1].contents = [
        ...newMess[j - 1].contents,
        {
          id: messages[i].id,
          message: messages[i].content,
          createAt: messages[i].createAt
        }
      ];
    } else {
      newMess = [
        ...newMess,
        {
          id: messages[i].id,
          uid: messages[i].uid,
          displayName: messages[i].displayName,
          photoURL: messages[i].photoURL,
          isOwnMess: messages[i].uid === uid,
          createAt: messages[i].createAt,
          contents: [{
            id: messages[i].id,
            message: messages[i].content,
            createAt: messages[i].createAt
          }],
        },
      ];
      j++;
    }
  }
  return newMess;
}

function Content() {

  const [height, setHeight] = useState(window.innerHeight - 139);
  const contentElement = useRef();
  const { currentRoom, searchRoom } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const room = currentRoom || searchRoom
  const messageCondition = useMemo(() => {
    return {
      fieldName: "rid",
      operator: "==",
      compareValue: room.id,
    }
  }, [room]);
  const messages = useFirestore("messages", messageCondition);


  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight - 139);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    contentElement.current.scrollTop =
      contentElement.current.scrollHeight - contentElement.current.clientHeight;
  }, [messages]);

  return (
    <div className="mt-[76px] container">
      <div
        className="w-full overflow-y-scroll snap-y relative bg-white flex flex-col justify-between"
        ref={contentElement}
        style={{
          height: `${height}px`,
        }}
      >
        <div className="flex flex-col items-center py-[16px] px-[32px] relative z-[500]">
          <div>
            {room.members.length === 2 && (
              <img
                src={getPhotoURL(
                  room.members.filter(
                    (member) => member.uid !== user.uid
                  )[0]
                )}
                href=""
                className="w-[56px] h-[56px] rounded-full"
              />
            )}
            {room.members.length > 2 && room.photoURL && (
              <img
                src={room.photoURL}
                href=""
                className="w-[56px] h-[56px] rounded-full"
              />
            )}
            {room.members.length > 2 && !room.photoURL && (
              <div className="relative w-[56px] h-[56px]">
                <div className="absolute right-0 top-0">
                  <img
                    src={getPhotoURL(room.members.filter(
                      (member) => member.uid !== user.uid
                    )[0])}
                    href={room.members[0].displayName
                      ?.charAt(0)
                      .toUpperCase()}
                    className="w-[38px] h-[38px] rounded-full"
                  />
                </div>
                <div className="absolute left-0 bottom-0">
                  <img
                    src={getPhotoURL(room.members.filter(
                      (member) => member.uid !== user.uid
                    )[1])}
                    href={room.members[1].displayName
                      ?.charAt(0)
                      .toUpperCase()}
                    className="w-[38px] h-[38px] rounded-full border-2 border-white"
                  />
                </div>
              </div>
            )}
          </div>
          <h2 className="text-[1.0625rem] font-semibold leading-[1.765]">
            {getRoomName(room, user.uid)}
          </h2>
          <p className="text-[.8125rem]">Cùng bắt đầu cuộc trò chuyện</p>
        </div>
        <div className="relative">
          {messageReducer(messages, user.uid).map((message) => {
            if (!message.isOwnMess) {
              return (
                <div key={message.id} className="relative z-10">
                  <div className="text-center leading-[1.2727rem] text-[.6875rem] font-semibold py-[10px]">{convertTime(message.createAt.seconds)}</div>
                  {room.members.length > 2 && <div className="text-[.6875rem] pb-[2px] leading-[1.4545] font-semibold pl-[62px]">{message.displayName}</div>}
                  <div className="flex">
                    <div className="ml-[14px] mr-[8px] flex items-end w-[32px]">
                      <img
                        src={getPhotoURL(message)}
                        alt=""
                        className="w-[28px] h-[28px] rounded-full"
                      />
                    </div>
                    <ul className="text-justify w-full">
                      {message.contents.map((content, index) => {
                        const style = {};
                        if (message.contents.length === 1) {
                          style.borderTopLeftRadius = "18px";
                          style.borderBottomLeftRadius = "18px";
                        }
                        if (message.contents.length >= 2) {
                          if (index === 0) style.borderTopLeftRadius = "18px";
                          if (index === message.contents.length - 1)
                            style.borderBottomLeftRadius = "18px";
                        }
                        return (
                          <li key={content.id} className="mb-[2px]">
                            <div className="max-w-[65%] relative z-[0]">
                              <div
                                className="bg-[#eee] relative message py-[8px] px-[12px] text-[0.9375rem] rounded-r-[18px] break-words max-w-fit"
                                style={style}
                              >
                                <span>{content.message}</span>
                                <div className="absolute top-[0] right-full w-fit message-time invisible min-w-max z-10">
                                  <div className="relative leading-[1.2727rem] text-[.6875rem] bg-black opacity-[0.7] text-white py-[6px] px-[10px] rounded-[10px] h-full w-fit">{convertTime(content.createAt.seconds)}</div>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="h-[7px] invisible"></div>
                </div>
              );
            } else {
              return (
                <div key={message.id}>
                  <div className="text-center leading-[1.2727rem] text-[.6875rem] font-semibold py-[10px] relative z-[10]">{convertTime(message.createAt.seconds)}</div>
                  <div className="">
                    <ul className="text-justify w-full">
                      {message.contents.map((content, index) => {
                        const style = {};
                        if (message.contents.length === 1) {
                          style.borderTopRightRadius = "18px";
                          style.borderBottomRightRadius = "18px";
                        }
                        if (message.contents.length >= 2) {
                          if (index === 0) style.borderTopRightRadius = "18px";
                          if (index === message.contents.length - 1)
                            style.borderBottomRightRadius = "18px";
                        }
                        return (
                          <li key={content.id} className="mb-[2px] message">
                            <div className="max-w-[65%] mr-0 ml-auto">
                              <div
                                className="bg-black relative text-white mr-[14px] ml-auto py-[8px] px-[12px] text-[0.9375rem] rounded-l-[18px] break-words max-w-fit"
                                style={style}
                              >
                                <span>{content.message}</span>
                                <div className="absolute top-[0] right-full w-fit message-time invisible min-w-max z-10">
                                  <div className="relative leading-[1.2727rem] text-[.6875rem] bg-black opacity-[0.7] text-white py-[6px] px-[10px] rounded-[10px] h-full w-fit">{convertTime(content.createAt.seconds)}</div>
                                </div>
                              </div>
                            </div>

                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="h-[7px] invisible"></div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Content;
