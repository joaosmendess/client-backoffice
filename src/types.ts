export interface Permission {
  id: number;
  name: string;
  get: number;
  post: number;
  put: number;
  delete: number;
  modules_id: number;
  permissions_groups_id: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  userName: string;
  empresa_id?:number;

  status: string;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: number;
  name: string;
  applications_id: number;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  token: string;
  customerData: {
    name: string;
    username: string;
    empresa: string;
    permissions: Array<{
      application: {
        name: string;
        description: string;
        developUrl: string;
        homologUrl: string;
        productionUrl: string;
        tag: string;
      };
      modules: Array<{
        name: string;
        get: boolean;
        post: boolean;
        put: boolean;
        delete: boolean;
      }>;
    }>;
  };
}

export interface PermissionGroup {
  id: number;
  name: string;
  

  created_at: string;
  updated_at: string;
}

export interface PermissionGroupHasModule {
  id: number;
  name:string;
  modules_id: number;
  get: boolean;
  post: boolean;
  put: boolean;
  delete: boolean;
  permissions_groups_id: number;

 
  created_at: string;
  updated_at: string;
}

export interface UserHasPermission {
  id: number;
  permissions_groups_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: User;
  permissions_group: PermissionGroup;
}

export interface Application {
  id?:number;
  name: string;
  description: string;
  developUrl: string;
  homologUrl: string;
  productionUrl: string;
  empresa_id: number;
}

export interface BaseItem {
  id: number;
  name: string;
}

export interface Company {
 id:number;
 name:string;
 cnpj: string;
 created_at:string;
 clientId:string;
 clientSecret:string;
 tenantId:string;
 ssoNam:string;
}