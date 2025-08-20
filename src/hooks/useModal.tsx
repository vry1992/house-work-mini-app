import { Modal as AntdModal, type ModalProps } from 'antd';
import { useState, type FC } from 'react';

type Props = ModalProps;

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  const Modal: FC<Props> = ({ title, children, onCancel, ...rest }) => {
    return (
      <AntdModal title={title} open={isOpen} {...rest} onCancel={onCancel}>
        {children}
      </AntdModal>
    );
  };

  return {
    Modal,
    open,
    close,
    isOpen,
  };
};
