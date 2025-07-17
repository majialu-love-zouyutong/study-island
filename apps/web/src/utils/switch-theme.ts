export const switchTheme = () => {
  const body = document.body;
  if (body.hasAttribute('theme-mode')) {
    body.removeAttribute('theme-mode');
  } else {
    body.setAttribute('theme-mode', 'dark');
  }
};
