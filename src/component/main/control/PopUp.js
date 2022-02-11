
import { useEffect, useRef, memo, useContext } from 'react'
import { auth } from '../../../firebase/config'
import { AppContext } from '../../../context/AppProvider'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function PopUp({ handleClosePopUp }){
    const popUpElement = useRef()
    const { 
        setRooms,
        setCurrentRoom,
        setIsOpenCreateRoom,
        setChoosers,
        setOpenInfo,
        setSearchRoom,
        } = useContext(AppContext);
    const handleLogout = ()=>{
        setRooms([])
        setCurrentRoom()
        setIsOpenCreateRoom(false)
        setChoosers([])
        setOpenInfo(false)
        setSearchRoom()
        auth.signOut()
    }

    useEffect(() =>{
        const handleClick = ({ target })=>{
            if(!popUpElement.current.contains(target)){
                handleClosePopUp()
            }
        }
        window.addEventListener('click',handleClick)

        return ()=>{
            window.removeEventListener('click',handleClick)
        }
    },[])
    return(
        <div 
        className="absolute bg-white p-[6px] rounded-lg shadow-2xl border top-[68px] z-[1100] flex flex-col min-w-[282px]"
        ref={popUpElement}
        >
            <div className="flex items-center p-[8px] hover:bg-[#eee] rounded-md cursor-pointer w-max min-w-full">
                <FontAwesomeIcon icon={faCog} />
                <div className="ml-[16px] w-full">Tuỳ chọn</div>
            </div>
            <hr className="my-[6px]" />
            <div 
            className="flex items-center p-[8px] hover:bg-[#eee] rounded-md cursor-pointer w-max min-w-full"
            onClick={()=>{handleLogout()}}
            >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <div className="ml-[16px] w-full">Đăng xuất</div>
            </div>
        </div>
    )
}

export default memo(PopUp)