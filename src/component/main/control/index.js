import Header from "./Header"
import RoomList from "./RoomList"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'


function Control(){
    return(<div className="border">
        <Header />
        <RoomList />
        <div className="z-50 border-t border-r fixed bottom-0 bg-white w-[28%]">
            <div className="text-center">
                <a href="https://www.messenger.com/desktop/" className="inline-block p-2 font-semibold w-full">
                    <div className="p-2 hover:bg-[#eee] rounded-[8px] w-full">
                        <FontAwesomeIcon className="mr-[8px]" icon={faDownload} />
                        Cài đặt ứng dụng Messenger
                    </div>
                </a>
            </div>
        </div>
    </div>)
}

export default Control