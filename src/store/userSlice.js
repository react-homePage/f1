import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userDataArray: [],
};
const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log('user added');
      const data = Array.isArray(state.userDataArray)
        ? state.userDataArray
        : [];

      // Check if the user already exists in the array
      const userExists = data.some(item => item.email === action.payload.email);

      // Only add the user if they don't already exist
      if (!userExists) {
        state.userDataArray = [...data, action.payload];
      }
    },
    deleteUser: (state, action) => {
      console.log('delete user');
      const result = state.userDataArray;
      const ans = result.filter(item => item.email !== action.payload);
      state.userDataArray = ans;
    },
    editUser: (state, action) => {
      const {findIndexValue, newObject} = action.payload;
      let updatedArray = [...state.userDataArray];
      console.log('updated Array', updatedArray);
      updatedArray[findIndexValue] = newObject;
      state.userDataArray = updatedArray;
    },
    clearArray: state => {
      state.userDataArray = [];
      console.log('empty array', state.userDataArray);
    },
  },
});
export const {editUser, deleteUser, addUser, clearArray} = userSlice.actions;
export const userReducer = userSlice.reducer;
