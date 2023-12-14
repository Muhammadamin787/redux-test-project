/** @format */

import { Layout, Tabs } from "antd";
import { Outlet, useNavigate } from 'react-router-dom';

const menuItems = [
    {
        key: '1',
        label: `Посты`,
    },
    // {
    //     key: '2',
    //     label: `Фото`,
    // },
    // {
    //     key: '3',
    //     label: `Задачи`,
    // },
]

const layoutStyle = { height: "100vh", backgroundColor: "#fff", padding: "0px 40px" }

const MainLayout = () => {

    // Helper Hooks
    const navigate = useNavigate();

    // Functions
    const onChange = (key: string) => {
        navigate("posts" + (key !== "1" ? key : ""))
    };

    return (
        <Layout style={layoutStyle} className="main-layout">
            <Tabs className="main-tabs" defaultActiveKey="1" items={menuItems} onChange={onChange} />
            {/* <Suspense fallback={<Loader show={true} />}> */}
            <Outlet />
            {/* </Suspense> */}
        </Layout>
    );
};
export default MainLayout;