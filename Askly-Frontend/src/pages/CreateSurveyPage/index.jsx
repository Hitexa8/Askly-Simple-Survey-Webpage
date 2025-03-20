import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateSurveyPage = ({ addSurvey }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(Array(10).fill(""));
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSurvey = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID
      title,
      description,
      options: options.filter((option) => option.trim() !== ""), // Remove empty options
      status: "active", // Default status
    };
    addSurvey(newSurvey); // Add the new survey to the list
    toast.success("Survey created successfully!"); // Show success toast
    navigate("/admin"); // Redirect to admin panel
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create New Survey
      </Typography>

      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Survey Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Survey Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Grid>

              {/* Survey Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Survey Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={4}
                  required
                />
              </Grid>

              {/* Survey Options */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Survey Options (Max 10)
                </Typography>
                {options.map((option, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    label={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    sx={{ mb: 2 }}
                  />
                ))}
              </Grid>

              {/* Create Button */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button type="submit" variant="contained" color="primary">
                    Create Survey
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateSurveyPage;
