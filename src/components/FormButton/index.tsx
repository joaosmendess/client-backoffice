import React from 'react';
import { Box, Button, CircularProgress, SxProps } from '@mui/material';

interface StyledButtonProps {
  loading: boolean;
  children: React.ReactNode;
  onClick?: (event: React.FormEvent) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  id?: string; // Adicionando a propriedade id
  sx?: SxProps;
}

const buttonStyles: SxProps = {
  textTransform: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'end',
  minHeight: '40px',
  minWidth: '100px',
};

const StyledButton: React.FC<StyledButtonProps> = ({ loading, children, onClick, disabled = false, type = "button", id, sx = {} }) => {
  return (
    <Box sx={{width:'100%', display:'flex', alignItems:'end', justifyContent:'right'}} >

    <Button
    className='form-button'
    variant="contained"
    color="primary"
    onClick={onClick}
    disabled={disabled || loading}
    type={type}
    id={id} // Usando a propriedade id aqui
    sx={{ ...buttonStyles, ...sx }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
      </Box>
  );
};

export default StyledButton;
