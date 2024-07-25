import React from 'react';
import { Box, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface HeaderTableProps {
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sortOption: string;
  handleSortChange: (event: SelectChangeEvent<string>) => void;
}

const HeaderTable: React.FC<HeaderTableProps> = ({ searchTerm, handleSearchChange, sortOption, handleSortChange }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 2, padding: 2, }}>
      <TextField
        variant="outlined"
        placeholder="Procurar"
        sx={{ width: '100%', maxWidth: '400px' }}
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default HeaderTable;
