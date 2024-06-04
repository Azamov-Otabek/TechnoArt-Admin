import { ProFormText } from '@ant-design/pro-components';
import { Form, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { Auth } from '@store';
import { Login } from '../../../interface/Auth';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { setCookies } from '../../../utils/cocies';


function Index() {
  const navigate = useNavigate()
  const {Login} = Auth()
  const [load, setLoad] = useState(false)
  async function handleSubmit(data:Login){
    setLoad(true)
    const response = await Login(data)
    if(response?.status == 201){
      setTimeout(() => {
        toast.success('Login successful', {autoClose: 1100})
        setTimeout(() => {
          setCookies('access_token', response?.data?.tokens?.access_token)
          setCookies('refresh_token', response?.data?.tokens?.refresh_token)
          setCookies('first_name', response?.data?.admin?.first_name)
          setCookies('id', response?.data?.admin?.id)
          navigate('/dashboard')
        }, 1400);
      }, 2000);

    }else{
      setTimeout(() => {
        toast.error('Something went wrong')
        setLoad(false)
      }, 2000);
    }
  }
  return (
    <div className='w-[500px] h-[429px] bg-white p-[25px]'>
      <h1 className='text-[30px] font-medium text-center mb-[30px]'>LOGIN</h1>
      <Form
      onFinish={(value) => handleSubmit(value)}>
        <ProFormText
        hasFeedback
          name="email"
          placeholder="Please enter your email"
          rules={[
            {
              required: true,
              message: 'Email is required',
            },
            {
              type: 'email',
              message: 'Please enter a valid email',
            },
          ]}
          fieldProps={{
            prefix: <MailOutlined style={{ fontSize: '16px', paddingRight: '8px' }} />,
            style: { width: '100%', height: '50px' }
          }}
        />
        <ProFormText.Password
          hasFeedback
          name="password"
          placeholder="Please enter your password"
          rules={[
            {
              required: true,
              message: 'Password is required',
            },
            {
              min: 6,
              message: 'Password must be at least 6 characters',
            },
          ]}
          fieldProps={{
            prefix: <LockOutlined style={{ fontSize: '16px', paddingRight: '8px' }} />,
            style: { width: '100%', height: '50px' }
          }}
        />
        <Form.Item>
          <Button
           loading={load}
            type="primary"
            htmlType="submit"
            style={{ width: '100%', height: '50px', marginTop: '20px',background: '#00AD45', fontWeight: 700 }}
          >
            LOGIN
          </Button>
        </Form.Item>
        <div className="text-center mt-[10px]">
          <NavLink to="/forgot-password" className="text-[#757474] hover:text-[#757474]">
            Forgot password?
          </NavLink>
        </div>
      </Form>
    </div>
  );
}

export default Index;
