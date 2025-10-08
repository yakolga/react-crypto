import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInofModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(true);
  const {crypto} = useCrypto();

  useEffect(() => {
    const keypress = event => {
      if (event.key === '/') {
        setSelect(prev => !prev);
      }
    }
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find(c => c.id === value));
    setModal(true);
  }

  return (<Layout.Header style={headerStyle}>
    <Select
    style={{ width: 250 }}
    open={select}
    placeholder="press / to open"
    onSelect={handleSelect}
    onClick={() => setSelect(prev => !prev)}
    options={crypto.map(coin => ({
      label: coin.name,
      value: coin.id,
      icon: coin.icon
    }))}
    optionRender={option => (
      <Space>
        <img src={option.data.icon} alt={option.data.label} style={{width: 20}}></img> {option.data.label}
      </Space>
    )}
  />
  <Button type="primary" onClick={() => setDrawer(true)}>Add asset</Button>
  <Modal
    closable={{ 'aria-label': 'Custom Close Button' }}
    open={modal}
    footer={null}
    onCancel={() => setModal(false)}
  >
    <CoinInfoModal coin={coin}/>
  </Modal>

  <Drawer title="Add Asset" width={600} open={drawer} onClose={() => setDrawer(false)} destroyOnClose>
    <AddAssetForm onClose={() => setDrawer(false)}/>
  </Drawer>
  </Layout.Header>)
}