import { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faVideo , faEdit, faSearch } from '@fortawesome/free-solid-svg-icons'
import PopUp from "./PopUp"

function Header(){
    const [displayPopUp, setDisplayPopUp] = useState(false)
    
    const handleClosePopUp = useCallback(()=>{
        setDisplayPopUp(false)
    })

    return(
        <div className="fixed top-0 left-0 w-[28%] bg-white border-r">
            <div className="flex justify-between">
                <div className="pt-[20px] px-[16px] pb-[12px] flex items-center">
                    <img 
                    src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                    className="w-[36px] h-[36px] rounded-full"
                    />
                    <h3 className="font-bold text-2xl ml-3">Chat</h3>
                </div>
                <div
                className="flex items-center mr-3 relative"
                >
                    {displayPopUp&&<PopUp handleClosePopUp={handleClosePopUp} />}
                    <a
                    className="cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] bg-[#f5f5f5] rounded-full hover:bg-[#eee]"
                    onClick={()=>{!displayPopUp&&setDisplayPopUp(true)}}
                    >
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </a>
                    <a 
                    href="" 
                    className="inline-flex justify-center items-center w-[36px] h-[36px] bg-[#f5f5f5] rounded-full ml-3 hover:bg-[#eee]"
                    >
                        <FontAwesomeIcon icon={faVideo} />
                    </a>
                    <a 
                    href="" 
                    className="inline-flex justify-center items-center w-[36px] h-[36px] bg-[#f5f5f5] rounded-full ml-3 hover:bg-[#eee]"
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </a>
                </div>
            </div>
            <div className="p-4 relative">
                <span className="absolute w-[40px] h-[40px] flex items-center justify-center pl-[10px]">
                    <FontAwesomeIcon className="inline-block text-[#444]" icon={faSearch} />
                </span>
                <input 
                type="text"
                placeholder="Tìm kiếm trên messenger"
                className="w-full pt-[7px] pr-[6px] pl-[40px] pb-[9px] text-[0.9375rem] rounded-[50px] outline-none bg-[#eee]"
                />
            </div>
        </div>
    )
}

export default Header