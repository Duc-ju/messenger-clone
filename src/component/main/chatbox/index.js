import { useContext, useState, useEffect } from "react";
import Header from "./Header";
import Control from "./Control";
import Content from "./Content";
import CreaHeader from "./CreHeader";
import CreContent from "./CreContent";
import { AppContext } from "../../../context/AppProvider";

function ChatBox() {
  const { isOpenCreateRoom, currentRoom, choosers, searchRoom } =
    useContext(AppContext);
  const [focusControl, setFocusControl] = useState(true);
  const [top, setTop] = useState();
  useEffect(() => {
    const handleVisibleChange = () => {
        setFocusControl(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibleChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibleChange);
  }, []);

  useEffect(() => {
    setFocusControl(true);
  },[currentRoom])

  return (
    <div>
      {currentRoom && !isOpenCreateRoom && (
        <>
          <Header setTop={setTop} />
          <Content top={top} focusControl={focusControl} />
          <Control focusControl={focusControl} setFocusControl={setFocusControl} />
        </>
      )}
      {isOpenCreateRoom && !currentRoom && (
        <>
          <CreaHeader setTop={setTop} />
          {searchRoom ? <Content top={top} /> : <CreContent />}
          {choosers.length > 0 && <Control focusControl={focusControl} setFocusControl={setFocusControl} />}
        </>
      )}
    </div>
  );
}

export default ChatBox;
