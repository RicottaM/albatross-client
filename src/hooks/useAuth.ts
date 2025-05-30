import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext/UserContext';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useAuth = () => {
  const { setLogin } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const extractMessage = (data: any): string => {
    if (Array.isArray(data?.messages)) {
      return data.messages.join('\n');
    }
    return data?.message || 'Unexpected error';
  };

  const login = async (login: string, password: string): Promise<{ success: boolean; message?: string }> => {
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: extractMessage(data) };
      }

      await checkUser();
      navigate('/home');
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message || 'Login error' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (login: string, password: string): Promise<{ success: boolean; message?: string }> => {
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: extractMessage(data) };
      }

      await checkUser();
      navigate('/home');
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message || 'Registration error' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${BACKEND_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLogin(null);
      navigate('/');
    }
  };

  const checkUser = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/auth/current`, {
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Sign in for full experience.');

      const data = await res.json();
      console.log(`User data:`, data);
      setLogin(data.login);
    } catch (error: any) {
      setLogin(null);
      navigate('/', {
        state: {
          alert: {
            title: 'Access denied',
            message: error.message,
          },
        },
      });
    }
  };

  return {
    login,
    register,
    logout,
    checkUser,
    loading,
  };
};
