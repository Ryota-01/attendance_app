import React from "react";
import DigitalClock from "./DigitalClock";
import AttendanceButton from "./AttendanceButton";
import CardComponent from "./CardComponent";

export default function AttendanceFormComponent() {
  return (
    <>
      <CardComponent title={"打刻"} height={"450px"}>
        <DigitalClock />
        <AttendanceButton />
      </CardComponent>
    </>
  );
}
