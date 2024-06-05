import { useState } from 'react';
import { Button, Modal, Form, TreeSelect, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import '../global-table/style.css';
import { ProFormText } from '@ant-design/pro-components';
import { BrandStore, CategoryStore } from '@store';
import { toast } from 'react-toastify';

const { Dragger } = Upload;

function Index(props: any) {
  const { data_category } = CategoryStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { post_brand, put_brand } = BrandStore();
  const [fileList, setFileList] = useState<any[]>([]);

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
    formData.append('name', values.brand_name);
    formData.append('description', values.brand_description);
    props?.data?.id ?  formData.append('categoryId', values.category) : formData.append('category_id', values.category);
    if (fileList.length > 0) {
      formData.append('file', fileList[0].originFileObj);
    } else {
      message.error('Please upload a file.');
    }

    let response;
    if (props.title === 'Create Brand') {
      response = await post_brand(formData);
      if (response?.data?.statusCode === 201){
        toast.success('Brand created successfully');
        props.getData();
      } 
    } else {
      response = await put_brand({formData: formData, id:props?.data?.id});
      if (response?.data?.statusCode === 200){
        toast.success('Brand updated successfully');
        props.getData();
      }
    }

    setIsModalOpen(false);
  };

  // Mapping data_category to TreeSelect format
  const treeData = data_category.map((category: any) => ({
    title: category.name,
    value: category.id,
    key: category.id,
  }));

  return (
    <>
      <Button className='custom-button' onClick={showModal}>
        {props.title}
      </Button>
      <Modal title={props.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form onFinish={onFinish}>
          {props?.data?.image ? '' : <Form.Item
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
            initialValue={props?.data?.name || ''}
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
            initialValue={props?.data?.description || ''}
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
          
          <Form.Item
            name="category"
            rules={[
              {
                required: true,
                message: 'Category is required',
              },
            ]}
          >
            <TreeSelect
              style={{ width: '100%' }}
              placeholder="Please select category"
              treeData={treeData}
            />
          </Form.Item>

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
