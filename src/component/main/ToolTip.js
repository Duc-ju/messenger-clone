import { AppContext } from '../../context/AppProvider'
import { useContext, useRef, useLayoutEffect } from 'react'
function Tooltip() {
    const { openToolTip } = useContext(AppContext)
    const tooltipElement = useRef()
    useLayoutEffect(() => {
        if(!tooltipElement.current) return
        switch(openToolTip.type){
            case 'left':{
                tooltipElement.current.style.top = openToolTip.top + (openToolTip.height-tooltipElement.current.offsetHeight)/2 +'px'
                tooltipElement.current.style.left = openToolTip.left - tooltipElement.current.offsetWidth + 'px'
                break;
            }
            case 'top':{
                tooltipElement.current.style.top = openToolTip.top - tooltipElement.current.offsetHeight + 'px'
                if(window.innerWidth - (openToolTip.left + tooltipElement.current.offsetWidth/2)<0){
                    tooltipElement.current.style.left = window.innerWidth - tooltipElement.current.offsetWidth - 2 + 'px'
                }
                else tooltipElement.current.style.left = openToolTip.left - tooltipElement.current.offsetWidth/2 + 'px'
                break;
            }
            default: break;
        }
    },[])
    return(
        <div
            className="absolute z-[1000] w-max"
            style={{
                top:openToolTip.top,
                left:openToolTip.left
            }}
            ref={tooltipElement}
        >
            <div>
                <ul className="bg-black rounded-[10px] opacity-[0.7] py-[6px] px-[10px] drop-shadow-lg">
                    {openToolTip.data.map((a,index) => <li key={index} className="relative leading-[1.2727rem] text-[.6875rem] text-white h-full w-fit">{a}</li>)}
                </ul>
            </div>
        </div>)
}

export default Tooltip