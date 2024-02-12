import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Stylesheet,
} from "@react-pdf-viewer/core";

export default function PdfViewer() {
  const styles = Stylesheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  const PdfDocument = ({ attendanceList }) => {
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>勤怠一覧</Text>
          <Text>ーーーーーーーーーーーーーーーー</Text>
          {attendanceList.map((data, index) => (
            <Text key={index}>
              日付：{data.data}, 出勤：{data.clockIn}, 退勤：{data.clockOut},
              休憩：{data.breakTime}, 稼働時間：
              {calWorkingHours(data.clockIn, data.clockOut, data.breakTime)}
            </Text>
          ))}
        </View>
      </Page>
    </Document>;
  };

  const PdfViewer = ({ attendanceList } => (
    <PDFViewer width="600" height="800">
      <PdfDocument attendanceList={attendanceList} />
    </PDFViewer>
  ))

  return <div>PdfViewer</div>;
}
