import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme, Input,Tabs  } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Devices from '../../components/Devices';
import RDC from '../../components/RDC';
import AddUser from 'src/components/addUser';
import { data } from '../../mockData/data.js'
import faviconImg from '../../images/favicon1.png'
import './index.scss'
import Sider from 'antd/es/layout/Sider.js';
import { Content, Header } from 'antd/es/layout/layout.js';

const DataFormPage = () => {
    const prefixCls = 'dataform';
    const [collapsed, setCollapsed] = useState(false);
    const [tab, setTab]= useState('1');
    const { token: { colorBgContainer } } = theme.useToken();
    const { TabPane } = Tabs;
    const { Search } = Input;
    const memuItems = [
        {
          key: '1',
          label: 'DEVICES',
        },
        {
          key: '2',
          label: 'DC USERS',
        },
        {
          key: '3',
          label: 'CONFIGURATION LOGS',
        },
        {
          key: '4',
          label: 'DATA EXTRACTION LOGS',
        },
      ]
    const onSearch = () => {};    
    return <div className={`${prefixCls}`}>
        <div>
            <div className={`${prefixCls}-header`}>
                <img src="https://assets-global.website-files.com/64b673b845c2ac61520ae43c/64e4bcf443eb1f2f5c45daca_Inductosense-Logo-Rev.svg" 
                    loading="lazy" 
                    alt="Inductosense logo" 
                    className={`${prefixCls}-logo`}
                    />
                <div className='dataform-txt'>Device Manager</div>
            </div>
            <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{width:"220px"}}>
                <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={memuItems}
                onClick={(item: any)=>{return setTab(item.key),console.log(item, 'dayin')}}
                />
            </Sider>
            <Layout style={{marginTop:90}}>
                <Content 
                    style={{
                        margin: '24px 16px',
                        marginLeft: 210,
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                      }}
                >
                  { tab === '1' && <Tabs>
                      <TabPane tab="Remote Data Collectors" key="1">
                        <Devices></Devices>
                      </TabPane>
                      <TabPane tab="Data Collectors" key="2">
                        <RDC></RDC>
                      </TabPane>
                    </Tabs> 
                  }
                  { tab === '2' && <AddUser /> }
                  { tab === '3' && <div>{tab}</div> }
                  { tab === '4' && <div>{tab}</div> }
                </Content>
            </Layout>
          </Layout>
        </div>
    </div>
}

export default DataFormPage ;