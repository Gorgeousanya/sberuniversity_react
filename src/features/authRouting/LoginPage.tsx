import { useState, type ChangeEvent, type FC, type FormEvent } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './useAuth';
import { Box, Button, TextField, Typography } from '@mui/material';

export const LoginPage: FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, token, isLoading: authLoading } = useAuth();

  if (token && !authLoading) return <Navigate to='/profile' replace />;

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    if (error) setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email.trim() || !formData.password) {
      setError('Все поля обязательны для заполнения');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Введите корректный email адрес');
      return;
    }

    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password);
    } catch (err: any) {
      console.error('Ошибка входа:', err);
      setError(
        err.message || 'Произошла ошибка при входе. Проверьте email и пароль.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: "column" }}>
      <h1>Вход в систему</h1>
        <TextField
            onChange={(e)=>handleChange("email", e.target.value)}
            value={formData.email}
            label="Почта"
            variant="outlined"
        />
        <TextField
            value={formData.password}
            onChange={(e)=>handleChange("password", e.target.value)}
            label="Пароль"
            variant="outlined"
        />
        
        {error && <Typography >{error}</Typography>}
        <Button
          onClick={handleSubmit}
          type='submit'
          disabled={isSubmitting}
        >
          Войти
        </Button>
    </Box>
  );
};