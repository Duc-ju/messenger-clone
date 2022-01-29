
function Footer(){

    return (<footer>
        <div className="py-[20px] text-center">
            <div className="grid grid-cols-7">
                <p>© Meta 2022.</p>
                <p className="col-span-2" >Logo của Apple và Google Play là nhãn hiệu hàng hóa thuộc chủ sở hữu tương ứng.</p>
                <p>Chính sách dữ liệu</p>
                <p>Điều khoản</p>
                <p>
                    <select className="w-[100px]">
                        <option>Tiếng Việt</option>
                    </select>
                </p>
                <p>
                    <img 
                    src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.8562-6/120094295_380944946407105_7528018231246737285_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=6825c5&_nc_ohc=XznuXC91u_kAX-hy_OH&_nc_oc=AQmuMTp7aTslcMO--FsT0IQsG52X5_u1P6iLo4hYfhT8brw2v3lm4xZPqffG-0YWahzGuy9REoNNE0afodN09_PR&_nc_ht=scontent.fhan15-1.fna&oh=00_AT-iJYBD8g9At4BbXlDhoywDg1VI77eyU_UiRqrV9wvLfQ&oe=61F503AC"
                    className="w-[132px] h-auto"
                    />
                </p>
            </div>
            
        </div>
    </footer>
    )
}

export default Footer