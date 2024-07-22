import api from './apiClient';
import { UserHasPermission } from '../types';

export const fetchUserHasPermissions = async (): Promise<UserHasPermission[]> => {
  const response = await api.get('/user-has-permissions');
  return response.data;
};
