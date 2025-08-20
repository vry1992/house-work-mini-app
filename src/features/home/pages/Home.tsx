import { Flex, Radio, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { AuthService } from '../../auth/services/AuthService';
import { useAuthSelectors } from '../../auth/store/auth.selectors';
import type { AppUserType } from '../../auth/types/types';
import styles from './style.module.scss';

export const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchUserId = searchParams.get('userId');

  const { user } = useAuthSelectors();

  const [profile, setProfile] = useState<AppUserType | null>(null);

  const ownId = user?.telegramId || null;

  const isOwnProfile = ownId === searchUserId || !searchUserId;

  const userName = `${profile?.firstName} ${profile?.lastName}`;

  useEffect(() => {
    if (!isOwnProfile && searchUserId) {
      const fetchData = async () => {
        const visitedUser = await AuthService.getUser(searchUserId);

        setProfile(visitedUser);
      };

      fetchData();
    } else if (isOwnProfile && user) {
      setProfile(user);
    }
  }, [isOwnProfile, searchUserId, user]);

  return (
    <>
      <Flex align="center" justify="center">
        <Typography.Title level={3} className={styles.username}>
          {userName}
        </Typography.Title>
      </Flex>

      <Flex align="center" justify="center">
        <Radio.Group onChange={(e) => navigate(e.target.value)}>
          <Radio.Button value="profile-settings">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
      </Flex>
    </>
  );
};
