import api from './apiClient';
import { Module, PermissionGroupHasModule } from '../types';

export const getModules = async (): Promise<Module[]> => {
  const response = await api.get<Module[]>('/modules');
  return response.data;
};

export const createPermissionGroupHasModule = async (permissions: PermissionGroupHasModule) => {
  const response = await api.post('/permissions-groups-has-modules', permissions);
  return response.data;
};

export const updatePermissionGroupHasModule = async (permissions: PermissionGroupHasModule) => {
  const response = await api.put(`/permissions-groups-has-modules/${permissions.id}`, permissions);
  return response.data;
};
