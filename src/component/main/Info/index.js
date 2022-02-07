import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../../context/AppProvider'
import { AuthContext } from '../../../context/AuthProvider'
import { getRoomName } from '../../../logic/getRoomName'
import { getPhotoURL } from '../../../logic/getPhotoURL'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'


function Info(){
    const [height, setHeight] = useState(window.innerHeight)
    const { currentRoom } = useContext(AppContext)
    const { user } = useContext(AuthContext)

    useEffect(() =>{
        function handleResize() {
            setHeight(window.innerHeight)
        }
        window.addEventListener('resize',handleResize)
        return ()=>{
            window.removeEventListener('resize',handleResize)
        }
    },[])


    return(
        <div
        className="overflow-y-scroll snap-y"
        style={{ 
            height: `${height}px`
        }}
        >
            <div className="text-center">
                <div className="flex justify-center items-center pt-[16px] pb-[12px]">
                    {currentRoom.members.length === 2 && (
                  <img
                    src={getPhotoURL(currentRoom.members.filter(member => member.uid!==user.uid)[0])}
                    href=""
                    className="w-[80px] h-[80px] rounded-full"
                  />
                )}
                {currentRoom.members.length > 2 && currentRoom.photoURL && (
                  <img
                    src={currentRoom.photoURL}
                    href=""
                    className="w-[80px] h-[80px] rounded-full"
                  />
                )}
                {currentRoom.members.length > 2 && !currentRoom.photoURL && (
                  <div className="relative w-[80px] h-[80px]">
                    <div className="absolute right-0 top-0">
                      <img
                        src={getPhotoURL(currentRoom.members.filter(member => member.uid!==user.uid)[0])}
                        href={currentRoom.members.filter(member => member.uid!==user.uid)[0].displayName
                          ?.charAt(0)
                          .toUpperCase()}
                        className="w-[54px] h-[54px] rounded-full"
                      />
                    </div>
                    <div className="absolute left-0 bottom-0">
                      <img
                        src={getPhotoURL(currentRoom.members.filter(member => member.uid!==user.uid)[1])}
                        href={currentRoom.members.filter(member => member.uid!==user.uid)[1].displayName
                          ?.charAt(0)
                          .toUpperCase()}
                        className="w-[54px] h-[54px] rounded-full border-2 border-white"
                      />
                    </div>
                  </div>
                )}
                </div>
                <h3 className="text-[1.0625rem] font-semibold">{getRoomName(currentRoom,user.uid)}</h3>
                <p className="text-[.8125rem] font-normal text-[#65676B]">Đang hoạt động</p>
            </div>
            <div className="py-[20px]">
                <div className="px-[8px] text-left rounded-[8px]">
                    <div className="flex justify-between py-[6px] pl-[6px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                        <div>
                            Tuỳ chỉnh đoạn chat
                        </div>
                        <div className="py-[8px] px-[16px] flex items-center">
                            <FontAwesomeIcon className="mr-[8px]" icon={faSortDown} />
                        </div>
                    </div>
                </div>
                <div className="px-[8px] text-left rounded-[8px]">
                    <div className="flex justify-between py-[6px] pl-[6px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                        <div>
                            Tuỳ chọn nhóm
                        </div>
                        <div className="py-[8px] px-[16px] flex items-center">
                            <FontAwesomeIcon className="mr-[8px]" icon={faSortDown} />
                        </div>
                    </div>
                </div>
                <div className="px-[8px] text-left rounded-[8px]">
                    <div className="flex justify-between py-[6px] pl-[6px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                        <div>
                            Thành viên trong đoạn chat
                        </div>
                        <div className="py-[8px] px-[16px] flex items-center">
                            <FontAwesomeIcon className="mr-[8px]" icon={faSortDown} />
                        </div>
                    </div>
                </div>
                <div className="px-[8px] text-left rounded-[8px]">
                    <div className="flex justify-between py-[6px] pl-[6px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                        <div>
                            File phương tiện, file và liên kết
                        </div>
                        <div className="py-[8px] px-[16px] flex items-center">
                            <FontAwesomeIcon className="mr-[8px]" icon={faSortDown} />
                        </div>
                    </div>
                </div>
                <div className="px-[8px] text-left rounded-[8px]">
                    <div className="flex justify-between py-[6px] pl-[6px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                        <div>
                           Quyền riêng tư & hỗ trợ
                        </div>
                        <div className="py-[8px] px-[16px] flex items-center">
                            <FontAwesomeIcon className="mr-[8px]" icon={faSortDown} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info