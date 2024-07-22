import React, { useState, useEffect } from 'react';
import { Container, TextField, Box, CircularProgress, Button, Toolbar, List, ListItem, ListItemText, Pagination } from '@mui/material';
import { styled } from '@stitches/react';
import SearchIcon from '@mui/icons-material/Search';
import { getCompany } from '../../../services/auth';
import { Company } from '../../../types';

const ListContainer = styled(Container, {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh' // Define a altura para o contêiner
});

const ListBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxHeight: '60vh', // Define a altura máxima para a lista com overflow
  overflowY: 'auto'
});

const ListCompany: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, total, last_page } = await getCompany(page);
        setCompanies(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
        setTotalPages(last_page);
      } catch (error) {
        console.error('Erro ao buscar empresas', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Toolbar />
      <ListContainer maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0', justifyContent: 'center', width: '100%', flexDirection: 'column' }}>
          <TextField
            variant="outlined"
            placeholder="Pesquisar"
            sx={{ marginBottom: 2, width: '200px', maxWidth: '400px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <SearchIcon />
              ),
            }}
          />

          {loading ? (
            <CircularProgress />
          ) : (
            <ListBox>
              <List sx={{ width: '80%' }}>
                {filteredCompanies.map((company) => (
                  <ListItem key={company.id}>
                    <ListItemText primary={company.name} secondary={`CNPJ: ${company.cnpj}`} />
                  </ListItem>
                ))}
              </List>
            </ListBox>
          )}

          <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Exportar para CSV
          </Button>

          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            sx={{ marginTop: 2 }}
          />
        </Box>
      </ListContainer>
    </div>
  );
};

export default ListCompany;
