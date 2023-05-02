import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import * as FileSystem from 'expo-file-system';
import { writeAsStringAsync } from '../../utils/filesystem';
import { search } from '../toolkit';

const fileDir = FileSystem.documentDirectory! + 'sequences/';
const fileName = 'sequences.json';

export interface SequencesState {
  numOfSequences: number;
  sequences: Map<number, Sequence>;
  lastElementIndex: number;
  status: 'loading' | 'idle' | 'failed';
}

const initialState: SequencesState = {
  numOfSequences: 0,
  sequences: new Map<number, Sequence>(),
  lastElementIndex: -1,
  status: 'idle',
};

export const sequencesSlice = createSlice({
  name: 'sequences',
  initialState,
  reducers: {
    //sequenceの追加
    add: (state, action: PayloadAction<Sequence>) => {
      if (state.status != 'idle') return;
      if (action.payload.name == '') return;

      state.numOfSequences++;
      state.lastElementIndex++;

      var sequence = action.payload;
      sequence.id = state.lastElementIndex;

      state.sequences.set(sequence.id, sequence);

      writeAsStringAsync(fileDir, fileName, JSON.stringify(state));
    },
    //sequenceの削除
    remove: (state, action: PayloadAction<number>) => {
      if (state.status != 'idle') return;

      state.sequences.delete(action.payload);
      state.numOfSequences--;
      writeAsStringAsync(fileDir, fileName, JSON.stringify(state));
    },
    //sequenceの編集
    edit: (state, action: PayloadAction<Sequence>) => {
      if (state.status != 'idle') return;

      state.sequences.set(action.payload.id, action.payload);
      writeAsStringAsync(fileDir, fileName, JSON.stringify(state));
    },
  },
});

export const { add, remove, edit } = sequencesSlice.actions;

export const useSequencesSelector = () => {
  const sequences = useSelector((state: RootState) => state.sequences);
  return sequences;
};

export default sequencesSlice.reducer;
