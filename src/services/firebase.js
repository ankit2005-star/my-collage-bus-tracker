import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const db = getFirestore(app);
const storage = getStorage(app);

/**
 * Function to sign in with Google and store user info in Firestore
 */
const signInWithGoogle = async (selectedRole) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      console.log("User Data:", userDoc.data());
    } else {
      console.error("No Firestore Data Found for UID:", user.uid);
    }
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Assign the selected role during registration
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        role: selectedRole, // "student", "driver", or "admin"
      });
    }

    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

/**
 * Function to fetch user role from Firestore
 */
const getUserRole = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data().role;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
};

export { auth, provider, db, storage, signInWithGoogle, getUserRole };
