import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const paperStyle = {
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: 3,
  borderRadius: 2,
  height: 300,
  position: 'relative',
  backgroundColor: '#ffffff',
  marginBottom: '20px',
};

interface DashboardChartsProps {
  usersRegisteredPerDay: { name: string, value: number }[];
  usersByStatus: { name: string, value: number }[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ usersRegisteredPerDay, usersByStatus }) => {
  const totalUsers = usersByStatus.reduce((acc, curr) => acc + curr.value, 0);
  const activeUsers = usersByStatus.find(status => status.name === 'Ativos')?.value || 0;
  const inactiveUsers = usersByStatus.find(status => status.name === 'Inativos')?.value || 0;

  const activePercentage = ((activeUsers / totalUsers) * 100).toFixed(1);
  const inactivePercentage = ((inactiveUsers / totalUsers) * 100).toFixed(1);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={7}>
        <Paper sx={paperStyle}>
          <Typography variant="h6" color="textSecondary">
            Usuários Cadastrados por Dia
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={usersRegisteredPerDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#FF4081" />
            </BarChart>
          </ResponsiveContainer>
          <Typography variant="body2" color="textSecondary">
            Total de usuários cadastrado por dia
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={5}>
        <Paper sx={paperStyle}>
          <Typography variant="h6" color="textSecondary">
            Usuários por Status
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={usersByStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                label
              >
                {usersByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name === 'Ativos' ? '#4CAF50' : '#FF0000'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <Typography variant="body2" color="textSecondary">
            Usuários ativos: {activePercentage}% | Usuários inativos: {inactivePercentage}%
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardCharts;
