import React from "react";
import DigitalClock from "./AttendanceComponentClock";
import AttendanceButton from "./AttendanceComponentButton";
import CardComponent from "../../components/CardComponent";

export default function AttendanceComponent() {
  return (
    <>
      <CardComponent title={"打刻"} bgColor="lightBlue">
        <DigitalClock />
        <AttendanceButton />
      </CardComponent>
    </>
  );
}
