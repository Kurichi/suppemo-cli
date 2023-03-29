import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import * as FileSystem from 'expo-file-system';
import { writeAsStringAsync } from "../../utils/filesystem";

const fileDir = FileSystem.documentDirectory! + 'cardFolders/';
const fileName = 'cardFolders.json';

export interface CardFolderState {
  numOfFolders: number;
  cardFolders: Map<number, CardFolder>;
  lastElementIndex: number;
  status: 'loading' | 'idle' | 'failed';
}

const initialState: CardFolderState = {
  numOfFolders: 0,
  cardFolders: new Map<number, CardFolder>(),
  lastElementIndex: -1,
  status: 'idle',
};

export const cardFoldersSlice = createSlice({
  name: 'cardFolders',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CardFolder>) => {
      if(state.status != 'idle') return;

      state.numOfFolders++;
      state.lastElementIndex++;

      var folder = action.payload;
      folder.id = state.lastElementIndex;

      state.cardFolders.set(folder.id, folder);

      writeAsStringAsync(fileDir, fileName, JSON.stringify(state));
    },
    remove: (state, action: PayloadAction<number>) => {
      if (state.status != 'idle') return;

      state.cardFolders.delete(action.payload);
      state.numOfFolders--;
      writeAsStringAsync(fileDir, fileName, JSON.stringify(state));
    },
    edit: (state, action: PayloadAction<CardFolder>) => {
      if(state.status != 'idle') return;

      state.cardFolders.set(action.payload.id, action.payload);
      writeAsStringAsync(fileDir, fileName, JSON.stringify(state));
    },
  },
});


export const { add, remove, edit } = cardFoldersSlice.actions;

export const useCardFolderSelector = () => {
  const folders = useSelector((state: RootState) => state.cardFolders);
  return folders;
};

export default cardFoldersSlice.reducer;