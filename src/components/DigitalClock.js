import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function DigitalClock() {
  const [ currentTime, setCurrentTime ] = useState(new Date());
  const [ formattedTime, setFormattedTime ] = useState(currentTime.toLocaleTimeString());
  
  useEffect(() => {
    //1秒ごとに時間を更新する
    const intervalId = setInterval(() => {
      const newTime = new Date();
      setCurrentTime(newTime);
      setFormattedTime(newTime.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <p>2024/01/01(月)</p>
      <h2>{formattedTime}</h2>
    </>
  )
}
