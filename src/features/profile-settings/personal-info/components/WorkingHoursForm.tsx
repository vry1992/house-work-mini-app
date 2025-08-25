import type { FormProps } from 'antd';
import { Button, Form, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState, type FC } from 'react';
import { TimePicker } from '../../../../components/TimePicker';
import { useCommonActionCreators } from '../../../../store/actions';
import type { WorkingHours } from '../../../auth/types/types';
import {
  WorkingHoursService,
  type EditWorkingHoursPayload,
  type SaveWorkingHoursPayload,
} from '../../services/WorkingHoursService';

type FieldType = {
  dayOffs: string[];
  workFrom: Dayjs;
  workTo: Dayjs;
  minBreakDuration: string;
};

const defaultValues = {
  dayOffs: ['6'],
  workFrom: dayjs('09:00', 'HH:mm'),
  workTo: dayjs('18:00', 'HH:mm'),
  minBreakDuration: '10',
};

export const WorkingHoursForm: FC<{
  data?: WorkingHours;
}> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const { successAction, errorAction } = useCommonActionCreators();
  const [form] = Form.useForm();
  const [workFrom, setWorkFrom] = useState<string>(
    defaultValues.workFrom.toISOString()
  );
  const [workTo, setWorkTo] = useState<string>(
    defaultValues.workTo.toISOString()
  );

  useEffect(() => {
    let initData = defaultValues;
    if (data) {
      const userData: FieldType = {
        dayOffs: data?.dayOffs.map(({ day }) => day.toString()),
        workFrom: dayjs(dayjs(data?.workFrom), 'HH:mm'),
        workTo: dayjs(dayjs(data?.workTo), 'HH:mm'),
        minBreakDuration: data?.minBreakDuration.toString() || '10',
      };
      initData = userData;
    }

    setWorkFrom(initData.workFrom.toISOString());
    setWorkTo(initData.workTo.toISOString());

    for (const [name, value] of Object.entries(initData)) {
      form.setFieldValue(name, value);
    }
  }, [data]);

  const onWorkFromChange = (value: string) => {
    form.setFieldValue('workFrom', dayjs(dayjs(value), 'HH:mm'));
    setWorkFrom(value);
  };

  const onWorkToChange = (value: string) => {
    form.setFieldValue('workTo', dayjs(dayjs(value), 'HH:mm'));
    setWorkTo(value);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      setLoading(true);

      const basePayload: SaveWorkingHoursPayload = {
        dayOffs: values.dayOffs,
        workFrom: values.workFrom.toISOString(),
        workTo: values.workTo.toISOString(),
        minBreakDuration: values.minBreakDuration,
      };

      if (data) {
        const editPayload: EditWorkingHoursPayload = {
          id: data.id,
          ...basePayload,
        };
        await WorkingHoursService.editWorkingHours(editPayload);
      } else {
        await WorkingHoursService.createWorkingHours(basePayload);
      }

      successAction('Успішно збережено!');
    } catch (error) {
      errorAction('Упс, помилочка!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      disabled={loading}>
      <TimePicker
        key={'11'}
        label="Оберіть час з якого ви починаєте працювати"
        name="workFrom"
        tooltip={'Час коли ви готові прийняти першого клієнта'}
        rules={[{ required: true, message: 'Це поле обовʼязкове' }]}
        value={workFrom}
        onOk={onWorkFromChange}
      />

      <TimePicker
        key={'22'}
        label="Оберіть час до якого ви працюєте"
        name="workTo"
        tooltip={'Час коли ви плануєте закінчувати останній сеанс'}
        rules={[{ required: true, message: 'Це поле обовʼязкове' }]}
        value={workTo}
        onOk={onWorkToChange}
      />

      <Form.Item<FieldType>
        label="Вкажіть мінімальний час перерви між клієнтами"
        name="minBreakDuration"
        rules={[{ required: true, message: 'Це поле обовʼязкове' }]}>
        <Select
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
        name="dayOffs"
        tooltip={'Ваші клієнти не зможуть забронювати час у цей день'}
        rules={[{ required: false }]}>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
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

      <Button
        style={{ width: '100%' }}
        type="primary"
        loading={loading}
        htmlType="submit">
        {loading ? 'Збереження...' : 'Зберегти'}
      </Button>
    </Form>
  );
};
