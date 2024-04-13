import React from "react";
import ApplicationListDataTable from "./LeaveRequestComponentTable";
import CardComponent from "../../components/CardComponent";

export default function LeaveRequestComponent(props) {
  const applicationsData = props.applicationsData;
  return (
    <>
      <CardComponent title={"休暇取得一覧"}>
        <ApplicationListDataTable applicationsData={applicationsData} />
      </CardComponent>
    </>
  );
}
