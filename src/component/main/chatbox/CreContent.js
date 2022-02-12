import { useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import { getPhotoURL } from "../../../logic/getPhotoURL";

function CreContent() {
  const { choosers } = useContext(AppContext);

  return (
    <div className="mt-[56px] text-center">
      {choosers.length>0&&<div className="flex flex-col items-center py-[16px] px-[32px]">
        <div>
          {choosers.length === 1 && (
            <img
              src={getPhotoURL(choosers[0])}
              alt=""
              className="w-[56px] h-[56px] rounded-full"
            />
          )}
          {choosers.length > 1 && (
            <div className="relative w-[56px] h-[56px]">
              <div className="absolute right-0 top-0">
                <img
                  src={getPhotoURL(choosers[0])}
                  alt=""
                  className="w-[38px] h-[38px] rounded-full"
                />
              </div>
              <div className="absolute left-0 bottom-0">
                <img
                  src={getPhotoURL(choosers[1])}
                  alt=""
                  className="w-[38px] h-[38px] rounded-full border-2 border-white"
                />
              </div>
            </div>
          )}
        </div>
        <h2 
        className="text-[1.0625rem] font-semibold leading-[1.765]">
            {choosers.map((chooser) => chooser.displayName).join(", ")}
        </h2>
      </div>}
    </div>
  );
}

export default CreContent;
