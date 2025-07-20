import { isLogin } from '@/utils';
import { redirect } from 'react-router';

export const protectedLoader = () => {
  if (!isLogin()) {
    return redirect('/login');
  } else {
    return null;
  }
};
