import { Box, Button, TextField, styled } from "@mui/material";

// Usando o styled do Material-UI para estilizar componentes do Material-UI
export const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  borderRadius: '15px',
  width: '100%',
  maxWidth: '900px',


  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  backgroundColor: "#FFFFFF",
  position: 'relative', // Adicionado para posicionamento do LinearProgress
 
  transform: 'translateY(50px)',
  animation: 'fadeIn 0.5s forwards',
  '@keyframes fadeIn': {
    'to': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: '1rem',
    maxWidth: '90%',
  },

}));

export const LeftContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const RightContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  padding: '2rem',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: '1rem',
  },
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
  },
}));

export const HeaderContainer = styled(Box)({
  alignSelf: 'center',
  marginBottom: '20px',
});

export const ButtonContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  marginTop: '1rem',
  gap: '15px',
});

export const LoginButton = styled(Button)({
  width: '80%',
  '&:hover': {
    backgroundColor: '#388e3c',
  },
});

export const SSOButton = styled(Button)({
  marginLeft:'5px',
  
  borderRadius:'45px',
  
});

export const InputField = styled(TextField)({
  width: '80%',
});

export const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

export const Divider = styled(Box)(({ theme }) => ({
  width: '1px',
  height: '400px',
  backgroundColor: theme.palette.divider,
  margin: '0 2rem',
  border: 'none',
}));
