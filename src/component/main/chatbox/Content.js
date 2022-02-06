import { useState, useEffect, useRef, useContext, useMemo } from "react";
import { getPhotoURL } from "../../../logic/getPhotoURL";
import useFirestore from "../../../hooks/useFirestore";
import { AppContext } from "../../../context/AppProvider";
import { AuthContext } from "../../../context/AuthProvider";

function messageReducer(messages, uid) {
  if (!messages.length) return [];
  let newMess = [];
  newMess = [
    {
      id: messages[0].id,
      uid: messages[0].uid,
      photoURL: messages[0].photoURL,
      isOwnMess: messages[0].uid === uid,
      createAt: messages[0].createAt,
      contents: [messages[0].content],
    }
  ];
  let j = 1;
  for (let i = 1; i < messages.length; i++) {
    if (messages[i].uid === newMess[j - 1].uid) {
      newMess[j - 1].contents = [
        ...newMess[j - 1].contents,
        messages[i].content,
      ];
    } else {
      newMess = [
        ...newMess,
        {
          id: messages[i].id,
          uid: messages[i].uid,
          photoURL: messages[i].photoURL,
          isOwnMess: messages[i].uid === uid,
          createAt: messages[i].createAt,
          contents: [messages[i].content],
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
  const { currentRoom } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const messageCondition = useMemo(() => {
    return {
      fieldName: "rid",
      operator: "==",
      compareValue: currentRoom?.id,
    };
  }, [currentRoom]);
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
        className="w-full overflow-y-scroll snap-y relative bg-white"
        ref={contentElement}
        style={{
          height: `${height}px`,
        }}
      >
        {messageReducer(messages, user.uid).map((message) => {
          if (!message.isOwnMess) {
            return (
              <div key={message.id} className="relative z-10">
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
                        <li key={index} className="mb-[2px]">
                          <div className="max-w-[65%]">
                            <p
                              className="bg-[#eee] py-[8px] px-[12px] text-[0.9375rem] rounded-r-[18px] break-words max-w-fit"
                              style={style}
                            >
                              {content}
                            </p>
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
                        <li key={index} className="mb-[2px]">
                          <div className="max-w-[65%] mr-0 ml-auto">
                            <p 
                            className="bg-black text-white mr-[14px] ml-auto py-[8px] px-[12px] text-[0.9375rem] rounded-l-[18px] break-words max-w-fit"
                            style={style}
                            >
                              {content}
                            </p>
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
  );
}

export default Content;
