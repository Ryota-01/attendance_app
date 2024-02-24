import React from 'react'
import DigitalClock from '../components/DigitalClock'
import AttendanceButton from '../components/AttendanceButton'

export default function Home() {
  return (
    <div>
      <h2>ホーム</h2>
      <DigitalClock />
      <AttendanceButton />
    </div>
  )
}
