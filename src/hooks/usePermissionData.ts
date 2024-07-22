import { useState, useEffect } from "react";
import { fetchPermissionGroups } from "../services/auth";
import { PermissionGroup } from "../types";

export const usePermissionData = () => {
  const [permissions, setPermissions] = useState<PermissionGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const permissionData: PermissionGroup[] = await fetchPermissionGroups();
        setPermissions(permissionData);
      } catch (error) {
        setError("Erro ao buscar dados");
        console.error("Erro ao buscar dados", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { permissions, setPermissions, loading, error };
};
