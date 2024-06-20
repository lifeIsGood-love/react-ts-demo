import React, { useEffect, useState } from 'react';
import { Button, Table, Input, Modal, Select, message ,Spin} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Tooltip } from 'antd';
import API from '../../api/DataListAPI'
import usbImg from '../../images/usb.png';
import editImg from '../../images/edit.png'
import noBooth from '../../images/nowifi.png';
import haveBooth from '../../images/haveBooth.png';
import iconbooth from '../../images/blueTeeth.png';
import first from '../../images/signstrong.png';
import two from '../../images/signsecond.png';
import three from "../../images/signweek.png"
import four from "../../images/nosign.png"
import tip from "../../images/tip.png";
import right from "../../images/right.png";
import update from "../../images/update.png";
import config from "../../images/config.png";
import download from "../../images/download.png";
import camera from "../../images/camera.png";
import reboot from "../../images/reboot.png";
import delete1 from "../../images/delete.png";
import port from "../../images/port.png";
import fourg from "../../images/4G.png";
import signal from "../../images/signal.png"
import fourgblank from "../../images/4Gblank.png";
import portblank from "../../images/portblank.png"

import './index.scss'
import { render } from 'react-dom';

interface DataType {
      key: React.Key;
      location: string;
      Devices: string;
      LastExtracted: string;
      Configuration:string;
      operator:any;
}

const Gateway = () => {
      const prefixCls = 'gatewayForm';

      const [data,setData] = useState([])

      const dataNew = [] ;
      for(let i = 0; i < 8; i++){
        dataNew.push(
          {
            key: i,
            location: `LocallND. ${i}`,
            Devices: `http://81.134.46.59:809${i}`,
            LastExtracted: `2 months ${i}`,
            Bluetooth: i % 2 === 0 ? true : false, 
            Usb: i % 4 === 0 ? true : false,
            Configuration: '1 sensors every 7 days',
          }
        )
      };

      const [isClickBlueButton, setIsClickBlueButton] = useState(true);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [showDetails,setShowDetails] = useState(false);
      const [spinning, setSpinning] = useState(false);
      const [showConfiguration,setShowConfiguration] = useState(false);

      // search include four content
      const [locationValue,setLocationValue] = useState('');
      const [deviceValue,setDeviceValue] = useState('');
      const [configStatus,setConfigStatus] = useState(false);
      const [bluetoothState,setBluetoothState] = useState(false);
      const [messageApi, contextHolder] = message.useMessage();

      const tableData : any = [] ;
      for(let i = 0; i < 100; i++){
        tableData.push(
          {
            key: i,
            location: `London Park no. ${i}`,
            Devices: `11233445 ${i}`,
            power: '99%',
            temperature: '24°C',
            error: 'error logs',
            LastExtracted: `2 months ${i}`,
            Bluetooth: i % 4 === 0 ? true : false, 
            Usb:true,
            Configuration: '1 sensors every 7 days',
          }
        )
      };
      
      useEffect(()=>{
        //api requst get data
        API.getRDCData().then(()=>{
          setData(tableData)
        }).catch(()=>{
          //error text
        })
      },[])

      const handleLocationChange = (e: { target: { value: string; }; }) => {
        console.log(e.target.value,'e.target.value')
        setLocationValue(e.target.value);
      };

      const detailsData = [
        {Devices:'C8', sname:'8CFGGHHJJJJJKK'}
      ]

      const columns = [
        { title: 'Gateway name', dataIndex: 'location', key: 'location' },
        { title: 'Hostname/IP', dataIndex: 'Devices', key: 'Devices' },
        { title: 'Status', dataIndex: 'Bluetooth', key: 'Bluetooth',
          render: (text:boolean,record:{Usb:boolean}) => 
               text ? <Tooltip title="device connection type is 4g" color={"#212843"} placement="bottom">
               <div style={{color:"#fff",borderRadius:"18px", height:"28px",lineHeight:"28px",backgroundColor: "#ec6f41",border:"1px solid #ec6f41"}}>
                 {text && record.Usb && <img style={{width:"16px"}} src = {fourgblank } onClick = {showModal} className = {`${prefixCls}-edit-icon`}/>}
                {text && !record.Usb && <img style={{width:"16px"}} src = {portblank} onClick = {showModal} className = {`${prefixCls}-edit-icon`}/>}
                online</div>
             </Tooltip>
               
                :
                <div style={{borderRadius:"12px",border:"1px solid #000"}}>offline</div>
        },
        // { title: 'Connection Type', dataIndex: 'Bluetooth', key: 'Bluetooth',
        //   render: (text:any,record:{Usb:boolean}) => <div className = {`${prefixCls}-action`}>
        //       {text && record.Usb && <img src = {port} onClick = {showModal} className = {`${prefixCls}-edit-icon`}/>}
        //       {text && !record.Usb && <img src = {fourg} onClick = {showModal} className = {`${prefixCls}-edit-icon`}/>}
        //   </div>
        // },
        { title: 'Devices', dataIndex: 'power', key: 'power',
            render: (text:string) => <div style={{display:"flex",justifyContent:"center"}}>
              <div style={{color:"#ec6f41",width:"160px",borderRadius:"6px",height:"28px",lineHeight:"28px",backgroundColor: "#f9ede7",border:"1px solid #ec6f41"}}>
                  <img src={signal} className = {`${prefixCls}-edit-icon`} style={{width:"20px"}}></img>
                  View 2 devices
              </div>
            </div>
        },
        {
          title: 'Action',
          dataIndex: '',
          key: 'x',
          render: (text: any,record: { key: number }) => 
            <div className = {`${prefixCls}-action`}>
              <img src = {editImg} onClick = {showModal} className = {`${prefixCls}-edit-icon`}/>
              <img src = {reboot} onClick = {showModal} className = {`${prefixCls}-edit-icon`}/>
              <img src = {delete1} onClick = {showModal} className = {`${prefixCls}-edit-icon`}/>
              {/* <Button 
                type="link" 
                disabled = { record.key % 2 ?  true : false} 
                onClick = {onDetail}
              >
                Details
              </Button> */}
            </div>
        }, 
        // { title: '', dataIndex: 'temperature', key: 'temperature',
        //     render: (text:string) => <div style={{color:'#EC6F41'}}>{text}</div>
        // }, // temperature
        // { title: '', dataIndex: 'error', key: 'error',
        //     render: (text:string) => <a  style={{color:'#EC6F41' ,textDecoration:'underline'}}>{text}</a>
        // }, // error log
        // { title: 'LastExtracted', dataIndex: 'LastExtracted', key: 'LastExtracted' },
        // { title: 'Configuration', dataIndex: 'Configuration', key: 'Configuration',
        //   render: (text: any,record: any) => 
        //     <div>
        //       {<Tooltip placement='bottom' color = "#212843" title={<div>last schedual confirmed to be applied</div>}>
        //         <div>{text}{record.Bluetooth && <img src={right} style={{width:"15px"}}/>}</div>
        //       </Tooltip>}
        //       {record.Bluetooth && <Tooltip placement='bottom' color = "#EC6F41" title={<div>You have configuration data that has not been uploaded</div>}>
        //         <div style={{color:"#EC6F41",fontStyle: "italic"}}>2 sensors every 1 days </div>
        //       </Tooltip>}
        //     </div>
        // },
        // { title: <div style={{textAlign:"center"}}>Bluetooth&nbsp;
        //     <Tooltip placement='bottom' color = "#EC6F41" title={<div>Orange signaling icons indicate discoverable signaling devices</div>}>
        //       <img src={tip} style={{width:'15px'}}/>
        //     </Tooltip>
        //   </div>, 
        //   dataIndex: 'Bluetooth',
        //   key: 'Bluetooth' ,
        //   render: (text: any,record: { Bluetooth: any; key: number}) => 
        //       <Tooltip placement='bottom' color = {record.Bluetooth ? "#EC6F41":"#212843"} title={<div>{ record.Bluetooth ? 'Bluetooth devices can be connected' : 'Bluetooth devices can not connected'}</div>}>
        //         <div style={{textAlign:"center", width:"100%"}}><img className = {`${prefixCls}-icon`} style={{textAlign:"center"}} src={ record.key == 0 ? first : record.key % 2 ? '' : record.key % 3? three : two}/></div>
        //       </Tooltip>
        // },
        // { title: 'Usb', dataIndex: 'Usb', key: 'Usb',
        //   render: (text: any,record: any) => 
        //    <img className = {`${prefixCls}-icon`} onClick = {()=>alert("usb")} src = { usbImg }/>
        // },
        // {
        //   title: 'Action',
        //   dataIndex: '',
        //   key: 'x',
        //   render: (text: any,record: { key: number }) => 
        //     <div className = {`${prefixCls}-action`}>
        //       <img src = {editImg} onClick = {showModal} className = {`${prefixCls}-edit-icon`}/>
        //       <Button 
        //         type="link" 
        //         disabled = { record.key % 2 ?  true : false} 
        //         onClick = {onDetail}
        //       >
        //         Details
        //       </Button>
        //     </div>
        // },
      ];

      const detialColumns = [
        { title: 'RDC Device', dataIndex: 'Devices', key: 'Device' },
        { title: 'Signal Strength', dataIndex: 'Device', key: 'Signal Strength',
            render: (text: any,record: any) => 
              <img className = {`${prefixCls}-icon`} src = { camera }/>
        },
        { title: 'Firmware Update', dataIndex: 'Device', key: 'LastExtracted',
            render: (text: any,record: any) => 
              <img className = {`${prefixCls}-icon`} src = { update }/> 
        },
        { title: 'Take Live Readings', dataIndex: 'Device', key: 'Take Live Readings' ,
            render: (text: any,record: any) => 
              <img className = {`${prefixCls}-icon`} src = { camera }/> 
        },
        { title: 'Download', dataIndex: 'Device', key: 'Download',
            render: (text: any,record: any) => 
              <img className = {`${prefixCls}-icon`} src = { download }/> 
        },
        { title: 'Update Configuration', dataIndex: 'Device', key: 'Update Configuration',
            render: (text: any,record: any) => 
              <img className = {`${prefixCls}-icon`} src = { config }/> 
        },
        { title: 'Recover Readings', dataIndex: 'Device', key: 'Recover Readings',
            render: (text: any,record: any) => 
              <img className = {`${prefixCls}-icon`} src = { config }/>
        },
      ]

      const onDetail = () => {
        setShowDetails(true)
      };

      const handleDetailCancel = () => {
        setShowDetails(false)
      }

      const showModal = () => {
        setShowConfiguration(true)
      };

      const handleOk = () => {
        setIsModalOpen(true)
      };

    // 硬件连接的节点文案展示过多，用户实际上并不关心到哪个节点了，只关心结果，我个人觉得后台可查看日志，不需要展示在前端
    // 进行配置数据更新时，弹窗会先进行硬件设备连接，后进行现在数据和之前数据的对比，
    //  进行配置更新，硬件设备连接的弹窗可否只在获取到数据前进行，当点击update now,可否不再展示硬件设备弹唱，直接等到接口返回，成功时，展示成功的message，失败时展示失败的message
      const handleConfirmUpdate = () => {
        API.getFeedsTask().then( () => {
          setIsModalOpen(true)
          // setShowConfiguration(false)
          messageApi.open({
            type: 'success',
            content: "Configuration updated successfully",
          });
          setIsModalOpen(false)
          setShowConfiguration(false)
        }).catch( () => {
          messageApi.open({
            type: 'error',
            content: "Configuration update failed, please try again/",
          });
        } )
        
      }

      const handleCancel = () => {
        setShowConfiguration(false)
      };

      const handleCreat = () => {
        API.getRDCData()
          .then((res)=>{
            if(res.success){
              setShowConfiguration(false)
              messageApi.open({
                type: 'error',
                content: "Failed to save configuration data, please try again later.",
              });
            }else {
              setShowConfiguration(false)
              messageApi.open({
                type: 'success',
                content: "The configuration data is saved successfully and needs to be updated.",
              });
            } 
          })
          .catch((err)=>{
            setShowConfiguration(false)
            messageApi.open({
              type: 'error',
              content: "Failed to save configuration data, please try again later.",
            });
          })
        
      }

      const handleUpdateCancel = () => {
        // setShowConfiguration(false)
        setIsModalOpen(false)
      }

      const showLoader = () => {
        setSpinning(true);
        setTimeout(() => {
          API.getRDCData()
          .then((res)=>{
            setSpinning(false);
            if(!res.success){
              messageApi.open({
                type: 'error',
                content: "Please plug in dongle/device (or unplug and plug it back in),if this doesn't work please ensure key has been set",
              });
            }else {
              messageApi.open({
                type: 'success',
                content: "Bluetooth device data updated",
              });
            } 
          })
          .catch((err)=>{
            
          })
        }, 6000);
      };

      const onSearch = () => {
        let param = {
          locationValue,
          deviceValue,
          configStatus,
          bluetoothState
        }
        console.log(param,'search---param')
        // search api
        API.getRDCData()
          .then((res)=>{
            if(locationValue!==''){
              // alert('update data');
              setData([])
              messageApi.open({
                type: 'error',
                content: "Data request failed, please try again later.",
              });
            }else{
              setData(tableData)
              console.log(tableData,'tableData')
            }
          })
          .catch((err)=>{
            messageApi.open({
              type: 'error',
              content: "Data request failed, please try again later.",
            });
          })
      };

      const onReset = () => {
        setLocationValue('');
        setDeviceValue('');
        setConfigStatus(false);
        setBluetoothState(false);
        setData(tableData)
      }

      const handleChange = () => {};
      
      // 获取可以连接的设备数据后，是由前端自己匹配渲染数据还是传给后端，后端进行整合后返回。如果单页数据过多会影响性能，如果设置每页十条数据，可以前端自行匹配
      const getDeviceClick = () => {
        setIsClickBlueButton(false);
        showLoader();
      }

      const blueClassName = isClickBlueButton ? `${prefixCls}-activebtn` : `${prefixCls}-noactivebtn`

      return <div className = {`${prefixCls}`}>
        <div className={`${prefixCls}-title`}>Gateways</div>
        {/* <div className = {`${prefixCls}-search`}>
            <div className = {`${prefixCls}-search-type`}>location:</div>
            <Input 
                placeholder="location" 
                className = {`${prefixCls}-input`} 
                onChange={handleLocationChange}
                value={locationValue}
            />
            <div className = {`${prefixCls}-search-type`}>Device:</div>
            <Input 
                placeholder="devices" 
                className = {`${prefixCls}-input`}
            />
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
          </div>
          <Button type="primary" style={{marginLeft:20}} onClick={onSearch}>Search</Button>
          <Button type="primary" className={`${prefixCls}-resetbtn`} style={{marginLeft:20}} onClick={onReset}>Reset</Button>
          <div className = {`${prefixCls}-btns` }>
            <Tooltip title="Click the blue button to query the device" color = "#212843">
              <Button className = {blueClassName} shape="circle" onClick={getDeviceClick} >
                <img src={iconbooth}/>
              </Button>
            </Tooltip> 
            {contextHolder} 
            <Spin spinning={spinning} fullscreen /> 
            <Button type="primary" className = {`${prefixCls}-add`}>ADD RDC</Button>
          </div>
        </div> */}
          <div className={`${prefixCls}-table`} >
            <h2 style={{fontWeight:"bolder"}}>Gateway List</h2>
            <Table
              columns={columns}
              dataSource={dataNew}
              className = {`${prefixCls}-data`}
            />
          </div>    
        {/* Create RDC configuration Modal*/}
        <Modal 
          title="Create RDC configuration" 
          className = {`${prefixCls}-configmodal`} 
          open={showConfiguration} onOk={handleOk} 
          onCancel={handleCancel}
          centered
          okText='Update'
          footer={[
            <Button key="back" onClick={handleCreat}>
              Creat
            </Button>,
            <Button key="submit" type="primary"  onClick={handleOk}>
              Udapate
            </Button>]}
        >
            <p>RDC configuration</p>
            <p>RDC configuration</p>
            <p>RDC configuration</p>
            <p>RDC configuration</p>
            <p>RDC configuration</p>
            <p>RDC configuration</p>
            <p>RDC configuration</p>
            <p>RDC configuration</p>

        </Modal>
        {/* Update RDC configuration Modal*/}
        <Modal 
          title="Confirm Update" 
          className = {`${prefixCls}-configmodal`} 
          open={isModalOpen} 
          onOk={handleConfirmUpdate} 
          onCancel={handleUpdateCancel}
          okText='Confirm'
        >
          <p>Are you sure the configuration data applies to RDC?</p>
        </Modal>
         {/* check out RDC details Modal*/}
         <Modal 
          title="RDC Device Action" 
          className = {`${prefixCls}-detailmodal`} 
          open={showDetails} 
          onCancel={handleDetailCancel}
          footer={null}
          style={{width:'723px'}}
        >
           <Table
              columns={detialColumns}
              dataSource={detailsData}
              className = {`${prefixCls}-data`}
              pagination={false}
        />
        </Modal>
      </div>
}

export default Gateway ;