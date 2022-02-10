import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useRef, useEffect } from "react";
import { db } from "../../firebase/config";

function ReactControl() {
  const reacElement = useRef();
  const { openReactControl, setOpenReactControl } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const handleClick = ({ target }) => {
      if (
        reacElement &&
        reacElement.current &&
        !reacElement.current.contains(target)
      ) {
        setOpenReactControl();
      }
    };
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleLove = () => {
    setOpenReactControl();
    const messageRef = db
      .collection("messages")
      .doc(openReactControl.content.id);
    if (
      openReactControl.content.love.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        love: openReactControl.content.love.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      return
      
    }
    if (
      openReactControl.content.haha.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        haha: openReactControl.content.haha.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.wow.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        wow: openReactControl.content.wow.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.sad.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        sad: openReactControl.content.sad.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.angry.filter((l) => l.uid === user.uid).length >
      0
    ) {
      messageRef.update({
        angry: openReactControl.content.angry.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.like.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        like: openReactControl.content.like.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    messageRef.update({
      love: [...openReactControl.content.love.map((l) => l.uid), user.uid],
    });
  };

  const handleHaha = () => {
    setOpenReactControl();
    const messageRef = db
      .collection("messages")
      .doc(openReactControl.content.id);
    if (
      openReactControl.content.haha.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        haha: openReactControl.content.haha.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      return
    }
    if (
      openReactControl.content.love.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        love: openReactControl.content.love.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.wow.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        wow: openReactControl.content.wow.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.sad.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        sad: openReactControl.content.sad.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.angry.filter((l) => l.uid === user.uid).length >
      0
    ) {
      messageRef.update({
        angry: openReactControl.content.angry.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.like.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        like: openReactControl.content.like.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    messageRef.update({
      haha: [...openReactControl.content.haha.map((l) => l.uid), user.uid],
    });
  };

  const handleWow = () => {
    setOpenReactControl();
    const messageRef = db
      .collection("messages")
      .doc(openReactControl.content.id);
    if (
      openReactControl.content.wow.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        wow: openReactControl.content.wow.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      return
    }
    if (
      openReactControl.content.love.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        love: openReactControl.content.love.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.haha.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        haha: openReactControl.content.haha.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.sad.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        sad: openReactControl.content.sad.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.angry.filter((l) => l.uid === user.uid).length >
      0
    ) {
      messageRef.update({
        angry: openReactControl.content.angry.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.like.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        like: openReactControl.content.like.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    messageRef.update({
      wow: [...openReactControl.content.wow.map((l) => l.uid), user.uid],
    });
  };

  const handleSad = () => {
    setOpenReactControl();
    const messageRef = db
      .collection("messages")
      .doc(openReactControl.content.id);
    if (
      openReactControl.content.sad.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        sad: openReactControl.content.sad.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      return
    }
    if (
      openReactControl.content.love.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        love: openReactControl.content.love.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.haha.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        haha: openReactControl.content.haha.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.wow.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        wow: openReactControl.content.wow.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.angry.filter((l) => l.uid === user.uid).length >
      0
    ) {
      messageRef.update({
        angry: openReactControl.content.angry.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.like.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        like: openReactControl.content.like.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    messageRef.update({
      sad: [...openReactControl.content.sad.map((l) => l.uid), user.uid],
    });
  };

  const handleAngry = () => {
    setOpenReactControl();
    const messageRef = db
      .collection("messages")
      .doc(openReactControl.content.id);
    if (
      openReactControl.content.angry.filter((l) => l.uid === user.uid).length >
      0
    ) {
      messageRef.update({
        angry: openReactControl.content.angry.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      return
    }
    if (
      openReactControl.content.love.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        love: openReactControl.content.love.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.haha.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        haha: openReactControl.content.haha.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.wow.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        wow: openReactControl.content.wow.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.sad.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        sad: openReactControl.content.sad.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.like.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        like: openReactControl.content.like.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    messageRef.update({
      angry: [...openReactControl.content.angry.map((l) => l.uid), user.uid],
    });
  };

  const handleLike = () => {
    setOpenReactControl();
    const messageRef = db
      .collection("messages")
      .doc(openReactControl.content.id);
    if (
      openReactControl.content.like.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        like: openReactControl.content.like.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      return
    }
    if (
      openReactControl.content.love.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        love: openReactControl.content.love.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.haha.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        haha: openReactControl.content.haha.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.wow.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        wow: openReactControl.content.wow.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.sad.filter((l) => l.uid === user.uid).length > 0
    ) {
      messageRef.update({
        sad: openReactControl.content.sad.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    if (
      openReactControl.content.angry.filter((l) => l.uid === user.uid).length >
      0
    ) {
      messageRef.update({
        angry: openReactControl.content.angry.filter((l) => l.uid !== user.uid).map(l => l.uid),
      });
      
    }
    messageRef.update({
      like: [...openReactControl.content.like.map((l) => l.uid), user.uid],
    });
  };

  return (
    <div
      className="absolute z-[1000] bottom-full mb-[-4px]"
      style={{
        top: openReactControl.top - 52,
        left:
          window.innerWidth - openReactControl.left < 106
            ? window.innerWidth - 226
            : openReactControl.left - 108,
      }}
    >
      <div
        className="flex justify-center items-center h-[52px] w-max drop-shadow-xl bg-white rounded-[24px] px-[12px] py-[8px]"
        ref={reacElement}
      >
        <div>
          <img
            src={process.env.PUBLIC_URL + "/img/love.png"}
            alt=""
            style={{
              backgroundColor: openReactControl.content.love.filter(l => l.uid===user.uid).length>0?'#eee':''
            }}
            className="w-[32px] h-[32px] rounded-[25%] p-[2px] cursor-pointer"
            onClick={handleLove}
          />
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/img/haha.png"}
            style={{
              backgroundColor: openReactControl.content.haha.filter(l => l.uid===user.uid).length>0?'#eee':''
            }}
            alt=""
            className="w-[32px] h-[32px] rounded-[25%] p-[2px] cursor-pointer"
            onClick={handleHaha}
          />
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/img/wow.png"}
            style={{
              backgroundColor: openReactControl.content.wow.filter(l => l.uid===user.uid).length>0?'#eee':''
            }}
            alt=""
            className="w-[32px] h-[32px] rounded-[25%] p-[2px] cursor-pointer"
            onClick={handleWow}
          />
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/img/sad.png"}
            style={{
              backgroundColor: openReactControl.content.sad.filter(l => l.uid===user.uid).length>0?'#eee':''
            }}
            alt=""
            className="w-[32px] h-[32px] rounded-[25%] p-[2px] cursor-pointer"
            onClick={handleSad}
          />
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/img/angry.png"}
            style={{
              backgroundColor: openReactControl.content.angry.filter(l => l.uid===user.uid).length>0?'#eee':''
            }}
            alt=""
            className="w-[32px] h-[32px] rounded-[25%] p-[2px] cursor-pointer"
            onClick={handleAngry}
          />
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/img/like.png"}
            style={{
              backgroundColor: openReactControl.content.like.filter(l => l.uid===user.uid).length>0?'#eee':''
            }}
            alt=""
            className="w-[32px] h-[32px] rounded-[25%] p-[2px] cursor-pointer"
            onClick={handleLike}
          />
        </div>
      </div>
    </div>
  );
}

export default ReactControl;
