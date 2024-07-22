import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePermissions } from '../../../hooks/usePermission';

import PermissionForm from '../../../components/PermissionForm';
import LoadingDialog from '../../../components/LoadingDialog';
import ErrorMessage from '../../../components/Messages/ErrorMessage';
import SuccessMessage from '../../../components/Messages/SuccessMessage';
import { Toolbar } from '@mui/material';

const EditPermission = () => {
  const { id } = useParams<{ id: string }>();

  const {
    permissionGroups,
    loading,
    initialLoading,
    setGroupName,
    setCurrentPermissions,
    setSelectedGroup,
    setTabValue,
    tabValue,
    groupName,
    currentPermissions,
    modules,
    error,
    success,
    handleTabChange,
    handleSaveGroupName,
    handleSavePermissions,
    handlePermissionChange,
    handleGroupChange,
    handleModuleChange,
    fetchPermissions
  } = usePermissions();

  const [isDataFetched, setIsDataFetched] = useState(false);
  const [saving, setSaving] = useState(false); // Estado local para salvar

  useEffect(() => {
    const fetchAndSetPermissions = async () => {
      const group = permissionGroups.find((p) => p.id === Number(id));
      if (group) {
        setSelectedGroup(Number(id));
        setGroupName(group.name);
        try {
          const permissions = await fetchPermissions(Number(id));
          setCurrentPermissions({
            id: group.id,
            name: group.name,
            get: permissions.get,
            post: permissions.post,
            put: permissions.put,
            delete: permissions.delete,
            modules_id: permissions.modules_id,
            permissions_groups_id: group.id,
            created_at: group.created_at,
            updated_at: group.updated_at
          });
          setTabValue(1); // Define a aba "Módulos" como a aba inicial
          setIsDataFetched(true); // Marcar os dados como carregados
        } catch (error) {
          console.error("Erro ao buscar permissões", error);
        }
      }
    };

    if (!isDataFetched) {
      fetchAndSetPermissions();
    }
  }, [id, permissionGroups, setGroupName, setCurrentPermissions, setSelectedGroup, setTabValue, fetchPermissions, isDataFetched]);

  // Função para gerenciar o salvamento
  const handleSavePermissionsWithLoading = async (e: React.FormEvent) => {
    setSaving(true);
    await handleSavePermissions(e);
    setSaving(false);
  };

  return (
    <>
     
      <Toolbar /> 

      {initialLoading || saving ? (
        <LoadingDialog open={initialLoading || saving} message={initialLoading ? "Carregando informações, por favor aguarde..." : "Salvando informações, por favor aguarde..."} />
      ) : (
        <>
          {error && <ErrorMessage message={error} />}
          {success && <SuccessMessage message={success} />}
          <PermissionForm
            tabValue={tabValue}
            handleTabChange={handleTabChange}
            groupName={groupName}
            setGroupName={setGroupName}
            selectedGroup={Number(id)}
            setSelectedGroup={setSelectedGroup}
            currentPermissions={currentPermissions}
            setCurrentPermissions={setCurrentPermissions}
            permissionGroups={permissionGroups}
            modules={modules}
            loading={loading}
            initialLoading={initialLoading}
            handleSaveGroupName={handleSaveGroupName}
            handleSavePermissions={handleSavePermissionsWithLoading} // Use a nova função
            handlePermissionChange={handlePermissionChange}
            handleGroupChange={handleGroupChange}
            handleModuleChange={handleModuleChange}
            error={error}
            success={success}
            isEditMode={true}
          />
        </>
      )}
    </>
  );
};

export default EditPermission;
