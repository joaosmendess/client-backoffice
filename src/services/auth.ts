import axios from "axios";
import {
  Permission,
  User,
  Module,
  LoginResponse,
  PermissionGroup,
  PermissionGroupHasModule,
  UserHasPermission,
  Application,
  Company,
} from "../types";





const api = axios.create({
  baseURL: 'http://10.1.1.151:8000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear(); // Remove todos os itens do localStorage
      window.location.href = '/'; // Redireciona para a página de login
    }
    return Promise.reject(error);
  }
);



export const login = async (
  username: string,
  password: string,
  tag:string,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", {
    username,
    password,
    tag
  });
  return response.data;
};

export const createUser = async (
  name: string,
  userName: string,
  invitationEmail: string,
  permissionsGroupsId: number
) => {
  const response = await api.post('/auth/register', {
    name,
    userName,
    invitationEmail,
    permissionsGroupsId,
  });
  return response.data;
};


export const getUsers = async (
  name?: string,
  userName?: string,
  status?:string,
): Promise<User[]> => {
  const response = await api.get("/users", {
    params: { name, userName, status },
  });
  return response.data;
};

export const updateUsers = async (
  id:number,
  name: string,
  userName: string,
  status:string,
): Promise<User> => {
  const response = await api.put(`/users/${id}`, {
    name, userName,status
  });
  return response.data;
};

export const getCompany = async (page: number): Promise<{ data: Company[]; total: number; last_page: number }> => {
  const response = await api.get(`/company?page=${page}`);
  return {
    data: response.data.data,
    total: response.data.total,
    last_page: response.data.last_page, 
    //sd
  };
};
// src/services/auth.ts
export const deleteUser = async (userId: number) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar usuário', error);
    throw error;
  }
};

export const createCompany = async (name: string, cnpj: string,  clientId:string, clientSecret:string, ssoName:string, tenantId:string): Promise<Company> => {
  const response = await api.post(`/company`, { name, cnpj, clientId,clientSecret, ssoName, tenantId });
  return response.data;
};

export const getPermissionGroups = async (): Promise<PermissionGroup[]> => {
  const response = await api.get("/permissions-groups");
  return response.data;
};

export const updateUserPermissionGroup = async (
  userId: number,
  permissionGroup: string
) => {
  const response = await api.put(`/users/${userId}/permissions`, {
    permissionGroup,
  });
  return response.data;
};

export const getModules = async (): Promise<Module[]> => {
  const response = await api.get("/modules");
  return response.data;
};

export const createPermissionGroup = async (group: { name: string }) => {
  const response = await api.post("/permissions-groups", group);
  return response.data;
};

export const updatePermissionGroup = async (
  id: string,
  permissions: Permission,
  name: string
) => {
  const response = await api.put(`/permissions-groups/${id}`, {
    name,
    permissions,
  });
  return response.data;
};

export const deletePermissionGroup = async (id: string) => {
  const response = await api.delete(`/permissions-groups/${id}`);
  return response.data;
};

export const createModule = async (name: string, empresa_id: number) => {
  const response = await api.post("/modules", { name, empresa_id });
  return response.data;
};

export const updateModule = async (
  id: string,
  name: string,
  empresa_id: number
) => {
  const response = await api.put(`/modules/${id}`, { name, empresa_id });
  return response.data;
};

export const deleteModule = async (id: string) => {
  const response = await api.delete(`/modules/${id}`);
  return response.data;
};

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await api.post(
      "/auth/verify",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// Ajustar para buscar dados específicos

export const getPermissionGroupsHasModule = async (
  groupId: number
): Promise<PermissionGroupHasModule> => {
  const response = await api.get<PermissionGroupHasModule>(
    `/permissions-groups-has-modules/${groupId}`
  );
  return response.data;
};

export const getUserHasPermissions = async (): Promise<
  UserHasPermission[]
> => {
  const response = await api.get("/user-has-permissions");
  return response.data;
};

export const createPermissionGroupHasModule = async (
  permissions: PermissionGroupHasModule
) => {
  const response = await api.post("/permissions-groups-has-modules", {
    get: permissions.get ,
    name: permissions.name,
    post: permissions.post ,
    put: permissions.put ,
    delete: permissions.delete ,
    modules_id: permissions.modules_id,
  });
  return response.data;
};
export const getPermissionGroupsHasModules = async (): Promise<PermissionGroupHasModule[]> => {
  const response = await api.get<PermissionGroupHasModule[]>("/permissions-groups-has-modules");
  return response.data;
};

export const deletePermissionGroupHasModule = async (id: number): Promise<void> => {
  await api.delete(`/permissions-groups-has-modules/${id}`);
};
export const updatePermissionGroupHasModule = async (
  permissions: PermissionGroupHasModule
) => {
  const response = await api.put(
    `/permissions-groups-has-modules/${permissions.id}`,
    {
      get: permissions.get ,
      post: permissions.post ,
      put: permissions.put ,
      delete: permissions.delete ,
      modules_id: permissions.modules_id,
     
    }
  );
  return response.data;
};

export const getApplications = async (): Promise<Application[]> => {
  const response = await api.get("/applications");
  return response.data;
};

export const createApplication = async (application: Application): Promise<Application> => {
  const response = await api.post('/applications', application);
  return response.data;
};

export const softDeleteApplication = async (id: number): Promise<void> => {
  await api.delete(`/applications/${id}`);
};

export const updateApplication = async (application: Application): Promise<Application> => {
  const response = await api.put(`/applications/${application.id}`, application);
  return response.data;
};


export default api;
