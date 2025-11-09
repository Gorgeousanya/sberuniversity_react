import { type FC } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from './useAuth';
import { Box, Button } from '@mui/material';

export const ProfilePage: FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: "column" }}>
        <h1>Профиль пользователя</h1>   
        <h4>Имя пользователя: {user?.name}</h4>
        <Button onClick={() => navigate('/public')}>
            Public
        </Button>
        <Button onClick={handleLogout}>
            Выйти
        </Button>
    </Box>
  );
};