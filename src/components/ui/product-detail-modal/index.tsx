import { useState } from 'react';
import { Button, Modal, Form, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import '../global-table/style.css';
import { ProFormText } from '@ant-design/pro-components';
import {  ProductDetails } from '@store';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const { Dragger } = Upload;

function Index(props: any) {
  const {post_productDetail, put_productDetail} = ProductDetails();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [form] = Form.useForm();
  const {detail} = useParams()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (info: any) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      setFileList(info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    values.product_id = Number(detail)
    values.discount = +values.discount
    values.quantity = +values.quantity
    formData.append('colors', values.colors);
    formData.append('description', values.description);
    formData.append('descount', values.discount);
    formData.append('quantity', values.quantity);   
    formData.append('product_id', `${detail}`);
    if(props.title == 'Create Product Detail'){
      if (fileList.length > 0) {
        formData.append('files', fileList[0].originFileObj);
      } else {
        message.error('Please upload a file.');
        return;
      }
    }

    let response;
    if (props.title === 'Create Product Detail') {
      response = await post_productDetail(formData);
      if (response?.data?.statusCode === 201){
        toast.success('Product detail created successfully');
        props.getData();
      } 
    } else {
      response = await put_productDetail({formData: formData, id:props?.data?.id});
      console.log(response);
      if (response?.data?.statusCode === 200){
        toast.success('Product detail updated successfully');
        props.getData();
      }
    }

    setIsModalOpen(false);
    form.resetFields();
    setFileList([]);
  };

  return (
    <>
      <Button className='custom-button' onClick={showModal}>
        {props.title}
      </Button>
      <Modal title={props.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={onFinish}>
          {props?.data?.images ? '' : <Form.Item
            name="image"
            rules={[
              {
                required: true,
                message: 'Image is required',
              },
            ]}
          >
            <Dragger
              name="file"
              multiple={false}
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleChange}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
          </Form.Item>}
        
          <ProFormText
            initialValue={props?.data?.quantity || ''}
            hasFeedback
            name="quantity"
            placeholder="Please enter your quantity"
            rules={[
              {
                required: true,
                message: 'Brand name is required',
              },
            ]}
            fieldProps={{ type: 'number', min: 0 }}
          />
          <ProFormText
            initialValue={props?.data?.description || ''}
            hasFeedback
            name="description"
            placeholder="Please enter your Description"
            rules={[
              {
                required: true,
                message: 'Description is required',
              },
            ]}
          />

            <ProFormText
            initialValue={props?.data?.description || ''}
            hasFeedback
            name="colors"
            placeholder="Please enter your colors"
            rules={[
              {
                required: true,
                message: 'colors is required',
              },
            ]}
          />

            <ProFormText
            initialValue={props?.data?.discount || ''}
            hasFeedback
            name="discount"
            placeholder="Please enter your Discount"
            rules={[
              {
                required: true,
                message: 'Discount is required',
              },
            ]}
            fieldProps={{ type: 'number', min: 0 }}
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
