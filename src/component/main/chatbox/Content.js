import { useState, useEffect, useRef, useContext, useMemo } from "react";
import { getPhotoURL } from "../../../logic/getPhotoURL";
import { getRoomName } from "../../../logic/getRoomName";
import { countReaction } from "../../../logic/countReaction";
import { convertTime } from "../../../logic/convertTime";
import { messageReducer } from "../../../logic/messageReducer"
import useFirestore from "../../../hooks/useFirestore";
import { AppContext } from "../../../context/AppProvider";
import { AuthContext } from "../../../context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";



function Content() {
  const [height, setHeight] = useState(window.innerHeight - 139);
  const contentElement = useRef();
  const { currentRoom, searchRoom, setOpenReactControl } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const room = currentRoom || searchRoom;
  const messageCondition = useMemo(() => {
    return {
      fieldName: "rid",
      operator: "==",
      compareValue: room.id,
    };
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

  const handleToggleReactControl = (e,content) => {
    setOpenReactControl(oldState => {
      if(!oldState) return {
        top: e.target.getBoundingClientRect().top,
        left: e.target.getBoundingClientRect().left,
        content
      }
      if(e.target.getBoundingClientRect().top===oldState.top&&e.target.getBoundingClientRect().left===oldState.left) return
      return {
        top: e.target.getBoundingClientRect().top,
        left: e.target.getBoundingClientRect().left,
        content
      }
    })
  }

  useEffect(() => {
    contentElement.current.scrollTop =
      contentElement.current.scrollHeight - contentElement.current.clientHeight;
  }, [messages.length]);

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
                  room.members.filter((member) => member.uid !== user.uid)[0]
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
                    src={getPhotoURL(
                      room.members.filter(
                        (member) => member.uid !== user.uid
                      )[0]
                    )}
                    href={room.members[0].displayName?.charAt(0).toUpperCase()}
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
                    href={room.members[1].displayName?.charAt(0).toUpperCase()}
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
          {messageReducer(messages, room, user.uid).map((message) => {
            if (!message.isOwnMess) {
              return (
                <div key={message.id} className="relative z-10">
                  <div className="text-center leading-[1.2727rem] text-[.6875rem] font-semibold py-[10px]">
                    {convertTime(message.createAt.seconds)}
                  </div>
                  {room.members.length > 2 && (
                    <div className="text-[.6875rem] pb-[2px] leading-[1.4545] font-semibold pl-[62px]">
                      {message.displayName}
                    </div>
                  )}
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
                                className="bg-[#eee] relative message py-[8px] px-[12px] text-[0.9375rem] rounded-r-[18px] rounded-l-[4px] break-words max-w-fit"
                                style={style}
                              >
                                <span>{content.message}</span>
                                <div className="absolute translate-y-[-50%] top-[50%] right-full w-fit message-time invisible min-w-max z-10">
                                  <div className="relative leading-[1.2727rem] text-[.6875rem] bg-black opacity-[0.7] text-white py-[6px] px-[10px] rounded-[10px] h-full w-fit">
                                    {convertTime(content.createAt.seconds)}
                                  </div>
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
                  <div className="text-center leading-[1.2727rem] text-[.6875rem] font-semibold py-[10px] relative z-[10]">
                    {convertTime(message.createAt.seconds)}
                  </div>
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
                          <li key={content.id} className="mb-[2px] message-line">
                            <div className="max-w-[65%] mr-0 ml-auto relative">
                              <div className="flex justify-end mr-[14px] ml-auto">
                                <div className="relative z-[10] flex justify-center items-center mr-[5px]">
                                    <div 
                                    className="w-[22px] h-[22px] flex justify-center items-center rounded-full reaction-icon invisible cursor-pointer hover:bg-[#eee]"
                                    onClick={(e)=> handleToggleReactControl(e,content)}
                                    >
                                      <FontAwesomeIcon className="text-[14px] text-[#65676B] flex justify-center items-center" icon={faSmile} />
                                    </div>
                                </div>
                                <div
                                  className="bg-black message relative text-white py-[8px] px-[12px] text-[0.9375rem] rounded-l-[18px] break-words max-w-fit rounded-r-[4px]"
                                  style={style}
                                >
                                  <span>{content.message}</span>
                                  <div className="absolute translate-y-[-50%] top-[50%] right-full w-fit message-time invisible min-w-max z-10">
                                    <div className="relative leading-[1.2727rem] text-[.6875rem] bg-black opacity-[0.7] text-white py-[6px] px-[10px] rounded-[10px] h-full w-fit">
                                      {convertTime(content.createAt.seconds)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {countReaction(content)>0&&
                                <div className=" relative z-[10] bottom-[-10px] right-0 min-w-fit max-w-fit ml-auto mr-[14px] translate-y-[-20px]">
                                  <ul className="p-[1.5px] flex rounded-full bg-white drop-shadow-lg cursor-pointer">
                                    {content.love.length>0&&<li className="p-[0.5px]">
                                      <img
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/img/love.png"
                                        }
                                        className="w-[16px] h-[16px]"
                                      />
                                    </li>}
                                    {content.haha.length>0&&<li className="p-[0.5px]">
                                      <img
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/img/haha.png"
                                        }
                                        className="w-[16px] h-[16px]"
                                      />
                                    </li>}
                                    {content.wow.length>0&&<li className="p-[0.5px]">
                                      <img
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/img/wow.png"
                                        }
                                        className="w-[16px] h-[16px]"
                                      />
                                    </li>}
                                    {content.sad.length>0&&<li className="p-[0.5px]">
                                      <img
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/img/sad.png"
                                        }
                                        className="w-[16px] h-[16px]"
                                      />
                                    </li>}
                                    {content.angry.length>0&&<li className="p-[0.5px]">
                                      <img
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/img/angry.png"
                                        }
                                        className="w-[16px] h-[16px]"
                                      />
                                    </li>}
                                    {content.like.length>0&&<li className="p-[0.5px]">
                                      <img
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/img/like.png"
                                        }
                                        className="w-[16px] h-[16px]"
                                      />
                                    </li>}
                                    <li>
                                      {countReaction(content)>1&&<div className="text-[.6875rem] text-[#65676B] pl-[3px] pr-[2px]">
                                        {countReaction(content)}
                                      </div>}
                                    </li>
                                  </ul>
                                </div>}
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
