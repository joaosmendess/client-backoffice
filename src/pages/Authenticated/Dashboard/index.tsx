import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Toolbar, Typography, Link } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { getUsersByCompanyId } from '../../../services/userService';
import { getCompanyIdByHash } from '../../../services/companyService';
import { paperStyle, iconBoxStyle, iconBoxBlueStyle, containerStyle, footerStyle, flexGrowStyle } from './styles';
import DashboardCharts from '../../../components/DashboardCharts';

interface User {
  id: number;
  name: string;
  username: string;
  companyId?: number;
  status: string;
  created_at: string;
  updated_at: string;
}

const Dashboard: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [inactiveUsers, setInactiveUsers] = useState<number>(0);
  const [name, setName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [usersRegisteredPerDay, setUsersRegisteredPerDay] = useState<{ name: string, value: number }[]>([]);
  const [usersByStatus, setUsersByStatus] = useState<{ name: string, value: number }[]>([]);

  useEffect(() => {
    const customerData = localStorage.getItem('customerData');
    let hashCompany = null;
    if (customerData) {
      const parsedData = JSON.parse(customerData);
      hashCompany = parsedData.hashCompany; // Atualizado para usar hashCompany
      setName(parsedData.name);
      setUsername(parsedData.username);
    }

    const fetchData = async () => {
      if (hashCompany) {
        try {
          const companyId = await getCompanyIdByHash(hashCompany);
          const users = await getUsersByCompanyId(companyId);
          const activeUsersCount = users.filter((user: { status: string; }) => user.status === 'Ativo').length;
          const inactiveUsersCount = users.filter((user: { status: string; }) => user.status === 'Inativo').length;

          setTotalUsers(users.length);
          setActiveUsers(activeUsersCount);
          setInactiveUsers(inactiveUsersCount);

          // Processando dados de usuários cadastrados por dia
          const usersByDay = users.reduce((acc: { [key: string]: number }, user: User) => {
            const date = new Date(user.created_at);
            const dayOfWeek = date.toLocaleDateString('pt-BR', { weekday: 'short' });
            if (!acc[dayOfWeek]) acc[dayOfWeek] = 0;
            acc[dayOfWeek]++;
            return acc;
          }, {});

          const daysOfWeek = ['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.'];
          const usersRegisteredData = daysOfWeek.map(day => ({
            name: day,
            value: usersByDay[day] || 0
          }));

          setUsersRegisteredPerDay(usersRegisteredData);

          // Processando dados de usuários por status
          setUsersByStatus([
            { name: 'Ativos', value: activeUsersCount },
            { name: 'Inativos', value: inactiveUsersCount }
          ]);
        } catch (error) {
          console.error('Erro ao buscar dados da empresa ou usuários:', error);
        }
      } else {
        console.error('Hash da empresa não encontrado.');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Adiciona espaço para o AppBar */}
      <Toolbar />
      <Box
        sx={{
          backgroundColor: 'none',
          color: 'linear-gradient(to right, #202020, #3E3D45)',
          padding: 2,
          textAlign: 'center',
          marginBottom: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'bold',
            letterSpacing: 1.5,
            textShadow: ' rgba(0, 0, 0, 0.3)',
          }}
        >
          OFM Backoffice Cliente
        </Typography>
      </Box>
      <Container maxWidth="lg" sx={containerStyle}>
        <Grid container spacing={5}>
          {/* Card de Usuários Totais */}
          <Grid item xs={12} md={4} lg={5}>
            <Paper sx={paperStyle}>
              <Box sx={iconBoxStyle}>
                <PersonIcon sx={{ color: '#ffffff', fontSize: '2rem' }} />
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" color="textSecondary">
                  Total de Usuários
                </Typography>
                <Typography variant="h4" color="textPrimary">
                  {totalUsers}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  +3% em relação ao mês passado
                </Typography>
              </Box>
            </Paper>
          </Grid>
          {/* Card de Status dos Usuários */}
          <Grid item xs={12} md={4} lg={7}>
            <Paper sx={paperStyle}>
              <Box sx={iconBoxBlueStyle}>
                <AssessmentIcon sx={{ color: '#ffffff', fontSize: '2rem' }} />
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="h6" color="textSecondary">
                  Status dos Usuários
                </Typography>
                <Typography component="p" variant="h4" color="success.main">
                  Ativos: {activeUsers} 
                </Typography>
                <Typography component="p" variant="h4" color="error.main">
                  Inativos: {inactiveUsers} 
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <br />

        {/* Gráficos */}
        <Grid container spacing={0}>
          {/* Card com Nome e username */}
          <Grid item xs={12}>
            <Paper sx={{ ...paperStyle, justifyContent: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Usuário Logado
              </Typography>
              <Typography variant="h5" noWrap>
                Nome: {name}
              </Typography>
              <Typography variant="h5" noWrap>
                Usuário: {username}
              </Typography>
              <Box sx={flexGrowStyle} />
            </Paper>
          </Grid>
        </Grid>

        <Box sx={footerStyle}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://ofm.com.br/">
              Ofm System
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
