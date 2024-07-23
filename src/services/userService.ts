import api from './apiClient';
import { User, } from '../types';

export const createUser = async (name: string, username: string, permissionGroup: string) => {
  const response = await api.post('/users', { name, username, permissionGroup });
  return response.data;
};

export const fetchUsers = async (name?: string, username?: string): Promise<User[]> => {
  const response = await api.get('/users', { params: { name, username } });
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (data: User) => {
  const response = await api.put(`/users/${data.id}`, data);
  return response.data;
};

/**
 * Obtém todos os usuários de uma determinada empresa
 * @param {idCompany}
 * @returns {Promise<any>}
 */
export const getUsersByCompanyId = async (idCompany: number) => {
  const response = await api.get(`/companies/${idCompany}/users`);
  return response.data
}

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

/**
 * Obtém todos os usuários de uma determinada empresa pela tag
 * @param {tagCompany} string
 * @returns {Promise<any>}
 */
export const getUsersByCompanyTag = async (tagCompany: string): Promise<User[]> => {
  const response = await api.get(`/companies/tag/${tagCompany}/users`);
  return response.data;
};