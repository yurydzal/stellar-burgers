import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { useSelector } from '../../services/store';
import { getIngredientsData } from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const ingredient = useSelector(getIngredientsData);
  const ingredientId = useParams();
  const ingredientData = ingredient.find(
    (item) => item._id === ingredientId.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
