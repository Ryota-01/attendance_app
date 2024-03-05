import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import "../css/DataTable.css";

function DataTable(props) {
  const {attendanceLists} = props;
  console.log(attendanceLists);
  const columns = [
    {field: "id", headerName: "", width: 50},
    {field: "date", headerName: "日付", width: 180},
    {field: "startTime", headerName: "出勤時間", width: 110},
    {field: "endTime", headerName: "退勤時間", width: 110},
    {field: "breakTime", headerName: "休憩時間", width: 110},
    {field: "remarks", headerName: "備考", width: 130},
  ]
  const rows = attendanceLists.map((attendance, index) => ({
    id: index + 1,
    date: attendance.date,
    startTime: attendance.startTime,
    endTime: attendance.endTime || "ー",
    breakTime: "1:00",
    remarks: "",
  }))

    return (
    <div style={{ height: "100%", width : "100%" }}>
      <DataGrid 
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5,10]}
        checkboxSelection
      />
    </div>
  )
}

export default DataTable