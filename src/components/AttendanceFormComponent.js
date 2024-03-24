import React from "react";
import DigitalClock from "../components/DigitalClock";
import AttendanceButton from "../components/AttendanceButton";
import CardComponent from "./CardComponent";

export default function AttendanceFormComponent() {
  return (
    <>
      <CardComponent title={"打刻"} height={"360px"}>
        <DigitalClock />
        <AttendanceButton />
      </CardComponent>
    </>
  );
}
