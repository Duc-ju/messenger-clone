import { db } from '../firebase/config'
export async function fetchUserList(search, curChoosers, curUser) {
  let userRef = db.collection("users");
  if (search.length > 0) {
    userRef = userRef.where(
      "keywords",
      "array-contains",
      search?.toLowerCase()
    );
  }
  return userRef
    .orderBy("displayName")
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          displayName: doc.data().displayName,
          uid: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((opt) => {
          if (opt.uid === curUser.uid) return false;
          let check = true;
          curChoosers.forEach((currentChooser) => {
            if (currentChooser.uid === opt.uid) check = false;
          });
          return check;
        });
    });
}
