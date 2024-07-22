import { SxProps, Theme } from '@mui/material';

export const paperStyle: SxProps<Theme> = {
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: 3,
  borderRadius: 2,
  height: '20vh',
  position: 'relative',
  backgroundColor: '#ffffff',
};

export const iconBoxStyle: SxProps<Theme> = {
  position: 'absolute',
  top: -20,
  left: 16,
  bgcolor: '#FF4081',
  borderRadius: '8px',
  padding: '8px',
 
  boxShadow: 3,
  zIndex: 2,
};

export const iconBoxBlueStyle: SxProps<Theme> = {
  position: 'absolute',
  top: -25,
  left: 16,
  bgcolor: '#2196F3', // Cor azul
  borderRadius: '8px',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 3,
  zIndex: 1,
};

export const iconBoxGreenStyle: SxProps<Theme> = {
  position: 'absolute',
  top: -25,
  left: 16,
  bgcolor: '#4CAF50', // Cor verde
  borderRadius: '8px',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 3,
  zIndex: 2,
};

export const containerStyle: SxProps<Theme> = {
  mt: 5,
  mb: 4,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column',
 
 
  
};

export const footerStyle: SxProps<Theme> = {
  pt: 4,
};

export const flexGrowStyle: SxProps<Theme> = {
  flexGrow: 1,
};
