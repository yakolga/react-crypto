import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from "../../utils";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";

const siderStyle = {
  textAlign: 'left',
  lineHeight: '120px',
  color: '#fff',
  padding: '1rem'
};

export default function AppSider() {
    const {assets} = useContext(CryptoContext);

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
        </Layout.Sider>
    )
}