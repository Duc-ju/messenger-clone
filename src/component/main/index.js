import Control from './Control'
import ChatBox from './ChatBox'
import Info from './Infor'

function Main() {
    return(<div>
        <div className="flex">
            <div className="w-[28%] relative z-10">
                <Control />
            </div>
            <div className="w-[47%] relative z-0">
                <ChatBox />
            </div>
            <div className="w-[25%]">
                <Info />
            </div>
        </div>
    </div>)

}

export default Main