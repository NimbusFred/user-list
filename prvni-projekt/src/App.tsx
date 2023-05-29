import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';
import AuthProvider from './context/AuthProvider';
import { routes } from './utils/routes';
import ModeProvider from './context/ThemeProvider';

function App() {
  return (
    <ModeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.restricted ? (
                    <PrivateRoute component={<route.component />} />
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ModeProvider>
  );
}

export default App;
