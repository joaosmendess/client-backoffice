// src/hooks/useModuleData.ts
import { useState, useEffect } from 'react';
import { fetchModules } from '../services/auth';
import { Module } from '../types';

export const useModuleData = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moduleData = await fetchModules();
        setModules(moduleData);
      } catch (error) {
        setError('Erro ao buscar dados');
        console.error('Erro ao buscar dados', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { modules, loading, error };
};
