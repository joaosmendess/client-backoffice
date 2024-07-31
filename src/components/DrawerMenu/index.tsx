import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItemText, ListItemIcon, ListItemButton, Collapse } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MailOutlineIcon from '@mui/icons-material/MailOutline'; // Ícone de convite

const DrawerMenu: React.FC<{ open: boolean; onClose: () => void; setPageTitle: (title: string) => void }> = ({ open, onClose, setPageTitle }) => {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleUserMenuClick = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleNavigation = (path: string, title: string) => {
    navigate(path);
    setPageTitle(title);
    localStorage.setItem('pageTitle', title); // Salva o título no localStorage
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListItemButton id="dashboard-menu" onClick={() => handleNavigation('/dashboard', 'Início')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Início" />
        </ListItemButton>
        
        <ListItemButton id="menu-user" onClick={handleUserMenuClick}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Usuário" />
          {userMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={userMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton id="-menu-manage-user" onClick={() => handleNavigation('/gerenciar-usuario', 'Gerenciar Usuário')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Gerenciar usuário" />
            </ListItemButton>
            <ListItemButton id="menu-list-users" onClick={() => handleNavigation('/listar-usuarios', 'Listar usuários')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Listar usuários" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton id="menu-invite" onClick={() => handleNavigation('/convidar-usuario', 'Convite de usuario')}>
          <ListItemIcon>
            <MailOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Convidar usuário" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
