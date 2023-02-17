import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Platform,
  ToastAndroid,
  Alert,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {Circle, G, Rect, Text} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';

import navigationService from '../navigationService';

import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomButton from '../Components/CustomButton';
import {validateEmail} from '../Config';
import {ActivityIndicator} from 'react-native';
import {Icon, ScrollView} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LineChart} from 'react-native-chart-kit';
import * as Progress from 'react-native-progress';
import moment from 'moment';
import {ExpenditureComponent} from '../Components/ExpenditureComponent';
import {AchievmentCard} from '../Components/AchievmentCard';
import {useNavigation} from '@react-navigation/native';
import {Get} from '../Axios/AxiosInterceptorFunction';
import { setPoints } from '../Store/slices/common';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Rewards = () => {
  const token = useSelector(state => state.authReducer.token);
  const navigation = useNavigation();
  const [state, setState] = useState([]);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const getTrophies = async () => {
    const url = 'auth/trophy';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      console.log(response?.data);
      setState(response?.data?.data);
    }
  };

  useEffect(() => {
    getTrophies();
  }, []);

  useEffect(() => {
    var pointsTotal = 0;  
    if(state.length > 0){

      state.map((x)=>pointsTotal += parseInt(x?.points));
      dispatch(setPoints(pointsTotal))
        
    }

  }, [state])
  

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      statusBarBackgroundColor={'#F6F6F6'}
      statusBarContentStyle={'dark-content'}
      headerType={2}
      showList={false}
      headerColor={'#F6F6F6'}>
      <Icon
        name={'arrowleft'}
        as={AntDesign}
        color={Color.green}
        size={moderateScale(25, 0.3)}
        position={'absolute'}
        style={{top: moderateScale(30, 0.3), left: moderateScale(10, 0.3)}}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View
        // showsVerticalScrollIndicator={false}
        style={styles.sectionContainer}>
        <CustomText style={styles.txt2}>Rewards</CustomText>

        <View style={styles.subcontainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            // style={{marginTop: moderateScale(20, 0.3)}}
            contentContainerStyle={{
              alignItems: 'center',
              paddingTop: moderateScale(40, 0.3),
            }}
            data={state}
            renderItem={({item, index}) => {
              return (
                <AchievmentCard
                  image={
                    index % 2 == 0
                      ? require('../Assets/Images/cup.png')
                      : require('../Assets/Images/madel.png')
                  }
                  title={item.name}
                  points={item?.points}
                />
              );
            }}
          />
        </View>
      </View>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  sectionContainer: {
    // flex: 1,
    height: windowHeight,
    paddingTop: moderateScale(5, 0.3),
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    width: windowWidth,
   
  },

  subcontainer: {
    paddingBottom: moderateScale(20, 0.3),
    width: windowWidth,
    height: windowHeight * 0.75,
    backgroundColor: Color.white,
    borderTopLeftRadius: moderateScale(45, 0.3),
    borderTopRightRadius: moderateScale(45, 0.3),
    marginTop: moderateScale(60, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    overflow : 'hidden',
    // backgroundColor : 'red'
  },


  row: {
    width: windowWidth,
    // height: moderateScale(60, 0.3),
    marginTop: moderateScale(10, 0.3),
    // backgroundColor: 'red',
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },


  txt2: {
    color: Color.green,
    fontSize: moderateScale(25, 0.6),
    // fontWeight: 'bold',
  },
 

});

export default Rewards;
