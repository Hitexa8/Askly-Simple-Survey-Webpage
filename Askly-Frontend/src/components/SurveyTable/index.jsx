import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SurveyTable = ({ surveys }) => {
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Description", width: 500 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.row.id % 2 === 0 ? "Active" : "Closed"}
          color={params.row.id % 2 === 0 ? "success" : "error"}
        />
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={surveys}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        onRowClick={(params) => navigate(`/survey/${params.row.id}`)} // Make rows clickable
        sx={{
          "& .MuiDataGrid-row:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(25, 118, 210, 0.08)", // Light blue hover effect
          },
        }}
      />
    </div>
  );
};

export default SurveyTable;
