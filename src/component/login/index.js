import firebase, { auth } from "../../firebase/config";
import { getAllSubstrings } from "../../logic/getAllSubStrings";
import { addDocument } from "../../firebase/services";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

const fbProvider = new firebase.auth.FacebookAuthProvider();

function Login() {
  const handleLogin = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
    if (additionalUserInfo.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: getAllSubstrings(user.displayName)
      });
    }
  };

  return (
    <div>
      <Header />
      <Body handleLogin={handleLogin} />
      <Footer />
    </div>
  );
}

export default Login;
