import { store } from '@/store';
import { setDark, toggleTheme } from '@/store/theme-slice';

/**
 * 跟随系统主题工具函数
 * 只需要在入口文件中调用一次即可
 */
export const followSystemTheme = () => {
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const applyTheme = (isDark: boolean) => {
    const body = document.body;
    if (isDark) {
      body.setAttribute('theme-mode', 'dark');
      store.dispatch(setDark(true));
    } else {
      body.removeAttribute('theme-mode');
      store.dispatch(setDark(false));
    }
  };

  // 页面初始化时设置
  applyTheme(mql.matches);

  // 监听变化时设置
  mql.addEventListener('change', (e) => applyTheme(e.matches));
};

/**
 * 切换主题工具函数
 */
export const switchTheme = () => {
  const body = document.body;
  if (body.hasAttribute('theme-mode')) {
    body.removeAttribute('theme-mode');
  } else {
    body.setAttribute('theme-mode', 'dark');
  }
  store.dispatch(toggleTheme());
};
