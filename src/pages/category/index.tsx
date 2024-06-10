import { CategoryStore } from "@store";
import { useEffect, useState } from "react";
import { Button, Input } from "antd"; // Importing required components from Ant Design
import '../../components/ui/global-table/style.css'
import { Glabal_Table, Category_modal, Pogination } from "@ui";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Index() {
  const { Search } = Input;
  const location = useLocation();
  const searchparams = new URLSearchParams(location.search);
  const { get_all_category, data_category, delete_category, count } = CategoryStore();
  const navigate = useNavigate();
  const [page, setPage] = useState(Number(searchparams.get('page')) || 1);
  const [search, setSearch] = useState(searchparams.get('search') || '');
  const [total, setTotal] = useState(0);
  const [searchLoad, setSearchLoad] = useState(false);
  const [tableLoad, setTableLoad] = useState(false);

  const handleDelete = async (id: string) => {
    const response = await delete_category({ id: Number(id) });
    if (response?.data?.statusCode == 200) {
      toast.success('Delete category successfully', { autoClose: 1500 });
      const searchparams = new URLSearchParams(location.search);
      searchparams.set('page', String(Math.ceil((count - 1) / 5)));
      navigate(`?${searchparams}`);
      setPage(Math.ceil((count - 1) / 5));
      getData();
    } else {
      toast.error('Delete category failed', { autoClose: 1500 });
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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any) => {
        return <p>{text?.slice(0, 10)}</p>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <div>
          <Category_modal title={'update'} data={record} getData={getData} />
          <Button onClick={() => handleDelete(record.id)} className="custom-button mr-2 ml-2">
            Delete
          </Button>
          <Button className="custom-button" onClick={() => navigate(`/dashboard/categories/${record.id}`)}>
            View categories within
          </Button>
        </div>
      ),
    },
  ];

  async function getData() {
    setTableLoad(true)
    const payload = {
      limit: 5,
      page: page,
      search: search
    };
    await get_all_category(payload);
    setTotal(count);
    setTableLoad(false)
  }

  useEffect(() => {
    getData();
  }, [page, count, search]);

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

  return (
    <>
      <ToastContainer />
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
          <Category_modal title={'Create category'} getData={getData} />
        </div>
        <Glabal_Table columns={columns} dataSource={data_category} load={tableLoad} />
        <div className="flex justify-center mt-[20px]">
          <Pogination page={page} setPage={setPage} count={total} />
        </div>
      </div>
    </>
  );
}

export default Index;
