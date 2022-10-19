import React, {useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';

import {Icon, ScrollView} from 'native-base';
import CardContainer from '../Components/CardContainer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LineChart} from 'react-native-chart-kit';
import CustomImage from './CustomImage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const AchievmentCard = ({image, title}) => {
  return (
    <View style={[styles.smallContainer]}>
      <CustomText style={[styles.txt4]}>{title}</CustomText>
      <CustomImage
        source={image}
        resizeMode={'contain'}
        style={
          {
            // width: '80%',
            // height: '80%',
          }
        }
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  sectionContainer: {
    // flex: 1,
    height: windowHeight,
    paddingTop: moderateScale(5, 0.3),
    backgroundColor: Color.white,
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
  smallContainer: {
    paddingHorizontal: moderateScale(15, 0.3),
    width: windowWidth * 0.9,
    height: windowHeight * 0.15,
    flexDirection: 'row',
    backgroundColor: Color.green,
    alignItems: 'center',
    justifyContent: 'space-between',

    // marginRight: moderateScale(10, 0.3),
    borderRadius: moderateScale(20, 0.3),
    marginBottom: moderateScale(20, 0.3),
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
    width: windowWidth,
    height: windowHeight * 0.6,
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
  },
  txtContainer: {
    marginTop: moderateScale(5, 0.3),
    backgroundColor: Color.themeGreen,
    borderRadius: moderateScale(5, 0.3),
    color: Color.white,
    padding: moderateScale(5, 0.3),
    paddingHorizontal: moderateScale(15, 0.3),
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
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: Color.white,
    borderRadius: moderateScale(30, 0.3),
    paddingHorizontal: moderateScale(25, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    marginVertical: moderateScale(40, 0.3),
  },
  row: {
    width: windowWidth,
    height: moderateScale(60, 0.3),
    marginTop: moderateScale(10, 0.3),
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

  txt2: {
    color: Color.green,
    fontSize: moderateScale(15, 0.6),
    position: 'absolute',
    right: moderateScale(10, 0.3),
    // alignS: 'flex-end',
    // fontWeight: 'bold',
  },
  txt3: {
    // backgroundColor: 'red',
    color: Color.themeLightGray,
    fontSize: moderateScale(11, 0.6),
    // width: '60%',
    // marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(20, 0.3),
  },
  txt4: {
    color: Color.white,
    fontSize: moderateScale(24, 0.6),
    fontWeight: '200',
  },
  txt5: {
    color: Color.black,

    fontSize: moderateScale(12, 0.6),
  },

  absolute: {
    width: moderateScale(40, 0.3),
    height: moderateScale(40, 0.3),
    borderRadius: moderateScale(20, 0.3),
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: moderateScale(10, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
