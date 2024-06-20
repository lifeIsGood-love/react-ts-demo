import React , {useEffect,useState } from 'react';
import { Carousel , Input , Radio , Button} from 'antd';
import inductImg from '../../images/one.png';
import faviconImg from '../../images/favicon.png'
import './index.scss'
import 'animate.css';

const LoginPage = () => {
  const prefixCls = 'demo';
  console.log('print-env',process.env)
  // const [buttonState , setButtonState] = useState(true);

  return <div className={`${prefixCls}`}>
      <video
          className={`${prefixCls}-video`}
          autoPlay
          loop
          src='https://assets-global.website-files.com/64b673b845c2ac61520ae43c/650d70f99a202207ebf127c7_Sequence 01_10_1-transcode.mp4'
          muted
        />
      <div className={`${prefixCls}-header`}>
        <img src="https://assets-global.website-files.com/64b673b845c2ac61520ae43c/64e4bcf443eb1f2f5c45daca_Inductosense-Logo-Rev.svg" 
          loading="lazy" 
          alt="Inductosense logo" 
          className={`${prefixCls}-logo `} 
        />
      </div>
      <div className={`${prefixCls}-body`}>
        <div className={`${prefixCls}-body-wipper`}>
          <div className={`${prefixCls}-body-left`}>
            <Carousel autoplay >
              <div className={`${prefixCls}-body-card`}>
                <img src={inductImg} alt='' className={`${prefixCls}-body-card-img`}/>
                <div className={`${prefixCls}-body-card-txt`}>WAND Handheld Data Collector</div>
              </div>
              <div className={`${prefixCls}-body-card`}>
                <img src="https://assets-global.website-files.com/64b673b845c2ac61520ae43c/64f0d14cd645452906b00749_Inductosense-Image-Sensor.png" alt='' className={`${prefixCls}-body-card-img`}/>
                <div className={`${prefixCls}-body-card-txt`}>WAND ultrasonic sensors</div>
              </div>
              <div className={`${prefixCls}-body-card`}>
                <img src="https://assets-global.website-files.com/64b673b845c2ac61520ae43c/64f0b197f565c8c4b34ce0c8_Inductosense-Image-RDC.png" alt='' className={`${prefixCls}-body-card-img`}/>
                <div className={`${prefixCls}-body-card-txt`}>WAND Remote Data Collector</div>
              </div>
            </Carousel>
          </div>
        </div>
        <div className={`${prefixCls}-body-right animate__animated animate__jackInTheBox`}>
          <div className={`${prefixCls}-body-right-bg`}>
            <div className={`${prefixCls}-body-right-bg-header`}>
              <img src={faviconImg} alt=''/>
              <div className={`${prefixCls}-body-right-bg-header-title `}>Welcome to iDART 1.3.24</div>
              <div className={`${prefixCls}-body-right-bg-header-note`}>Release Notes</div>
              <div className={`${prefixCls}-body-right-bg-header-version`}>Staging Version</div>
            </div>
            <div className={`${prefixCls}-body-right-bg-input`}><Input placeholder="Username" /></div>
            <div className={`${prefixCls}-body-right-bg-input`}><Input placeholder="Password" /></div>
            <Radio>Rememer me</Radio>
            <div className={`${prefixCls}-body-right-bg-input`}><Input placeholder="Basic usage" /></div>
            <div>
              <a className={`${prefixCls}-body-right-bg-href`} href="">Forgot your password?</a>
            </div> 
            <div className={`${prefixCls}-body-right-bg-button`}>
              <Button type="primary" >SIGN IN</Button>
              <a href=''>wwww</a>
            </div>
          </div>
        </div>
      </div>
      
      
  </div>
}

export default LoginPage ;
