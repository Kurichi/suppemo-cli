import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import * as FileSystem from 'expo-file-system';
import { writeAsStringAsync } from '../../utils/filesystem';
import { search } from '../toolkit';

const fileDir = FileSystem.documentDirectory! + 'sequence';
const fileName = 'sequences.json';

export interface SequencesState {
  numOfSequences: number;
  sequences: Sequence[];
  lastElementIndex: number;
  status: 'loading' | 'idle' | 'failed';
}

const initialState: SequencesState = {
  numOfSequences: 0,
  sequences: [],
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

      state.numOfSequences++;
      state.lastElementIndex++;

      var sequence = action.payload;
      sequence.id = state.lastElementIndex;

      if (sequence.name != '') state.sequences = [...state.sequences, sequence];

      writeAsStringAsync(fileDir, fileName, JSON.stringify(state));
    },
    //sequenceの削除
    remove: (state, action: PayloadAction<number>) => {
      if (state.status != 'idle') return;

      const index = search(action.payload, state.numOfSequences, state.sequences);
      if (index != -1) {
        state.sequences.splice(index, 1);
        state.numOfSequences--;
        writeAsStringAsync(fileDir, fileName, JSON.stringify(state));
      }
    },
    //sequenceの編集
    edit: (state, action: PayloadAction<{ id: number; sequence: Sequence }>) => {
      if (state.status != 'idle') return;

      const index = search(action.payload.id, state.numOfSequences, state.sequences);
      if (index != -1) {
        state.sequences[index] = action.payload.sequence;
        writeAsStringAsync(fileDir, fileName, JSON.stringify(state));
      }
    },
  },
});

export const { add, remove, edit } = sequencesSlice.actions;

export const useSequencesSelector = () => {
  const sequences = useSelector((state: RootState) => state.sequences.sequences);
  return { sequences };
};

export default sequencesSlice.reducer;
