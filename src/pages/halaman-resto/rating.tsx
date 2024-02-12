/* eslint-disable linebreak-style */
import React from 'react';

import { Box } from '@mui/material';

import { StarFilled } from '@nxweb/icons/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';


const Rating: React.FC<{ readonly rating: string }> = ({ rating }) => {
  const filledStars = parseInt(rating, 10);
  const emptyStars = 5 - filledStars;

  return (
    <Box sx={{ display: 'flex', gap: '4px' }}>
      {Array.from({ length: filledStars }, (_, index) => <StarFilled key={index} style={{ color: '#FBD600', fontSize: '18px' }} />)}
      {Array.from({ length: emptyStars }, (_, index) => <StarBorderIcon key={index} style={{ color: '#FBD600', fontSize: '18px' }} />)}
    </Box>
  );
};

Rating.displayName = 'Rating';

export default Rating;
