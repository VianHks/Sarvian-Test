import type { Palette } from '@mui/material';

export const palette = (mode: Palette['mode']): Palette => {
  // ** Vars
  const whiteColor = '#FFF';
  const lightColor = '47, 43, 61';
  const darkColor = '208, 212, 241';
  const darkPaperBgColor = '#2F3349';
  const mainColor = mode === 'light' ? lightColor : darkColor;

  const defaultBgColor = () => {
    if (mode === 'light') {
      return '#F8F7FA';
    }

    return '#25293C';
  };

  return {
    common: {
      black: '#000',
      white: whiteColor
    },
    customColors: {
      avatarBg: mode === 'light' ? '#DBDADE' : '#4A5072',
      bodyBg: mode === 'light' ? '#F8F7FA' : '#25293C', // Same as palette.background.default but doesn't consider bordered skin
      dark: darkColor,
      darkPaperBg: darkPaperBgColor,
      light: lightColor,
      lightPaperBg: whiteColor,
      main: mainColor,
      tableHeaderBg: mode === 'light' ? '#F6F6F7' : '#4A5072',
      trackBg: mode === 'light' ? '#F1F0F2' : '#363B54'
    },
    mode,

    error: {
      contrastText: whiteColor,
      dark: '#CE4A4B',
      light: '#ED6F70',
      main: '#EA5455'
    },
    info: {
      contrastText: whiteColor,
      dark: '#00B6CC',
      light: '#1FD5EB',
      main: '#00CFE8'
    },
    primary: {
      contrastText: whiteColor,
      dark: '#655BD3',
      light: '#8479F2',
      main: '#7367F0'
    },
    secondary: {
      contrastText: whiteColor,
      dark: '#949699',
      light: '#B2B4B8',
      main: '#A8AAAE'
    },
    success: {
      contrastText: whiteColor,
      dark: '#23AF62',
      light: '#42CE80',
      main: '#28C76F'
    },
    warning: {
      contrastText: whiteColor,
      dark: '#E08C3B',
      light: '#FFAB5A',
      main: '#FF9F43'
    },

    action: {
      active: `rgba(${mainColor}, 0.54)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.06)`,
      selectedOpacity: 0.06
    },
    background: {
      default: defaultBgColor(),
      paper: mode === 'light' ? whiteColor : darkPaperBgColor
    },
    divider: `rgba(${mainColor}, 0.16)`,
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161'
    },
    text: {
      disabled: `rgba(${mainColor}, 0.42)`,
      primary: `rgba(${mainColor}, 0.78)`,
      secondary: `rgba(${mainColor}, 0.68)`
    }
  } as Palette;
};
