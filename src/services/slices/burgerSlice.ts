import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

interface BurgerState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: BurgerState = {
  bun: null,
  ingredients: []
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      if (action.payload > 0) {
        const ingredient = state.ingredients[action.payload];
        state.ingredients.splice(action.payload, 1);
        state.ingredients.splice(action.payload - 1, 0, ingredient);
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      if (action.payload < state.ingredients.length - 1) {
        const ingredient = state.ingredients[action.payload];
        state.ingredients.splice(action.payload, 1);
        state.ingredients.splice(action.payload + 1, 0, ingredient);
      }
    },
    clearIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getBurgerState: (state) => state
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearIngredients
} = burgerSlice.actions;
export const { getBurgerState } = burgerSlice.selectors;
export default burgerSlice.reducer;
