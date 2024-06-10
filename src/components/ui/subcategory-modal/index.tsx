import { useState } from 'react';
import { Button, Modal, Form } from 'antd';
import '../global-table/style.css';
import { ProFormText } from '@ant-design/pro-components';
import { SubCategory } from '@store';
import { toast } from 'react-toastify';

function Index(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { create_subcategory, update_subcategory } = SubCategory();

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
        values.parent_category_id = props.parent_id
        const response = await create_subcategory(values);
      if (response?.data?.statusCode === 201){
        toast.success('SubCategory created successfully');
        props.getData();
      }else
        toast.error('Category not found');
    }else{

      values.parent_category_id = props?.parent_id
      values.id = props?.data?.id
      const response = await update_subcategory(values);
      if (response?.data?.statusCode === 200){
        toast.success('SubCategory updated successfully');
        props.getData();
      }else
        toast.error('Category not found');
    }
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button className='custom-button' onClick={showModal}>
        {props.title}
      </Button>
      <Modal title="Create Parent Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={onFinish}>
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
