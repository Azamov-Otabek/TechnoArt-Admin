import { Glabal_Table, Pogination } from "@ui"
import { BrandStore, CategoryStore, ProductStore, StockStore } from "@store"
import { useEffect, useState } from "react"
import { Button, Popover  } from "antd"
import { ToastContainer, toast } from "react-toastify"
import { Stock_modal } from "@ui"
import { useLocation, useNavigate } from "react-router-dom"

function index() {
  const navigate = useNavigate()
  const location = useLocation();
  const searchparams = new URLSearchParams(location.search);
  const {get_brands} = BrandStore()
  const {get_all_category} = CategoryStore()
  const {get_product} = ProductStore()
  const {get_Stock, delete_Stock, count, data_Stock} = StockStore()
  const [page, setPage] = useState(Number(searchparams.get('page')) || 1);
  const [total, setTotal] = useState(0);
  const [tableLoad, setTableLoad] = useState(false);
  const [openPopover, setOpenPopover] = useState(null); // Track the open popover
  

  
  const handleOpenChange = (newOpen: boolean, recordId: any) => {
    if (newOpen) {
      setOpenPopover(recordId);
    } else {
      setOpenPopover(null);
    }
  };

  async function handledelete(id:string){
    const response = await delete_Stock({id: Number(id)})
    if(response?.data?.statusCode == 200){
      toast.success('Delete product successfully', {autoClose: 1500})
      const searchparams = new URLSearchParams(location.search);
      searchparams.set('page', String(Math.ceil((count - 1) / 5)));
      navigate(`?${searchparams}`);
      setPage(Math.ceil((count - 1) / 5));
      getData();
    }else{
      toast.error('Something went wrong')
    }
  }

  const thead = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Brand ID',
      dataIndex: 'brand_id',
      key: 'brand_id',
    },
    {
      title: "Quantity",
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_:any, record:any) => (
        <div>
          <Stock_modal title={'Update'} data={record} getData={getData}/>     
          <Popover
                content={<div className="h-[50px] flex justify-end items-end gap-[15px]">
                  <Button className="custom-button" onClick={() => handleOpenChange(false, record.id)}>Cancel</Button>
                  <Button className="custom-button" onClick={() => handledelete(record.id)}>Delete</Button>
                </div>
                }
                title="Are you sure you want to delete this brand?"
                trigger="click"
                open={openPopover === record.id}
                onOpenChange={(newOpen) => handleOpenChange(newOpen, record.id)}
              >
                <Button className="custom-button mr-2 ml-2">
                  Delete
                </Button>
              </Popover>
        </div>
      ),
    }
  ]


  async function getData(){
    setTableLoad(true)
    await get_Stock({limit: 5, page: page})
    await get_product({limit:0, page: page, search: '', id: 0})
    await get_all_category({page: 0, limit: 0, search: ''})
    await get_brands({page: 0, limit: 0, search: ''})
    setTotal(count)
    setTableLoad(false)
  }

  useEffect(() => {
    getData()
  }, [page, count])
  return (
    <>
      <ToastContainer/>
      <div className="flex justify-end items-center mb-[20px]">
        <Stock_modal title={'Create Stock'} getData={getData}/>
      </div>
      <Glabal_Table columns={thead} dataSource={data_Stock} load={tableLoad}/>
      <div className="flex justify-center mt-[20px]">
          <Pogination page={page} setPage={setPage} count={total} />
        </div>
    </>
  )
}

export default index