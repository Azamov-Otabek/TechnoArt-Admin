import { Glabal_Table, Pogination } from "@ui"
import { BrandStore, CategoryStore } from "@store"
import { useEffect, useState } from "react"
import { Button, Input  } from "antd"
import { ToastContainer, toast } from "react-toastify"
import { Brand_modal } from "@ui"
import { useLocation, useNavigate } from "react-router-dom"

function index() {
  const navigate = useNavigate()
  const { Search } = Input;
  const location = useLocation();
  const searchparams = new URLSearchParams(location.search);
  const {data_brand, get_brands, delete_brand, count} = BrandStore()
  const {get_all_category} = CategoryStore()
  const [page, setPage] = useState(Number(searchparams.get('page')) || 1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState(searchparams.get('search') || '');
  const [searchLoad, setSearchLoad] = useState(false);
  const [tableLoad, setTableLoad] = useState(false);


  async function handledelete(id:string){
    const response = await delete_brand({id: Number(id)})
    if(response?.data?.statusCode == 200){
      toast.success('Delete brand successfully', {autoClose: 1500})
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Imgae URL',
      dataIndex: 'image',
      key: 'image',
      render: (text:any) => {
        return <img className="relative z-10 w-[50px] h-[50px]"  src={`${text}`} alt={text} />
      }
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
          <Brand_modal title={'Update'} data={record} getData={getData}/>     
          <Button onClick={() => handledelete(record.id)}  className="custom-button mr-2 ml-2">
            Delete
          </Button>
          <Button className="custom-button" onClick={() => navigate(`/dashboard/brands/${record.id}`)}>
            View Brand categories within
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
    await get_brands({limit:5, page: page, search: search})
    await get_all_category({page: 0, limit: 0, search: ''})
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
        <Brand_modal title={'Create Brand'} getData={getData}/>
      </div>
      <Glabal_Table columns={thead} dataSource={data_brand} load={tableLoad}/>
      <div className="flex justify-center mt-[20px]">
          <Pogination page={page} setPage={setPage} count={total} />
        </div>
    </>
  )
}

export default index