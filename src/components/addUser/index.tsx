import React from "react";
import { Button, Table } from 'antd';
const AddUser = () => {
   const columns = [
            { title: 'UserName', dataIndex: 'name', key: 'name' },
            { title: 'Action', dataIndex: '',key: 'x',
            render: () => <div>
                <a>Delete</a>&nbsp;&nbsp;&nbsp;
                <a>Edit</a>
            </div>
            }
        ];
   const data = [
    {name:'jean1'},
    {name:'jean2'},
    {name:'jean3'},
    {name:'jean4'},
   ];
   return <div>
      <Table
            columns={columns}
            dataSource={data}
    />
   </div>
}

export default AddUser ;