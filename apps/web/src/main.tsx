import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { followSystemTheme } from '@/utils';
import { router } from './router';
import 'reset-css';
import '@/index.scss';
import { Provider } from 'react-redux';
import { store } from './store';

// 跟随系统主题
followSystemTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
