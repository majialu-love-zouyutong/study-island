import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { followSystemTheme } from '@/utils';
import { router } from './router';
import 'reset-css';
import '@/index.scss';



// 跟随系统主题
followSystemTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
