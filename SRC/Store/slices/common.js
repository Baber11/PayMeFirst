import {createSlice} from '@reduxjs/toolkit';
import { Platform } from 'react-native';

const initialState = {
  userData: {},
  categories: [],
  categoryProperties: [],
  financeBreakDown: [],
  notification : false,
  cartData : [],
  points : 0 ,

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
      state.cartData.push({selectedQuantity : 1 ,...action.payload})
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
      state.cartData[index].quantity == state.cartData[index].selectedQuantity ? 
      alert('Stock quantity exceeds')
      :
      state.cartData[index].selectedQuantity += 1

    },
    subQuantity(state , action){
      
      let index = state.cartData.findIndex((x)=>x?.id == action.payload.id);
      if(state.cartData[index].selectedQuantity == 1){

        
        let newData = [...state.cartData] ;
        newData.splice(index , 1);
        state.cartData = newData ; 
      }
      else{ 
        state.cartData[index].selectedQuantity -= 1
      }

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
    setPoints(state,action){
      state.points = action.payload
    }
  
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
  addQuantity,
  setPoints
  
} = CommonSlice.actions;

export default CommonSlice.reducer;
