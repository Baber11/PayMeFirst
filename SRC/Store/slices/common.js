import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  categories: [],
  categoryProperties: [],
  financeBreakDown: [],
  notification : false,
  cartData : []

};

const CommonSlice = createSlice({
  name: 'commonReducer',
  initialState: initialState,
  reducers: {
    setCategoryProperties(state, action) {
      state.categoryProperties = action?.payload;
      // console.log("reduxxxx", state.categoryProperties);
    },
    setCartData(state, action) {
      state.cartData.push(action.payload)
      console.log("reduxxxx", state.cartData);
    },
    setRemoveCardData(state, action) {
      let data = [...state.cartData];
      data.splice(action.payload , 1);
      state.cartData = data ;


    },
    setProductColor(state , action){
      let index = state.cartData.findIndex((x)=>x?.id == action.payload.id);
      // console.log("🚀 ~ file: common.js:34 ~ setProductColor ~ index", index)
      state.cartData[index] = {...state.cartData[index] , selectedColor : action.payload.color}
    },
    setProductSize(state , action){
      let index = state.cartData.findIndex((x)=>x?.id == action.payload.id);
      // console.log("🚀 ~ file: common.js:34 ~ setProductColor ~ index", index)
      state.cartData[index] = {...state.cartData[index] , selectedSize : action.payload.size}
    },
    setWholeCart(state , action){
      state.cartData = action.payload;
    },
    addQuantity(state , action){
      let index = state.cartData.findIndex((x)=>x?.id == action.payload.id);
      state.cartData[index].quantity += 1

    },
    subQuantity(state , action){
      let index = state.cartData.findIndex((x)=>x?.id == action.payload.id);
      state.cartData[index].quantity -= 1

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
    setFinanceBreakDown(state, action) {
      state.financeBreakDown = action.payload;
    },
    setNotification(state,action){
      state.notification = action.payload
    },
  
  },
});

export const {
  setUserData,
  setUserLogOut,
  setServiceCategories,
  setCategoryProperties,
  setFinanceBreakDown,
  setNotification,
  setRemoveCardData,
  setWholeCart,
  setCartData,
  setProductColor,
  setProductSize,
  subQuantity,
  addQuantity
  
} = CommonSlice.actions;

export default CommonSlice.reducer;
