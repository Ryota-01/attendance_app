import React from "react";
import CardComponent from "./CardComponent";
import ApplicationListDataTable from "./Table/ApplicationListDataTable";

export default function ApplicationList(props) {
  const applicationsData = props.applicationsData;
  return (
    <>
      <CardComponent title={"休暇申請一覧"}>
        <ApplicationListDataTable applicationsData={applicationsData} />
      </CardComponent>
    </>
  );
}
