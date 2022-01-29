import { useState, useEffect, useRef } from "react";

function Content() {
  const [height, setHeight] = useState(window.innerHeight - 139);
  const contentElement = useRef();
  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight - 139);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(()=>{
    contentElement.current.scrollTop = contentElement.current.scrollHeight-contentElement.current.clientHeight
  },[])

  return (
    <div className="mt-[76px] container">
      <div
        className="w-full overflow-y-scroll snap-y relative bg-white"
        ref={contentElement}
        style={{
          height: `${height}px`,
        }}
      >
        <div className="relative z-10">
          <div className="flex">
            <div className="ml-[14px] mr-[8px] flex items-end w-[32px]">
              <img
                src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/p100x100/240272910_2907912749460767_1922664637204799808_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=7206a8&_nc_ohc=NDUWRXMETbAAX8o9_xq&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-2.fna&oh=00_AT-hgjVAdygHVnQ5hXhuLfYCDISfXNaouQBw4rJyHjICwA&oe=61F55248"
                alt=""
                className="w-[28px] h-[28px] rounded-full"
              />
            </div>
            <ul className="text-justify w-full">
              <li className="mb-[2px]">
                <div className="max-w-[65%]">
                  <p className="bg-[#eee] py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v 1 kiểu ngành khá nhiều tiền
                    :v 1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
              <li className="mb-[2px]">
                <div className="max-w-[65%]">
                  <p className="bg-[#eee] py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v 1 kiểu ngành khá nhiều tiền
                    :v 1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[7px] invisible"></div>

        <div>
          <div className="">
            <ul className="text-justify w-full">
              <li className="mb-[2px]">
                <div className="max-w-[65%] mr-0 ml-auto">
                  <p className="bg-black text-white mr-[14px] ml-auto py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
              <li className="mb-[2px]">
                <div className="max-w-[65%] mr-0 ml-auto">
                  <p className="bg-black text-white mr-[14px] ml-auto py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v 1 kiểu ngành khá nhiều tiền
                    :v 1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[7px] invisible"></div>

        <div className="relative z-10">
          <div className="flex">
            <div className="ml-[14px] mr-[8px] flex items-end w-[32px]">
              <img
                src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/p100x100/240272910_2907912749460767_1922664637204799808_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=7206a8&_nc_ohc=NDUWRXMETbAAX8o9_xq&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-2.fna&oh=00_AT-hgjVAdygHVnQ5hXhuLfYCDISfXNaouQBw4rJyHjICwA&oe=61F55248"
                alt=""
                className="w-[28px] h-[28px] rounded-full"
              />
            </div>
            <ul className="text-justify w-full">
              <li className="mb-[2px]">
                <div className="max-w-[65%]">
                  <p className="bg-[#eee] py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v 1 kiểu ngành khá nhiều tiền
                    :v 1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
              <li className="mb-[2px]">
                <div className="max-w-[65%]">
                  <p className="bg-[#eee] py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v 1 kiểu ngành khá nhiều tiền
                    :v 1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[7px] invisible"></div>

        <div>
          <div className="">
            <ul className="text-justify w-full">
              <li className="mb-[2px]">
                <div className="max-w-[65%] mr-0 ml-auto">
                  <p className="bg-black text-white mr-[14px] ml-auto py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
              <li className="mb-[2px]">
                <div className="max-w-[65%] mr-0 ml-auto">
                  <p className="bg-black text-white mr-[14px] ml-auto py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v 1 kiểu ngành khá nhiều tiền
                    :v 1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[7px] invisible"></div>

        <div className="relative z-10">
          <div className="flex">
            <div className="ml-[14px] mr-[8px] flex items-end w-[32px]">
              <img
                src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/p100x100/240272910_2907912749460767_1922664637204799808_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=7206a8&_nc_ohc=NDUWRXMETbAAX8o9_xq&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-2.fna&oh=00_AT-hgjVAdygHVnQ5hXhuLfYCDISfXNaouQBw4rJyHjICwA&oe=61F55248"
                alt=""
                className="w-[28px] h-[28px] rounded-full"
              />
            </div>
            <ul className="text-justify w-full">
              <li className="mb-[2px]">
                <div className="max-w-[65%]">
                  <p className="bg-[#eee] py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v 1 kiểu ngành khá nhiều tiền
                    :v 1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
              <li className="mb-[2px]">
                <div className="max-w-[65%]">
                  <p className="bg-[#eee] py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v 1 kiểu ngành khá nhiều tiền
                    :v 1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[7px] invisible"></div>

        <div>
          <div className="">
            <ul className="text-justify w-full">
              <li className="mb-[2px]">
                <div className="max-w-[65%] mr-0 ml-auto">
                  <p className="bg-black text-white mr-[14px] ml-auto py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
              <li className="mb-[2px]">
                <div className="max-w-[65%] mr-0 ml-auto">
                  <p className="bg-black text-white mr-[14px] ml-auto py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v 1 kiểu ngành khá nhiều tiền
                    :v 1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[7px] invisible"></div>

        <div className="relative z-10">
          <div className="flex">
            <div className="ml-[14px] mr-[8px] flex items-end w-[32px]">
              <img
                src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/p100x100/240272910_2907912749460767_1922664637204799808_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=7206a8&_nc_ohc=NDUWRXMETbAAX8o9_xq&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-2.fna&oh=00_AT-hgjVAdygHVnQ5hXhuLfYCDISfXNaouQBw4rJyHjICwA&oe=61F55248"
                alt=""
                className="w-[28px] h-[28px] rounded-full"
              />
            </div>
            <ul className="text-justify w-full">
              <li className="mb-[2px]">
                <div className="max-w-[65%]">
                  <p className="bg-[#eee] py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v 1 kiểu ngành khá nhiều tiền
                    :v 1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
              <li className="mb-[2px]">
                <div className="max-w-[65%]">
                  <p className="bg-[#eee] py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v 1 kiểu ngành khá nhiều tiền
                    :v 1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[7px] invisible"></div>

        <div>
          <div className="">
            <ul className="text-justify w-full">
              <li className="mb-[2px]">
                <div className="max-w-[65%] mr-0 ml-auto">
                  <p className="bg-black text-white mr-[14px] ml-auto py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
              <li className="mb-[2px]">
                <div className="max-w-[65%] mr-0 ml-auto">
                  <p className="bg-black text-white mr-[14px] ml-auto py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v 1 kiểu ngành khá nhiều tiền
                    :v 1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[7px] invisible"></div>

        <div className="relative z-10">
          <div className="flex">
            <div className="ml-[14px] mr-[8px] flex items-end w-[32px]">
              <img
                src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/p100x100/240272910_2907912749460767_1922664637204799808_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=7206a8&_nc_ohc=NDUWRXMETbAAX8o9_xq&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan15-2.fna&oh=00_AT-hgjVAdygHVnQ5hXhuLfYCDISfXNaouQBw4rJyHjICwA&oe=61F55248"
                alt=""
                className="w-[28px] h-[28px] rounded-full"
              />
            </div>
            <ul className="text-justify w-full">
              <li className="mb-[2px]">
                <div className="max-w-[65%]">
                  <p className="bg-[#eee] py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v 1 kiểu ngành khá nhiều tiền
                    :v 1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
              <li className="mb-[2px]">
                <div className="max-w-[65%]">
                  <p className="bg-[#eee] py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v 1 kiểu ngành khá nhiều tiền
                    :v 1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[7px] invisible"></div>

        <div>
          <div className="">
            <ul className="text-justify w-full">
              <li className="mb-[2px]">
                <div className="max-w-[65%] mr-0 ml-auto">
                  <p className="bg-black text-white mr-[14px] ml-auto py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
              <li className="mb-[2px]">
                <div className="max-w-[65%] mr-0 ml-auto">
                  <p className="bg-black text-white mr-[14px] ml-auto py-[8px] px-[12px] text-[0.9375rem] rounded-[18px] break-words max-w-fit">
                    1 kiểu ngành khá nhiều tiền :v 1 kiểu ngành khá nhiều tiền
                    :v 1 kiểu ngành khá nhiều tiền :v
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[7px] invisible"></div>
      </div>
    </div>
  );
}

export default Content;
