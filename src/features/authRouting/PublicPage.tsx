import { useNavigate } from 'react-router';
import { useAuth } from './useAuth';
import type { FC } from 'react';
import { Box, Button } from '@mui/material';

export const PublicPage: FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: "column" }}>
      <h1>Публичная страница</h1>
        <h3 style={{ color: token ? 'green' : 'red' }}>
          {token ? 'Вы авторизованы' : 'Вы не авторизованы'}
        </h3>
        {token ? (
            <Button color="primary" onClick={() => navigate('/profile')}>
                Профиль
            </Button>
        ) : (
            <Button color="primary" onClick={() => navigate('/login')}>
                Войти
            </Button>
        )}
    </Box>
  );
};