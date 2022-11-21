import React ,{ Component } from 'react';
import './classCom.scss'

interface IStateType {
    text: string ;
}

class ClassCom extends Component<any , IStateType> {
   constructor(props:any){
    super(props);
    this.state = {
       text: '类组件'
    };
   }

   render(){
       return <div className='p-class'>
           我是一个{this.state.text}
       </div>
   }
}

export default ClassCom ;