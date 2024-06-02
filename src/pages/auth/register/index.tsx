import { ProFormText } from '@ant-design/pro-components';
import { Form, Button } from 'antd';
import { MailOutlined, LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { RegisterInterface } from '@globalinter';



function Register() {
  const onFinish = (values:RegisterInterface) => {
    console.log('Received values:', values);
  };

  const validatePhoneNumber = (_:any, value:any) => {
    if (!value || value.startsWith('+998')) {
      return Promise.resolve();
    }
    return Promise.reject('Phone Number must start with +998');
  };

  return (
    <div className='w-[500px] h-[429px] bg-white p-[25px]'>
      <h1 className='text-[30px] font-medium text-center mb-[10px]'>REGISTER</h1>
      <Form
        onFinish={onFinish}
        initialValues={{
          remember: true,
        }}
      >
        <ProFormText
        hasFeedback
          name="first_name"
          placeholder="First Name"
          rules={[
            {
              required: true,
              message: 'First Name is required',
            },
          ]}
          fieldProps={{
            prefix: <UserOutlined style={{ fontSize: '16px', paddingRight: '8px' }} />,
          }}
        />
        <ProFormText
        hasFeedback
          name="last_name"
          placeholder="Last Name"
          rules={[
            {
              required: true,
              message: 'Last Name is required',
            },
          ]}
          fieldProps={{
            prefix: <UserOutlined style={{ fontSize: '16px', paddingRight: '8px' }} />,
          }}
        />
        <ProFormText
        hasFeedback
          name="phone_number"
          placeholder="Phone Number"
          rules={[
            {
              required: true,
              message: 'Phone Number is required',
            },
            {
              validator: validatePhoneNumber,
            },
          ]}
          fieldProps={{
            prefix: <PhoneOutlined style={{ fontSize: '16px', paddingRight: '8px' }} />,
          }}
        />
        <ProFormText
        hasFeedback
          name="email"
          placeholder="Email"
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
          }}
        />
        <ProFormText.Password
        hasFeedback
          name="password"
          placeholder="Password"
          rules={[
            {
              required: true,
              message: 'Password is required',
            },
            {
              min: 6,
              message: 'Password must be at least 6 characters',
            },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
              message: "Your password is very easy. Enter a strong password.",
              validateTrigger: 'onBlur',
            },
          ]}
          fieldProps={{
            prefix: <LockOutlined style={{ fontSize: '16px', paddingRight: '8px' }} />,
          }}
        />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%', height: '50px', background: '#00AD45', fontWeight: 700 }}
          >
            REGISTER
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
