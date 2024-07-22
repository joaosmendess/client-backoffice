import api from './apiClient';
import { User, RegisterData } from '../types';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (name: string, userName: string, email: string, empresaId: number, password: string, data: RegisterData): Promise<User> => {
  const response = await api.post('/register', data);
  return response.data;
};

export const updateUser = async (id: number, name: string, username: string, status: string, data: User): Promise<User> => {
  const response = await api.put(`/users/${data.id}`, data);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
