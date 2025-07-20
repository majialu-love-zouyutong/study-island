import { LoginPage } from '@/views/login';
import { createBrowserRouter } from 'react-router';
import { protectedLoader } from './protected-loader';
import { HomePage } from '@/views/home';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/',
    loader: protectedLoader,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
]);
