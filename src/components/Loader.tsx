/** @format */

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { CSSProperties } from "react";

type LoaderProps = {
    show: boolean,
    style?: CSSProperties,
}

const Loader = ({ show, style }: LoaderProps) => {
    if (!show) return "";

    const indicator = <LoadingOutlined
        style={{
            fontSize: 24,
            marginTop: "3px",
            ...style,
        }}
        spin
    />

    return <Spin indicator={indicator} />
};

export default Loader;
