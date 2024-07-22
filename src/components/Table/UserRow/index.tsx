import React from 'react';
import { TableRow, TableCell, Box, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { User } from '../../../types';

interface UserRowProps {
  user: User;
  handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>, username: string) => void;
  handleMenuClose: () => void;
  handleEditClick: (user: User) => void;
  
  anchorEl: null | HTMLElement;
  selectedUser: null | string;
}

const UserRow: React.FC<UserRowProps> = ({ user, handleMenuClick, handleMenuClose, handleEditClick, anchorEl, selectedUser }) => {
  return (
    <TableRow key={user.username}>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 1 }}>{user.name.charAt(0)}</Avatar>
          {user.name}
        </Box>
      </TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            marginRight: '8px',
            backgroundColor: user.status && user.status.toLowerCase() === 'ativo' ? 'green' : 'red',
          }} />
          {user.status}
        </Box>
      </TableCell>
      <TableCell>
        <IconButton onClick={(event) => handleMenuClick(event, user.username)}  id='menu-tabela'>
        
          <MoreVertIcon />
          
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl) && selectedUser === user.username}
          onClose={handleMenuClose}
         
        >
       
          <MenuItem onClick={() => handleEditClick(user)}  
          >Editar</MenuItem>
  
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
