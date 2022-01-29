import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import React ,{ useEffect, useState } from 'react'

export const AuthContext = React.createContext()
function AuthProvider({children}){
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useEffect(() =>{
        const unsubcribed = auth.onAuthStateChanged((user)=>{
            console.log({user});
            if(user){
                const { displayName, email, uid, photo} = user
                setUser({ displayName, email, uid, photo})
                navigate('/')
                return
            }
            navigate('/login')
        })

        return ()=>{
            unsubcribed()
        }
    },[])
    

    return(
        <AuthContext.Provider value={user}>

            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider