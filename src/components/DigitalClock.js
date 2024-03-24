import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../css/DigitalClock.css";
import { formatDate } from "../service/formatDate";
import { Grid, Typography } from "@mui/material";

export default function DigitalClock() {
  const [date, setDate] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formattedTime, setFormattedTime] = useState(
    currentTime.toLocaleTimeString()
  );

  useEffect(() => {
    setDate(formatDate(new Date()));
    //1秒ごとに時間を更新する
    const intervalId = setInterval(() => {
      const newTime = new Date();
      setCurrentTime(newTime);
      setFormattedTime(newTime.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="databoxWrapper">
      <Grid cantainer sx={{ marginTop: "20px" }}>
        <Grid item md={12}>
          <Typography variant="h6">{date}</Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h2">{formattedTime}</Typography>
        </Grid>
      </Grid>
      {/* <p class="currentDate">{date}</p>
      <h2 class="currentTime">{formattedTime}</h2> */}
    </div>
  );
}
