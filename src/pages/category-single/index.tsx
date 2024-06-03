import { CategoryStore } from "@store";
import { useEffect } from "react";
import { Button } from "antd"; // Importing required components from Ant Design
import '../../components/ui/global-table/style.css'
import { Glabal_Table, Category_modal } from "@ui";
import {  useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Index() {
  const { get_all_subcategory, data_category, delete_category} = CategoryStore();
  const {subcategory} = useParams()


  const handleDelete = async (id:string) => {
    const response = await delete_category({id: Number(id)})
    if(response?.data?.message == 'Deleted successfully'){
      toast.success('Delete category successfully', {autoClose: 1500})
    }else{
      toast.error('Delete category failed', {autoClose: 1500})
    }
  };


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Category name',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: 'Parent Category Id',
      dataIndex: 'parent_category_id',
      key: 'parent_category_id',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_:any, record:any) => (
        <div>
          <Category_modal title={'update'} data={record}/>
          <Button  onClick={() => handleDelete(record.id)} className="custom-button mr-2 ml-2">
            Delete
          </Button>      
        </div>
      ),
    },
  ];

  async function getData() {
    await get_all_subcategory({id:Number(subcategory)});
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ToastContainer/>
      <div>
      <div className="flex justify-end mb-[20px]">
          <Category_modal title={'Create category'} data={subcategory}/>
      </div>
      <Glabal_Table columns={columns} dataSource={data_category} />
    </div>
    </>
  );
}

export default Index;
