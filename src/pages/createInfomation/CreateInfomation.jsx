import React, { useRef, useState } from "react";
import NewSideBar from "../../components/Sidebar/NewSideBar";
import CardComponent from "../../components/CardComponent";
import { Box, Button, TextField } from "@mui/material";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function CreateInfomation() {
  const [informationData, setInformationData] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef("");
  const contentRef = useRef("");

  // 現在の年月日と時間を取得
  function formattedDate() {
    const d = new Date();
    const currentYear = d.getFullYear();
    const currentMonth = d.getMonth() + 1;
    const today = d.getDate();
    const formattedDate = `${currentYear}-${currentMonth}-${today}`;
    return formattedDate;
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const value = {
      title: titleRef.current.value,
      content: contentRef.current.value,
    };
    try {
      const informationCollectionRef = collection(db, "information");
      const informationDocRef = doc(informationCollectionRef, formattedDate());
      await setDoc(informationDocRef, value);
      console.log("success!");
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <>
      <NewSideBar>
        <CardComponent title="お知らせ作成">
          <form onSubmit={handleOnSubmit}>
            <Box sx={{ width: { xs: "100%", md: "60%" }, margin: "0 auto" }}>
              <TextField
                type="text"
                label="タイトル"
                fullWidth
                size="small"
                margin="normal"
                inputRef={titleRef}
              />
              <TextField
                type="text"
                label="内容"
                fullWidth
                size="small"
                margin="normal"
                maxRows={10}
                multiline
                inputRef={contentRef}
              />
              <Button
                onSubmit={handleOnSubmit}
                type="submit"
                variant="contained"
              >
                投稿
              </Button>
              <p>{informationData}</p>
            </Box>
          </form>
        </CardComponent>
      </NewSideBar>
    </>
  );
}
