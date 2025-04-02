import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("🔄 Auth State Changed: ", currentUser);
      if (currentUser) {
        setUser(currentUser);
        await fetchUserData(currentUser.uid);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      console.log(`📡 Fetching Firestore data for UID: ${uid}`);
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        console.log("✅ Firestore Data Found:", userDoc.data());
        setUserData(userDoc.data());
      } else {
        console.log("❌ No Firestore Data Found");
        setUserData(null);
      }
    } catch (error) {
      console.error("❌ Error fetching user data:", error);
    }
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    await fetchUserData(userCredential.user.uid);
  };

  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ user, userData, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
