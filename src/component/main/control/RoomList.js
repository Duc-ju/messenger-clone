import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBellSlash } from '@fortawesome/free-solid-svg-icons'
import './scrollBar.css'


function RoomList(){

    const [height, setHeight] = useState(window.innerHeight-196)
    useEffect(() =>{
        function handleResize() {
            setHeight(window.innerHeight-196)
        }
        window.addEventListener('resize',handleResize)
        return ()=>{
            window.removeEventListener('resize',handleResize)
        }
    },[])

    return(
        <div 
        className="mt-[138px] px-[8px] overflow-y-scroll snap-y"
        style={{
            height:`${height}px`
        }}
        id="style-7"
        >
            <ul>
                <li className="p-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                    <div className="grid grid-cols-10">
                        <div className="col-span-2">
                            <img 
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                            href=""
                            className="w-[56px] h-[56px] rounded-full"
                            />
                        </div>
                        <div className="col-span-7 text-left">
                            <h3 className="text-[.9375rem]">Nguyễn Tràng Đức</h3>
                            <span className="text-[.8125rem]">Xin chào hôm nay...</span> 
                            <span className="mx-[6px]">·</span>
                            <span className="text-[.8125rem]">57 phút</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <FontAwesomeIcon icon={faBellSlash} />
                        </div>
                    </div>
                </li>
                <li className="p-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                    <div className="grid grid-cols-10">
                        <div className="col-span-2">
                            <img 
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                            href=""
                            className="w-[56px] h-[56px] rounded-full"
                            />
                        </div>
                        <div className="col-span-7 text-left">
                            <h3 className="text-[.9375rem]">Nguyễn Tràng Đức</h3>
                            <span className="text-[.8125rem]">Xin chào hôm nay...</span> 
                            <span className="mx-[6px]">·</span>
                            <span className="text-[.8125rem]">57 phút</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <FontAwesomeIcon icon={faBellSlash} />
                        </div>
                    </div>
                </li>
                <li className="p-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                    <div className="grid grid-cols-10">
                        <div className="col-span-2">
                            <img 
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                            href=""
                            className="w-[56px] h-[56px] rounded-full"
                            />
                        </div>
                        <div className="col-span-7 text-left">
                            <h3 className="text-[.9375rem]">Nguyễn Tràng Đức</h3>
                            <span className="text-[.8125rem]">Xin chào hôm nay...</span> 
                            <span className="mx-[6px]">·</span>
                            <span className="text-[.8125rem]">57 phút</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <FontAwesomeIcon icon={faBellSlash} />
                        </div>
                    </div>
                </li>
                <li className="p-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                    <div className="grid grid-cols-10">
                        <div className="col-span-2">
                            <img 
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                            href=""
                            className="w-[56px] h-[56px] rounded-full"
                            />
                        </div>
                        <div className="col-span-7 text-left">
                            <h3 className="text-[.9375rem]">Nguyễn Tràng Đức</h3>
                            <span className="text-[.8125rem]">Xin chào hôm nay...</span> 
                            <span className="mx-[6px]">·</span>
                            <span className="text-[.8125rem]">57 phút</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <FontAwesomeIcon icon={faBellSlash} />
                        </div>
                    </div>
                </li>
                <li className="p-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                    <div className="grid grid-cols-10">
                        <div className="col-span-2">
                            <img 
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                            href=""
                            className="w-[56px] h-[56px] rounded-full"
                            />
                        </div>
                        <div className="col-span-7 text-left">
                            <h3 className="text-[.9375rem]">Nguyễn Tràng Đức</h3>
                            <span className="text-[.8125rem]">Xin chào hôm nay...</span> 
                            <span className="mx-[6px]">·</span>
                            <span className="text-[.8125rem]">57 phút</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <FontAwesomeIcon icon={faBellSlash} />
                        </div>
                    </div>
                </li>
                <li className="p-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                    <div className="grid grid-cols-10">
                        <div className="col-span-2">
                            <img 
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                            href=""
                            className="w-[56px] h-[56px] rounded-full"
                            />
                        </div>
                        <div className="col-span-7 text-left">
                            <h3 className="text-[.9375rem]">Nguyễn Tràng Đức</h3>
                            <span className="text-[.8125rem]">Xin chào hôm nay...</span> 
                            <span className="mx-[6px]">·</span>
                            <span className="text-[.8125rem]">57 phút</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <FontAwesomeIcon icon={faBellSlash} />
                        </div>
                    </div>
                </li>
                <li className="p-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                    <div className="grid grid-cols-10">
                        <div className="col-span-2">
                            <img 
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                            href=""
                            className="w-[56px] h-[56px] rounded-full"
                            />
                        </div>
                        <div className="col-span-7 text-left">
                            <h3 className="text-[.9375rem]">Nguyễn Tràng Đức</h3>
                            <span className="text-[.8125rem]">Xin chào hôm nay...</span> 
                            <span className="mx-[6px]">·</span>
                            <span className="text-[.8125rem]">57 phút</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <FontAwesomeIcon icon={faBellSlash} />
                        </div>
                    </div>
                </li>
                <li className="p-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                    <div className="grid grid-cols-10">
                        <div className="col-span-2">
                            <img 
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                            href=""
                            className="w-[56px] h-[56px] rounded-full"
                            />
                        </div>
                        <div className="col-span-7 text-left">
                            <h3 className="text-[.9375rem]">Nguyễn Tràng Đức</h3>
                            <span className="text-[.8125rem]">Xin chào hôm nay...</span> 
                            <span className="mx-[6px]">·</span>
                            <span className="text-[.8125rem]">57 phút</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <FontAwesomeIcon icon={faBellSlash} />
                        </div>
                    </div>
                </li>
                <li className="p-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                    <div className="grid grid-cols-10">
                        <div className="col-span-2">
                            <img 
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                            href=""
                            className="w-[56px] h-[56px] rounded-full"
                            />
                        </div>
                        <div className="col-span-7 text-left">
                            <h3 className="text-[.9375rem]">Nguyễn Tràng Đức</h3>
                            <span className="text-[.8125rem]">Xin chào hôm nay...</span> 
                            <span className="mx-[6px]">·</span>
                            <span className="text-[.8125rem]">57 phút</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <FontAwesomeIcon icon={faBellSlash} />
                        </div>
                    </div>
                </li>
                <li className="p-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                    <div className="grid grid-cols-10">
                        <div className="col-span-2">
                            <img 
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                            href=""
                            className="w-[56px] h-[56px] rounded-full"
                            />
                        </div>
                        <div className="col-span-7 text-left">
                            <h3 className="text-[.9375rem]">Nguyễn Tràng Đức</h3>
                            <span className="text-[.8125rem]">Xin chào hôm nay...</span> 
                            <span className="mx-[6px]">·</span>
                            <span className="text-[.8125rem]">57 phút</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <FontAwesomeIcon icon={faBellSlash} />
                        </div>
                    </div>
                </li>
                <li className="p-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                    <div className="grid grid-cols-10">
                        <div className="col-span-2">
                            <img 
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                            href=""
                            className="w-[56px] h-[56px] rounded-full"
                            />
                        </div>
                        <div className="col-span-7 text-left">
                            <h3 className="text-[.9375rem]">Nguyễn Tràng Đức</h3>
                            <span className="text-[.8125rem]">Xin chào hôm nay...</span> 
                            <span className="mx-[6px]">·</span>
                            <span className="text-[.8125rem]">57 phút</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <FontAwesomeIcon icon={faBellSlash} />
                        </div>
                    </div>
                </li>
                <li className="p-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                    <div className="grid grid-cols-10">
                        <div className="col-span-2">
                            <img 
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                            href=""
                            className="w-[56px] h-[56px] rounded-full"
                            />
                        </div>
                        <div className="col-span-7 text-left">
                            <h3 className="text-[.9375rem]">Nguyễn Tràng Đức</h3>
                            <span className="text-[.8125rem]">Xin chào hôm nay...</span> 
                            <span className="mx-[6px]">·</span>
                            <span className="text-[.8125rem]">57 phút</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <FontAwesomeIcon icon={faBellSlash} />
                        </div>
                    </div>
                </li>
                <li className="p-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                    <div className="grid grid-cols-10">
                        <div className="col-span-2">
                            <img 
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                            href=""
                            className="w-[56px] h-[56px] rounded-full"
                            />
                        </div>
                        <div className="col-span-7 text-left">
                            <h3 className="text-[.9375rem]">Nguyễn Tràng Đức</h3>
                            <span className="text-[.8125rem]">Xin chào hôm nay...</span> 
                            <span className="mx-[6px]">·</span>
                            <span className="text-[.8125rem]">57 phút</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <FontAwesomeIcon icon={faBellSlash} />
                        </div>
                    </div>
                </li>
                <li className="p-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                    <div className="grid grid-cols-10">
                        <div className="col-span-2">
                            <img 
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                            href=""
                            className="w-[56px] h-[56px] rounded-full"
                            />
                        </div>
                        <div className="col-span-7 text-left">
                            <h3 className="text-[.9375rem]">Nguyễn Tràng Đức</h3>
                            <span className="text-[.8125rem]">Xin chào hôm nay...</span> 
                            <span className="mx-[6px]">·</span>
                            <span className="text-[.8125rem]">57 phút</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <FontAwesomeIcon icon={faBellSlash} />
                        </div>
                    </div>
                </li>
                <li className="p-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                    <div className="grid grid-cols-10">
                        <div className="col-span-2">
                            <img 
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                            href=""
                            className="w-[56px] h-[56px] rounded-full"
                            />
                        </div>
                        <div className="col-span-7 text-left">
                            <h3 className="text-[.9375rem]">Nguyễn Tràng Đức</h3>
                            <span className="text-[.8125rem]">Xin chào hôm nay...</span> 
                            <span className="mx-[6px]">·</span>
                            <span className="text-[.8125rem]">57 phút</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <FontAwesomeIcon icon={faBellSlash} />
                        </div>
                    </div>
                </li>
                <li className="p-[8px] rounded-[8px] hover:bg-[#eee] cursor-pointer">
                    <div className="grid grid-cols-10">
                        <div className="col-span-2">
                            <img 
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.18169-1/p100x100/10930164_1583339058599846_4957734157109087888_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=p06VAK4ilAYAX90B1YT&_nc_oc=AQkX5aZbmhv0hQAGc-D7NNNxW4p1G5E5kIshjxE3K6mZDQDI3lcFFMGD9GmR9dO7Kudh6QzeDr67la9XI3NkXNHN&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-1.fna&oh=00_AT9g5zyyKMvYF_SVEmLsv3QJwVeMIWPstA6RbdZY8CP6gw&oe=6216B1B2"
                            href=""
                            className="w-[56px] h-[56px] rounded-full"
                            />
                        </div>
                        <div className="col-span-7 text-left">
                            <h3 className="text-[.9375rem]">Nguyễn Tràng Đức</h3>
                            <span className="text-[.8125rem]">Xin chào hôm nay...</span> 
                            <span className="mx-[6px]">·</span>
                            <span className="text-[.8125rem]">57 phút</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <FontAwesomeIcon icon={faBellSlash} />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}
export default RoomList