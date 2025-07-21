import React, { useState } from 'react';
import { Layout, Nav, Avatar, Dropdown, Toast } from '@douyinfe/semi-ui';
import { IconHome, IconHistogram, IconLive, IconSetting } from '@douyinfe/semi-icons';
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
  { itemKey: 'Home', text: '首页', icon: <IconHome size="large" /> },
  { itemKey: 'Histogram', text: '基础数据', icon: <IconHistogram size="large" /> },
  { itemKey: 'Live', text: '测试功能', icon: <IconLive size="large" /> },
  { itemKey: 'Setting', text: '设置', icon: <IconSetting size="large" /> },
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
