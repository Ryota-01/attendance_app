import React from "react";
import { Card } from "@mui/material";
import LeaveConutDataTable from "./LeaveCountComponentTable";
import CardComponent from "../../components/CardComponent";

export default function LeaveCountComponent(props) {
  return (
    <>
      <Card>
        <CardComponent title={"休暇残日数"} bgColor="lightGreen">
          <LeaveConutDataTable />
        </CardComponent>
      </Card>
    </>
  );
}
