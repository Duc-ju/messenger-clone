import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faVideo, faEllipsisH } from '@fortawesome/free-solid-svg-icons'

function Header(){

    return(
        <div className="border-b fixed top-0 w-[47%] bg-white border-r">
            <div className="flex justify-between p-[12px] h-[76px]">
                <div  className="flex">
                    <div className="p-[6px] flex items-center">
                        <img 
                        src="https://scontent.fhan15-1.fna.fbcdn.net/v/t34.18173-12/p100x100/28908247_2023019334631814_1268202679_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=4de414&_nc_ohc=iUhk_-T5-goAX_0sUfK&_nc_ht=scontent.fhan15-1.fna&oh=00_AT__z9DUleQzmJXq8js1hYk_JyKHI-3yH5iQ_F8KkArwjA&oe=61F2B9CB" 
                        alt="" 
                        className="w-[40px] h-[40px] rounded-full"
                        />
                    </div>
                    <div className="text-left">
                        <h3 className="text-[1.0625rem] font-semibold">Best Xaolil</h3>
                        <p className="text-[.8125rem]">Đang hoạt động</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="p-[6px]">
                        <a href="" className="text-[#ff8fb2] inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]">
                            <FontAwesomeIcon icon={faPhoneAlt} />
                        </a>
                    </div>
                    <div className="p-[6px]">
                        <a href="" className="text-[#ff8fb2] inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]">
                            <FontAwesomeIcon icon={faVideo} />
                        </a>
                    </div>
                    <div className="p-[6px]">    
                        <a href="" className="text-[#ff8fb2] inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]">
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Header