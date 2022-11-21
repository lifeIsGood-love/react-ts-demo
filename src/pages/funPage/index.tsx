import React ,{ Component } from 'react';
import './index.scss'

interface IStateType {
    text: string ;
}

class FunPage extends Component<any , IStateType> {
   constructor(props:any){
    super(props);
    this.state = {
       text: '类组件'
    };
   }

   render(){
       return <div className='p-fun'>
           我是一个{this.state.text}
       </div>
   }
}

export default FunPage ;