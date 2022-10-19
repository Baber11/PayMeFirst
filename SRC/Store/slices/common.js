import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  categories: [],
  categoryProperties: [],
};

const CommonSlice = createSlice({
  name: "commonReducer",
  initialState: initialState,
  reducers: {
    setCategoryProperties(state, action) {
      state.categoryProperties = action?.payload;
      // console.log("reduxxxx", state.categoryProperties);
    },
    setUserData(state, action) {
      state.userData = action?.payload;
      // state.userData = action?.payload?.userData;
    },
    setUserLogOut(state, action) {
      state.userData = {};
    },
    setServiceCategories(state, action) {
      state.categories = action?.payload;
    },
  },
});

export const {
  setUserData,
  setUserLogOut,
  setServiceCategories,
  setCategoryProperties,
} = CommonSlice.actions;

export default CommonSlice.reducer;
