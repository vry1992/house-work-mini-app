import type { CollapseProps } from 'antd';
import { Collapse, Flex, Typography } from 'antd';
import { WorkingHours } from '../personal-info/page/WorkingHours';
import { ProvidedServices } from '../provided-services/pages/ProvidedServices';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Встановіть свій графік роботи',
    children: <WorkingHours />,
  },
  {
    key: '2',
    label: 'Вкажіть послуги які ви надаєте',
    children: <ProvidedServices />,
  },
  {
    key: '3',
    label: 'Керування профілем',
    children: <p>{text}</p>,
  },
];

export const ProfileSettings = () => {
  return (
    <>
      <Flex align="center" justify="center">
        <Typography.Title level={4}>
          Налаштування Вашого профілю
        </Typography.Title>
      </Flex>
      <Collapse accordion items={items} />
    </>
  );
};
