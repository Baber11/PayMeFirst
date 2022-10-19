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

const AppNavigator = () => {
  // const isLogin = false;
  // const isLogin = useSelector(state => state.authReducer.isLoggedIn);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  console.log('token>>>>', token);
  console.log('isVerified', isVerified);
  console.log(
    '🚀 ~ file: appNavigation.js ~ line 32 ~ AppNavigator ~ walkThrough',
    walkThrough,
  );

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  // verified == true && token != null (MyDrawer)
  // verified == false && token == null (MyDrawer + labels)
  // verified == false || token (EnterCode)
  // walkthrough == false ? walkthrough : MyDrawer

  const AppNavigatorContainer = () => {
    const firstScreen =
      walkThrough == false
        ? 'Walkthrough'
        : token
        ? 'TabNavigation'
        : 'LoginScreen';
    // : isVerified == true && token != null
    // ? "MyDrawer"
    // : isVerified == false && token == null
    // ? "MyDrawer"
    // : isVerified == false || token != null
    // ? "EnterCode"
    // : "MyDrawer";
    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}
        >
          <RootNav.Screen name="Walkthrough" component={Walkthrough} />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="EnterPhone" component={EnterPhone} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="AddCard" component={AddCard} />
          <RootNav.Screen name="SetGoals" component={SetGoals} />
          <RootNav.Screen name="SelectDate" component={SelectDate} />
          <RootNav.Screen name="Rewards" component={Rewards} />
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
          } else if (route.name === 'MyFuture') {
            iconName = focused ? 'ios-card' : 'ios-card-outline';
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
      })}
    >
      <Tabs.Screen name={'HomeScreen'} component={HomeScreen} />
      <Tabs.Screen name={'Guide'} component={Guide} />
      <Tabs.Screen name={'MyFuture'} component={MyFuture} />
      <Tabs.Screen name={'Profile'} component={Profile} />
    </Tabs.Navigator>
  );
};

export default AppNavigator;
