import { StepConnector, stepConnectorClasses, styled } from '@mui/material';

import type { StepIconProps } from '@mui/material';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 10px)',
    right: 'calc(50% + 10px)'
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
    height: 5,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#F2F4F7',
    borderRadius: 1
  }
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean, active?: boolean }
}>(({ theme, ownerState }) => ({
  backgroundColor: ownerState.active || ownerState.completed ? '#FBD600' : theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#F2F4F7',
  zIndex: 1,
  color: ownerState.active || ownerState.completed ? '#1050AE' : theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '24px',
  justifyContent: 'center',
  alignItems: 'center',
  ...ownerState.active && {
    backgroundImage: '#FBD600'
  },
  ...ownerState.completed && {
    backgroundImage: '#FBD600'
  }
}));

const ColorlibStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  const icons: Record<string, string> = {
    1: '1',
    2: '2',
    3: '3'
  };

  return (
      <ColorlibStepIconRoot className={className} ownerState={{ completed, active }}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
  );
};

ColorlibStepIcon.displayName = 'ColorlibStepIcon';
export { ColorlibStepIcon, ColorlibConnector };
