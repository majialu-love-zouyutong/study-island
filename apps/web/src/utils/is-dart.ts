/**
 * 判断是否是暗黑模式
 * @returns 布尔值，true为暗黑模式，false为亮色模式
 */
export const isDark = (): boolean => {
  return document.body.getAttribute('theme-mode') === 'dark';
};