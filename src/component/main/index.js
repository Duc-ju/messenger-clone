import { useContext } from 'react'
import { AppContext } from '../../context/AppProvider'
import ReactionList from './ReactionList'
import ReactControl from './ReactControl'
import Control from './Control'
import ChatBox from './ChatBox'
import Info from './Info'

function Main() {
    const { currentRoom, openInfo, isOpenCreateRoom, openReactControl } = useContext(AppContext)
    return(<div>
        <div className="flex">
            <div className="w-[28%] relative z-0">
                <Control />
            </div>
            {(currentRoom||isOpenCreateRoom)&&<div 
                className="relative"
                style={{
                    width: openInfo?'47%':'72%'
                }}
            >
                <ChatBox />
            </div>}
            <div 
                style={{
                    display: openInfo?'block':'hidden',
                    width: openInfo?'25%':'0%'
                }}
            >
                {currentRoom&&openInfo&&<Info />}
            </div>
        </div>
        {/* <ReactionList /> */}
        {openReactControl&&<ReactControl />}
    </div>)

}

export default Main