import firebase ,{ auth } from '../../firebase/config'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'

const fbProvider = new firebase.auth.FacebookAuthProvider()

function Login(){
    const handleLogin = async ()=>{
        const { additionalUserInfo, user }  = await auth.signInWithPopup(fbProvider)
        console.log({additionalUserInfo, user});
    }

    
    return (
        <div>
            <Header />
            <Body handleLogin={handleLogin} />
            <Footer />
        </div>
    )
}

export default Login