import React, { useState, useEffect } from 'react';
import { TextField, Toolbar, Box } from '@mui/material';
import { getCompanyIdByTag } from '../../../services/companyService';
import { inviteUser } from '../../../services/inviteService';
import FormContainer from '../../../components/FormContainer';
import FormButton from '../../../components/FormButton';
import ErrorMessage from '../../../components/Messages/ErrorMessage';
import SuccessMessage from '../../../components/Messages/SuccessMessage';

const Invitation: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyId = async () => {
      try {
        const customerData = JSON.parse(localStorage.getItem('customerData') || '{}');
        const tagCompany: string = customerData.tagCompany;

        if (!tagCompany) {
          setError('Erro ao buscar empresa. Tag da empresa não encontrada.');
          return;
        }

        const companyId = await getCompanyIdByTag(tagCompany);
        setCompanyId(companyId);
      } catch (error) {
        setError('Erro ao buscar empresa');
      }
    };

    fetchCompanyId();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      if (companyId === null) {
        throw new Error('ID da empresa não encontrado.');
      }

      await inviteUser(email, companyId);
      setSuccessMessage('Convite enviado com sucesso!');
      setEmail('');
    } catch (error) {
      setError('Erro ao enviar convite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toolbar />
      <FormContainer>
        {error && <ErrorMessage message={error} />}
        {successMessage && <SuccessMessage message={successMessage} />}
        <form onSubmit={handleSubmit}>
          <Box 
            display="flex" 
            flexDirection="column" 
            width={{ xs: '100%', sm: '35rem' }}
            maxWidth="100%"
          >
            <TextField
              placeholder='E-mail para convite'
              id='input-invitation-email'
              variant='outlined'
              label='E-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
          </Box>
          <Box display="flex" justifyContent="center" width="100%">
            <FormButton 
              loading={loading} 
              type="submit" 
              disabled={loading || !email || companyId === null}
              id="button-invite"
            >
              Enviar Convite
            </FormButton>
          </Box>
        </form>
      </FormContainer>
    </div>
  );
};

export default Invitation;
