import React, { useState } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { NavigationBreadcrumb } from './NavigationBreadcrumb';

interface AdminPageProps {
  onBack: () => void;
}

/**
 * Main admin page component that handles login and dashboard
 */
export const AdminPage: React.FC<AdminPageProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const handleLogin = (password: string) => {
    setAdminPassword(password);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminPassword('');
  };

  if (isAuthenticated) {
    return (
      <div>
        <NavigationBreadcrumb
          items={[
            { label: 'لوحة تحكم المشرف' }
          ]}
          onBackToHome={onBack}
        />
        <AdminDashboard
          onLogout={handleLogout}
          onBack={onBack}
        />
      </div>
    );
  }

  return (
    <div>
      <NavigationBreadcrumb
        items={[
          { label: 'تسجيل دخول المشرف' }
        ]}
        onBackToHome={onBack}
      />
      <AdminLogin
        onLogin={handleLogin}
        onBack={onBack}
      />
    </div>
  );
};
