import api from './apiClient';
import { Company } from '../types';

/**
 * Obtém os dados da empresa pública.
 * @param {string} tag - Tag da empresa.
 * @returns {Promise<any>} - Dados da empresa.
 */
export const getPublicCompany = async (tag: string) => {
  const response = await api.get(`/public-company/${tag}`);
  return response.data;
};

interface CompanyResponse {
  current_page: number;
  data: Company[];
  last_page: number;
  total: number;
}

export const getCompany = async (page: number): Promise<CompanyResponse> => {
  const response = await api.get(`/companies?page=${page}`);
  return response.data;
};

/**
 * Obtém os dados de uma empresa pelo ID.
 * @param {number} id - ID da empresa.
 * @returns {Promise<Company>} - Dados da empresa.
 */
export const getCompanyById = async (id: number): Promise<Company> => {
  const response = await api.get(`/companies/${id}`);
  return response.data;
};

/**
 * Cria uma nova empresa.
 * @param {string} name - Nome da empresa.
 * @param {string} tag - Tag da empresa.
 * @param {string} cnpj - CNPJ da empresa.
 * @param {string} ssoName - Nome do SSO (opcional).
 * @param {string} clientId - ID do cliente (opcional).
 * @param {string} clientSecret - Segredo do cliente (opcional).
 * @param {string} tenantId - ID do inquilino (opcional).
 * @param {string} redirectUrl - URL de redirecionamento (opcional).
 * @returns {Promise<Company>} - Empresa criada.
 */
export const createCompany = async (
  name: string,
  tag: string,
  cnpj: string,
  ssoName?: string,
  clientId?: string,
  clientSecret?: string,
  tenantId?: string,
  redirectUrl?: string
): Promise<Company> => {
  const response = await api.post('/companies', {
    name,
    tag,
    cnpj,
    ssoName,
    clientId,
    clientSecret,
    tenantId,
    redirectUrl
  });
  return response.data;
};

/**
 * Atualiza os dados da empresa.
 * @param {number} id - ID da empresa.
 * @param {Partial<Company>} data - Dados a serem atualizados.
 * @returns {Promise<any>} - Resposta da API.
 */
export const updateCompany = async (
  id: number,
  data: Partial<Company>
): Promise<Company> => {
  const response = await api.put(`/companies/${id}`, data);
  return response.data;
};

/**
 * Deleta a empresa.
 * @param {number} id - ID da empresa.
 * @returns {Promise<any>} - Resposta da API.
 */
export const deleteCompany = async (id: number) => {
  const response = await api.delete(`/companies/${id}`);
  return response.data;
};
