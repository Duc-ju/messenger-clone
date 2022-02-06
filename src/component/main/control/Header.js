import { useState, useCallback, useContext } from 'react'
import { AuthContext } from '../../../context/AuthProvider'
import { AppContext } from '../../../context/AppProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faVideo , faEdit, faSearch } from '@fortawesome/free-solid-svg-icons'
import PopUp from "./PopUp"

function Header(){
    const [displayPopUp, setDisplayPopUp] = useState(false)
    const { user:{photoURL} } = useContext(AuthContext)
    const { setIsOpenCreateRoom, setOpenInfo, rooms, setCurrentRoom } = useContext(AppContext)

    const handleClosePopUp = useCallback(()=>{
        setDisplayPopUp(false)
    })

    const handleToggerCreateRoom = () => {
        setIsOpenCreateRoom(old => {
            if(old){
                if(rooms.length>0){
                    setCurrentRoom(rooms[0]);
                    setOpenInfo(true)
                }
                else{
                    setCurrentRoom()
                    setOpenInfo(false)
                }
            }
            else{
                setOpenInfo(false)
                setCurrentRoom()
            }
            return !old
        })
        
    }

    
    return(
        <div className="fixed top-0 left-0 w-[28%] bg-white border-r">
            <div className="flex justify-between">
                <div className="pt-[20px] px-[16px] pb-[12px] flex items-center">
                    <img 
                    src={photoURL}
                    className="w-[36px] h-[36px] rounded-full"
                    />
                    <h3 className="font-bold text-2xl ml-3">Chat</h3>
                </div>
                <div
                className="flex items-center mr-3 relative"
                >
                    {displayPopUp&&<PopUp handleClosePopUp={handleClosePopUp} />}
                    <div
                    className="cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] bg-[#f5f5f5] rounded-full hover:bg-[#eee]"
                    onClick={()=>{!displayPopUp&&setDisplayPopUp(true)}}
                    >
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </div>
                    <div
                    className="cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] bg-[#f5f5f5] rounded-full ml-3 hover:bg-[#eee]"
                    >
                        <FontAwesomeIcon icon={faVideo} />
                    </div>
                    <div 
                    className="cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] bg-[#f5f5f5] rounded-full ml-3 hover:bg-[#eee]"
                    onClick={handleToggerCreateRoom}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </div>
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