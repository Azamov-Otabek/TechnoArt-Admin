import { ProFormText } from '@ant-design/pro-components';
import { Form, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Auth } from '@store';

function Index() {
  const {Login} = Auth()
  console.log(Login);
  return (
    <div className='w-[500px] h-[429px] bg-white p-[25px]'>
      <h1 className='text-[30px] font-medium text-center mb-[30px]'>LOGIN</h1>
      <Form
      onFinish={() => console.log(1)}>
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
