
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
                    src={process.env.PUBLIC_URL + '/img/fromF.jpg'}
                    className="w-[132px] h-auto"
                    alt=""
                    />
                </p>
            </div>
            
        </div>
    </footer>
    )
}

export default Footer