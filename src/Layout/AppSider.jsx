import { Layout, Card, Statistic, List, Typography, Spin, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { fakeFetchAssets, fakeFetchCrypto } from "../api";
import { percentDiff, capitalize } from "../utils";
import { useState } from "react";
import { useEffect } from "react";

const siderStyle = {
  textAlign: 'left',
  lineHeight: '120px',
  color: '#fff',
  padding: '1rem'
};

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

export default function AppSider() {
    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        async function preload() {
            setLoading(true);
            const {result} = await fakeFetchCrypto();
            const assests = await fakeFetchAssets();

            setCrypto(result);
            setAssets(assests.map(asset => {
                const coin = result.find(coin => coin.id === asset.id);
                return {
                    grow: asset.price < coin.price,
                    growPercent: percentDiff(asset.price, coin.price),
                    totalAmount: asset.amount * coin.price,
                    totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                    ...asset
                }
            }));
            setLoading(false);
        }

        preload();
    }, []);

    if (loading) {
        return(<Spin fullscreen/>)
    }

    return(
        <Layout.Sider width="30%" style={siderStyle}>
            {assets.map(item => (
                <Card key={item.id} style={{marginBottom: '1rem'}}>
                    <Statistic title={capitalize(item.id)}
                        value={item.totalAmount}
                        precision={2}
                        valueStyle={{ color: item.grow ? '#3f8600' : '#cf1322' }}
                        prefix={item.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        suffix="%"/>
                    <List
                        size="small"
                        dataSource={[
                            {title: 'Total Profit', value: item.totalProfit, withTag: true},
                            {title: 'Asset Amount', value: item.amount, isPlane: true},
                            // {title: 'Difference', value: item.growPercent},
                        ]}
                        renderItem={it => (
                            <List.Item>
                                <span>{it.title}</span>
                                {it.withTag && <Tag color={item.grow ? 'green' : 'red'}>{item.growPercent}%</Tag>}
                                {it.isPlane && <span>{(it.value).toFixed(2)}</span>}
                                {!it.isPlane && <Typography.Text type={item.grow ? 'success' : 'danger'}>{(it.value).toFixed(2)}$</Typography.Text>}
                            </List.Item>
                        )}
                        />
                </Card>
            ))}
            
            {/* <Card>
                <Statistic
                    title="Idle"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                    />
            </Card> */}
        </Layout.Sider>
    )
}