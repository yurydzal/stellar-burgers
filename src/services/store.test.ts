import rootReducer from './store';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import burgerReducer from './slices/burgerSlice';
import feedReducer from './slices/feedSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';

describe('тест корневого редьюсера', () => {
  it('тест начального состояния rootReducer', () => {
    const rootReducer = combineReducers({
      burger: burgerReducer,
      feed: feedReducer,
      ingredients: ingredientsReducer,
      order: orderReducer,
      user: userReducer
    });

    const store = configureStore({
      reducer: rootReducer
    });

    expect(store.getState()).toEqual(
      rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
  });
});
