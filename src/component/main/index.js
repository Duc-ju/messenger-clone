import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import ReactionListModal from "./ReactionListModal";
import ReactControl from "./ReactControl";
import ChangeRoomNameModal from "./ChangeRoomNameModal";
import Control from "./Control";
import ChatBox from "./ChatBox";
import Info from "./Info";
import ToolTip from "./ToolTip";

function Main() {
  const {
    currentRoom,
    openInfo,
    isOpenCreateRoom,
    openReactControl,
    openToolTip,
    openReactionList,
    openChangeRoomName
  } = useContext(AppContext);
  return (
    <div className="overflow-hidden">
      <div className="flex">
        <div className="w-[28%] relative z-10">
          <Control />
        </div>
        {(currentRoom || isOpenCreateRoom) && (
          <div
            className="relative z-0"
            style={{
              width: openInfo ? "47%" : "72%",
            }}
          >
            <ChatBox />
          </div>
        )}
        <div
          style={{
            display: openInfo ? "block" : "hidden",
            width: openInfo ? "25%" : "0%",
          }}
        >
          {currentRoom && openInfo && <Info />}
        </div>
      </div>
      {openReactionList && <ReactionListModal />}
      {openReactControl && <ReactControl />}
      {openToolTip && <ToolTip />}
      {openChangeRoomName&&<ChangeRoomNameModal />}
    </div>
  );
}

export default Main;
