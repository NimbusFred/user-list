import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

interface Props {
  component: JSX.Element;
}

/** Komponenta pro privátní routy a případné přesměrování nepřihlášeného uživatele */
export default function PrivateRoute({ component }: Props) {
  const { isAuthenticated } = useAuth();
  const Component = () => component;
  return isAuthenticated ? <Component /> : <Navigate to='/login' />;
}
