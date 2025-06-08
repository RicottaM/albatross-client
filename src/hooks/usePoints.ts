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

  const deletePoint = async (id: number) => {
    const res = await fetch(`${BACKEND_URL}/points/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Failed to delete point');
    }
  };

  const createPoint = async (name: string, lat: number, lng: number, categoryId: number) => {
    const res = await fetch(`${BACKEND_URL}/points`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, latitude: Number(lat.toFixed(4)), longitude: Number(lng.toFixed(4)), categoryId }),
    });

    if (!res.ok) {
      const text = await res.json();
      throw new Error(text.messages.join('\n') || 'Failed to create point');
    }

    const data = await res.json();

    return data;
  };

  return { getUserPoints, deletePoint, createPoint };
};
