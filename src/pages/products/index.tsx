import { Glabal_Table, Pogination } from "@ui"
import { BrandStore, CategoryStore, ProductStore } from "@store"
import { useEffect, useState } from "react"
import { Button, Input, Popover  } from "antd"
import { ToastContainer, toast } from "react-toastify"
import { Product_modal } from "@ui"
import { useLocation, useNavigate } from "react-router-dom"

function index() {
  const navigate = useNavigate()
  const { Search } = Input;
  const location = useLocation();
  const searchparams = new URLSearchParams(location.search);
  const {get_brands} = BrandStore()
  const {get_all_category} = CategoryStore()
  const {get_product, count, delete_product, data_product} = ProductStore()
  const [page, setPage] = useState(Number(searchparams.get('page')) || 1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState(searchparams.get('search') || '');
  const [searchLoad, setSearchLoad] = useState(false);
  const [tableLoad, setTableLoad] = useState(false);
  const [openPopover, setOpenPopover] = useState(null); // Track the open popover


  async function handledelete(id:string){
    const response = await delete_product({id: Number(id)})
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
  const handleOpenChange = (newOpen: boolean, recordId: any) => {
    if (newOpen) {
      setOpenPopover(recordId);
    } else {
      setOpenPopover(null);
    }
  };

  const thead = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text:any) => 
        <p>{text.slice(0,10)}</p>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_:any, record:any) => (
        <div>
          <Product_modal title={'Update'} data={record} getData={getData}/>     
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
          <Button className="custom-button" onClick={() => navigate(`/dashboard/products/${record.id}`)}>
            View Product details within
          </Button>
        </div>
      ),
    }
  ]

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1)
    const searchparams = new URLSearchParams(location.search);
    searchparams.set('page', '1');
    navigate(`?${searchparams}`)
    searchparams.set('search', e.target.value);
    navigate(`?${searchparams}`);
    setSearchLoad(true);
    setTimeout(() => {
      setSearchLoad(false);
    }, 1700);
  };

  async function getData(){
    setTableLoad(true)
    await get_product({limit:5, page: page, search: search, id: 0})
    await get_all_category({page: 0, limit: 0, search: ''})
    await get_brands({page: 0, limit: 0, search: ''})
    setTotal(count)
    setTableLoad(false)
  }

  useEffect(() => {
    getData()
  }, [page, count, search])
  return (
    <>
      <ToastContainer/>
      <div className="flex justify-between items-center mb-[20px]">
        <Search
            className="custom-search"
            placeholder="Enter text"
            defaultValue={search}
            loading={searchLoad}
            enterButton
            onChange={handleSearchChange}
            
          />
        <Product_modal title={'Create Product'} getData={getData}/>
      </div>
      <Glabal_Table columns={thead} dataSource={data_product} load={tableLoad}/>
      <div className="flex justify-center mt-[20px]">
          <Pogination page={page} setPage={setPage} count={total} />
        </div>
    </>
  )
}

export default index