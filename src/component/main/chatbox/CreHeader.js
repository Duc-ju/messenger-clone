import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from '../../../context/AuthProvider'
import { AppContext } from "../../../context/AppProvider";
import { getPhotoURL } from "../../../logic/getPhotoURL";
import { fetchUserList } from "../../../logic/fetchUserList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function CreaHeader({ setTop }) {
  const [searchName, setSearchName] = useState('');
  const [results, setResults] = useState([]);
  const [isDispayResult, setIsDisplayResult] = useState(true)

  const resultElement = useRef()
  const inputElement = useRef()
  const { user } = useContext(AuthContext)
  const {choosers, setChoosers, rooms, setSearchRoom} = useContext(AppContext)
  const handleSearch = () => {
    fetchUserList(searchName.trim(), choosers, user).then((newResults) => {
        setResults(newResults);
    });
  };
  const headerElement = useRef()

  useEffect(() => {
    setTop(headerElement.current.offsetHeight)
    fetchUserList('', choosers , user).then((newResults) => {
      setResults(newResults);
    });
  },[choosers, user])
  useEffect(() =>{
    const handleClick = ({ target })=>{
        if(!resultElement.current?.contains(target)&&!inputElement.current?.contains(target)){
          setIsDisplayResult(false)
        }
    }
    window.addEventListener('click',handleClick)

    return ()=>{
        window.removeEventListener('click',handleClick)
    }
},[])
  const handleAddChooser = (newChooser) => {
    setChoosers(oldChoosers => {
      if(oldChoosers.length===9){
        alert('Bạn chỉ có thể tạo phòng dưới 10 thành viên')
        return oldChoosers
      }
      const newChoosers = [...oldChoosers,newChooser]

      const testChoosers = [...newChoosers,user]
      const matchRoom = rooms.filter(room => {
        if(room.displayName&&room.displayName.length) return false
        if(room.members.length !== testChoosers.length) return false;
        let count = 0
        room.members.forEach(member => {
          testChoosers.forEach(testChooser => {
            if(member.uid===testChooser.uid) count++;
          })
        })
        if(count===room.members.length) return true;
        return false;
      })
      if(matchRoom.length===1) setSearchRoom(matchRoom[0])
      else setSearchRoom()
      return newChoosers
    });
    setSearchName('')
    setResults([])

  }

  const handleRemoveChooser = (removeChooser) => {
    setChoosers(oldChoosers => {
      const newChoosers = oldChoosers.filter(chooser => chooser.uid!==removeChooser.uid)
      const testChoosers = [...newChoosers,user]
      const matchRoom = rooms.filter(room => {
        if(room.displayName&&room.displayName.length) return false
        if(room.members.length !== testChoosers.length) return false;
        let count = 0
        room.members.forEach(member => {
          testChoosers.forEach(testChooser => {
            if(member.uid===testChooser.uid) count++;
          })
        })
        if(count===room.members.length) return true;
        return false;
      })
      if(matchRoom.length===1) setSearchRoom(matchRoom[0])
      else setSearchRoom()
      return newChoosers
    })
  }

  const handleFocusIn = () => {
    setIsDisplayResult(true);
  }

  return (
    <div 
    className="border-b bg-white border-r z-[1000] py-[5px] relative"
    ref={headerElement}
    >
      <div className="flex items-center px-[16px]">
        <div className="flex flex-row w-full">
          <div className="text-[15px] flex items-center py-[15px]">
              <div>Đến:</div>
          </div>
          <ul className="inline-flex items-center flex-wrap">
              {choosers.map(chooser => (
                <li 
                className="inline-block my-[5px] ml-[8px] py-[4px] pl-[8px] bg-[#E7F3FF] text-[#0099FF] font-semibold rounded-[6px]"
                key={chooser.uid}
                >
                    <span>{chooser.displayName}</span>
                    <span 
                    className="hover:bg-[#ddd] rounded-full inline-flex items-center justify-center w-[28px] h-[28px] text-[12px] ml-[2px]"
                    onClick={() => handleRemoveChooser(chooser)}
                    >
                     <FontAwesomeIcon icon={faTimes} />
                    </span>
                </li>
              ))}
              <span className="flex items-center grow ml-[10px] relative">
            <input
                className="outline-0 text-base w-full"
                onChange={(e) => setSearchName(e.target.value)}
                onKeyUp={handleSearch}
                autoFocus
                value={searchName}
                onFocus={handleFocusIn}
                ref={inputElement}
            />
            {isDispayResult&&
            <div 
            className="absolute left-[0] top-[36px] p-[8px] rounded-[8px] shadow bg-white w-[329px] h-[407px] overflow-y-auto"
            ref={resultElement}
            >
                <ul>
                {results.map((result) => {
                    return (
                    <li key={result.uid}>
                        <div 
                        className="cursor-pointer flex items-center p-[8px] rounded-[8px] hover:bg-[#eee]"
                        onClick={()=>handleAddChooser(result)}
                        >
                        <div className="">
                            <img
                            src={getPhotoURL(result)}
                            alt=""
                            className="w-[36px] h-[36px] rounded-full"
                            />
                        </div>
                        <div className="p-[6px]">{result.displayName}</div>
                        </div>
                    </li>
                    );
                })}
                </ul>
            </div>}
          </span>
          </ul>
          
        </div>
      </div>
      
    </div>
  );
}

export default CreaHeader;
