import { Layout, Spin } from "antd";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import CryptoContext from "../../context/crypto-context";
import { useContext } from "react";

const layoutStyle = {
  overflow: 'hidden',
  height: '100vh'
};

export default function AppLayout() {
    const {loading} = useContext(CryptoContext);

    if (loading) {
        return(<Spin fullscreen/>)
    }

    return (
        <Layout style={layoutStyle}>
            <AppHeader/>
            <Layout>
                <AppSider/>
                <AppContent/>
            </Layout>
        </Layout>
    )
}