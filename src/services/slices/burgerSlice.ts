import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

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
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item._id !== action.payload
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
