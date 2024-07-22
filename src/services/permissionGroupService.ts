import api from './apiClient';
import { PermissionGroup, Permission } from '../types';

export const fetchPermissionGroups = async (): Promise<PermissionGroup[]> => {
  const response = await api.get('/permissions-groups');
  return response.data;
};

export const createPermissionGroup = async (group: { name: string }) => {
  const response = await api.post('/permissions-groups', group);
  return response.data;
};

export const updatePermissionGroup = async (id: string, permissions: Permission, name: string) => {
  const response = await api.put(`/permissions-groups/${id}`, { name, permissions });
  return response.data;
};

export const deletePermissionGroup = async (id: string) => {
  const response = await api.delete(`/permissions-groups/${id}`);
  return response.data;
};
