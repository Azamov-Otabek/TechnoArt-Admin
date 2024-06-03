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
    values.position = null;
    if (props.title === 'Create category') {
      values.parent_category_id = props?.data || null;
      console.log(values);
      const response = await create_category(values);
      if (response?.data?.message === 'Created successfully')
        toast.success('Category created successfully');
      else
        toast.error('Category not found');
    }else{
      values.parent_category_id = typeof(props?.data) == 'string' ? props?.data : props?.data?.parent_category_id; 
      console.log(values);
      values.id = props?.data?.id
      const response = await put_category(values)
      if (response?.data?.message === 'Updated successfully')
        toast.success('Category updated successfully');
      else
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
            initialValue={props?.data?.category_name || ''}
            hasFeedback
            name="category_name"
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
