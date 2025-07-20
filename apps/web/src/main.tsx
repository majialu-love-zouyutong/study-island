import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { LoginPage } from '@/views/login';
import 'reset-css';
import '@/index.scss';
import { followSystemTheme } from '@/utils';

const router = createBrowserRouter([
  {
    path: '/',
    Component: LoginPage,
  },
]);

// 跟随系统主题
followSystemTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
