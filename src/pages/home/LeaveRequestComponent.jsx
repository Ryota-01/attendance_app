import React from "react";
import CardComponent from "../../components/CardComponent";
import ApplicationListDataTable from "./LeaveRequestComponentTable";

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
