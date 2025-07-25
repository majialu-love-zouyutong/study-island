import React, { useState } from 'react';
import { Layout, Nav, Avatar, Dropdown, Toast } from '@douyinfe/semi-ui';
import {
  IconHome,
  IconSetting,
  IconGridView,
  IconUser,
  IconOrderedList,
  IconWrench,
  IconSignal,
  IconVolume2,
} from '@douyinfe/semi-icons';
import { Logo, ThemeIcon } from '@/components';
import style from './index.module.scss';
import { APP_NAME } from '@/consts';
import beian from '@/assets/img/beian.png';
import { logout } from '@/utils';
import { Outlet, useNavigate } from 'react-router';

/**
 * 导航栏数据项
 */
const navigationItems = [
  { itemKey: 'home', text: '首页', icon: <IconHome size="large" /> },
  { itemKey: 'seat', text: '座位管理', icon: <IconGridView size="large" /> },
  { itemKey: 'user', text: '用户管理', icon: <IconUser size="large" /> },
  { itemKey: 'order', text: '订单管理', icon: <IconOrderedList size="large" /> },
  { itemKey: 'devices', text: '设备管理', icon: <IconWrench size="large" /> },
  { itemKey: 'data', text: '数据统计', icon: <IconSignal size="large" /> },
  { itemKey: 'setting', text: '系统设置', icon: <IconSetting size="large" /> },
  { itemKey: 'announcement', text: '公告管理', icon: <IconVolume2 size="large" /> },
];

export const HomePage: React.FC = () => {
  const { Header, Footer, Sider, Content } = Layout;
  // 是否折叠
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout()) {
      Toast.success('退出成功');
      navigate('/');
    }
  };
  return (
    <Layout className={style.layout}>
      <Sider className={style.sider}>
        <Nav
          className={style.nav}
          defaultSelectedKeys={[navigationItems[0].itemKey]}
          onCollapseChange={(isCollapsed) => setIsCollapsed(isCollapsed)}
          items={navigationItems}
          header={{
            logo: <Logo size={isCollapsed ? 40 : 100} />,
            text: <div className={style.text}>{APP_NAME}</div>,
          }}
          footer={{
            collapseButton: true,
          }}
        />
      </Sider>
      <Layout className={style['layout-content']}>
        <Header className={style.header}>
          <Nav
            mode="horizontal"
            footer={
              <div className={style['header-footer']}>
                <ThemeIcon className={style.item} size={32} />
                <Dropdown
                  position="bottomRight"
                  render={
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleLogout} key="logout">
                        退出登录
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  }
                >
                  <Avatar color="orange" size={'small'}>
                    Admin
                  </Avatar>
                </Dropdown>
              </div>
            }
          ></Nav>
        </Header>
        <Content className={style.content}>
          <Outlet />
        </Content>
        <Footer className={style.footer}>
          <span>©️2025 studyisland.xyz</span>
          <span>
            <img src={beian} className={style.beian} />
            <a
              className={style.a}
              href="https://beian.mps.gov.cn/#/query/webSearch?code=51019002007740"
              rel="noreferrer"
              target="_blank"
            >
              川公网安备51019002007740号
            </a>
          </span>
          <span>
            <a className={style.a} href="https://beian.miit.gov.cn/" target="_blank">
              晋ICP备2025055007号-1
            </a>
          </span>
        </Footer>
      </Layout>
    </Layout>
  );
};
