import {Table } from 'antd';
import './style.css'
import { useEffect, useState } from 'react';

function Index(props:any) {
  const [load, setLoad] = useState(true)

  useEffect(() =>{
    setTimeout(() => {
      setLoad(false)
    }, 1000);
  }, [])

  return (
    <Table
      columns={props?.columns}
      dataSource={props?.dataSource}
      rowKey={record => record.id}
      pagination={false}
      loading={load}
    />
  );
}

export default Index;
