import { useContext } from "react"
import Header from "./Header"
import Control from "./Control"
import Content from "./Content"
import CreaHeader from "./CreHeader"
import CreContent from "./CreContent"
import { AppContext } from '../../../context/AppProvider'


function ChatBox(){

    const { isOpenCreateRoom, currentRoom, choosers, searchRoom } = useContext(AppContext)

    return(
        <div>
            {currentRoom&&<>
                <Header />
                <Content />
                <Control />
            </>}
            {isOpenCreateRoom&&<>
                <CreaHeader />
                {searchRoom?<Content />:
                <CreContent />}
                {choosers.length>0&&<Control />}
            </>}
        </div>
    )
}

export default ChatBox