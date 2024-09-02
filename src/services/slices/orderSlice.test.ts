import reducer, {
  newOrder,
  fetchOrders,
  fetchOrderNumber,
  clearOrderData,
  initialState
} from './orderSlice';
import { TOrder } from '@utils-types';

describe('тесты редьюсеов слайса orderSlice', () => {
  const mockOrder: TOrder[] = [
    {
      ingredients: ['ingredient-1', 'ingredient-2'],
      _id: '66d3bb5d119d45001b503478',
      status: 'done',
      name: 'Экзо-плантаго традиционный-галактический флюоресцентный люминесцентный бургер',
      createdAt: '2024-09-01T00:54:53.814Z',
      updatedAt: '2024-09-01T00:54:54.392Z',
      number: 51678
    }
  ];

  it('тест для экшена clearOrderData', () => {
    const action = { type: clearOrderData.type };
    const state = reducer({ ...initialState, data: mockOrder[0] }, action);
    expect(state).toEqual({
      ...initialState,
      data: null
    });
  });

  describe('тест редьюсера newOrder', () => {
    it('тест для newOrder.pending', () => {
      const action = { type: newOrder.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isRequested: true
      });
    });
    it('тест для newOrder.fulfilled', () => {
      const payload = mockOrder;
      const action = {
        type: newOrder.fulfilled.type,
        payload: { order: payload }
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isRequested: false,
        data: payload
      });
    });
    it('тест для newOrder.rejected', () => {
      const action = {
        type: newOrder.rejected.type,
        error: { message: 'newOrder rejected' }
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isRequested: false,
        error: 'newOrder rejected'
      });
    });
  });

  describe('тест редьюсера fetchOrders', () => {
    it('тест для fetchOrders.pending', () => {
      const action = { type: fetchOrders.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: true
      });
    });
    it('тест для fetchOrders.fulfilled', () => {
      const payload = mockOrder;
      const action = { type: fetchOrders.fulfilled.type, payload };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        orders: payload
      });
    });
    it('тест для fetchOrders.rejected', () => {
      const action = {
        type: fetchOrders.rejected.type,
        error: { message: 'fetchOrders rejected' }
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: 'fetchOrders rejected'
      });
    });
  });

  describe('тест редьюсера fetchOrderNumber', () => {
    it('тест для fetchOrderNumber.pending', () => {
      const action = { type: fetchOrderNumber.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: true
      });
    });
    it('тест для fetchOrderNumber.fulfilled', () => {
      const payload = mockOrder;
      const action = {
        type: fetchOrderNumber.fulfilled.type,
        payload: { orders: payload }
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        data: payload[0]
      });
    });
    it('тест для fetchOrderNumber.rejected', () => {
      const action = {
        type: fetchOrderNumber.rejected.type,
        error: { message: 'fetchOrderNumber rejected' }
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: 'fetchOrderNumber rejected'
      });
    });
  });
});
