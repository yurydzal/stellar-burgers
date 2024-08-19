import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { getOrdersData, fetchOrders } from '../../services/slices/orderSlice';
import { getFeedData } from '../../services/slices/feedSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getOrdersData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
