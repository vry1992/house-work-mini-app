import type { ModalProps } from '@mui/material';
import {
  LocalizationProvider,
  TimeClock,
  type PickerValidDate,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Form, Input } from 'antd';
import type { Rule } from 'antd/es/form';
import dayjs from 'dayjs';
import { useEffect, useState, type FC } from 'react';
import { useModal } from '../hooks/useModal';

type Props = Omit<
  ModalProps,
  'open' | 'children' | 'value' | 'defaultValue'
> & {
  label: string;
  name: string;
  tooltip?: string;
  rules?: Rule[];
  value: string;
  onOk: (value: string) => void;
};

export const TimePicker: FC<Props> = ({
  label,
  name,
  tooltip,
  rules,
  value,
  onOk,
}) => {
  const [clockValue, setClockValue] = useState<string>(value);
  const { Modal: TimePickerModal, ...rest } = useModal();

  const inputValue = dayjs(clockValue).format('HH:mm');

  const closeWithSave = () => {
    onOk(clockValue);
    rest.close();
  };

  const onChange = (changedTime: PickerValidDate | null) => {
    if (changedTime) {
      setClockValue(changedTime.toISOString());
    }
  };

  useEffect(() => {
    setClockValue(value);
  }, [value]);

  return (
    <>
      <Form.Item label={label} name={name} tooltip={tooltip} rules={rules}>
        <Input onClick={rest.open} value={inputValue} readOnly name={name} />
        <TimePickerModal
          onOk={closeWithSave}
          open={rest.isOpen}
          okText={'Зберегти'}
          cancelText={'Назад'}
          centered
          closable
          onCancel={rest.close}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeClock
              value={dayjs(clockValue)}
              ampm={false}
              minutesStep={15}
              onChange={onChange}
              views={['hours', 'minutes']}
            />
          </LocalizationProvider>
        </TimePickerModal>
      </Form.Item>
    </>
  );
};
