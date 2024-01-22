import type { FC } from 'react';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';

interface Media {
  url: string
}

interface PropsSwipeableTextMobileStepper {
  readonly images: Media[]
}

const SwipeableTextMobileStepper: FC<PropsSwipeableTextMobileStepper> = ({ images }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const maxSteps = images.length;

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        width: 'auto'
      }}
    >
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        style={{ width: '100%' }}
        onChangeIndex={handleStepChange}
      >
        {images?.map((step, index) => (
          <div
            key={step?.url}
            style={{
              alignItems: 'center',
              display: 'flex',
              height: '100%',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            {Math.abs(activeStep - index) <= 2
              ? (
              <Box
                alt="product"
                component="img"
                src={step?.url}
                sx={{
                  display: 'block',
                  maxHeight: '100%',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  width: '100%'
                }} />
              )
              : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        activeStep={activeStep}
        backButton={<></>}
        nextButton={<></>}
        position="static"
        steps={maxSteps}
        sx={{
          backgroundColor: 'transparent',
          bottom: 0,
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          marginBottom: '1.25rem',
          maxWidth: 400,
          position: 'absolute',
          width: '100%',
          zIndex: 1
        }}
        variant="dots" />
    </Box>
  );
};

SwipeableTextMobileStepper.displayName = 'SwipeableTextMobileStepper';
export default SwipeableTextMobileStepper;
