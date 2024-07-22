
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
  })

 const SuccessMessage = styled(MessageContainer, {
    backgroundColor: '#d4edda',
    color: '#155724',
  });

  

const Success: React.FC<Props> = ({ message }) => (
  <SuccessMessage>
    <Typography variant="body1">{message}</Typography>
  </SuccessMessage>
);

export default Success;
