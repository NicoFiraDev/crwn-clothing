import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD3lGI3xPVEWRyVnCaaiJqRaJkgIET83B0",
  authDomain: "crwn-db-fc83a.firebaseapp.com",
  databaseURL: "https://crwn-db-fc83a.firebaseio.com",
  projectId: "crwn-db-fc83a",
  storageBucket: "crwn-db-fc83a.appspot.com",
  messagingSenderId: "837865134203",
  appId: "1:837865134203:web:94a8214c1d078bcab5eade",
  measurementId: "G-J7KVBSPGJD"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exist) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
