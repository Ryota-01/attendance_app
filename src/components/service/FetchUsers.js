import React, { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useUserContext } from "../../context/useUserContext";

const FetchUsers = () => {
  const { user } = useAuthContext("");
  const { setUserData } = useUserContext("");

  useEffect(() => {
    const FetchUserData = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userDocRef = doc(usersCollection, user.uid);
        const snapShot = await getDoc(userDocRef);
        const userData = snapShot.data();
        setUserData(userData);
        console.log(userData);
      } catch (e) {
        console.log(e.message);
      }
    };
    FetchUserData();
  }, [user]);
  return null;
};

export default FetchUsers;
