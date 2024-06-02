import { useState } from 'react';
import { Form, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  console.log(setEmail);
  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className='w-[500px] h-[429px] bg-white p-[25px]'>
      <h1 className='text-[30px] font-medium text-center mb-[30px]'>Reset Password</h1>
      <p className='font-medium mb-[10px]'>Enter your email address below and we'll send you an email with instructions.</p>
      <p className='mb-[25px]'><span className='font-bold'>Need Help?</span> Learn more about how to <span className='text-[blue]'>retrieve an existing account.</span></p>
      <Form onFinish={handleSubmit}>
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
        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ width: '100%', height: '50px', marginTop: '20px', background: '#00AD45', fontWeight: 700 }}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ForgotPassword;
