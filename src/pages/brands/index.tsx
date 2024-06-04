import { Glabal_Table } from "@ui"
import { BrandStore } from "@store"
import { useEffect } from "react"
import { Button } from "antd"
import { ToastContainer, toast } from "react-toastify"
import { Brand_modal } from "@ui"

function index() {
  const {data_brand, get_brands, delete_brand} = BrandStore()

  async function handledelete(id:string){
    const response = await delete_brand({id: Number(id)})
    if(response?.data?.message == 'Deleted successfully'){
      toast.success('Delete brand successfully', {autoClose: 1500})
    }
  }

  const thead = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'brand_name',
      key: 'brand_name',
    },
    {
      title: 'Description',
      dataIndex: 'brand_description',
      key: 'brand_description',
    },
    {
      title: 'Imgae URL',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_:any, record:any) => (
        <div>
          <Brand_modal title={'Update'} data={record}/>     
          <Button onClick={() => handledelete(record.id)}  className="custom-button mr-2 ml-2">
            Delete
          </Button> 
        </div>
      ),
    }
  ]

  async function getData(){
    await get_brands()
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <ToastContainer/>
      <div className="flex justify-end mb-[20px]">
        <Brand_modal title={'Create Brand'}/>
      </div>
      <Glabal_Table columns={thead} dataSource={data_brand} />
    </>
  )
}

export default index