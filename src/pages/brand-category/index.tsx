import { BrandCategory } from "@store";
import { useEffect, useState } from "react";
import { Button, Input, Popover } from "antd"; // Importing required components from Ant Design
import '../../components/ui/global-table/style.css'
import { Glabal_Table, BrandCategory_modal, Pogination } from "@ui";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Index() {
  const { Search } = Input;
  const location = useLocation();
  const searchparams = new URLSearchParams(location.search);
  const { count, get_all_brandcategory, delete_brandcategory, data_brand_category} = BrandCategory();
  const {brand} = useParams()
  const navigate = useNavigate();
  const [page, setPage] = useState(Number(searchparams.get('page')) || 1);
  const [search, setSearch] = useState(searchparams.get('search') || '');
  const [total, setTotal] = useState(0);
  const [searchLoad, setSearchLoad] = useState(false);
  const [tableLoad, setTableLoad] = useState(false);
  const [openPopover, setOpenPopover] = useState(null); // Track the open popover


  const handleDelete = async (id:string) => {
    const response = await delete_brandcategory({id: Number(id)})
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

  const handleOpenChange = (newOpen: boolean, recordId: any) => {
    if (newOpen) {
      setOpenPopover(recordId);
    } else {
      setOpenPopover(null);
    }
  };


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Subcategory name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_:any, record:any) => (
        <div>
          <BrandCategory_modal title={'update'} data={record} parent_id={Number(data_brand_category)} getData={getData}/>
          <Popover
                content={<div className="h-[50px] flex justify-end items-end gap-[15px]">
                  <Button className="custom-button" onClick={() => handleOpenChange(false, record.id)}>Cancel</Button>
                  <Button className="custom-button" onClick={() => handleDelete(record.id)}>Delete</Button>
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
    },
  ];

  async function getData() {
    setTableLoad(true)
    await get_all_brandcategory({page: page, limit: 5, search: search, id:Number(brand)});
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
          <BrandCategory_modal title={'Create Brand category'} parent_id={Number(brand)} getData={getData}/>
      </div>
      <Glabal_Table columns={columns} dataSource={data_brand_category} load={tableLoad} />
      <div className="flex justify-center mt-[20px]">
          <Pogination page={page} setPage={setPage} count={total} />
        </div>
    </div>
    </>
  );
}

export default Index;
