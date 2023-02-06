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

import CustomImage from './CustomImage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const AchievmentCard = ({image, title , points}) => {
  return (
    <View style={[styles.smallContainer]}>
      <CustomText numberofLines={2} style={[styles.txt4]}>{title}</CustomText>
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
      <CustomText isBold style={{
        position : 'absolute',
        bottom : 5,
        left : moderateScale(15,0.3),color : Color.white, fontSize : moderateScale(11,0.3)
      }}>{points} Points</CustomText>
    </View>
  );
};

const styles = ScaledSheet.create({
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

  txt4: {
    color: Color.white,
    fontSize: moderateScale(24, 0.6),
    fontWeight: '200',
    // backgroundColor: 'red',
    width : windowWidth * 0.6
  },
});
