import { Avatar, Button, Flex, Layout, theme } from 'antd';
import { type FC } from 'react';
import { useNavigate } from 'react-router';
import { useModal } from '../hooks/useModal';
import './style.scss';
import style from './test.module.scss';

const { Header: AntdHeader } = Layout;

export const Header: FC<{ photoUrl: string }> = ({ photoUrl }) => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Modal: AvatarModal, ...avatarModalProps } = useModal();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <AntdHeader
        style={{
          padding: 8,
          background: colorBgContainer,
        }}>
        <Flex align="center" justify="space-between">
          <Button type="text" onClick={goBack}>
            Назад
          </Button>
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
