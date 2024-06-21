import React , {useEffect,useState } from 'react';
import './index.scss';

const HomePage = () => {
    const prefixCls = 'homepage';
    return <div className={prefixCls}>
        <div>顶部（tab加头部大图）</div>
        <div>内容详情uber四个模块</div>
        <div>底部</div>
    </div>
}

export default HomePage;