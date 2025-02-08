import React from 'react';
import { Card, Typography } from '@mui/material';

const StatCard = ({ title, value, description }) => {
  return (
    <Card sx={{ p: 2, textAlign: 'center', minWidth: '200px', boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Card>
  );
};

export default StatCard;