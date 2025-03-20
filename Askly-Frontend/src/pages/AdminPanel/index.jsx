import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Fab,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SurveyTable from "../../components/SurveyTable";
import SurveyAnalytics from "../../components/SurveyAnalytics";
import axios from "axios";

const AdminPanel = () => {
  const [surveys, setSurveys] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'active', 'closed'
  const navigate = useNavigate();

  // Fetch initial surveys from a dummy API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts") // Replace with your API endpoint
      .then((response) => {
        const surveyData = response.data.slice(0, 10).map((survey) => ({
          ...survey,
          status: survey.id % 2 === 0 ? "active" : "closed", // Add status for demo
        }));
        setSurveys(surveyData);
        setFilteredSurveys(surveyData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching surveys:", error);
        setLoading(false);
      });
  }, []);

  // Filter surveys based on status
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredSurveys(surveys);
    } else {
      setFilteredSurveys(
        surveys.filter((survey) => survey.status === statusFilter)
      );
    }
  }, [statusFilter, surveys]);

  // Add a new survey
  const addSurvey = (newSurvey) => {
    setSurveys((prevSurveys) => [...prevSurveys, newSurvey]);
    setFilteredSurveys((prevFilteredSurveys) => [
      ...prevFilteredSurveys,
      newSurvey,
    ]);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>

      {/* Status Filter Toggle Buttons */}
      <Box sx={{ mb: 4 }}>
        <ToggleButtonGroup
          value={statusFilter}
          exclusive
          onChange={(e, newFilter) => setStatusFilter(newFilter)}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="active">Active</ToggleButton>
          <ToggleButton value="closed">Closed</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={3}>
        {/* Survey Table */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Survey List
              </Typography>
              {loading ? (
                <CircularProgress />
              ) : (
                <SurveyTable surveys={filteredSurveys} />
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Survey Analytics */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Survey Analytics
              </Typography>
              <SurveyAnalytics surveys={filteredSurveys} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Floating Action Button for Creating Surveys */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={() => navigate("/admin/create-survey")}
      >
        <Add />
      </Fab>

      {/* Toast Container */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Container>
  );
};

export default AdminPanel;
