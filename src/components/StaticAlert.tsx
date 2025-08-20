import { Alert, Flex } from 'antd';
import React from 'react';

export const StaticAlert: React.FC<{
  type: 'success' | 'info' | 'warning' | 'error';
  description: string;
  message: string;
}> = ({ type, description, message }) => (
  <Flex align="center" gap="middle">
    <Alert message={message} description={description} type={type} showIcon />
  </Flex>
);
