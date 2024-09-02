import reducer, {
  fetchIngredients,
  getIngredientsData,
  getIngredientsStatus,
  initialState
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('тесты редьюсера слайса ingredientsSlice', () => {
  it('тест для fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  it('тест для fetchIngredients.fulfilled', () => {
    const payload: TIngredient[] = [
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      }
    ];
    const action = { type: fetchIngredients.fulfilled.type, payload };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      ingredients: payload
    });
  });
  it('тест для fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'fetchIngredients rejected' }
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'fetchIngredients rejected'
    });
  });
});
