import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import Button from '../../../components/Button';

const Header = ({ name, officerId, image, showButton, action, className }) => {
  return (
    <Box className={`w-full p-4 flex justify-between items-center rounded-[8px] ${className}`}>
      <div className="flex items-center gap-4">
        {image && <Avatar src={image} alt={name} sx={{ width: 56, height: 56 }} />}
        <div>
          <Typography variant="h5">Welcome, {name || 'Teacher'}</Typography>
          <Typography variant="subtitle1">{officerId}</Typography>
          <Typography variant="subtitle2">
            Here's what's happening with your classes today
          </Typography>
        </div>
      </div>
      {showButton && (
        <Button
          name="Add Notice"
          action={action}
          backgroundColor="#FFFFFF"
          fontColor="black"
          cornerRadius={false}
        />
      )}
    </Box>
  );
};

export default Header;