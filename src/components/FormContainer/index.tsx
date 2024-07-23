import React from 'react';
import { Box } from '@mui/material';

interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return <Box className="form-container">{children}</Box>;
};

export default FormContainer;
