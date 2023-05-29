import { createTheme } from '@mui/material';

export const BORDER_RADIUS = {
  normal: 30,
  min: 15,
  _10: 10,
};

export const Theme = createTheme({
  palette: {
    background: {
      paper: '#B4EBFB',
      default: '#ecf1f4',
    },
    action: {
      active: '#fff',
    },
    primary: {
      main: '#D1D0FB',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS.normal,
          boxShadow: 'none',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            backgroundColor: '#D1D0FB',
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          transform: 'none',
          borderRadius: BORDER_RADIUS.normal,
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          border: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS._10,
          boxShadow: 'none',
          height: 40,
          textTransform: 'none',
          fontSize: 'inherit',
        },
      },
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.4rem',
    },
    h4: {
      fontSize: '1rem',
    },
    h5: {
      fontSize: '1.2rem',
    },
  },
});
