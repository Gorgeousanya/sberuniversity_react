import type { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicPage } from './PublicPage';
import { ProfilePage } from './ProfilePage';
import { LoginPage } from './LoginPage';

export const AppRouter: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/public' element={<PublicPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<ProfilePage />} />
          </Route>
          <Route path='/' element={<Navigate to='/public' replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};