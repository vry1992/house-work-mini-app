import type { FormProps } from 'antd';
import { Button, Form, Select, TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { WorkingHoursService } from '../../services/WorkingHoursService';

type FieldType = {
  dayOff: string;
  startWorkFrom: Dayjs;
  startWorkTo: Dayjs;
  minBreakDuration: string;
};

export const WorkingHoursForm = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    WorkingHoursService.createWorkingHours({
      dayOff: values.dayOff,
      startWorkFrom: values.startWorkFrom
        .year(1970)
        .month(0)
        .date(0)
        .toISOString(),
      startWorkTo: values.startWorkTo.year(1970).month(0).date(0).toISOString(),
      minBreakDuration: values.minBreakDuration,
    });
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical">
      <Form.Item<FieldType>
        label="Оберіть час з якого ви починаєте працювати"
        name="startWorkFrom"
        tooltip={'Час коли закінчиться останній сеанс'}
        rules={[{ required: false }]}
        initialValue={dayjs('09:00', 'HH:mm')}>
        <TimePicker
          defaultValue={dayjs('09:00', 'HH:mm')}
          minuteStep={30}
          hourStep={1}
          placeholder={''}
          showSecond={false}
          showNow={false}
          style={{ width: '100%' }}
          needConfirm={false}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Оберіть час до якого ви працюєте"
        name="startWorkTo"
        tooltip={
          'Ваші клієнти зможуть забронювати сеанс який закінчиться не пізніше вказаного часу'
        }
        rules={[{ required: true, message: 'Це поле обовʼязкове' }]}
        initialValue={dayjs('18:00', 'HH:mm')}>
        <TimePicker
          defaultValue={dayjs('18:00', 'HH:mm')}
          minuteStep={30}
          showSecond={false}
          showNow={false}
          hourStep={1}
          placeholder={''}
          style={{ width: '100%' }}
          needConfirm={false}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Вкажіть мінімальний час перерви між клієнтами"
        name="minBreakDuration"
        initialValue={'10'}
        rules={[{ required: true, message: 'Це поле обовʼязкове' }]}>
        <Select
          defaultValue={'10'}
          style={{ width: '100%' }}
          options={[
            { value: '10', label: '10 хвилин' },
            { value: '15', label: '15 хвилин' },
            { value: '20', label: '20 хвилин' },
            { value: '25', label: '25 хвилин' },
            { value: '30', label: '30 хвилин' },
            { value: '35', label: '35 хвилин' },
            { value: '40', label: '40 хвилин' },
            { value: '45', label: '45 хвилин' },
            { value: '50', label: '50 хвилин' },
            { value: '55', label: '55 хвилин' },
            { value: '60', label: '1 година' },
          ]}
        />
      </Form.Item>

      <Form.Item<FieldType>
        initialValue={['6']}
        name="dayOff"
        tooltip={'Ваші клієнти не зможуть забронювати час у цей день'}
        rules={[{ required: false }]}>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          defaultValue={['6']}
          options={[
            {
              label: 'Понеділок',
              value: '0',
            },
            {
              label: 'Вівторок',
              value: '1',
            },
            {
              label: 'Середа',
              value: '2',
            },
            {
              label: 'Четвер',
              value: '3',
            },
            {
              label: 'Пʼятниця',
              value: '4',
            },
            {
              label: 'Субота',
              value: '5',
            },
            {
              label: 'Неділя',
              value: '6',
            },
          ]}
        />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Зберегти
        </Button>
      </Form.Item>
    </Form>
  );
};
