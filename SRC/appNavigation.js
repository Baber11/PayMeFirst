import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationService from './navigationService';
import {useSelector} from 'react-redux';
import Walkthrough from './Screens/Walkthrough';
import LoginScreen from './Screens/LoginScreen';
import EnterPhone from './Screens/EnterPhone';
import VerifyNumber from './Screens/VerifyNumber';
import AddCard from './Screens/AddCard';
import SetGoals from './Screens/SetGoals';
import SelectDate from './Screens/SelectDate';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/HomeScreen';
import Guide from './Screens/Guide';
import MyFuture from './Screens/MyFuture';
import Profile from './Screens/Profile';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from './Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import Rewards from './Screens/Rewards';
import TermsAndConditions from './Screens/TermsAndConditions';
import FinancialBreakDown from './Screens/FinancialBreakDown';
import SignupScreen from './Screens/SignupScreen';
import ResetPassword from './Screens/ResetPassword';
import Wallet from './Screens/Wallet';
import ChangePassword from './Screens/ChangePassword';
import PaymentMethod from './Screens/PaymentMethod';
import Support from './Screens/Support';
import MyAccounts from './Screens/MyAccounts';
import Subscription from './Screens/Subscription';
import NotificationScreen from './Screens/NotificationScreen';
import Category from './Screens/Category';
import SelectedCategory from './Screens/SelectedCategory';
import ProductDetails from './Screens/ProductDetails';
import GoalHistory from './Screens/GoalHistory';
import ViewCart from './Screens/ViewCart';
import Checkout from './Screens/Checkout';

const AppNavigator = () => {
  const user = useSelector(state => state.commonReducer.userData);
  console.log("🚀 ~ file: appNavigation.js:40 ~ AppNavigator ~ user", user)
  // const isLogin = false;
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const pm_type = useSelector(state => state.authReducer.pm_type);
  console.log("🚀 ~ file: appNavigation.js:39 ~ AppNavigator ~ pm_type", pm_type)
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();
  // 
  const AppNavigatorContainer = () => {
    const firstScreen =
      walkThrough == false
        ? 'Walkthrough'
        :token != null && [null,'',undefined].includes(pm_type) ?
        'AddCard' 
        : token != null && isGoalCreated == false && [null,'',undefined].includes(user?.wallet?.amount)
        ? 'SetGoals'
        : token != null && (isGoalCreated == true ||  ![null,'',undefined].includes(user?.wallet?.amount))
        ? 'TabNavigation'
        : 'LoginScreen';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
          <RootNav.Screen name="Walkthrough" component={Walkthrough} />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="EnterPhone" component={EnterPhone} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="AddCard" component={AddCard} />
          <RootNav.Screen name="SetGoals" component={SetGoals} />
          <RootNav.Screen name="SelectDate" component={SelectDate} />
          <RootNav.Screen name="Rewards" component={Rewards} />
          <RootNav.Screen name="SignupScreen" component={SignupScreen} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="ChangePassword" component={ChangePassword} />
          <RootNav.Screen name="PaymentMethod" component={PaymentMethod} />
          <RootNav.Screen name="Support" component={Support} />
          <RootNav.Screen name="MyAccounts" component={MyAccounts} />
          <RootNav.Screen name="Subscription" component={Subscription} />
          <RootNav.Screen name="NotificationScreen" component={NotificationScreen} />
          <RootNav.Screen name="Category" component={Category} />
          <RootNav.Screen name="SelectedCategory" component={SelectedCategory} />
          <RootNav.Screen name="ProductDetails" component={ProductDetails} />
          <RootNav.Screen name="GoalHistory" component={GoalHistory} />
          <RootNav.Screen name="ViewCart" component={ViewCart} />
          <RootNav.Screen name="Checkout" component={Checkout} />





          <RootNav.Screen
            name="FinancialBreakDown"
            component={FinancialBreakDown}
          />

          <RootNav.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
          />

          <RootNav.Screen name="TabNavigation" component={TabNavigation} />
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

export const TabNavigation = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName;
          let color = Color.themeColor;
          let size = moderateScale(20, 0.3);

          if (route.name === 'HomeScreen') {
            iconName = focused ? 'home' : 'home-outline';
            color = focused ? Color.green : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'Guide') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            color = focused ? Color.green : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'ios-wallet' : 'ios-wallet-outline';
            color = focused ? Color.green : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else {
            iconName = focused ? 'people-circle' : 'people-circle-outline';
            color = focused ? Color.green : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          }
          return (
            <Icon name={iconName} as={Ionicons} color={color} size={size} />
          );
        },
        tabBarShowLabel: false,
      })}>
      <Tabs.Screen name={'HomeScreen'} component={HomeScreen} />
      <Tabs.Screen name={'Guide'} component={Guide} />
      <Tabs.Screen name={'Wallet'} component={Wallet} />
      <Tabs.Screen name={'Profile'} component={Profile} />
    </Tabs.Navigator>
  );
};

export default AppNavigator;
