import { Modal as AntdModal } from 'antd';
import { type FC, type PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  isOpen: boolean;
  title?: string | React.ReactNode;
  onClose?: () => void;
};

export const Modal: FC<Props> = ({ isOpen, title, onClose, children }) => {
  return (
    <AntdModal title={title} open={isOpen} onCancel={onClose}>
      {children}
    </AntdModal>
  );
};
