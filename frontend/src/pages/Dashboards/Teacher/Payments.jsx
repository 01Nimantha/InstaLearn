import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// Function to get the current month and the previous 4 months
const getLastFiveMonths = () => {
  const months = [];
  const today = new Date();
  
  for (let i = 4; i >= 0; i--) { // Includes current month + last 4 months
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthName = date.toLocaleString("default", { month: "long" });
    months.push(monthName);
  }
  return months;
};

const Payments = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [classType, setClassType] = useState("Theory"); // Default class type filter
  const months = getLastFiveMonths(); // Get last 5 months dynamically

  useEffect(() => {
    axios.get("http://localhost:8085/api/v1/student/get-all-students")
      .then(response => {
        console.log("API Response:", response.data); // Debugging API response
        setStudents(response.data.content || []); // Extract 'content' array
      })
      .catch(error => console.error("Error fetching student data:", error));
  }, []);

  // Filter students based on search term and selected class type
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClassType = student.classTypes.some(type => type === classType);
    return matchesSearch && matchesClassType;
  });

  return (
    <div style={{ padding: "20px" }}>
      {/* Search Input */}
      <TextField
        label="Search by Student Number"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      {/* Class Type Filter */}
      <FormControl fullWidth style={{ marginBottom: "20px" }}>
        <InputLabel>Filter by Class Type</InputLabel>
        <Select
          value={classType}
          onChange={(e) => setClassType(e.target.value)}
        >
          <MenuItem value="Theory">Theory (Default)</MenuItem>
          <MenuItem value="Paper">Paper</MenuItem>
          <MenuItem value="Revision">Revision</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Student Number</strong></TableCell>
              {months.map(month => (
                <TableCell key={month}><strong>{month}</strong></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <TableRow key={student.studentId}>
                  <TableCell>{student.studentId}</TableCell>
                  {months.map(month => <TableCell key={month}></TableCell>)}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No student data found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Payments;
