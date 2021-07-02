import React from 'react';

import { Container } from './styles';

interface BulletProps {
  active: boolean;
}

const Bullet: React.FC<BulletProps> = ({ active }) => {
  return <Container active={active} />;
};

export default Bullet;
