import { useState } from 'react';
import { Button, Modal, Form, TreeSelect } from 'antd';
import '../global-table/style.css';
import { ProFormText } from '@ant-design/pro-components';
import { BrandStore, CategoryStore, ProductStore, BrandCategory } from '@store';
import { toast } from 'react-toastify';

function Index(props: any) {
  const { data_category } = CategoryStore();
  const { data_brand } = BrandStore();
  const { data_brand_category, get_id_brands } = BrandCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { post_product, put_product } = ProductStore();

  async function GetSubCategory(e:number){
    get_id_brands({ page: 0, limit: 0, id: e});
  }

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
        values.price = +values.price
        let response;
        if (props.title === 'Create Product') {
        response = await post_product(values);
        if (response?.data?.statusCode === 201) {
            toast.success('Product created successfully');
            props.getData();
        }
        } else {
        const payload = {
            data: values,
            id: props?.data?.id
        }
        response = await put_product(payload);
        if (response?.data?.statusCode === 200) {
            toast.success('Product updated successfully');
            props.getData();
        }
        }

        setIsModalOpen(false);
        form.resetFields();
  };

  // Mapping data_category to TreeSelect format
  const treeData = data_category.map((category: any) => ({
    title: category.name,
    value: category.id,
    key: category.id,
  }));

  const treeData_brands = data_brand.map((brand: any) => ({
    title: brand.name,
    value: brand.id,
    key: brand.id,
  }));

  const treeData_ctdBrands = data_brand_category?.map((category: any) => ({
    title: category.name,
    value: category.id,
    key: category.id,
  }))

  return (
    <>
      <Button className='custom-button' onClick={showModal}>
        {props.title}
      </Button>
      <Modal title={props.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={onFinish}>
          <ProFormText
            initialValue={props?.data?.name || ''}
            hasFeedback
            name="name"
            placeholder="Please enter the product name"
            rules={[
              {
                required: true,
                message: 'Product name is required',
              },
            ]}
          />
          <ProFormText
            initialValue={props?.data?.price || ''}
            hasFeedback
            name="price"
            placeholder="Please enter the price"
            rules={[
              {
                required: true,
                message: 'Price is required',
              },
            ]}
            fieldProps={{ type: 'number', min: 0 }}
          />

          <Form.Item
            name="category_id"
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
          <Form.Item
            name="brand_id"
            rules={[
              {
                required: true,
                message: 'Brand is required',
              },
            ]}
          >
            <TreeSelect
                onChange={(e) => GetSubCategory(e)}
              style={{ width: '100%' }}
              placeholder="Please select brand"
              treeData={treeData_brands}
            />
          </Form.Item>


          <Form.Item
            name="brand_category_id"
            rules={[
              {
                required: true,
                message: 'Brand Category ID is required',
              },
            ]}
          >
            <TreeSelect
              style={{ width: '100%' }}
              placeholder="Please select brand"
              treeData={treeData_ctdBrands}
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
