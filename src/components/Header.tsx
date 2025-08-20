import { Avatar, Flex, Layout, theme } from 'antd';
import { type FC } from 'react';
import { useModal } from '../hooks/useModal';
import './style.scss';
import style from './test.module.scss';

const { Header: AntdHeader } = Layout;

export const Header: FC<{ photoUrl: string }> = ({ photoUrl }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Modal: AvatarModal, ...avatarModalProps } = useModal();

  return (
    <>
      <AntdHeader
        style={{
          padding: 8,
          background: colorBgContainer,
        }}>
        <Flex align="center" justify="center">
          <Avatar
            size={50}
            src={<img src={photoUrl} alt="avatar" />}
            onClick={avatarModalProps.open}
          />
        </Flex>
      </AntdHeader>
      <AvatarModal
        open={avatarModalProps.isOpen}
        onCancel={avatarModalProps.close}
        footer={null}
        className={style.avatarModal}
        centered>
        <img src={photoUrl} alt="avatar" style={{ width: '100%' }} />
      </AvatarModal>
    </>
  );
};
