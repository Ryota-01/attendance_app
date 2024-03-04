import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "../css/DigitalClock.css"

export default function DigitalClock() {
  const [ date, setDate ] = useState([]);
  const [ currentTime, setCurrentTime ] = useState(new Date());
  const [ formattedTime, setFormattedTime ] = useState(currentTime.toLocaleTimeString());
  
  useEffect(() => {
    const formatDate = () => {
      const d = new Date();
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      const dayOfWeek = d.getDay();
      const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
      return `${year}/${month}/${day}(${dayNames[dayOfWeek]})`;
    };

    setDate(formatDate());

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
      <p class="currentDate">{date}</p>
      <h2 class="currentTime">{formattedTime}</h2>
    </div>
  )
}
