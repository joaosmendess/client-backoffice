import React, { useState, useEffect } from 'react';
import { Container, TextField, Box, CircularProgress, Button, Toolbar } from '@mui/material';
import { styled } from '@stitches/react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';



const ListContainer = styled(Container, {
  marginTop: '20px',
});

const ModuleList: React.FC = () => {
  

  

  return (
    <div>
      <Toolbar/>
      <ListContainer maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
          <TextField
            variant="outlined"
            placeholder="Pesquisar"
            fullWidth
            

            InputProps={{
              endAdornment: (
                <SearchIcon />
              ),
            }}
          />
        </Box>
      
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Exportar para CSV
        </Button>
      </ListContainer>
   
    
    </div>
  );
};

export default ModuleList;
