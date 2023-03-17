import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomImage from './CustomImage';
import {Icon} from 'native-base';
import {
  addQuantity,
  setProductColor,
  setProductSize,
  subQuantity,
} from '../Store/slices/common';
import {useDispatch, useSelector} from 'react-redux';
import numeral from 'numeral';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartItem = ({item, fromCheckout}) => {
  const cartData = useSelector(state => state.commonReducer.cartData);
  console.log("🚀 ~ file: CartItem.js:22 ~ CartItem ~ cartData:", cartData)
  const dispatch = useDispatch();

  return (
    <View style={styles.cardContainer}>
      <CustomText isBold style={styles.name}>
        Sleeve Hoodie
      </CustomText>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={styles.otherContainer}>
          <Icon
            name={'circle'}
            as={Entypo}
            size={moderateScale(20, 0.3)}
            color={Color.themeLightGray}
            style={{
              marginRight: moderateScale(5, 0.3),
            }}
          
          />
          <CustomImage
            source={item?.image}
            style={{
              width: windowWidth * 0.3,
              height: windowHeight * 0.15,
              borderRadius: moderateScale(10, 0.3),
            }}
          />
        </View>
        <View style={styles.other1}>
          <CustomText style={styles.text1}>{item?.name}</CustomText>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: windowWidth * 0.45,
              marginTop: moderateScale(5, 0.3),
            }}>
            {item?.selectedSize ? (
              <CustomText>Selected Size : {item?.selectedSize}</CustomText>
            ) : (
              // <></>
             JSON.parse(item?.availbleSizes).map((item1, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      dispatch(
                        setProductSize({
                          id: item?.id,
                          size: item1,
                        }),
                      );
                    }}
                    style={styles.sizeBox}>
                    <CustomText style={{color: Color.black}}>
                      {item1}
                    </CustomText>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
          {item?.selectedColor ? (
            <CustomText style={{color: Color.black, alignItems: 'center'}}>
              Selected Color:{' '}
              {
                <View
                  style={[
                    styles.colorBox,
                    {backgroundColor: item?.selectedColor.toLowerCase()},
                  ]}></View>
              }
            </CustomText>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: windowWidth * 0.45,
                marginTop: moderateScale(5, 0.3),
              }}>
              { JSON.parse(item?.availbleColor).map((item1, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      dispatch(
                        setProductColor({
                          id: item?.id,
                          color: item1,
                        }),
                      );
                    }}
                    style={[
                      styles.colorBox,
                      {
                        backgroundColor: item1.toLowerCase(),
                        borderWidth: 2,
                        borderColor: item1?.toLowerCase(),
                      },
                      item?.selectedColor &&
                        item?.selectedColor.toLowerCase() ==
                          item1.toLowerCase() && {
                          borderColor: item?.selectedColor?.toLowerCase(),
                        },
                    ]}></TouchableOpacity>
                );
              })}
            </View>
          )}
          <View
            style={[
              styles.other1,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: moderateScale(10, 0.3),
                alignItems : 'center'
              },
            ]}>
            <CustomText style={styles.amount}>
              {numeral(item?.price * item?.selectedQuantity).format('$0,0.00')}
            </CustomText>
            {
              fromCheckout ? 
              <CustomText
              isBold
              style={{
                marginHorizontal: moderateScale(5, 0.3),
                fontSize: moderateScale(12, 0.3),
              }}>
              Quantity : {item?.selectedQuantity}
            </CustomText>
              :
            
            <View
              style={{
                marginRight: moderateScale(15, 0.3),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name={'add-circle-sharp'}
                as={Ionicons}
                color={Color.green}
                size={moderateScale(25, 0.3)}
                onPress={() => {
                  dispatch(addQuantity({id: item?.id}));
                }}
              />
              <CustomText
                isBold
                style={{
                  marginHorizontal: moderateScale(5, 0.3),
                  fontSize: moderateScale(12, 0.3),
                }}>
                {item?.selectedQuantity}
              </CustomText>
              <Icon
                name={'circle-with-minus'}
                as={Entypo}
                color={Color.green}
                size={moderateScale(24, 0.3)}
                onPress={() => {
                  dispatch(subQuantity({id: item?.id}));
                }}
              />
            </View>
}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cardContainer: {
    minHeight: windowHeight * 0.2,
    width: windowWidth * 0.9,
    // backgroundColor: 'red',
    marginBottom: moderateScale(20, 0.3),
    // flexGrow : 0
    borderBottomWidth: 1,
    borderColor: Color.veryLightGray,
    paddingBottom: moderateScale(10, 0.3),
  },
  name: {
    fontSize: moderateScale(20, 0.3),
    color: Color.black,
    marginLeft: moderateScale(5, 0.3),
    marginBottom : moderateScale(10,0.3)
  },
  otherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  other1: {
    marginLeft: moderateScale(5, 0.3),
    flexWrap: 'wrap',
    width: windowWidth * 0.5,
    // backgroundColor : 'yellow',
    overflow: 'hidden',
  },
  text1: {
    fontSize: moderateScale(16, 0.3),
    color: Color.black,
    width: windowWidth * 0.45,
  },
  text: {
    fontSize: moderateScale(13, 0.3),
    color: Color.black,
    width: windowWidth * 0.45,
    backgroundColor: 'red',
  },
  sizeBox: {
    paddingVertical: moderateScale(3, 0.3),
    paddingHorizontal: moderateScale(5, 0.3),
    borderRadius: moderateScale(5, 0.3),
    borderWidth: 1,
    borderColor: Color.themeLightGray,
    marginRight: moderateScale(5, 0.3),
    // backgroundColor :'red',
    // width : 20 , height : 20
  },
  colorBox: {
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    borderRadius: moderateScale(10, 0.3),
    marginRight: moderateScale(5, 0.3),
  },
  amount: {
    fontSize: moderateScale(18, 0.3),
    color: Color.green,
  },
});
