import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
  fcmToken: null,
  isVerified: false,
  userWalkThrough: false,
  isGoalCreated : false ,
  pm_type : ''
};

const AuthSlice = createSlice({
  name: 'authReducer',
  initialState: initialState,
  reducers: {
    setUserToken(state, action) {
      state.token = action?.payload?.token;
      console.log('TOKEN', state.token);
    },
    setGoalCreated(state,action){
      console.log('here ==== >',action?.payload);
      state.isGoalCreated = action?.payload
    },
    SetFCMToken(state, action) {
      state.fcmToken = action?.payload?.fcmToken;
    },
    setUserLogin(state, action) {
      state.token = action?.payload;
    },
    setIsVerified(state, action) {
      state.isVerified = action?.payload;
      console.log('isVerified', state.isVerified);
    },
    setUserLogout(state, action) {
      state.token = null;
      state.fcmToken = null;
    },
    setWalkThrough(state, action) {
      state.userWalkThrough = true;
    },
    setPm_Type(state , action){
      state.pm_type = action.payload
    }
  },
});

export const {
  setIsVerified,
  setUserLogin,
  setUserLogout,
  setUserToken,
  SetFCMToken,
  setWalkThrough,
  setGoalCreated,
  setPm_Type,
} = AuthSlice.actions;

export default AuthSlice.reducer;
