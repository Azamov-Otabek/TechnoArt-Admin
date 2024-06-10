import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, theme, Avatar, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { getCookies, removeCookies } from '../utils/cocies';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { root } from '../router/root';
import './style.css'

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const items: MenuProps['items'] = [
    {
      label: 'My account',
      key: '0',
      onClick: () => {
        navigate('/dashboard/settings')
      }
    },
    {
      type: 'divider',
    },
    {
      label: 'Log Out',
      key: '1',
      onClick: () => {
        logout()
      },
    },
  ];

  function logout(){
    removeCookies('access_token')
    removeCookies('refresh_token')
    removeCookies('first_name')
    navigate('/')
  }
  return (
    <Layout className='w-full h-screen'>
      <Sider
        style={{ background: '#0A6847'}}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <div className='mt-[20px]'>
          {
            root?.map((item, i) => {
              return (
                <NavLink key={i} to={item.path} className={'no-hover'}>
                  <div className={`${pathname == item.path ? 'bg-[#F3CA52] text-[#0A6847] font-bold' : 'text-white'} items-center duration-300 mb-[10px] p-[10px] text-[20px] flex gap-[10px]`}>
                    <p className='text-[30px]'>{item.icon}</p>
                    <p>{item.title}</p>
                  </div>
                </NavLink>

              );
            })
          }
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, height: 80, background: colorBgContainer }} >
          <div className='flex justify-between mr-[40px] items-center gap-[6px]'>
            <img className='w-[120px] h-[70px] ml-[30px] mt-[8px]' src="https://dcassetcdn.com/design_img/279953/26841/26841_2586182_279953_image.png" alt="" />
            <Dropdown menu={{ items }} trigger={['click']}>
              <Space>
                <div className='flex gap-[6px] items-center mt-[10px] cursor-pointer'>
                  <Avatar size={50} icon={<UserOutlined />} />
                  <p className='text-[19px] font-medium'>{getCookies('first_name')}</p>
                </div>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              height: '100%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
