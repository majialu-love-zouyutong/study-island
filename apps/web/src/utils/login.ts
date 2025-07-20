/**
 * 登录函数，返回是否登录成功的布尔值
 * @param username 用户名
 * @param password 密码
 * @returns 是否登录成功
 */
export const login = (username: string, password: string) => {
  if (username === 'admin' && password === '123456') {
    window.localStorage.setItem('token', 'token');
    return true;
  } else {
    return false;
  }
}

/**
 * 退出登录函数，返回是否退出登录成功的布尔值
 * @returns 是否退出登录成功
 */
export const logout = () => {
  window.localStorage.removeItem('token');
  return true;
}

/**
 * 判断当前是否登录
 * @returns 是否登录的布尔值
 */
export const isLogin = () => {
  const token = window.localStorage.getItem('token');
  return !!token;
}