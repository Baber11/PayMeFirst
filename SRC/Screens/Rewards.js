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
import {setLevel, setPoints} from '../Store/slices/common';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Rewards = () => {
  const token = useSelector(state => state.authReducer.token);
  const points = useSelector((state)=>state.commonReducer.userData?.points)
  console.log("🚀 ~ file: Rewards.js:45 ~ Rewards ~ points:", points)
  const level = useSelector((state)=>state.commonReducer.level)
  console.log("🚀 ~ file: Rewards.js:44 ~ Rewards ~ level:", level)
  const navigation = useNavigation();
  const [state, setState] = useState([]);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const LevelsArray = [
    {min: 1.1, max: 100, text: 'Trainee', color: ['rgba(255,0,0 , 0.9)','rgba(115,0,0 , 0.9)']},
    {min: 100.1, max: 200, text: 'Amateur', color: ['rgba(0,0,255 , 0.9)','rgba(0,0,155 , 0.9)']},
    {min: 200.1, max: 300, text: 'Hustler', color: ['rgba(250,125,0 , 0.9)','rgba(110,25,0 , 0.9)']},
    {
      min: 300.1,
      max: 400,
      text: 'Professional',
      color: ['rgba(97,179,59 , 0.9)','rgba(97,119,9 , 0.9)'],
    },
    {min: 400.1, max: 500, text: 'Virtuoso', color: ['rgba(15,206,235 , 0.9)','rgba(215,106,135 , 0.9)']},
    {min: 500.1, max: 600, text: 'Expert', color: ['rgba(148,65,52 , 0.9)','rgba(48,25,52 , 0.9)']},
    {min: 600.1, max: 700, text: 'Veteran', color: ['rgba(155,165,0, 0.9)','rgba(255,165,0, 0.9)']},
    {
      min: 700.1,
      max: 800,
      text: 'Grand Master',
      color: ['rgba(255,192,143, 0.9)','rgba(255,192,203, 0.9)'],
    },
    {min: 800.1, max: 900, text: 'Ace', color: ['rgba(195,215,0, 0.9)','rgba(255,215,0, 0.9)']},
    {min: 900.1, max: 1000, text: 'Super star', color: ['rgba(135,26,235 , 0.9)','rgba(105,26,235, 0.9)']},
  ];
  // const points = 543;

  // const getTrophies = async () => {
  //   const url = 'auth/trophy';
  //   setIsLoading(true);
  //   const response = await Get(url, token);
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     console.log(response?.data);
  //     setState(response?.data?.data);
  //   }
  // };

  useEffect(() => {
    const data = LevelsArray.filter(
      (x, index) => points >= x?.min && points <= x?.max,
    );
    dispatch(setLevel(data[0]?.text))
    console.log(data);
  }, []);

  // useEffect(() => {
  //   var pointsTotal = 0;
  //   if(state.length > 0){

  //     state.map((x)=>pointsTotal += parseInt(x?.points));
  //     dispatch(setPoints(pointsTotal))

  //   }

  // }, [state])

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
      <View style={styles.sectionContainer}>
        <CustomText isBold style=
        {{
          fontSize : moderateScale(25,0.6),
          color : Color.black
        }}>{level?.payload}</CustomText>
        <CustomText style={{
          fontSize : moderateScale(12,0.6),
          color : Color.green
        }}>Pay Me Level</CustomText>

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: moderateScale(40, 0.6),
            paddingTop : moderateScale(20,0.6)
          }}
          data={LevelsArray}
          renderItem={({item, index}) => {
            return <LevelContainer item={item} points={points} />;
          }}
        />
        {/* <View style={styles.subcontainer}>
        </View> */}
      </View>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  sectionContainer: {
    height: windowHeight * 0.83,
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
    overflow: 'hidden',
  },

  row: {
    width: windowWidth,
    marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
  },

  txt2: {
    color: Color.green,
    fontSize: moderateScale(25, 0.6),
  },
  mainContainer: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.1,
    borderRadius: moderateScale(5, 0.6),
    backgroundColor: 'rgba(190,190,190,0.8)',
    marginBottom: moderateScale(10, 0.3),
    overflow: 'hidden',
  },

  textContainer: {
    alignSelf: 'center',
    width: windowWidth * 0.8,
    height: windowHeight * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 1,
  },
});

export default Rewards;
const LevelContainer = ({points, item}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <View>
          <CustomText
            isBold
            style={{
              color: Color.white,
              fontSize: moderateScale(14, 0.6),
            }}>
            {item?.text}
          </CustomText>
          <CustomText
            isBold
            style={{
              color: Color.white,
              fontSize: moderateScale(10, 0.6),
            }}>{`${points < item?.max ? points : item?.max}/${
            item?.max
          }`}</CustomText>
        </View>
        {Math.round(((points - item?.min) / 100) * 100)  > 0 ?

          <CustomText
          isBold
          style={{
            color: Color.white,
            fontSize: moderateScale(9, 0.6),
          }}>{`${
          Math.round(((points - item?.min) / 100) * 100) < 100
            ? Math.round(((points - item?.min) / 100) * 100)
            : '100'
          }%`}</CustomText>
          :
          <Icon 
          name={'lock'}
          as={FontAwesome}
          color={'#EEEEEE'}
          size={moderateScale(15,0.6)}
          />
        }
      </View>
      <LinearGradient
      colors={item.color}
        style={{
          height: '100%',
          width:
            points >= item.min
              ? `${Math.round(((points - item?.min) / 100) * 100)}%`
              : '0%',
          // backgroundColor: item.color,
          maxWidth: '100%',
          borderRadius: moderateScale(5, 0.6),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,

          elevation: 8,
          zIndex: -1,
          // position : 'absolute'
        }}></LinearGradient>
    </View>
  );
};
