import { ProFormText } from '@ant-design/pro-components';
import { Form, Button } from 'antd';
import { MailOutlined, LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { RegisterInterface } from '@globalinter';
import { setCookies } from '../../../utils/cocies';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Auth } from '@store';
import { useNavigate } from 'react-router-dom';


function Register() {
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()
  const {Singup} = Auth()
  async function handleSubmit(data:RegisterInterface){
    setLoad(true)
    const response = await Singup(data)
    if(response?.status == 201){
      setTimeout(() => {
        toast.success('Singup successful', {autoClose: 1100})
        setTimeout(() => {
          setCookies('access_token', response?.data?.tokens?.access_token)
          setCookies('refresh_token', response?.data?.tokens?.refresh_token)
          setCookies('first_name', response?.data?.admin?.first_name)
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
        onFinish={(data) => handleSubmit(data)}
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
          loading={load}
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
