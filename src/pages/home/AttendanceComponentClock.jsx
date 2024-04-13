import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./AttendanceComponentClock.css";
import { formatDate } from "../../hooks/formatDate";
import { Grid, Typography } from "@mui/material";

export default function AttendanceComponentClock() {
  const [date, setDate] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formattedTime, setFormattedTime] = useState(
    currentTime.toLocaleTimeString()
  );

  useEffect(() => {
    const formattedDate = formatDate(new Date());
    setDate(formattedDate);
    //1秒ごとに時間を更新する
    const intervalId = setInterval(() => {
      const newTime = new Date();
      setCurrentTime(newTime);
      setFormattedTime(newTime.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const styles = () => ({
    container: {
      marginTop: "40px"
    },
  })

  return (
    <div className="databoxWrapper">
      <Grid cantainer {...styles().container}>
        <Grid item>
          <Typography variant="h5">{date.date}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h2">{formattedTime}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
