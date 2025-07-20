import { LoginPage } from '@/views/login';
import { createBrowserRouter } from 'react-router';
import { protectedLoader } from './protected-loader';
import { HomePage } from '@/views/home';
import { DashBoard } from '@/views/dash-board';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/',
    loader: protectedLoader,
    Component: HomePage,
    children: [
      {
        index: true,
        Component: DashBoard,
      },
      {
        path: '/dashboard',
        Component: DashBoard,
      },
    ],
  },
]);
