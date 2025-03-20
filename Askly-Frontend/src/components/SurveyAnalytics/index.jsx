import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Typography, Card, CardContent, Grid } from "@mui/material";

const SurveyAnalytics = ({ surveys }) => {
  // Dummy data for sales overview
  const salesData = [
    { name: "January", sales: 4000 },
    { name: "February", sales: 3000 },
    { name: "March", sales: 2000 },
  ];

  // Dummy data for market share
  const marketData = [
    { name: "Product A", value: 400 },
    { name: "Product B", value: 300 },
    { name: "Product C", value: 300 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]; // Colors for pie chart

  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Analytics Overview
        </Typography>

        <Grid container spacing={3}>
          {/* Sales Overview */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Sales Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>

          {/* Market Share */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Market Share
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={marketData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {marketData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SurveyAnalytics;
