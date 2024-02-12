import { StepConnector, stepConnectorClasses, styled } from '@mui/material';

import type { StepIconProps } from '@mui/material';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    left: 'calc(-50% + 10px)',
    right: 'calc(50% + 10px)',
    top: 10
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#FBD600'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#FBD600'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#F2F4F7',
    border: 0,
    borderRadius: 1,
    height: 5
  }
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { active?: boolean, completed?: boolean }
}>(({ theme, ownerState }) => ({
  alignItems: 'center',
  ...ownerState.active && {
    backgroundImage: '#FBD600'
  },
  backgroundColor: ownerState.active || ownerState.completed ? '#FBD600' : theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#F2F4F7',
  borderRadius: '24px',
  color: ownerState.active || ownerState.completed ? '#1050AE' : theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  display: 'flex',
  height: 24,
  justifyContent: 'center',
  ...ownerState.completed && {
    backgroundImage: '#FBD600'
  },
  width: 24,
  zIndex: 1
}));

const ColorlibStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  const icons: Record<string, string> = {
    1: '1',
    2: '2',
    3: '3'
  };

  return (
      <ColorlibStepIconRoot className={className} ownerState={{ active, completed }}>
        {icons[String(props?.icon)]}
      </ColorlibStepIconRoot>
  );
};

ColorlibStepIcon.displayName = 'ColorlibStepIcon';
export { ColorlibStepIcon, ColorlibConnector };
