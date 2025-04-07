import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Container
} from "@mui/material";

const getLastFourMonths = () => {
  const months = [];
  const today = new Date();
  for (let i = 3; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthName = date.toLocaleString("default", { month: "long" });
    months.push(monthName);
  }
  return months;
};

const Payments = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [classNames, setClassNames] = useState([]);
  const [selectedClassName, setSelectedClassName] = useState("");
  const [classTypes, setClassTypes] = useState([]);
  const [selectedClassType, setSelectedClassType] = useState("");
  const [paymentRecords, setPaymentRecords] = useState([]);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [selectedMonthFilter, setSelectedMonthFilter] = useState("");
  const [loading, setLoading] = useState({
    students: false,
    classes: false,
    payments: false
  });
  const [error, setError] = useState({
    students: null,
    classes: null,
    payments: null
  });
  const months = getLastFourMonths();
  const currentMonth = months[months.length - 1];

  useEffect(() => {
    setSelectedMonthFilter(currentMonth);
  }, [currentMonth]);

  useEffect(() => {
    setLoading(prev => ({...prev, classes: true}));
    Promise.all([
      axios.get("http://localhost:8085/classType/get-all-class-names"),
      axios.get("http://localhost:8085/classType/get-all-class-types"),
      axios.get("http://localhost:8085/api/v1/payment/all"),
      axios.get("http://localhost:8085/api/v1/student/get-all-students?page=0&size=100")
    ])
    .then(([classNamesRes, classTypesRes, paymentsRes, studentsRes]) => {
      setClassNames(classNamesRes.data || []);
      if (classNamesRes.data.length > 0) setSelectedClassName(classNamesRes.data[0]);
      setClassTypes(classTypesRes.data || []);
      if (classTypesRes.data.length > 0) setSelectedClassType(classTypesRes.data[0]);
      setPaymentRecords(paymentsRes.data || []);
      setStudents(studentsRes.data.content || []);
    })
    .catch(err => {
      setError({
        students: "Failed to load students",
        classes: "Failed to load class data",
        payments: "Failed to load payment records"
      });
      console.error("Error fetching data:", err);
    })
    .finally(() => {
      setLoading({students: false, classes: false, payments: false});
    });
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const combinedClassType = `${selectedClassName} ${selectedClassType}`;
    const hasMatchingClass = student.classTypes?.some((cls) => 
      `${cls.classTypeName} ${cls.type}` === combinedClassType
    );

    if (paymentStatusFilter !== "all" && selectedMonthFilter) {
      const paymentRecord = paymentRecords.find(
        (record) =>
          record.studentId === student.studentId &&
          record.classType === combinedClassType &&
          record.month === selectedMonthFilter
      );
      if (paymentStatusFilter === "paid" && !paymentRecord) return false;
      if (paymentStatusFilter === "pending" && paymentRecord) return false;
    }

    return matchesSearch && hasMatchingClass;
  });

  return (
    <Container maxWidth={false} sx={{ p: 4, maxWidth: '98%' }}>
      <h2 className="text-xl font-bold">Payment Records</h2>
      
      <Paper elevation={2} sx={{ p: 4, mb: 4, width: '100%' ,mt:5 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontSize: '1.6rem' }}>
          Filters
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Search by Student Number"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="medium"
              InputProps={{ style: { fontSize: '1.1rem', height: '50px' } }}
              InputLabelProps={{ style: { fontSize: '1.1rem' } }}
            />
          </Grid>
          
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="medium">
              <InputLabel sx={{ fontSize: '1.1rem' }}>Class Name</InputLabel>
              <Select 
                value={selectedClassName} 
                onChange={(e) => setSelectedClassName(e.target.value)}
                label="Class Name"
                sx={{ fontSize: '1.1rem', height: '50px' }}
              >
                {classNames.map((className, index) => (
                  <MenuItem key={index} value={className} sx={{ fontSize: '1.1rem' }}>
                    {className}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="medium">
              <InputLabel sx={{ fontSize: '1.1rem' }}>Class Type</InputLabel>
              <Select 
                value={selectedClassType} 
                onChange={(e) => setSelectedClassType(e.target.value)}
                label="Class Type"
                sx={{ fontSize: '1.1rem', height: '50px' }}
              >
                {classTypes.map((classType, index) => (
                  <MenuItem key={index} value={classType} sx={{ fontSize: '1.1rem' }}>
                    {classType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="medium">
              <InputLabel sx={{ fontSize: '1.1rem' }}>Month</InputLabel>
              <Select 
                value={selectedMonthFilter}
                onChange={(e) => setSelectedMonthFilter(e.target.value)}
                label="Month"
                sx={{ fontSize: '1.1rem', height: '50px' }}
              >
                {months.map((month, index) => (
                  <MenuItem key={index} value={month} sx={{ fontSize: '1.1rem' }}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="medium">
              <InputLabel sx={{ fontSize: '1.1rem' }}>Payment Status</InputLabel>
              <Select 
                value={paymentStatusFilter} 
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                label="Payment Status"
                sx={{ fontSize: '1.1rem', height: '50px' }}
              >
                <MenuItem value="all" sx={{ fontSize: '1.1rem' }}>All</MenuItem>
                <MenuItem value="paid" sx={{ fontSize: '1.1rem' }}>Paid</MenuItem>
                <MenuItem value="pending" sx={{ fontSize: '1.1rem' }}>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, width: '100%', overflowX: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
            Payment Status
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
            Showing records for: {selectedClassName} {selectedClassType}
            {paymentStatusFilter !== "all" && ` (${paymentStatusFilter} in ${selectedMonthFilter})`}
          </Typography>
        </Box>

        {loading.students || loading.classes || loading.payments ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress size={60} />
          </Box>
        ) : error.students || error.classes || error.payments ? (
          <Alert severity="error" sx={{ mb: 2, fontSize: '1.1rem' }}>
            {error.students || error.classes || error.payments}
          </Alert>
        ) : (
          <TableContainer sx={{ maxWidth: '100%' }}>
            <Table size="medium">
              <TableHead>
                <TableRow sx={{ 
                  backgroundColor: 'primary.light', 
                  '& th': { 
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    padding: '14px 8px'
                  } 
                }}>
                  <TableCell sx={{ minWidth: '220px' }}>Student Number</TableCell>
                  {months.map((month) => (
                    <TableCell key={month} align="center" sx={{ minWidth: '180px' }}>
                      {month}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.studentId} hover>
                      <TableCell sx={{ fontWeight: 'medium', fontSize: '1.1rem' }}>
                        {student.studentId}
                      </TableCell>
                      {months.map((month) => {
                        const combinedClassType = `${selectedClassName} ${selectedClassType}`;
                        const paymentRecord = paymentRecords.find(
                          (record) =>
                            record.studentId === student.studentId &&
                            record.classType === combinedClassType &&
                            record.month === month
                        );
                        return (
                          <TableCell key={month} align="center" sx={{ fontSize: '1.1rem' }}>
                            <Chip 
                              label={paymentRecord ? "Paid" : "Pending"} 
                              size="medium"
                              color={paymentRecord ? "success" : "error"}
                              variant={paymentRecord ? "filled" : "outlined"}
                              sx={{ 
                                fontSize: '1rem',
                                padding: '6px 0',
                                minWidth: '110px',
                                height: '36px'
                              }}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={months.length + 1} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
                        No student records found matching your criteria
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default Payments;