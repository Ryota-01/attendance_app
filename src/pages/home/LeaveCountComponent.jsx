import React from "react";
import LeaveConutDataTable from "./LeaveCountComponentTable";
import CardComponent from "../../components/CardComponent";

export default function LeaveCountComponent(props) {
  return (
    <>
      <CardComponent title={"休暇残日数"} bgColor="#5DEBD7">
        <LeaveConutDataTable />
      </CardComponent>
    </>
  );
}
