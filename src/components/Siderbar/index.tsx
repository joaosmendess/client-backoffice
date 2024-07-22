import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Lock as LockIcon,
  PersonAdd as PersonAddIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
  toggleDrawer: () => void;
  setContent: (content: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleDrawer, setContent }) => {
  const items = [
    { text: 'Overview', icon: <DashboardIcon /> },
    { text: 'Customers', icon: <PeopleIcon /> },
    { text: 'Companies', icon: <BusinessIcon /> },
    { text: 'Account', icon: <AccountCircleIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
    { text: 'Login', icon: <LockIcon /> },
    { text: 'Register', icon: <PersonAddIcon /> },
    { text: 'Error', icon: <ErrorIcon /> },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer}>
      <List>
        {items.map((item, index) => (
          <ListItemButton key={index} onClick={() => { setContent(item.text); toggleDrawer(); }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
