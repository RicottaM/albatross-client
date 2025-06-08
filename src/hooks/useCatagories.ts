import { Category } from '@/models/Category';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useCategories = () => {
  const getCategories = async (): Promise<Category[]> => {
    const res = await fetch(`${BACKEND_URL}/categories`, {
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }

    return await res.json();
  };

  return { getCategories };
};
