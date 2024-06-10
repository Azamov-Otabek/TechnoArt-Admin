import { useState } from 'react';
import { Button, Modal, Form } from 'antd';
import '../global-table/style.css';
import { ProFormText } from '@ant-design/pro-components';
import { BrandCategory } from '@store';
import { toast } from 'react-toastify';

function Index(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { create_brandcategory, update_brandcategory } = BrandCategory();

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
    if (props.title === 'Create Brand category') {
        values.brand_id = props.parent_id
        const response = await create_brandcategory(values);
      if (response?.data?.statusCode === 201){
        toast.success('Brand Category created successfully');
        props.getData();
      }else
        toast.error('Brand Category not found');
    }else{

      values.brand_id = props?.parent_id
      values.id = props?.data?.id
      const response = await update_brandcategory(values);
      if (response?.data?.statusCode === 200){
        toast.success('Brand Category updated successfully');
        props.getData();
      }else
        toast.error('Brand Category not found');
    }
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button className='custom-button' onClick={showModal}>
        {props.title}
      </Button>
      <Modal title="Create Brand Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={onFinish}>
          <ProFormText
            initialValue={props?.data?.name || ''}
            hasFeedback
            name="name"
            placeholder="Please enter your Brand category name"
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
