import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import numeral from 'numeral';
import {useDispatch, useSelector} from 'react-redux';
import {setCartData, setRemoveCardData} from '../Store/slices/common';
import navigationService from '../navigationService';

const ProductCard = ({item, onPress, style , height}) => {
  const cartData = useSelector(state => state.commonReducer.cartData);
  const dispatch = useDispatch();

  return (
    <View style={style && style}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={[
          {
            marginBottom: moderateScale(10, 0.3),
            borderRadius: moderateScale(10, 0.3),
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            width : windowWidth * 0.43,
            elevation: 9,
            backgroundColor: Color.white,
          
          },
          cartData?.some(data => data.id == item?.id) && {
            borderWidth: 1,
            borderColor: Color.lightGreen,
          },
        ]}>
        <View style={[styles.cardContainer,{height : height}]}>
          <CustomImage
            onPress={onPress}
            source={item?.photo ? {uri : item?.photo} : require('../Assets/Images/shoes2.jpg')}
            resizeMode={'cover'}
            style={{
              height: height ? height : windowHeight * 0.26,
              width: '100%',
            }}
          />
        </View>
        <CustomText
        numberOfLines={1}
          style={{
            color: Color.black,
            marginTop: moderateScale(5, 0.3),
            marginLeft : moderateScale(10,0.3),
            fontSize : moderateScale(14,0.6),
            width : windowWidth *0.38,
          }}>
          {item?.name}
        </CustomText>
        <CustomText isBold style={{ width : '45%',color: Color.green ,marginLeft : moderateScale(10,0.3),
            fontSize : moderateScale(14,0.6)}}>
          {numeral(item?.price).format('$0,0.0')}
        </CustomText>
        <CustomText onPress={()=>{
          navigationService.navigate('ProductDetails',{detail : item})
        }} style={{
          position : 'absolute',
          bottom : 2 ,
          right : 7,
          fontSize : moderateScale(10,0.6),
          color : Color.themeLightGray,
          textDecorationLine : 'underline',
        
        }}>View Details</CustomText>
      </TouchableOpacity>
      {cartData?.some(data => data.id == item?.id) && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            // let data=[];
            // data = [...cartData],
            let index1 = cartData.findIndex(x => x?.id == item?.id);
            dispatch(setRemoveCardData(index1));
            // data.splice(index1,1),
          }}
          style={styles.remove}>
          <CustomText
            isBold
            style={{
              color: 'rgb(175, 4, 60)',
              fontSize: moderateScale(14, 0.3),
            }}>
            Remove
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: windowWidth * 0.43,
    height: windowHeight * 0.26,
    backgroundColor: 'white',
    borderRadius: moderateScale(10, 0.3),
    overflow: 'hidden',
  },
  heart: {
    width: moderateScale(40, 0.3),
    height: moderateScale(40, 0.3),
    borderRadius: moderateScale(20, 0.3),
    backgroundColor: Color.themePink,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: moderateScale(10, 0.3),
    top: moderateScale(10, 0.3),
    zIndex: 1,
  },
  remove: {
    marginBottom: moderateScale(10, 0.3),
    width: windowWidth * 0.41,
    height: windowHeight * 0.05,
    // backgroundColor: 'rgb(175, 4, 60)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth : 1,
    borderColor : 'rgb(175, 4, 60)',
    borderRadius : moderateScale(5,0.3)
    // alignSelf : 'center'
  },
});
