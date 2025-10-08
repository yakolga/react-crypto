import { useState, useRef } from "react";
import { Select, Space, Divider, Form, InputNumber, Button, DatePicker, Result } from "antd";
import { useCrypto } from "../context/crypto-context";
import CoinInfo from "./CoinINfo";

const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} is not valid number'
    },
    number: {
        range: '${label} must be between ${min} and ${max}'
    }
}

export default function AddAssetForm({onClose}) {
    const { crypto, addAsset } = useCrypto();
    const [coin, setCoin] = useState(null);
    const [total, setTotal] = useState(null);
    const [form] = Form.useForm();
    const [submitted, setSubmitted] = useState(false);
    const assetRef = useRef();

    if (submitted) {
        return(
            <Result
                status="success"
                title="New asset added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                <Button type="primary" key="close" onClick={onClose}>
                    Close
                </Button>,
                ]}
            />
        )
    }

    if (!coin) {
        return (
            <Select
                style={{ width: '100%' }}
                placeholder="Select coin"
                onSelect={(v) => setCoin(crypto.find(c => c.id === v))}
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={option => (
                    <Space>
                        <img src={option.data.icon} alt={option.data.label} style={{ width: 20 }}></img> {option.data.label}
                    </Space>
                )}
            />
        )
    }

    function onFinish(values) {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset;
        setSubmitted(true);
        addAsset(newAsset);
    }

    function handleAmountChange(value) {
        const price = form.getFieldValue('price');
        form.setFieldsValue({
            total: +(value * price).toFixed(1)
        });
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount');
        form.setFieldsValue({
            total: +(amount * value).toFixed(1)
        });
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
            style={{ maxWidth: 600 }}
            initialValues={{
                price: +coin.price.toFixed(2),
                total: total
            }}
            onFinish={onFinish}
            autoComplete="off"
            validateMessages={validateMessages}
        >
            <CoinInfo coin={coin}/>
            <Divider />
            <Form.Item label="Amount" name="amount" rules={[{ required: true, type: 'number', min: 0 }]}>
                <InputNumber onChange={handleAmountChange} placeholder="Enter coin amount" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Date & time" name="date">
                <DatePicker showTime style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Price" name="price">
                <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Total" name="total">
                <InputNumber disabled style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>
    )
}