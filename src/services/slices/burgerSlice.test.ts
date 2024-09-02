import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearIngredients,
  initialState
} from './burgerSlice';
import { TConstructorIngredient } from '@utils-types';

describe('тесты слайса burgerSlice', () => {
  const mockIngredients: TConstructorIngredient[] = [
    {
      id: '669bb576-abe9-4f5b-a625-fc8912d2e2aa',
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    },
    {
      id: 'e68a5c19-fa05-4d6d-9495-457ba8f71534',
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    },
    {
      id: '9aff2582-0d58-47ac-a5ea-c91b24e9311d',
      _id: '643d69a5c3f7b9001cfa0949',
      name: 'Мини-салат Экзо-Плантаго',
      type: 'main',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 6,
      price: 4400,
      image: 'https://code.s3.yandex.net/react/code/salad.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/salad-large.png'
    }
  ];

  it('тест для экшена addIngredient на добавление булочки', () => {
    const bun = mockIngredients[0];
    const action = addIngredient(bun);
    const state = reducer(initialState, action);
    expect(state.bun?._id).toEqual(bun._id);
  });

  it('тест для экшена addIngredient на добавление ингредиента', () => {
    const ingredient = mockIngredients[1];
    const action = addIngredient(ingredient);
    const state = reducer(initialState, action);
    expect(state.ingredients[0]._id).toEqual(ingredient._id);
  });

  it('тест для экшена removeIngredient на удаление ингредиента', () => {
    const newState = {
      bun: null,
      ingredients: [mockIngredients[1]]
    };
    const action = removeIngredient(mockIngredients[1]);
    const state = reducer(newState, action);
    expect(state).toEqual(initialState);
  });

  it('тест для экшена moveIngredientUp', () => {
    const newState = {
      bun: null,
      ingredients: [mockIngredients[1], mockIngredients[2]]
    };
    const action = moveIngredientUp(1);
    const state = reducer(newState, action);
    expect(state.ingredients[0]._id).toBe('643d69a5c3f7b9001cfa0949');
    expect(state.ingredients[1]._id).toBe('643d69a5c3f7b9001cfa093e');
  });

  it('тест для экшена moveIngredientDown', () => {
    const newState = {
      bun: null,
      ingredients: [mockIngredients[1], mockIngredients[2]]
    };
    const action = moveIngredientDown(0);
    const state = reducer(newState, action);
    expect(state.ingredients[0]._id).toBe('643d69a5c3f7b9001cfa0949');
    expect(state.ingredients[1]._id).toBe('643d69a5c3f7b9001cfa093e');
  });

  it('тест для экшена clearIngredients на удаление всех ингредиентов', () => {
    const newState = {
      bun: mockIngredients[0],
      ingredients: [mockIngredients[1], mockIngredients[2]]
    };
    const action = clearIngredients();
    const state = reducer(newState, action);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
