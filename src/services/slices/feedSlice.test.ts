import reducer, {
  fetchFeed,
  getFeedData,
  getFeedStatus,
  initialState
} from './feedSlice';
import { TOrdersData } from '@utils-types';

describe('тесты редьюсера слайса feedSlice', () => {
  it('тест для fetchFeed.pending', () => {
    const action = { type: fetchFeed.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      feed: { orders: [], total: 0, totalToday: 0 }
    });
  });
  it('тест для fetchFeed.fulfilled', () => {
    const payload: TOrdersData = {
      orders: [
        {
          _id: '66d39b93119d45001b503458',
          ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093f'],
          status: 'done',
          name: 'Краторный бессмертный бургер',
          createdAt: '2024-08-31T22:39:15.568Z',
          updatedAt: '2024-08-31T22:39:15.568Z',
          number: 51676
        }
      ],
      total: 51305,
      totalToday: 95
    };
    const action = { type: fetchFeed.fulfilled.type, payload };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      feed: payload
    });
  });
  it('тест для fetchFeed.rejected', () => {
    const action = {
      type: fetchFeed.rejected.type,
      error: { message: 'fetchFeed rejected' }
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'fetchFeed rejected'
    });
  });
});
