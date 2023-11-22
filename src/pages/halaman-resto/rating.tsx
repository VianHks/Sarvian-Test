/* eslint-disable linebreak-style */
import React from 'react';

import { Box } from '@mui/material';

import { StarFilled } from '@nxweb/icons/material';

const Rating: React.FC<{ readonly rating: string }> = ({ rating }) => {
  const filledStars = parseInt(rating, 10);
  const emptyStars = 5 - filledStars;

  return (
    <Box>
      {Array.from({ length: filledStars }, (_, index) => <StarFilled key={index} style={{ color: '#FBD600' }} />)}
      {Array.from({ length: emptyStars }, (_, index) => <StarFilled key={index} style={{ color: '#FFFFFF' }} />)}
    </Box>
  );
};

Rating.displayName = 'Rating';

export default Rating;
