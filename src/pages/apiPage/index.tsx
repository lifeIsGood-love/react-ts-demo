import React from "react";
import { Tabs } from 'antd';
import "./index.scss"

const ApiContent = () => {
    return <div>
        134
    </div>
}

const ApiPage = () => {
    const onChange = (key: string) => {
        console.log(key);
    };
    return <div className="api-contain">
        <Tabs
            onChange={onChange}
            type="card"
            items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
                label: `Tab ${id}`,
                key: id,
                children: <ApiContent></ApiContent>,
            };
            })}
        />
        <div className="content"></div>
    </div>
}

export default ApiPage;