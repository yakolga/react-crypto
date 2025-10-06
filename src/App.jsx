import { Layout } from "antd";
import AppHeader from "./Layout/AppHeader";
import AppSider from "./Layout/AppSider";
import AppContent from "./Layout/AppContent";

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const layoutStyle = {
  overflow: 'hidden',
  height: '100vh'
};

export default function App() {
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
