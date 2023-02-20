import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cardsReducer from '../features/cards/cardsSlice';
import sequencesReducer from '../features/sequencesSlice';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    sequences: sequencesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
