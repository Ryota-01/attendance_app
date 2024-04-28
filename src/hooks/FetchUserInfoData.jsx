import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function FetchUserInfoData(uid) {
  const [userInfoData, setUserInfoData] = useState({});

  useEffect(() => {
    const fetchUserInfoData = async () => {
      try {
        if (uid) {
          // usersコレクションを参照
          const userCollectionRef = collection(db, uid);
          // ユーザー情報のドキュメント
          const userInfoDocRef = doc(userCollectionRef, "userInfo");
          // ドキュメントを取得
          const snapShot = await getDoc(userInfoDocRef);
          if (snapShot.exists()) {
            const userInfoData = snapShot.data();
            setUserInfoData(userInfoData);
          } else {
            return;
          }
        }
      } catch (e) {
        console.log(e.message)
      }
    };
    fetchUserInfoData();
  }, []);
  return userInfoData;
}
