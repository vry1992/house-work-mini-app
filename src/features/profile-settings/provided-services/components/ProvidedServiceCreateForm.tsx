import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

type FieldType = {
  providedServiceName: string;
  providedServiceDescription?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export const ProvidedServiceCreateForm = () => {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical">
      <Form.Item<FieldType>
        label="Назва послуги"
        name="providedServiceName"
        rules={[{ required: true, message: 'Введіть назву послуги' }]}>
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Опишіть послугу"
        name="providedServiceDescription"
        rules={[{ required: false, max: 2000 }]}>
        <Input.TextArea
          autoSize={{ minRows: 6, maxRows: 12 }}
          maxLength={2000}
        />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
