import { useEffect, useState, useRef } from 'react'


function Header(){

    const [showBorder, setShowBorder] = useState(window.scrollY>0)
    const header = useRef()
    useEffect(()=>{
        function handleScroll(){
            setShowBorder(window.scrollY>0)
            if(window.scrollY>0){
                header.current.classList.add('border-b')
            }
            else{
                header.current.classList.remove('border-b')
            }
        }
        window.addEventListener('scroll',handleScroll)
        return ()=>{
            window.removeEventListener('scroll',handleScroll)
        }
    },[showBorder])


    return (
    <header 
    className="fixed top-0 right-0 left-0 z-50"
    ref={header}
    >
        <div className="mx-auto h-[100px] max-w-[1195px] bg-white">
            <div className="flex justify-between mx-auto h-[100px] max-w-[1195px]">
                <div className="w-24 flex items-center">
                    <img 
                    src={process.env.PUBLIC_URL + '/img/logo.png'}
                    alt="logo" 
                    className="w-10 h-10"
                    />
                </div>
                <div className="flex items-center">
                    <ul className="flex">
                        <li><a href="" className="navlink">Phòng họp mặt</a></li>
                        <li><a href="" className="navlink">Tính năng</a></li>
                        <li><a href="" className="navlink">Ứng dụng dành cho máy tính</a></li>
                        <li><a href="" className="navlink">Quyền riêng tư & an toàn</a></li>
                        <li><a href="" className="navlink">Dành cho nhà phát triển</a></li>
                    </ul>
                </div>
            </div>
        </div>

	</header>)
}

export default Header