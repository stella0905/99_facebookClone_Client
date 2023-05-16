import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  profile_url: '',
};

const usersSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setProfileUrl: (state, action) => {
      state.profile_url = action.payload;
    },
  },
});

export const { setName, setProfileUrl } = usersSlice.actions;

export default usersSlice.reducer;
