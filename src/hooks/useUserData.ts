// src/hooks/useUserData.ts
import { useState, useEffect } from 'react';
import { fetchUsers } from '../services/auth';
import { User } from '../types';

export const useUserData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchUsers();
        const usersWithStatus = usersData.map((user: User) => ({
          ...user,
          status: user.status || 'ativo',
        }));
        setUsers(usersWithStatus);
      } catch (error) {
        setError('Erro ao buscar dados');
        console.error('Erro ao buscar dados', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { users, loading, error };
};
