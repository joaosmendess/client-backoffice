import React from 'react';
import { Box, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel, Typography, SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface HeaderTableProps {
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sortBy: string;
  handleSortChange: (event: SelectChangeEvent<string>) => void;
}

const HeaderTable: React.FC<HeaderTableProps> = ({ searchTerm, handleSearchChange, sortBy, handleSortChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2 }}>
      <Typography variant="h6" component="div" sx={{ mb: { xs: 2, sm: 0 } }}>
        Todos os usuários
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, width: '100%', maxWidth: { xs: '100%', sm: '30%' } }}>
        <TextField
          variant="outlined"
          type="search"
          id="search"

          placeholder="Procurar"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            backgroundColor: '#f5f5f5',
            borderRadius: '5px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
            mr: { xs: 0, sm: 2 },
            mb: { xs: 2, sm: 0 },
            width: { xs: '100%', sm: '300px' },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined" sx={{ width: { xs: '100%', sm: '150px' } }}>
          <InputLabel>Organizar por</InputLabel>
          <Select
            value={sortBy}
            onChange={handleSortChange}
            label="Organizar por"
            sx={{
              backgroundColor: '#f5f5f5',
              borderRadius: '5px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent',
                },
              },
            }}
          >
            <MenuItem value="newest">Novos</MenuItem>
            <MenuItem value="oldest">Antigos</MenuItem>
            <MenuItem value="name">Ordem alfabética</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default HeaderTable;
