import React, { useEffect } from "react";
import { useUserContext } from "../../context/useUserContext";
import { formatDate } from "../../service/formatDate";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthContext } from "../../context/AuthContext";
import calculateSixMonthsAfterJoinDate from "../../service/calculateMonthsSinceJoinDate";

export default function LeaveConutDataTable() {
  const { user } = useAuthContext();
  const { userData } = useUserContext();
  const joinDate = userData?.joinDate || "";

  const columns = [
    { field: "joinDate", headerName: "入社日" },
    { field: "leaveType", headerName: "休暇種別" },
    { field: "leaveCount", headerName: "休暇残数" },
    { field: "nextGrantDate", headerName: "次回付与日" },
  ];

  useEffect(() => {
    // 入社日
    const formatJoinDate = new Date(joinDate);
    //入社日から半年後を計算
    const sixMonthLatter = new Date(formatJoinDate);
    sixMonthLatter.setMonth(sixMonthLatter.getMonth() + 6);
    // 現在日
    const currentDate = new Date();
    console.log(sixMonthLatter, currentDate)
    if (sixMonthLatter >= currentDate) {
      console.log("半年経過");
    } else {
      console.log("半年経過していません");
    }

    const fetchLeaveCountData = async () => {
      try {
        // leaveCount(有休日数)コレクションを参照
        const leaveCountCollectionRef = collection(db, "leaveCount");
        // userIDに紐づくドキュメントを参照
        const leaveCountDocRef = doc(leaveCountCollectionRef, user.uid);
        // ドキュメントを取得
        const leaveCountDocSnapShot = await getDoc(leaveCountDocRef);
        // ドキュメントが存在しない場合は、新たに作成
        if (!leaveCountDocSnapShot.exists()) {
          await setDoc(leaveCountDocRef, {});
        }
        // 作成したドキュメントにYukyuサブコレクションを追加
        const leaveCountSubDocRef = doc(
          leaveCountDocRef,
          "leaveCountData",
          "Yukyu"
        );
        // Yukyuコレクションにドキュメントが存在しない場合は新たに作成
        const leaveCountSubDocSnapShot = await getDoc(leaveCountSubDocRef);
        if (!leaveCountSubDocSnapShot.exists()) {
          await setDoc(leaveCountSubDocRef, {});
        }
        // 追加するデータ
        const value = {
          type: "有休休暇",
          grantDate: "",  // 休暇の付与日
          paidLeaveDays: 10, // 有給休暇の付与日数
          expiryDate: "", // 休暇の期限
        };
        if (formatJoinDate.setMonth(formatJoinDate.getMonth() + 6)) {
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchLeaveCountData();
  }, []);

  return (
    <>
      <TableContainer
        sx={{
          display: "flex",
          marginTop: "24px",
        }}
      >
        <Table size="small">
          <TableHead sx={{ background: "#BEE5EB" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell align="center" color="text.secondary">
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{formatDate(joinDate)}</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
