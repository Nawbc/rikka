import React, { FC, useState, useReducer } from 'react';
import { Menu, Drawer, Switch, Icon, notification } from 'antd';
import { NavLink } from 'react-router-dom';
import { Position } from './Position';
import { RIcon } from '@/components';
import { OtherDownloadOptions } from './OtherDownloadOptions';
import { localStore, initStore } from '@/utils';

const { SubMenu } = Menu;

interface MenuDrawerProps {
  onClose?: ((e: any) => void) | undefined;
}

const MenuDrawer: FC<MenuDrawerProps> = function(props) {
  const [display, setDisplay] = useState(false);
  const [downVisible, setDownVisible] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  return (
    <div>
      <div
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          zIndex: 999
        }}
        onClick={() => {
          setDisplay(true);
        }}
      >
        <RIcon className="clickDown" size={[20, 20]} src={require('../../assets/menu.svg')} />
      </div>
      <Drawer
        width={300}
        placement="left"
        closable={false}
        onClose={() => {
          setDisplay(false);
        }}
        visible={display}
      >
        <Menu
          style={{ width: '100%' }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          forceSubMenuRender
          mode="inline"
        >
          {/* 下载 */}
          <Menu.Item key="1">{<NavLink to="/setting/download">下载</NavLink>}</Menu.Item>
          {/* 关于 */}
          <Menu.Item key="2">关于</Menu.Item>
          {/* 播放源 */}
          {/*<SubMenu
            key="source"
            title={
              <span>
                <span>播放源</span>
              </span>
            }
          >
            <Menu.Item key="6">哈哩哈哩</Menu.Item>
          </SubMenu> */}
          {/*设置*/}
          <SubMenu
            key="setting"
            title={
              <span>
                <span>设置</span>
              </span>
            }
          >
            <Menu.Item
              key="3"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>启动页</span>
              <Switch
                size="small"
                onClick={() => {
                  forceUpdate(null);
                  localStore.set('setting.splash', !localStore.get('setting.splash'));
                }}
                checked={localStore.get('setting.splash')}
              />
            </Menu.Item>
            <SubMenu
              key="downloadSetting"
              title={
                <span>
                  <span>下载设置</span>
                </span>
              }
            >
              <Menu.Item key="4">
                <Position
                  optionTitle="保存路径"
                  title="设置下载位置"
                  setting={['setting', 'downloadPosition']}
                  icon={<Icon type="cloud-download" />}
                />
              </Menu.Item>
              <Menu.Item key="5">
                <OtherDownloadOptions
                  visible={downVisible}
                  onOpen={() => {
                    setDownVisible(true);
                  }}
                  onClose={() => {
                    setDownVisible(false);
                  }}
                />
              </Menu.Item>
            </SubMenu>
            <Menu.Item
              key="7"
              onClick={() => {
                localStore.clear();
                initStore();
                notification.open({
                  message: '',
                  description: '设置已重置'
                });
                forceUpdate(null);
              }}
            >
              重置
            </Menu.Item>
          </SubMenu>
        </Menu>
        <RIcon
          src={require('../../assets/rikkia.svg')}
          style={{
            width: '200px',
            height: '245px',
            bottom: '0px',
            left: '0px',
            position: 'absolute',
            zIndex: -1000
          }}
        />
      </Drawer>
    </div>
  );
};

export default MenuDrawer;