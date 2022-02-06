import { useContext } from 'react'
import { AppContext } from '../../context/AppProvider'
import Control from './Control'
import ChatBox from './ChatBox'
import Info from './Info'

function Main() {
    const { currentRoom, openInfo, isOpenCreateRoom } = useContext(AppContext)
    return(<div>
        <div className="flex">
            <div className="w-[28%] relative z-10">
                <Control />
            </div>
            {(currentRoom||isOpenCreateRoom)&&<div 
                className="relative z-0"
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
    </div>)

}

export default Main