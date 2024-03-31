import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import FetchUserInfoData from "./FetchData/FetchUserInfoData";
import { useAuthContext } from "../context/AuthContext";

export default function PDF(props) {
  console.log(props.state);
  const { user } = useAuthContext();
  const userData = FetchUserInfoData(user.uid);

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
    header: {
      fontSize: 24,
      marginBottom: 0,
      fontWeight: "bold",
      textAlign: "center",
    },
    details: {
      marginBottom: "30",
    },
    detailItem: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    itemsTable: {
      display: "flex",
      width: "auto",
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
      padding: 5,
    },
    tableCol: {
      width: "20%",
      borderStyle: "solid",
      borderWidth: 1,
      textAlign: "center",
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 5,
    },
    textVertical: {
      flexDirection: "column",
    },
    company: {
      marginTop: 10,
    },
  });

  const data = [
    {
      title: "勤怠管理表",
      value: "2024/4/1",
      items: [
        {
          name: "サンプル1",
          surface: "1",
          thickness: "式",
          width: "10,000",
          length: "10,000",
        },
        {
          name: "サンプル2",
          surface: "1",
          thickness: "式",
          width: "10,000",
          length: "10,000",
        },
        {
          name: "サンプル3",
          surface: "1",
          thickness: "式",
          width: "10,000",
          length: "10,000",
        },
      ],
    },
  ];
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.header}>勤怠管理表</Text>
        </View>
        <View style={styles.details}>
          {data.map((detail, index) => (
            <View style={styles.detailItem} key={index}>
              <View style={styles.textVertical}>
                {/* <Text>株式会社・・・</Text>
                <Text>〜〜御中</Text> */}
              </View>
              <View>
                {/* <Text>発行日{detail.value}</Text>
                <View style={styles.company}>
                  <Text>株式会社××××</Text>
                  <Text>東京都渋谷区・・・</Text>
                  <Text>TEL:00-0000-0000</Text>
                </View> */}
              </View>
            </View>
          ))}
        </View>
        <View>
          <View style={styles.itemsTable}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>概要</Text>
              <Text style={styles.tableColHeader}>数量</Text>
              <Text style={styles.tableColHeader}>単位</Text>
              <Text style={styles.tableColHeader}>単価</Text>
              <Text style={styles.tableColHeader}>金額</Text>
            </View>
            {data[0].items.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCol}>{item.name}</Text>
                <Text style={styles.tableCol}>{item.surface}</Text>
                <Text style={styles.tableCol}>{item.thickness}</Text>
                <Text style={styles.tableCol}>{item.width}</Text>
                <Text style={styles.tableCol}>{item.length}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
