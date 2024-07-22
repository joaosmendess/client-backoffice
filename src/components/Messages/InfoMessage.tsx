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

const InfoMessage = styled(MessageContainer, {
  backgroundColor: '#d1ecf1',
  color: '#0c5460',
});

const Info: React.FC<Props> = ({ message }) => (
  <InfoMessage>
    <Typography variant="body1">{message}</Typography>
  </InfoMessage>
);

export default Info;
