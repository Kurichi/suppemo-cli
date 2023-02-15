import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import * as FileSystem from 'expo-file-system';
import { writeAsStringAsync } from '../../utils/filesystem';

const fileDir = FileSystem.documentDirectory! + 'cards/';
const fileName = 'card_detail.json';

export interface CardsState {
  numOfCards: number;
  cards: Card[];
  lastElementIndex: number;
  status: 'loading' | 'idle' | 'failed';
}

const initialState: CardsState = {
  numOfCards: 0,
  cards: [],
  lastElementIndex: -1,
  status: 'idle',
};

export const loadCards = createAsyncThunk<CardsState, void>(
  'cards/loadCards',
  async () => {
    const resultAsString = await FileSystem.readAsStringAsync(
      fileDir + fileName
    );
    const loadState = JSON.parse(resultAsString) as CardsState;
    return loadState;
  }
);

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    // カードの新規作成
    create: (state, action: PayloadAction<Card>) => {
      if (state.status !== 'idle') return;

      state.numOfCards++;
      state.lastElementIndex++;

      var card = action.payload;
      card.id = state.lastElementIndex;
      card.createdDate = new Date();

      if (card.uri !== '' && card.name !== '')
        state.cards = [...state.cards, card];

      writeAsStringAsync(fileDir, fileName, JSON.stringify(state));
    },
    // カードの削除
    remove: (state, action: PayloadAction<number>) => {
      if (state.status !== 'idle') return;

      // 該当カードを二分探索
      const id = action.payload;
      var left = 0,
        right = state.numOfCards;
      while (left < right) {
        const mid = (left + right) / 2;
        const card = state.cards[mid];
        if (card.id === id) {
          state.cards.splice(mid, 1);
          state.numOfCards--;
          writeAsStringAsync(fileDir, fileName, JSON.stringify(state));
          return;
        } else if (card.id > id) left = mid + 1;
        else right = mid;
      }
    },
    // カードの編集
    edit: (state, action: PayloadAction<{ id: number; card: Card }>) => {
      if (state.status !== 'idle') return;

      const id = action.payload.id;
      var left = 0,
        right = state.numOfCards;
      while (left < right) {
        const mid = (left + right) / 2;
        const card = state.cards[mid];
        if (card.id === id) {
          state.cards[mid] = action.payload.card;
          writeAsStringAsync(fileDir, fileName, JSON.stringify(state));
          return;
        } else if (card.id > id) left = mid + 1;
        else right = mid;
      }
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
  return { cards };
};

export default cardsSlice.reducer;
