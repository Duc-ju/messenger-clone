import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faImage, faStickyNote, faGift, faThumbsUp, faSmile } from '@fortawesome/free-solid-svg-icons'

function Control(){

    return(
        <div className="fixed bottom-0 w-[47%] py-[12px] border-r bg-white">
            <div className="flex">
                <div className="w-[150px] mx-[6px] flex justify-around">
                    <div className="flex items-center">
                        <div className="text-[#00e5ff] cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]"><FontAwesomeIcon icon={faPlusCircle} /></div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-[#00e5ff] cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]"><FontAwesomeIcon icon={faImage} /></div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-[#00e5ff] cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]"><FontAwesomeIcon icon={faStickyNote} /></div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-[#00e5ff] cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]"><FontAwesomeIcon icon={faGift} /></div>
                    </div>
                </div>
                <div className="w-full flex items-center relative">
                    <input 
                    type="text" 
                    placeholder="Aa"
                    className="w-full pt-[7px] pl-[12px] pr-[6px] pb-[9px] text-[0.9375rem] rounded-[50px] outline-none bg-[#eee]"
                     />
                     <div className="text-[#00e5ff] cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee] absolute right-0">
                         <FontAwesomeIcon icon={faSmile} />
                    </div>
                </div>
                <div className="w-[40px] flex items-center mx-[6px]">
                    <div className="text-[#00e5ff] cursor-pointer inline-flex justify-center items-center w-[36px] h-[36px] rounded-full hover:bg-[#eee]"><FontAwesomeIcon icon={faThumbsUp} /></div>
                </div>
            </div>
        </div>
    )
}


export default Control