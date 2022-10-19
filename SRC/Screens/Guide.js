import React, {useState} from 'react';
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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Guide = () => {
  const [state, setState] = useState(null);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState('Guide');
  console.log('Selected =>', selected);

  const [isLoading, setIsLoading] = useState(false);

  const Header = apiHeader();
  const dummyData = [
    {
      image: require('../Assets/Images/img1.png'),
      title: 'Insurance',
    },
    {
      image: require('../Assets/Images/img2.png'),
      title: 'Commodities',
    },
    {
      image: require('../Assets/Images/img3.png'),
      title: 'Credit',
    },
    {
      image: require('../Assets/Images/img4.png'),
      title: 'Vault',
    },
  ];

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={false}
      statusBarBackgroundColor={'#F6F6F6'}
      statusBarContentStyle={'dark-content'}
      headerType={2}
      showList={false}
      headerColor={'#F6F6F6'}
    >
      <View
        // showsVerticalScrollIndicator={false}
        style={styles.sectionContainer}
      >
        {/* <CustomText style={styles.txt4}>Total Balance</CustomText> */}
        <View style={[styles.row]}>
          <CustomText
            onPress={() => {
              setSelected('My Wallet');
            }}
            style={[
              styles.textWithContainer,
              selected == 'My Wallet' && {
                backgroundColor: Color.green,
                color: 'white',
              },
            ]}
          >
            My Wallet
          </CustomText>
          <CustomText
            onPress={() => {
              setSelected('My Future');
            }}
            style={[
              styles.textWithContainer,
              selected == 'My Future' && {
                backgroundColor: Color.green,
                color: 'white',
              },
            ]}
          >
            My Future
          </CustomText>
          <CustomText
            onPress={() => {
              setSelected('Guide');
            }}
            style={[
              styles.textWithContainer,
              selected == 'Guide' && {
                backgroundColor: Color.green,
                color: 'white',
              },
            ]}
          >
            {' '}
            Guide
          </CustomText>
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            alignSelf: 'flex-start',
            marginTop: moderateScale(20, 0.3),
            width: windowWidth,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: windowWidth * 0.95,
            }}
          >
            <CustomText style={[styles.textWithContainer]}>Account</CustomText>
            <CustomText isBold>...</CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: windowWidth * 0.95,
            }}
          >
            <CustomText style={[styles.textWithContainer]}>
              Other Services
            </CustomText>
            <CustomText isBold>...</CustomText>
          </View>
        </View>

        <View style={styles.subcontainer}>
          {/* <View
            style={{
              width: windowWidth,
            
              height: windowHeight * 0.5,
            }}
          > */}
          <FlatList
            style={{marginTop: moderateScale(20, 0.3)}}
            contentContainerStyle={{alignItems: 'center'}}
            data={dummyData}
            renderItem={({item, index}) => {
              return (
                <ExpenditureComponent
                  image={item.image}
                  text1={item.title}
                  fromGuide={true}
                  index={index == dummyData.length - 1}
                />
              );
            }}
          />
          {/* </View> */}
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
  Txt: {
    marginTop: moderateScale(10, 0.3),
    color: Color.themeBlack,
    fontSize: moderateScale(22, 0.6),
    textAlign: 'center',
  },
  tou: {
    marginTop: height * 0.03,
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconContainer: {
    width: windowWidth * 0.75,
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.3),
    marginTop: moderateScale(10, 0.3),
    backgroundColor: 'orange',
  },
  subcontainer: {
    paddingBottom: moderateScale(20, 0.3),
    width: windowWidth,
    height: windowHeight * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
    borderTopLeftRadius: moderateScale(45, 0.3),
    borderTopRightRadius: moderateScale(45, 0.3),
    marginTop: moderateScale(40, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },

  cont: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.23,
    borderRadius: moderateScale(20, 0.3),
    // opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'orange',
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
  textWithContainer: {
    fontSize: moderateScale(16, 0.3),
    padding: moderateScale(5, 0.3),
    borderRadius: moderateScale(5, 0.3),
    backgroundColor: '#F6F6F6',
    marginLeft: moderateScale(15, 0.3),
    fontWeight: '400',
  },

  txt2: {
    color: Color.green,
    fontSize: moderateScale(25, 0.6),
    // fontWeight: 'bold',
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
    // width: '60%',
    // marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },
  txt4: {
    color: Color.black,
    fontSize: moderateScale(14, 0.6),
    // fontWeight: 'bold',
    // borderBottomWidth: 1,
    // borderColor: Color.white,
  },
  txt5: {
    color: Color.black,

    fontSize: moderateScale(12, 0.6),
  },
});

export default Guide;
