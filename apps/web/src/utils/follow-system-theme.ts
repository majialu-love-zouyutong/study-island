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
    } else {
      body.removeAttribute('theme-mode');
    }
  };

  // 页面初始化时设置
  applyTheme(mql.matches);

  // 监听变化时设置
  mql.addEventListener('change', (e) => applyTheme(e.matches));
};
