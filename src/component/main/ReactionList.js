import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
function ReactionList(){
    return (
        <div className="fixed top-0 right-[0] flex justify-center items-center bottom-0 left-0 z-[1000] before:top-0 before:absolute before:content-[''] before:right-[0] before:bottom-0 before:left-0 before:bg-[#fff] before:opacity-[60%] before:z-[0]">
            <div className="relative z-[1000] bg-white border w-[548px] h-[320px] shadow rounded-[8px]">
                <div className="flex h-[60px] relative items-center justify-center leading-[1.34] border-b">
                    <h2 className="text-[1.25rem] font-bold">Cảm xúc về tin nhắn</h2>
                    <div className="absolute h-[60px] right-0 top-0 flex justify-center items-center pr-[16px]">
                        <div className="w-[36px] h-[36px] flex justify-center items-center cursor-pointer bg-[#f5f5f5] rounded-full pointer hover:bg-[#eee]">
                            <div className="w-[20px] h-[20px] flex justify-center items-center">
                                <FontAwesomeIcon icon={faTimes} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex justify-center items-center border-b-[3px] border-b-[#0099FF] h-[60px]">
                        <div className="px-[16px] flex justify-center items-center color-[#0099FF]">
                            <div className="text-[15px] text-[#0099FF] font-semibold">Tất cả <span>2</span></div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center h-[60px]">
                        <div className="p-[16px] flex justify-center items-center rounded-[6px] hover:bg-[#eee]">
                            <div className="flex justify-center items-center">
                                <img
                                src={process.env.PUBLIC_URL + '/img/love.png'}
                                className="w-[20px] h-[20px]"
                                alt=""
                                />
                            </div>
                            <div className="pl-[4px] font-semibold text-[#65676B]">2</div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <ul className="flex flex-col w-full">
                        <li className="mx-[8px] flex items-center">
                            <div className="flex justify-between w-full rounded-[8px] p-[8px] cursor-pointer hover:bg-[#eee]">
                                <div className="flex">
                                    <div className="flex justify-center items-center px-[8px]">
                                        <img
                                        src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/c869.38.1154.1154a/s100x100/265676660_1644281269251303_9139478143820669656_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=7206a8&_nc_ohc=K3v7lOLfz18AX9tcaIT&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-2.fna&oh=00_AT8jZUjEwfvQtbeY08lRfRf8u8ejwMZA_EJJzqJh7V7SmA&oe=6207EF38"
                                        className="w-[40px] h-[40px] rounded-full"
                                        alt=""
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="font-medium text-[.9375rem]">Nguyễn Tràng Đức</div>
                                        <div className="text-[.8125rem] leading-[1.2308] font-normal text-[#8A8D91]">Nhấn để gỡ</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="pl-[16px] flex items-center justify-center">
                                        <img
                                        src={process.env.PUBLIC_URL + '/img/love.png'}
                                        className="w-[28px] h-[28px]"
                                        alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="mx-[8px] flex items-center">
                            <div className="flex justify-between w-full rounded-[8px] p-[8px]">
                                <div className="flex">
                                    <div className="flex justify-center items-center px-[8px]">
                                        <img
                                        src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/c869.38.1154.1154a/s100x100/265676660_1644281269251303_9139478143820669656_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=7206a8&_nc_ohc=K3v7lOLfz18AX9tcaIT&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-2.fna&oh=00_AT8jZUjEwfvQtbeY08lRfRf8u8ejwMZA_EJJzqJh7V7SmA&oe=6207EF38"
                                        className="w-[40px] h-[40px] rounded-full"
                                        alt=""
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="font-medium text-[.9375rem]">Nguyễn Tràng Đức</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="pl-[16px] flex items-center justify-center">
                                        <img
                                        src={process.env.PUBLIC_URL + '/img/love.png'}
                                        className="w-[28px] h-[28px]"
                                        alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ReactionList