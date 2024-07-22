import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Dashboard from './pages/Authenticated/Dashboard';
import Login from './pages/Unauthenticated/Login';
import ManageUser from './pages/Authenticated/User/ManageUser';
import ListUsers from './pages/Authenticated/User/ListUser';
import { globalStyles } from '../Styles/global';
import Header from './components/Header';
import DrawerMenu from './components/DrawerMenu';
import RouteGuard from './components/RouterGuard';
import Callback from './pages/Callback';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState('Início');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  globalStyles();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('userName');

    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Ou qualquer componente de carregamento que preferir
  }

  return (
    <Router>
      {isAuthenticated && (
        <>
          <Header pageTitle={pageTitle} toggleDrawer={toggleDrawer} onLogout={handleLogout} />
          <DrawerMenu open={drawerOpen} onClose={toggleDrawer} setPageTitle={setPageTitle} />
        </>
      )}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route
          path="/dashboard"
          element={
            <RouteGuard isAuthenticated={isAuthenticated}>
              <Dashboard />
            </RouteGuard>
          }
        />
        <Route
          path="/gerenciar-usuario"
          element={
            <RouteGuard isAuthenticated={isAuthenticated}>
              <ManageUser />
            </RouteGuard>
          }
        />
        <Route
          path="/listar-usuarios"
          element={
            <RouteGuard isAuthenticated={isAuthenticated}>
              <ListUsers />
            </RouteGuard>
          }
        />
 
    
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
      </Routes>
    </Router>
  );
};

export default App;
