// Auth related types
export interface LoginResponse {
  token: string;
  customerData: UserCustomerData;
}

export interface UserCustomerData {
  name: string;
  username: string;
  company: string;
  companyId: number;
  tagCompany:string;
  permissions: UserPermission[];
}

export interface UserPermission {
  application: ApplicationDetails;
  modules: ModulePermission[];
}

export interface ApplicationDetails {
  name: string;
  description: string;
  developUrl: string;
  homologUrl: string;
  productionUrl: string;
}

export interface ModulePermission {
  name: string;
  get: boolean;
  post: boolean;
  put: boolean;
  delete: boolean;
}

// User related types
export interface User {
  id: number;
  name: string;
  username:string;
  user: UserInfo;
  status: string;
  
  invitationEmail: string;
  password: string;
  companyId: number;

created_at: string

}

export interface UserInfo {
  name: string;
  username: string;
  status: string;
}

export interface GetUserResponse {
  message: string;
  username: string;
  name: string;
  company: CompanyDetails;
}

// Company related types
export interface Company {
  tag: string;
  id: number;
  name: string;
  cnpj: string;
  ssoName: string | null;
  clientId: string | null;
  clientSecret: string | null;
  tenantId: string | null;
  created_at: string;
  updated_at: string;
  redirectUrl:string
}

export interface CompanyDetails {
  name: string;
  cnpj: string;
  ssoName: string;
  clientId: string;
  clientSecret: string;
  tenantId: string;
  redirectUrl: string;
}

// Permission related types
export interface Permission {
  id: number;
  name: string;
  get: number;
  post: number;
  put: number;
  delete: number;
  modulesId: number;
  permissionsGroupsId: number;
  created_at: string;
  updated_at: string;
}

export interface PermissionGroup {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PermissionGroupHasModule {
  name: string;
  id: number;
  get: number;
  post: number;
  put: number;
  delete: number;
  modulesId: number;
 permissionsGroupsId: number;
  created_at: string;
  updated_at: string;
}

export interface UserHasPermission {
  id: number;
 permissionsGroupsId: number;
  userId: number;
  created_at: string;
  updated_at: string;
  user: User;
  permissions_group: PermissionGroup;
}

// Module related types
export interface Module {
  id: number;
  name: string;
  applicationsId: number;
  created_at: string;
  updated_at: string;
}

// Application related types
export interface Application {
  id?: number; // Tornar opcional, pois não é necessário para criação
  name: string;
  description: string;
  developUrl: string;
  homologUrl: string;
  productionUrl: string;
  companyId: number;
  logo: string;
}
export interface RegisterData {
  name: string;
  username: string;
  invitationEmail: string;
  password: string;
  companyId: number;
  status:string;
}