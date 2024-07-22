import api from './apiClient';
import { PermissionGroupHasModule } from '../types';

export const fetchPermissionGroupsHasModule = async (groupId: number): Promise<PermissionGroupHasModule> => {
  const response = await api.get<PermissionGroupHasModule>(`/permissions-groups-has-modules/${groupId}`);
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
