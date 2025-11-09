import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  type FC,
} from 'react';

type UserRole = 'USER';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarPath: string;
  about: string;
  phone: string;
  roles: UserRole[];
  likes: string[];
  favoritesPost: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  userLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
      fetchUserData(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserData = async (userToken: string) => {
    try {
      setUserLoading(true);
      const response = await fetch(
        'https://api.v2.react-learning.ru/users/me',
        { headers: { Authorization: `${userToken}` } },
      );

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error(
          'Ошибка при загрузке данных пользователя:',
          response.status,
        );
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
      localStorage.removeItem('authToken');
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
      setUserLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        'https://api.v2.react-learning.ru/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), password: password }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка авторизации');
      }

      const data = await response.json();

      if (!data.accessToken) throw new Error('Токен не получен от сервера');

      const userToken = data.accessToken;

      localStorage.setItem('authToken', userToken);
      setToken(userToken);

      await fetchUserData(userToken);
    } catch (error) {
      console.error('Ошибка входа:', error);
      localStorage.removeItem('authToken');
      setToken(null);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading,
    userLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};