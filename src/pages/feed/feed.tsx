import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { getFeedData, fetchFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const feed = useSelector(getFeedData);
  const orders: TOrder[] = feed.orders;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
