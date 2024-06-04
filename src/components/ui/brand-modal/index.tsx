import { useState } from 'react';
import { Button, Modal, Form } from 'antd';
import '../global-table/style.css';
import { ProFormText } from '@ant-design/pro-components';
import { BrandStore } from '@store';
import { toast } from 'react-toastify';

function Index(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { post_brand, put_brand } = BrandStore();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    values.position = 1;
    if (props.title === 'Create Brand') {
      const response = await post_brand(values);
      if (response?.data?.message === 'Created successfully')
        toast.success('Brand created successfully');
    } else {
      values.id = props?.data?.id
      const response = await put_brand(values);
      if (response?.data?.message === 'Updated successfully')
        toast.success('Brand updated successfully');
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className='custom-button' onClick={showModal}>
        {props.title}
      </Button>
      <Modal title="Create Brand" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form onFinish={onFinish}>
          <ProFormText
            initialValue={props?.data?.brand_name || ''}
            hasFeedback
            name="brand_name"
            placeholder="Please enter your Brand name"
            rules={[
              {
                required: true,
                message: 'Brand name is required',
              },
            ]}
          />
           <ProFormText
            initialValue={props?.data?.brand_description || ''}
            hasFeedback
            name="brand_description"
            placeholder="Please enter your Description"
            rules={[
              {
                required: true,
                message: 'Description is required',
              },
            ]}
          />
           <ProFormText
            initialValue={props?.data?.image || ''}
            hasFeedback
            name="image"
            placeholder="Please enter your Image URL"
            rules={[
              {
                required: true,
                message: 'Image URL is required',
              },
            ]}
          />
          <div className='flex justify-end'>
            <Button type="primary" className='custom-button' htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default Index;
