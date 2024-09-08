import React, { useRef } from "react";
import NewSideBar from "../../components/Sidebar/NewSideBar";
import CardComponent from "../../components/CardComponent";
import { Box, Button, TextField } from "@mui/material";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function CreateInfomation() {
  const titleRef = useRef("");
  const contentRef = useRef("");
  const navigate = useNavigate("");

  // 現在の年月日と時間を取得
  function formattedDate() {
    const d = new Date();
    const currentYear = d.getFullYear();
    const currentMonth = d.getMonth() + 1;
    const today = d.getDate();
    const formattedDate = `${currentYear}-${currentMonth}-${today}`;
    return formattedDate;
  }

  // 投稿ボタンを押した時の処理
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const value = {
      title: title,
      content: content,
      createDate: serverTimestamp(),
    };
    try {
      const informationCollectionRef = collection(db, "information");
      const informationDocRef = doc(
        informationCollectionRef,
        `${title}_${formattedDate()}`
      );
      await setDoc(informationDocRef, value);
      navigate("/home");
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
            </Box>
          </form>
        </CardComponent>
      </NewSideBar>
    </>
  );
}
