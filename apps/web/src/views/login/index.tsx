import cover from '@/assets/img/cover.png';
import style from './index.module.scss';
import { Button, Form, Tooltip } from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';
import Option from '@douyinfe/semi-ui/lib/es/autoComplete/option';
import { switchTheme } from '@/utils/switch-theme';
export const LoginPage = () => {
  return (
    <div className={style.container}>
      <img src={cover} alt="封面图" className={style.cover} />
      <div className={style.login}>
        <Button onClick={switchTheme} type="primary">
          切换主题
        </Button>
        <Form className={style.form} onValueChange={(values) => console.log(values)}>
          <Form.Input field="UserName" label="用户名" style={{ width: 80 }} />
          <Form.Input
            field="Password"
            label={{
              text: '密码',
              extra: (
                <Tooltip content="详情">
                  <IconHelpCircle style={{ color: 'var(--semi-color-text-2)' }} />
                </Tooltip>
              ),
            }}
            style={{ width: 176 }}
          />
          <Form.Select field="Role" label={{ text: '角色', optional: true }} style={{ width: 176 }}>
            <Option value="admin">管理员</Option>
            <Option value="user">普通用户</Option>
            <Option value="guest">访客</Option>
          </Form.Select>
        </Form>
      </div>
    </div>
  );
};
