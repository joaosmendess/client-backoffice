import { useState, useEffect } from "react";
import {
  createPermissionGroupHasModule,
  getModules,
} from "../services/auth";
import { SelectChangeEvent } from "@mui/material";
import {
  Permission,
  Module,
  PermissionGroupHasModule,
} from "../types";

interface UsePermissionsParams {
  isEditMode?: boolean;
  setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const usePermissions = ({
  isEditMode = false,
  setIsEditMode,
}: UsePermissionsParams = {}) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [currentPermissions, setCurrentPermissions] = useState<Permission>({
    id: 0,
    name: "",
    get: 0,
    post: 0,
    put: 0,
    delete: 0,
    modules_id: 1,
    permissions_groups_id: 0,
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedModules = await getModules();
        setModules(fetchedModules);
      } catch (error) {
        setError("Erro ao carregar dados");
        console.error("Erro ao carregar dados", error);
      } finally {
        setInitialLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleTabChange = (
    _event: React.ChangeEvent<object>,
    newValue: number
  ) => {
    setTabValue(newValue);
  };

  const handleSaveGroupName = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess("Nome do grupo salvo com sucesso!");
    setTabValue(1);
  };

  const handleSavePermissions = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (groupName) {
        const newPermissionGroupHasModule: PermissionGroupHasModule = {
          modules_id: currentPermissions.modules_id,
          get: currentPermissions.get,
          post: currentPermissions.post,
          put: currentPermissions.put,
          delete: currentPermissions.delete,
          id: 0, // ID is generated on the backend
          created_at: "",
          updated_at: "",
          name: groupName,
          permissions_groups_id: 0, // Placeholder, update based on API response
        };
        await createPermissionGroupHasModule(newPermissionGroupHasModule);
        setSuccess("Permissões criadas com sucesso!");
        resetForm();
      }
    } catch (error) {
      console.error("Erro ao salvar permissões", error);
      setError("Erro ao salvar permissões");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setGroupName("");
    setCurrentPermissions({
      id: 0,
      name: "",
      get: 0,
      post: 0,
      put: 0,
      delete: 0,
      modules_id: 1,
      permissions_groups_id: 0,
      created_at: "",
      updated_at: "",
    });
    setSelectedGroup(null);
    setTabValue(0);
    if (setIsEditMode) {
      setIsEditMode(false);
    }
  };

  const handlePermissionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPermissions((prevPermissions) => ({
      ...prevPermissions,
      [event.target.name]: event.target.checked ? 1 : 0,
    }));
  };

  const handleModuleChange = (event: SelectChangeEvent<number | string>) => {
    const moduleId = event.target.value as number;
    setCurrentPermissions({
      ...currentPermissions,
      modules_id: moduleId,
    });
  };

  return {
    modules,
    initialLoading,
    loading,
    deleteLoading,
    error,
    success,
    tabValue,
    setTabValue,
    groupName,
    setGroupName,
    selectedGroup,
    setSelectedGroup,
    currentPermissions,
    setCurrentPermissions,
    handleTabChange,
    handleSaveGroupName,
    handleSavePermissions,
    handlePermissionChange,
    handleModuleChange,
    resetForm,
  };
};
