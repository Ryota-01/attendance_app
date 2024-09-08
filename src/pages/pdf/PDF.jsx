import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

export default function PDF(props) {
  const { formattedDates } = props.state;
  const { formattedAttendanceLists } = props.state;
  const { currentYear } = props.state;
  const { currentMonth } = props.state;
  const { userData } = props.state;

  Font.register({
    family: "NotoSansJP",
    fonts: [
      {
        src: "../fonts/NotoSansJP-Regular.ttf",
      },
      {
        src: "../fonts/NotoSansJP-Bold.ttf",
        fontWeight: "bold",
      },
    ],
  });

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 11,
      fontFamily: "NotoSansJP",
    },
    dateOfIssue: {
      textAlign: "right",
    },
    header: {
      fontSize: 16,
      marginBottom: 0,
      fontWeight: "bold",
      textAlign: "center",
    },
    subHeader: {
      fontSize: 10,
      marginBottom: 0,
      fontWeight: "bold",
      textAlign: "center",
    },
    details: {
      // marginBottom: "30",
    },
    detailItem: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    itemsTable: {
      display: "flex",
      width: "auto",
      marginTop: "20px",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableColHeader: {
      width: "20%",
      borderStyle: "solid",
      borderWidth: 1,
      textAlign: "center",
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontWeight: "bold",
      fontSize: 8,
      padding: 2,
      backgroundColor: "#BEE5EB",
    },
    tableCol: {
      width: "20%",
      borderStyle: "solid",
      borderWidth: 1,
      textAlign: "center",
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 2,
      fontSize: 8,
    },
    textVertical: {
      flexDirection: "column",
    },
    user: {
      marginTop: 10,
    },
    EmployeeName: {
      borderBottom: 1,
    },
  });

  const data = [
    {
      title: "勤怠管理表",
      subTitle: `ー ${currentYear}年${currentMonth}月 ー`,
    },
  ];
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          {/* <Text style={styles.dateOfIssue}>発行日{data[0].value}</Text> */}
          <Text style={styles.header}>{data[0].title}</Text>
          <Text style={styles.subHeader}>{data[0].subTitle}</Text>
        </View>
        <View style={styles.details}>
          {data.map((detail, index) => (
            <View style={styles.detailItem} key={index}>
              <View style={styles.textVertical}>
                {/* <Text>株式会社・・</Text>
                <Text>〜〜御中</Text> */}
              </View>
              <View>
                <View style={styles.itemsTable}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableColHeader}>社員名</Text>
                    <Text style={styles.tableColHeader}>総労働日数</Text>
                    <Text style={styles.tableColHeader}>総稼働日数</Text>
                    <Text style={styles.tableColHeader}></Text>
                    <Text style={styles.tableColHeader}></Text>
                    {/* <Text style={styles.EmployeeName}>
                    社員名：{userData.lastName} {userData.firstName}
                  </Text>
                  <Text>東京都渋谷区・・・</Text>
                  <Text>TEL:00-0000-0000</Text> */}
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCol}>
                      {userData.lastName} {userData.firstName}
                    </Text>
                    <Text style={styles.tableCol}></Text>
                    <Text style={styles.tableCol}></Text>
                    <Text style={styles.tableCol}></Text>
                    <Text style={styles.tableCol}></Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View>
          <View style={styles.itemsTable}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>日付</Text>
              <Text style={styles.tableColHeader}>休日</Text>
              <Text style={styles.tableColHeader}>出勤時刻</Text>
              <Text style={styles.tableColHeader}>退勤時刻</Text>
              <Text style={styles.tableColHeader}>稼働時間</Text>
              {/* <Text style={styles.tableColHeader}>備考</Text> */}
            </View>
            {formattedDates.map((formattedCalendarDate, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCol}>
                  {formattedCalendarDate.date}
                </Text>
                <Text style={styles.tableCol}>
                  {formattedCalendarDate.holidayType}
                </Text>
                {/* <Text style={styles.tableCol}>
                  {formattedCalendarDate.holidayType}
                </Text> */}
                {formattedAttendanceLists.map((attendanceList) => {
                  if (formattedCalendarDate.date === attendanceList.date) {
                    return (
                      <>
                        <Text style={styles.tableCol}>
                          {attendanceList.startTime}
                        </Text>
                        <Text style={styles.tableCol}>
                          {attendanceList.endTime}
                        </Text>
                        <Text style={styles.tableCol}>
                          {attendanceList.workingTime}
                        </Text>
                        {/* <Text style={styles.tableCol}>--</Text> */}
                      </>
                    );
                  }
                  return null;
                })}
                {formattedAttendanceLists.every(
                  (attendanceList) =>
                    attendanceList.date !== formattedCalendarDate.date
                ) && (
                  <>
                    {/* <Text style={styles.tableCol}>--</Text> */}
                    <Text style={styles.tableCol}>--</Text>
                    <Text style={styles.tableCol}>--</Text>
                    <Text style={styles.tableCol}>--</Text>
                  </>
                )}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
