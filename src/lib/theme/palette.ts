import type { Palette } from '@mui/material';

export const palette = (mode: Palette['mode']): Palette => {
  // ** Vars
  const whiteColor = '#FFF';
  const lightColor = '47, 43, 61';
  const darkColor = '208, 212, 241';
  const darkPaperBgColor = '#2F3349';
  const mainColor = mode === 'light' ? lightColor : darkColor;

  const primaryColor = {
    100: '#D5ECFE',
    200: '#BDD7FF',
    300: '#8FBCFF',
    400: '#61A1FF',
    500: '#317FF2',
    600: '#1F66D0',
    700: '#1050AE',
    800: '#053C8C',
    900: '#002B6A'
  };

  const errorColor = {
    100: '#FEE4E2',
    200: '#FEE4E2',
    300: '#FECDCA',
    400: '#FDA29B',
    500: '#F97066',
    600: '#F04438',
    700: '#D92D20',
    800: '#B42318',
    900: '#912018'
  };

  const infoColor = {
    100: '#D4FFFB',
    200: '#AAFFFE',
    300: '#7FF5FF',
    400: '#60E8FF',
    500: '#2BD1FF',
    600: '#1FA4DB',
    700: '#157CB7',
    800: '#0D5993',
    900: '#08407A'
  };

  const secondaryColor = {
    100: '#FEFACB',
    200: '#FEF498',
    300: '#FDEC65',
    400: '#FCE33F',
    500: '#FBD600',
    600: '#D7A800',
    700: '#A56D00',
    800: '#7A4900',
    900: '#513000'
  };

  const successColor = {
    100: '#F5FDDD',
    200: '#F0FCD2',
    300: '#DDFAA7',
    400: '#C2F279',
    500: '#A5E656',
    600: '#7DD624',
    700: '#489A12',
    800: '#327C0B',
    900: '#236606'
  };

  const warningColor = {
    100: '#FEF0C7',
    200: '#FFF4D8',
    300: '#FEDF89',
    400: '#FEC84B',
    500: '#FDB022',
    600: '#F79009',
    700: '#DB842C',
    800: '#934813',
    900: '#7A330B'
  };

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
      dark: errorColor[800],
      light: errorColor[600],
      main: errorColor[700]
    },
    info: {
      contrastText: whiteColor,
      dark: infoColor[800],
      light: infoColor[600],
      main: infoColor[700]
    },
    primary: {
      contrastText: whiteColor,
      dark: primaryColor[800],
      light: primaryColor[600],
      main: primaryColor[700]
    },
    secondary: {
      contrastText: whiteColor,
      dark: secondaryColor[800],
      light: secondaryColor[600],
      main: secondaryColor[500]
    },
    success: {
      contrastText: whiteColor,
      dark: successColor[800],
      light: successColor[600],
      main: successColor[700]
    },
    warning: {
      contrastText: whiteColor,
      dark: warningColor[800],
      light: warningColor[600],
      main: warningColor[700]
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
      100: '#FFFFFF',
      200: '#F9FAFB',
      300: '#F2F4F7',
      400: '#EAECF0',
      500: '#D0D5DD',
      600: '#98A2B3',
      700: '#667085',
      800: '#475467',
      900: '#1D2939',
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
