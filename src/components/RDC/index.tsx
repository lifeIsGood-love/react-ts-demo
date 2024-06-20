import React, { useState } from 'react';
import { Button, Table, Input, Modal, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Tooltip } from 'antd';
import usbImg from '../../images/usb.png';
import editImg from '../../images/edit.png'
import noBooth from '../../images/nowifi.png';
import haveBooth from '../../images/haveBooth.png';
import iconbooth from '../../images/icon-booth.png';
import first from '../../images/signstrong.png';
import two from '../../images/signsecond.png';
import three from "../../images/signweek.png"
import four from "../../images/nosign.png"
import tip from "../../images/tip.png";
import right from "../../images/right.png"

import './index.scss'

interface DataType {
  key: React.Key;
  location: string;
  Devices: string;
  LastExtracted: string;
  Configuration:string;
  operator:any;
}

const Devices = () => {
  const prefixCls = 'deviceform';
  const { Search } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { title: 'location', dataIndex: 'location', key: 'location' },
    { title: 'Devices', dataIndex: 'Devices', key: 'Devices' },
    { title: 'LastExtracted', dataIndex: 'LastExtracted', key: 'LastExtracted' },
    { title: 'Configuration', dataIndex: 'Configuration', key: 'Configuration',
      render: (text: any,record: any) => 
        <div>
          {<Tooltip placement='bottom' color = "#212843" title={<div>last schedual confirmed to be applied</div>}>
            <div>{text}{record.Bluetooth && <img src={right} style={{width:"15px"}}/>}</div>
          </Tooltip>}
          {record.Bluetooth && <Tooltip placement='bottom' color = "#EC6F41" title={<div>You have configuration data that has not been uploaded</div>}>
            <div style={{color:"#EC6F41",fontStyle: "italic"}}>2 sensors every 1 days </div>
          </Tooltip>}
        </div>
    },
    { title: <div>Bluetooth&nbsp;
        <Tooltip placement='bottom' color = "#EC6F41" title={<div>Orange signaling icons indicate discoverable signaling devices</div>}>
          <img src={tip} style={{width:'15px'}}/>
        </Tooltip>
      </div>, 
      dataIndex: 'Bluetooth',
      key: 'Bluetooth' ,
      render: (text: any,record: { Bluetooth: any; key: number}) => 
          <Tooltip placement='bottom' color = {record.Bluetooth ? "#EC6F41":"#212843"} title={<div>{ record.Bluetooth ? 'Bluetooth devices can be connected' : 'Bluetooth devices can not connected'}</div>}>
            <img className = {`${prefixCls}-icon`} src={ record.key == 0 ? first : record.key % 2 ? two : record.key % 3? three : four}/>
          </Tooltip>
    },
    { title: 'Usb', dataIndex: 'Usb', key: 'Usb',
      render: (text: any,record: any) => 
        <img className = {`${prefixCls}-icon`} src={ usbImg }/>
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <img src={editImg} onClick={showModal} className = {`${prefixCls}-edit-icon`}/>
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const data = [] ;
  for(let i = 0; i < 100; i++){
    data.push(
      {
        key: i,
        location: `London Park no. ${i}`,
        Devices: `11233445 ${i}`,
        LastExtracted: `2 months ${i}`,
        Bluetooth: i % 4 === 0 ? true : false, 
        Usb:true,
        Configuration: '1 sensors every 7 days',
      }
    )
  };

  const onSearch = () => {};
  const handleChange = () => {};

  return <div className = {`${prefixCls}`}>
    <div className = {`${prefixCls}-search`}>
        <div className = {`${prefixCls}-search-type`}>location:</div>
        <Input placeholder="location" className = {`${prefixCls}-input`}/>
        <div className = {`${prefixCls}-search-type`}>Device:</div>
        <Input placeholder="devices" className = {`${prefixCls}-input`}/>
        <div className = {`${prefixCls}-search-type`}>configuration status:</div>
        <Select
          labelInValue
          defaultValue={{ value: 'false', label: 'not up-to-date' }}
          style={{ width: 120, marginLeft: 10, marginRight: 30}}
          onChange={handleChange}
          options={[
            {
              value: 'false',
              label: 'not up-to-date',
            },
            {
              value: 'true',
              label: 'updated',
            },
          ]}
      />
        <div className = {`${prefixCls}-search-type`}>Bluetooth:</div>
        <Select
            labelInValue
            defaultValue={{ value: 'false', label: 'false' }}
            style={{ width: 120, marginLeft: 10}}
            onChange={handleChange}
            options={[
              {
                value: 'false',
                label: 'false',
              },
              {
                value: 'true',
                label: 'true',
              },
            ]}
        />
      <div>
      {/* <Select
          labelInValue
          defaultValue={{ value: 'lucy', label: 'Lucy (101)' }}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            {
              value: 'jack',
              label: 'Jack (100)',
            },
            {
              value: 'lucy',
              label: 'Lucy (101)',
            },
          ]}
      /> */}
      </div>
      <Button type="primary" style={{marginLeft:20}}>Search</Button>
      <div className = {`${prefixCls}-btns` }>
        <Tooltip title="Click the blue button to query the device" color = "#EC6F41">
          <div className = {`${prefixCls}-btn` } >
            <img src={iconbooth}/>
          </div>
        </Tooltip>   
        <Button type="primary" className = {`${prefixCls}-add`}>ADD DC</Button>
      </div>
    </div>
     {/*  <Search placeholder="devices" onSearch={onSearch} enterButton className = {`${prefixCls}-search`}/>  */}
    <Table
      columns={columns}
      dataSource={data}
      className = {`${prefixCls}-data`}
    />
    <Modal title="Confirm Update" className = {`${prefixCls}-configmodal`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure the configuration data applies to RDC?</p>
      </Modal>
  </div>
}

export default Devices ;