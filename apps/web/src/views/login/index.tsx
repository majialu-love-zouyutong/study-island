import cover from '@/assets/img/cover.png';
import style from './index.module.scss';
import { Button, Checkbox, Form, Space, Toast, useFormState } from '@douyinfe/semi-ui';
import { Logo, ThemeIcon } from '@/components';
import { login } from '@/utils';
import { useDebouncedCallback } from '@/hooks';
import type React from 'react';
import { useNavigate } from 'react-router';
import { APP_NAME } from '@/consts';

/**
 * 登录按钮
 * 放在表单中获取表单元素的值
 * @returns 表单按钮ReactElement
 */
const LoginButton = () => {
  const formState = useFormState();
  const navigate = useNavigate();
  const { username, password } = formState.values;

  const handleLogin = useDebouncedCallback(
    () => {
      const status = login(username, password);
      if (status) {
        Toast.success('登录成功');
        navigate('/');
      }
    },
    2000,
    {
      leading: true,
      trailing: false,
    },
  );
  return (
    <Button block size="large" onClick={handleLogin} type="primary">
      登录
    </Button>
  );
};

/**
 * 登录标题
 */
const LOGIN_TITLE = `欢迎来到${APP_NAME}`;

/**
 * 登录页面
 * @returns 登录页面
 */
export const LoginPage: React.FC = () => {
  return (
    <div className={style.container}>
      <img src={cover} alt="封面图" className={style.cover} />
      <div className={style.login}>
        <ThemeIcon className={style.icon} size={40} />
        <Form
          initValues={{
            username: 'admin',
            password: '123456',
          }}
          className={style.form}
          onValueChange={(values) => console.log(values)}
        >
          <div className={style.logo}>
            <Logo size={100} />
          </div>
          <h1 className={style.title}>{LOGIN_TITLE}</h1>
          <Form.Input field="username" label="用户名" />
          <Form.Input field="password" label="密码" mode="password" />
          <Space className={style.space} align="start" vertical spacing={'loose'}>
            <Checkbox>记住密码</Checkbox>
            <LoginButton />
          </Space>
        </Form>
      </div>
    </div>
  );
};
