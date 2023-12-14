import { Col, Form, Row } from "antd";
import { PropsWithChildren } from 'react';

type FormItemProps = PropsWithChildren & {
    name: string
    label: string
    reqiredMessage?: string,
}

const CustomFormItem = ({ name, label, reqiredMessage = `Пожалуйста, введите ${label}`, children }: FormItemProps) => {

    const rules = [
        {
            required: !!reqiredMessage,
            message: reqiredMessage,
        },
    ]

    return (
        <Row>
            <Col span={24}>
                <Form.Item
                    name={name}
                    label={label}
                    rules={rules}
                >
                    {children}
                </Form.Item>
            </Col>
        </Row>
    );
};

export default CustomFormItem;
