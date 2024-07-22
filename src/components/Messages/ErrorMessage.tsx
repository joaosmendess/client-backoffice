import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@stitches/react';

interface Props {
  message: string;
}

const MessageContainer = styled('div', {
  padding: '1rem',
  borderRadius: '4px',
  margin: '1rem 0',
  display: 'flex',
  alignItems: 'center',
});

const ErrorMessage = styled(MessageContainer, {
  backgroundColor: '#f8d7da',
  color: '#721c24',
});

const Error: React.FC<Props> = ({ message }) => (
  <ErrorMessage>
    <Typography variant="body1">{message}</Typography>
  </ErrorMessage>
);

export default Error;
