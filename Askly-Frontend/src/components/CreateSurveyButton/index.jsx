import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateSurveyButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate("/admin/create-survey")}
    >
      Create New Survey
    </Button>
  );
};

export default CreateSurveyButton;
