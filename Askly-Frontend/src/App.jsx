import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel";
import CreateSurveyPage from "./pages/CreateSurveyPage";
import theme from "./theme";

const App = () => {
  const [surveys, setSurveys] = useState([]);

  const addSurvey = (newSurvey) => {
    setSurveys((prevSurveys) => [...prevSurveys, newSurvey]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/admin"
            element={<AdminPanel surveys={surveys} addSurvey={addSurvey} />}
          />
          <Route
            path="/admin/create-survey"
            element={<CreateSurveyPage addSurvey={addSurvey} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
