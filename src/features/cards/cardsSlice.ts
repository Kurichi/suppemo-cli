import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import * as FileSystem from 'expo-file-system';
import { writeAsStringAsync } from '../../utils/filesystem';
import { search } from '../toolkit';

const fileDir = FileSystem.documentDirectory! + 'cards/';
const fileName = 'card_detail.json';

export interface CardsState {
  numOfCards: number;
  cards: Map<number, Card>;
  lastElementIndex: number;
  status: 'loading' | 'idle' | 'failed';
}

const initialState: CardsState = {
  numOfCards: 0,
  cards: new Map<number, Card>(),
  lastElementIndex: -1,
  status: 'idle',
};

export const loadCards = createAsyncThunk<CardsState, void>('cards/loadCards', async () => {
  const resultAsString = await FileSystem.readAsStringAsync(fileDir + fileName);
  const loadState = JSON.parse(resultAsString) as CardsState;
  return loadState;
});

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    // カードの新規作成
    create: (state, action: PayloadAction<{ name: string; uri: string }>) => {
      if (state.status !== 'idle') return;
      if (action.payload.uri == '' || action.payload.name == '') return;

      state.numOfCards++;
      state.lastElementIndex++;

      // var card = action.payload;
      // card.id = state.lastElementIndex;
      // card.createdDate = new Date();
      const card: Card = {
        id: state.lastElementIndex,
        name: action.payload.name,
        uri: action.payload.uri,
        count: 0,
        createdDate: new Date().toLocaleString(),
        isDefault: false,
      };

      state.cards.set(card.id, card);

      writeAsStringAsync(fileDir, fileName, JSON.stringify(state));
    },
    // カードの削除
    remove: (state, action: PayloadAction<number>) => {
      if (state.status !== 'idle') return;

      state.cards.delete(action.payload);
      state.numOfCards--;

      writeAsStringAsync(fileDir, fileName, JSON.stringify(state));
    },
    // カードの編集
    edit: (state, action: PayloadAction<Card>) => {
      if (state.status !== 'idle') return;

      state.cards.set(action.payload.id, action.payload);
      writeAsStringAsync(fileDir, fileName, JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadCards.fulfilled, (state, action) => {
        state.status = 'idle';
        state = action.payload;
      })
      .addCase(loadCards.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { create, remove, edit } = cardsSlice.actions;

export const useCardsSelector = () => {
  const cards = useSelector((state: RootState) => state.cards);
  return cards;
};

export default cardsSlice.reducer;
