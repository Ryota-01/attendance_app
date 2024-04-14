import { React, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthContext } from "../../context/AuthContext";
import { formatDate } from "../../hooks/formatDate";
import FetchUserInfoData from "../../hooks/FetchUserInfoData";

export default function LeaveCountComponentTable() {
  const { user } = useAuthContext();
  const userData = FetchUserInfoData(user.uid);
  const [paidHolidayData, setPaidHolidayData] = useState();
  // 付与する休暇の日数
  const [grantPaidHoliday, setGrantPaidHoliday] = useState();
  // 現在の休暇残数
  const [currentPaidHoliday, setCurrentPaidHoliday] = useState();
  // 前期から繰越休暇
  const [carriedPaidDate, setCarriedPaidDate] = useState(0);
  // 今期の付与日
  const [grantDate, setGrantDate] = useState();
  // 次回の付与日
  const [nextGrantDate, setNextGrantDate] = useState();
  // 休暇の消滅日
  const [limitPaidHoliday, setLimitPaidHoliday] = useState();
  const columns = [
    // { field: "joinDate", headerName: "入社日" },
    { field: "leaveType", headerName: "休暇種別" },
    { field: "grantDate", headerName: "付与日" },
    { field: "grantedThisTerm", headerName: "付与日数 ／ 消滅日" },
    { field: "carriedPaidDate", headerName: "前期繰越日数" },
    { field: "leaveCount", headerName: "休暇残数" },
    { field: "nextGrantDate", headerName: "次回付与日" },
  ];

  useEffect(() => {
    const currentDate = new Date(); // 現在の日付
    const formattedJoinDate = new Date(userData.joinDate); //入社日

    const yearsSinceDate =
      currentDate.getFullYear() - formattedJoinDate.getFullYear();

    if (yearsSinceDate <= 0.5) {
      // 入社から半年経過していない場合は休暇付与しない
      setGrantPaidHoliday(0);
      // 次回の付与日
      const nextGrantDate = new Date(formattedJoinDate);
      nextGrantDate.setMonth(nextGrantDate.getMonth() + 6);
      setNextGrantDate(nextGrantDate);
    } else if (yearsSinceDate >= 0.5 && yearsSinceDate < 1.5) {
      // 入社から半年後に10日付与
      setGrantPaidHoliday(10);
      // 今期付与日
      const grantDate = new Date(formattedJoinDate);
      grantDate.setMonth(grantDate.getMonth() + 6);
      setGrantDate(grantDate);
      // 消滅日
      const limitDate = new Date(grantDate);
      limitDate.setFullYear(limitDate.getFullYear() + 2);
      setLimitPaidHoliday(limitDate);
      // 次回の付与日
      const nextGrantDate = new Date(formattedJoinDate);
      nextGrantDate.setFullYear(nextGrantDate.getFullYear() + 1);
      nextGrantDate.setMonth(nextGrantDate.getMonth() + 6);
      setNextGrantDate(nextGrantDate);
    } else if (yearsSinceDate >= 1.5 && yearsSinceDate < 2.5) {
      // 入社から1年半後に11日付与
      setGrantPaidHoliday(11);
      setCarriedPaidDate(currentPaidHoliday);
      // 今期付与日
      const grantDate = new Date(formattedJoinDate);
      grantDate.setFullYear(grantDate.getFullYear() + 1);
      grantDate.setMonth(grantDate.getMonth() + 6);
      setGrantDate(grantDate);
      // 消滅日
      const limitDate = new Date(grantDate);
      limitDate.setFullYear(limitDate.getFullYear() + 2);
      setLimitPaidHoliday(limitDate);
      // 次回の付与日
      const nextGrantDate = new Date(formattedJoinDate);
      nextGrantDate.setFullYear(nextGrantDate.getFullYear() + 2);
      nextGrantDate.setMonth(nextGrantDate.getMonth() + 6);
      setNextGrantDate(nextGrantDate);
    } else if (yearsSinceDate >= 2.5 && yearsSinceDate < 3.5) {
      // 入社から2年半後に12日付与
      setGrantPaidHoliday(12);
      // 今期付与日
      const grantDate = new Date(formattedJoinDate);
      grantDate.setFullYear(grantDate.getFullYear() + 2);
      grantDate.setMonth(grantDate.getMonth() + 6);
      setGrantDate(grantDate);
      // 消滅日
      const limitDate = new Date(grantDate);
      limitDate.setFullYear(limitDate.getFullYear() + 2);
      setLimitPaidHoliday(limitDate);
      // 次回の付与日
      const nextGrantDate = new Date(formattedJoinDate);
      nextGrantDate.setFullYear(nextGrantDate.getFullYear() + 3);
      nextGrantDate.setMonth(nextGrantDate.getMonth() + 6);
      setNextGrantDate(nextGrantDate);
    } else if (yearsSinceDate >= 3.5 && yearsSinceDate < 4.5) {
      // 入社から3年半後に14日付与
      setGrantPaidHoliday(14);
      // 今期付与日
      const grantDate = new Date(formattedJoinDate);
      grantDate.setFullYear(grantDate.getFullYear() + 3);
      grantDate.setMonth(grantDate.getMonth() + 6);
      setGrantDate(grantDate);
      // 消滅日
      const limitDate = new Date(grantDate);
      limitDate.setFullYear(limitDate.getFullYear() + 2);
      setLimitPaidHoliday(limitDate);
      // 次回付与日
      const nextGrantDate = new Date(formattedJoinDate);
      nextGrantDate.setFullYear(nextGrantDate.getFullYear() + 4);
      nextGrantDate.setMonth(nextGrantDate.getMonth() + 6);
      setNextGrantDate(nextGrantDate);
    } else if (yearsSinceDate >= 4.5 && yearsSinceDate < 5.5) {
      // 入社から4年半後に16日付与
      setGrantPaidHoliday(16);
      // 今期付与日
      const grantDate = new Date(formattedJoinDate);
      grantDate.setFullYear(grantDate.getFullYear() + 4);
      grantDate.setMonth(grantDate.getMonth() + 6);
      setGrantDate(grantDate);
      // 消滅日
      const limitDate = new Date(grantDate);
      limitDate.setFullYear(limitDate.getFullYear() + 2);
      setLimitPaidHoliday(limitDate);
      // 次回付与日
      const nextGrantDate = new Date(formattedJoinDate);
      nextGrantDate.setFullYear(nextGrantDate.getFullYear() + 5);
      nextGrantDate.setMonth(nextGrantDate.getMonth() + 6);
      setNextGrantDate(nextGrantDate);
    } else if (yearsSinceDate >= 5.5 && yearsSinceDate < 6.5) {
      // 入社から5年半後に18日付与
      setGrantPaidHoliday(18);
      // 今期付与日
      const grantDate = new Date(formattedJoinDate);
      grantDate.setFullYear(grantDate.getFullYear() + 5);
      grantDate.setMonth(grantDate.getMonth() + 6);
      setGrantDate(grantDate);
      // 消滅日
      const limitDate = new Date(grantDate);
      limitDate.setFullYear(limitDate.getFullYear() + 2);
      setLimitPaidHoliday(limitDate);
      // 次回付与日
      const nextGrantDate = new Date(formattedJoinDate);
      nextGrantDate.setFullYear(nextGrantDate.getFullYear() + 6);
      nextGrantDate.setMonth(nextGrantDate.getMonth() + 6);
      setNextGrantDate(nextGrantDate);
    } else if (yearsSinceDate >= 6.5) {
      // 入社から6年半後に20日付与
      setGrantPaidHoliday(20);
      // 今期付与日
      const grantDate = new Date(formattedJoinDate);
      grantDate.setFullYear(grantDate.getFullYear() + 6);
      grantDate.setMonth(grantDate.getMonth() + 6);

      setGrantDate(grantDate);
      // 消滅日
      const limitDate = new Date(grantDate);
      limitDate.setFullYear(limitDate.getFullYear() + 2);
      setLimitPaidHoliday(limitDate);
      // 次回付与日
      const nextGrantDate = new Date(formattedJoinDate);
      nextGrantDate.setFullYear(nextGrantDate.getFullYear() + 7);
      nextGrantDate.setMonth(nextGrantDate.getMonth() + 6);
      setNextGrantDate(nextGrantDate);
    }
    const fetchData = async () => {
      try {
        const userCollectionRef = collection(db, user.uid);
        const paidHolidayDocRef = doc(userCollectionRef, "有休休暇");

        const leaveRequestCollectionRef = collection(db, user.uid);
        const leaveRequestDocRef = doc(leaveRequestCollectionRef, "休暇申請");
        const leaveRequestSubCollectionRef = collection(
          leaveRequestDocRef,
          `有休休暇`
        );
        const snapShot = await getDocs(leaveRequestSubCollectionRef);
        const documents = [];
        snapShot.forEach((doc) => {
          documents.push(doc.data());
        });
        setCurrentPaidHoliday(grantPaidHoliday - documents.length);
        console.log(carriedPaidDate);
        const value = {
          nextGrantDate: nextGrantDate, // 次回の付与日
          grantPaidHoliday: grantPaidHoliday, // 付与日数
          carriedPaidDate: carriedPaidDate,
          currentPaidHoliday: grantPaidHoliday - documents.length, // 現在の休暇残数
        };

        await setDoc(paidHolidayDocRef, value);
        setPaidHolidayData(value);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  }, [userData.joinDate, grantPaidHoliday, currentPaidHoliday]);

  return (
    <>
      <TableContainer
        sx={{
          display: "flex",
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
              <TableCell align="center">有休休暇</TableCell>
              <TableCell align="center">{formatDate(grantDate).date}</TableCell>
              <TableCell align="center">
                {grantPaidHoliday}日 ／ {formatDate(limitPaidHoliday).date}
              </TableCell>
              <TableCell align="center">{carriedPaidDate}日</TableCell>
              <TableCell align="center">
                {carriedPaidDate + currentPaidHoliday}日
              </TableCell>
              <TableCell align="center">
                {formatDate(nextGrantDate).date}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
