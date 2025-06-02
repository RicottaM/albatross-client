import { UserPoint } from '@/models/UserPoint';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const usePoints = () => {
  const getUserPoints = async () => {
    const res = await fetch(`${BACKEND_URL}/points/user`, {
      credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch user points');
    }

    return data as UserPoint[];
  };

  return { getUserPoints };
};
