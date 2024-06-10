import { ProductDetails } from "@store";
import { useEffect, useState } from "react";
import { Button, Input } from "antd"; // Importing required components from Ant Design
import '../../components/ui/global-table/style.css'
import { Glabal_Table, Detail_modal, Pogination } from "@ui";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Index() {
  const { Search } = Input;
  const location = useLocation();
  const searchparams = new URLSearchParams(location.search);
  const { count, data_productDetail, delete_productDetail, get_productDetail} = ProductDetails();
  const {brand} = useParams() 
  const navigate = useNavigate();
  const [page, setPage] = useState(Number(searchparams.get('page')) || 1);
  const [search, setSearch] = useState(searchparams.get('search') || '');
  const [total, setTotal] = useState(0);
  const [searchLoad, setSearchLoad] = useState(false);
  const [tableLoad, setTableLoad] = useState(false);


  const handleDelete = async (id:string) => {
    const response = await delete_productDetail({id: Number(id)})
    if(response?.data?.statusCode == 200){
      toast.success('Delete category successfully', {autoClose: 1500})
      const searchparams = new URLSearchParams(location.search);
      searchparams.set('page', String(Math.ceil((count - 1) / 5)));
      navigate(`?${searchparams}`);
      setPage(Math.ceil((count - 1) / 5));
      getData();
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Product ID',
      dataIndex: 'product_id',
      key: 'product_id',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: "Discount",
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'IMG LINK',
      dataIndex: 'images',
      key: 'images',
      render: (text:any) => 
        <p>{text[0]}</p>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_:any, record:any) => (
        <div>
          <Detail_modal title={'update'} data={record} parent_id={Number(data_productDetail)} getData={getData}/>
          <Button  onClick={() => handleDelete(record.id)} className="custom-button mr-2 ml-2">
            Delete
          </Button>      
        </div>
      ),
    },
  ];

  async function getData() {
    setTableLoad(true)
    await get_productDetail();
    setTotal(count)
    setTableLoad(false)
  }

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

  useEffect(() => {
    getData();
  }, [search, page, count]);

  return (
    <>
      <ToastContainer/>
      <div>
      <div className="flex justify-between items-center mb-[20px]">
      <Search
            className="custom-search"
            placeholder="Enter text"
            defaultValue={search}
            loading={searchLoad}
            enterButton
            onChange={handleSearchChange}
            
          />
          <Detail_modal title={'Create Product Detail'} parent_id={Number(brand)} getData={getData}/>
      </div>
      <Glabal_Table columns={columns} dataSource={data_productDetail} load={tableLoad} />
      <div className="flex justify-center mt-[20px]">
          <Pogination page={page} setPage={setPage} count={total} />
        </div>
    </div>
    </>
  );
}

export default Index;
