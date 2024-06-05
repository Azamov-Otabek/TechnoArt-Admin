import { useState } from 'react';
import { Button, Modal, Form } from 'antd';
import '../global-table/style.css';
import { ProFormText } from '@ant-design/pro-components';
import { CategoryStore } from '@store';
import { toast } from 'react-toastify';

function Index(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { create_category, put_category } = CategoryStore();

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
    if (props.title === 'Create category') {
      const response = await create_category(values);
      if (response?.data?.statusCode === 201){
        toast.success('Category created successfully');
        props.getData()
      }else
        toast.error('Category not found');
    }else{
      const payload ={
        id: props?.data?.id,
        data: values
      }
      const response = await put_category(payload)
      if (response?.data?.statusCode === 200){
        toast.success('Category updated successfully');
        props.getData()
        }else
        toast.error('Category not found');
    }
    setIsModalOpen(false);
    
  };

  return (
    <>
      <Button className='custom-button' onClick={showModal}>
        {props.title}
      </Button>
      <Modal title="Create Parent Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form onFinish={onFinish}>
          <ProFormText
            initialValue={props?.data?.name || ''}
            hasFeedback
            name="name"
            placeholder="Please enter your Category name"
            rules={[
              {
                required: true,
                message: 'Category name is required',
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
