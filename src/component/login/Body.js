
function Body({ handleLogin }){
    return (<section className="pt-[40px] px-[30px] pb-[100px] w-full">
		<div className="grid grid-cols-2 gap-2 pt-[55px] max-w-[1195px] mx-auto">
			<div className="text-left">
                <div className="w-[20px] pt-20"></div>
				<div className="text-[90px] tracking-[-4px] leading-[85px] text-transparent bg-clip-text bg-linear pb-4">Tụ họp <br />mọi lúc, mọi <br /> nơi</div>
				<div className="text-xl mb-10">Với Messenger, việc kết nối với những người<br /> mình yêu mến thật đơn giản và thú vị.</div>
                <div>
				    <a 
                        className="bg-[#0084ff] cursor-pointer rounded-full px-5 py-1.5 text-xl text-white hover:bg-[#4d4dff] transition delay-50 duration-300 linear"
                        onClick = {handleLogin}  
                    >
                        Đăng nhập bằng Facebook
                    </a>
                </div>
                <div className="my-8">
				    <a 
                    className="text-[#4d4dff] cursor-pointer underline"
                    >
                    Đăng nhập bằng tài khoản
                    </a>
                </div>
                <div>
                    <a href="" className="mr-[0.75rem] inline-block">
                        <img 
                        className="h-[44px] w-auto" 
                        src={process.env.PUBLIC_URL + '/img/microsoftD.png'} 
                        alt=""
                        />
                    </a>
                    <a href="" className="inline-block">
                        <img 
                        className="h-[44px] w-auto"
                        src={process.env.PUBLIC_URL + '/img/appleD.png'} 
                        alt=""
                        />
                    </a>
                </div>

			</div>
			<div>
				<img 
                src={process.env.PUBLIC_URL + '/img/showD.png'} 
                alt=""
                />
			</div>
		</div>
	</section>)
}

export default Body