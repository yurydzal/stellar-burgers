import { FC } from 'react';
import { AppHeaderUI } from '@ui';

interface AppHeaderProps {
  userName: string;
}

export const AppHeader: FC<AppHeaderProps> = ({ userName }) => (
  <AppHeaderUI userName={userName} />
);
