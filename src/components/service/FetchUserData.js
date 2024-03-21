import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useUserContext } from "../../context/useUserContext";

const FetchUserData = ({ children }) => {
  const { user } = useAuthContext("");
  // const { setUserData } = useUserContext("");
  const [userData, setUserData] = useState();

};

export default FetchUserData;
