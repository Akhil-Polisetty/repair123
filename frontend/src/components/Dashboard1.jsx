import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import './dashing.css' 


import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  ToolOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import Profile from './Profile';
// import RaiseIssue from './RaiseIssue';
// import PredictPrize from './PredictPrize';
import RepairReq from './RepairReq';
import RaiseIssue1 from './RaiseIssue1';
import PredictPrize1 from './PredictPrize1';
import UpdateProfile from './UpdateProfile';
import Responses from './Responses';
import ActiveRepairs from './ActiveRepairs';

const { Header, Sider, Content } = Layout;
const Dashboard1 = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selTab,setselTab]=useState('1')
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:7000/auth/verify").then((res) => {
      if (res.data.status) {
      } else {
        navigate("/home");
      }
    });
  }, []);


  function handleLogout() {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:7000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/home");
        } else {
          console.error("error ");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/home");
  }
  const [users,setUser]=useState([])
  useEffect(()=>{
      axios.get('http://localhost:7000/getUsering')
      .then(users => setUser(users.data))
      .catch(err => console.log(err))
  },[])

  return (
    <Layout style={{height:"100%",backgroundColor:'transparent'}}
    >

      <Sider trigger={null} collapsible collapsed={collapsed}
      style={{
        // backgroundColor:'darkgoldenrod'
        backgroundColor:'#974edd'
      }}>
        <div className="demo-logo-vertical" />
        {/* <Menu

          theme="light"
          mode="inline"
          style={{backgroundColor:'#974edd'}}
          defaultSelectedKeys={['1']}
          onClick={(item)=>setselTab(item.key)}
          
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Profile',
            },
            {
              key: '2',
              icon: <ToolOutlined/>,
              label: 'Raise a Repair',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Predict Price',
            },
            {
              key: '4',
              icon: <UploadOutlined />,
              label: 'Update Profile',
            },
            {
              key: '5',
              icon: <UploadOutlined />,
              label: 'View Repair Requests',
            },
          ]}
        /> */}
        <Menu
  theme="light"
  mode="inline"
  style={{backgroundColor:'#974edd'}}
  defaultSelectedKeys={['1']}
  onClick={(item)=>setselTab(item.key)}
>
  {/* Profile */}
  <Menu.Item key="1" icon={<UserOutlined />}>
    Profile
  </Menu.Item>

  {/* Raise a Repair */}
  <Menu.Item key="2" icon={<ToolOutlined />}>
    Raise a Repair
  </Menu.Item>

  {/* Predict Price */}
  <Menu.Item key="3" icon={<UploadOutlined />}>
    Predict Price
  </Menu.Item>

  {/* Update Profile */}
  <Menu.Item key="4" icon={<UploadOutlined />}>
    Update Profile
  </Menu.Item>

  {/* View Repair Requests - Conditionally Rendered */}
  {users.tech_stat === 'yes' && (
    <Menu.Item key="5" icon={<UploadOutlined />}>
      View Repair Requests
    </Menu.Item>
  )}
  <Menu.Item key="6" icon={<UploadOutlined />}>
    View Responses
  </Menu.Item>
  <Menu.Item key="7" icon={<UploadOutlined />}>
    Active Repairs
  </Menu.Item>

</Menu>

      </Sider>
      <Layout style={{
        backgroundColor:'transparent'
      }}>
        <Header
          style={{
            padding: 0,
            background: 'transparent',
            display:'flex',
            justifyContent:'space-between'
          }}
        >
        <div style={{display:'flex',gap:'8px'}}>
           <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color:'white'
            }}
          />
          <div style={{color:'white'}}>
            Hello <span style={{fontWeight:'bold',fontSize:'22px',fontFamily:'serif'}}>{users.u_name}!</span>
          </div>
        </div>
         
          
    <div onClick={handleLogout}  className='logout_handle' style={{backgroundColor:'azure',padding:'0px 4px',border:'1px solid black',cursor:'pointer',fontSize:'large',fontWeight:'bold'}}>
        logout
      </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow:'auto',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            // background: colorBgContainer,
            backgroundColor:'transparent',
            borderRadius: borderRadiusLG,
            // backgroundColor:'transparent'
            // background:url("https://i.postimg.cc/dtMNrfdq/background.jpg")
            // backgroundColor:'lightcyan'
          }}
        >
         {
           selTab === '1' ? <Profile/>: (selTab === '2' ? <RaiseIssue1/> : (selTab ==='3' ? <PredictPrize1/> : (selTab === '4' ? <UpdateProfile/> : (selTab ==='5' ? <RepairReq/>:(selTab ==='6' ? <Responses/> : (selTab === '7' ? <ActiveRepairs/> : <></>))))))
         }  
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard1;