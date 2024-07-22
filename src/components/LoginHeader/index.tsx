import { styled } from '../../stitches.config';
import logo from '../../assets/back-office.webp';
import { Typography, } from '@mui/material';

const HeaderContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',


  flexDirection:'column'
});

const Logo = styled('img', {
  height: '50px',
  marginRight: '10px',
  marginBottom:'5px'
});

const Title = styled(Typography, {

  fontWeight: 'bold',
  color: '#333',

});

const LoginHeader = () => {
  return (
    <HeaderContainer>
      <Logo src={logo} alt="Logo" loading='lazy' />
      <Title variant='h5' >Client Backoffice</Title>
    </HeaderContainer>
  );
};

export default LoginHeader;
