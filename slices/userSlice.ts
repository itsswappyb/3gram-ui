import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserInterface {
  username: string;
  name?: string;
  bio?: string;
  avatar?: string;
}

const initialState: UserInterface = {
  username: '',
  name: '',
  bio: '',
  avatar: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<UserInterface>) => {
      state.username = action.payload.username || '';
      state.name = action.payload.name || '';
      state.bio = action.payload.bio || '';
      state.avatar = action.payload.avatar || '';
    },
    createUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const {createUser, createUsername} = userSlice.actions;
export default userSlice.reducer;
