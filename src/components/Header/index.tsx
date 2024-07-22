import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Typography, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-white.png';



interface HeaderProps {
  pageTitle: string;
  toggleDrawer: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ pageTitle, toggleDrawer, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundImage: 'linear-gradient(to right, #202020, #3E3D45)',
        color: '#ffffff',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="SSO" style={{ height: 40 }} />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            {pageTitle}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton 
          color="inherit" 
          id='menu-profile'
          onClick={handleMenuOpen}>
            <Avatar src="/path-to-avatar.jpg" />
          </IconButton>
          <Menu 
          anchorEl={anchorEl}
          id='menu-logout'
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}>
            <MenuItem
            onClick={handleLogout}
              
            >
            
              Sair
              </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
