import {Table } from 'antd';
import './style.css'

function Index(props:any) {
  

  return (
    <Table
      columns={props?.columns}
      dataSource={props?.dataSource}
      rowKey={record => record.id}
      pagination={false}
      loading={props.load}
    />
  );
}

export default Index;
