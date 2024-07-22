import api from './apiClient';
import { Application } from '../types';

export const fetchApplications = async (): Promise<Application[]> => {
  const response = await api.get('/applications');
  return response.data;
};

export const getApplicationById = async (id: number): Promise<Application> => {
  const response = await api.get(`/applications/${id}`);
  return response.data;
};

export const createApplication = async (application: Application): Promise<Application> => {
  const response = await api.post('/applications', application);
  return response.data;
};

export const updateApplication = async (application: Application): Promise<Application> => {
  if (!application.id) {
    throw new Error("Application ID is required for update.");
  }

  const response = await api.put(`/applications/${application.id}`, application);
  return response.data;
};

export const DeleteApplication = async (id: number): Promise<void> => {
  await api.delete(`/applications/${id}`);
};
