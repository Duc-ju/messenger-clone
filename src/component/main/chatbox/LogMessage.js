import { useContext } from "react"
import { AuthContext } from "../../../context/AuthProvider"
import { getMessageLog } from "../../../logic/getMessageLog"
function LogMessage({ message }) {
    const { user } = useContext(AuthContext)
    return (
        <div className="text-center relative z-[10] leading-[1.2727rem] text-[.6875rem] font-semibold py-[10px]">
            {getMessageLog(message,user)}
        </div>
    )
}

export default LogMessage