import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'


function Info(){
    const [height, setHeight] = useState(window.innerHeight)

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
                    <img 
                    src="https://scontent.fhan15-1.fna.fbcdn.net/v/t34.18173-12/p100x100/28908247_2023019334631814_1268202679_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=4de414&_nc_ohc=iUhk_-T5-goAX_DvbjT&_nc_ht=scontent.fhan15-1.fna&oh=00_AT87zOZ-bJ8E8ZizHQ72j_9yp6Hvaft1A4V98rY4DOmHqg&oe=61F55CCB"
                    alt=""
                    className="w-[80px] h-[80px] rounded-full"
                    />
                </div>
                <h3 className="text-[1.0625rem] font-semibold">Best Xaolil</h3>
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