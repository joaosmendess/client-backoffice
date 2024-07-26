import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress, Alert, useMediaQuery, useTheme, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../../../services/authService';
import LoginHeader from '../../../components/LoginHeader';

import animated from '../../../assets/análise de crescimento (1).mp4';
import background from '../../../assets/richard-horvath-cPccYbPrF-A-unsplash.jpg';

import {
  FormContainer,
  HeaderContainer,
  ButtonContainer,
  LoginButton,
  InputField,
  Form,
  ImageContainer,
  LeftContainer,
  RightContainer,
  Divider,
} from './styles';

const Login: React.FC = () => {
  const { hash } = useParams<{ hash: string }>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(username, password, hash!);
      if (response && response.token) {
        const hasAdminPermission = response.customerData.permissions.some(
          (perm: any) => perm.modules.some((mod: any) => mod.name === 'Administrador')
        );

        if (hasAdminPermission) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('customerData', JSON.stringify(response.customerData));
          window.location.href = '/dashboard';
        } else {
          setError('Você não tem permissão para acessar este sistema.');
        }
      } else {
        setError('Falha no login. Verifique suas credenciais.');
      }
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <FormContainer>
        {loading && <LinearProgress sx={{ width: '100%', position: 'absolute', top: 0 }} />}
        {!isMobile && !isTablet && (
          <LeftContainer>
            <ImageContainer>
              <video width="100%" height="auto" autoPlay loop muted>
                <source src={animated} type="video/mp4" />
                Seu navegador não suporta tag de vídeo
              </video>
            </ImageContainer>
          </LeftContainer>
        )}
        {!isMobile && !isTablet && <Divider />}
        <RightContainer>
          <HeaderContainer>
            <LoginHeader />
          </HeaderContainer>
          <Form onSubmit={handleLogin}>
            <InputField
              label="Usuário"
              id="input-username"
              variant="outlined"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              margin="normal"
            />
            <InputField
              label="Senha"
              id="input-password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <Alert severity="error" sx={{ marginBottom: '1rem', opacity: error ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
                {error}
              </Alert>
            )}
            <ButtonContainer>
              <LoginButton
                type="submit"
                id="button-login"
                variant="contained"
                color="primary"
                disabled={!username || !password || loading}
              >
                Entrar
              </LoginButton>
            </ButtonContainer>
          </Form>
        </RightContainer>
      </FormContainer>
    </Box>
  );
};

export default Login;
