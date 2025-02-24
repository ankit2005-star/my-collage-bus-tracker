import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBZEdKIXhLCxbmkTnS_xfNR490-jKlf9yw",
  authDomain: "my-collage-bus-tracker-964e8.firebaseapp.com",
  projectId: "my-collage-bus-tracker-964e8",
  storageBucket: "my-collage-bus-tracker-964e8.appspot.com",
  messagingSenderId: "127234319162",
  appId: "1:127234319162:web:b1965e4abaa5ec0fe26603",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const db = getStorage(app);
export { auth, provider,db, signInWithPopup ,storage,signInWithEmailAndPassword};
