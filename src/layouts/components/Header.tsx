import React from 'react';
import { useNavigate } from 'react-router';

import { useAuth } from '@/providers/auth-provider';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();
  return (
    <header id="header">
      <h1>{title}</h1>
      {isAuthenticated && (
        <button onClick={() => signOut(() => navigate('/login'))}>Sign out</button>
      )}
    </header>
  );
};
