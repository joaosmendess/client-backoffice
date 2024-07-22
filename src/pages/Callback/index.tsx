import  { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const tokenThresholdLength =` eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg5ODkvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MjA0NDIxMTksImV4cCI6MTcyMDQ0NTcxOSwibmJmIjoxNzIwNDQyMTE5LCJqdGkiOiJ3WFFhRmhEQkFUSlpxcXkzIiwic3ViIjoiMiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJuYW1lIjoiSm9hbyBNZW5kZXMiLCJ1c2VyTmFtZSI6ImpvYW8ubWVuZGVzIiwiZW1wcmVzYSI6IlRlY2ggSW5ub3ZhdG9ycyBTQSIsInBlcm1pc3Npb25zIjpbXX0.7Cv5sc3P0YU7W9XpOws3ljAiJHBmCjPs6HznL2vteUk`.length; // Defina o valor apropriado para o comprimento do token

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    console.log('Captured token:', token); // Log para depuração

    const decodeToken = (token:string) => {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
      }
    };  

    const handleTokenValidation = async (token: string) => {
      try {
        const response = await fetch('http://localhost:8989/api/auth/validate-jwt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          const data = await response.json();

          if (data && data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.customerData.name);
            localStorage.setItem('userName', data.customerData.userName);

            console.log('Token validado e armazenado:', data.token);
         window.location.href =`/dashboard`
          } else {
            console.error('Token não retornado na resposta:', data);
            navigate('/login', { replace: true });
          }
        } else {
          console.error('Erro HTTP ao validar token:', response.status);
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Erro ao validar token:', error);
        navigate('/login', { replace: true });
      }
    };

    if (token) {
      if (token.length > tokenThresholdLength) {
        handleTokenValidation(token);
      } else {
        const decodedToken = decodeToken(token);
        console.log('Decoded token:', decodedToken); // Log para depuração

        if (decodedToken && decodedToken.name && decodedToken.userName) {
          const { name, userName } = decodedToken;

          console.log('Token já validado, redirecionando para o dashboard');
          localStorage.setItem('token', token);
          localStorage.setItem('name', name);
          localStorage.setItem('userName', userName);

          window.location.href =`/dashboard`

        } else {
          console.error('Dados necessários não encontrados no token decodificado');
          navigate('/login', { replace: true });
        }
      }
    } else {
     console.log('oi');
     
    }
  }, [location.search, navigate]);

  return null; // Este componente não precisa renderizar nada
};

export default Callback;
