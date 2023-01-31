import {
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import {FlatList, Icon} from 'native-base';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CategoriesSelector from '../Components/CategoriesSelector';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import {ScrollView} from 'react-native';
import SearchContainer from '../Components/SearchContainer';
import ProductCard from '../Components/ProductCard';
import {
  setCartData,
  setProductColor,
  setProductSize,
} from '../Store/slices/common';
import {useDispatch, useSelector} from 'react-redux';
import CustomImage from '../Components/CustomImage';
import LinearGradient from 'react-native-linear-gradient';
import numeral from 'numeral';
import ShowMoreAndShowLessText from '../Components/ShowMoreAndShowLessText';
import ReviewCard from '../Components/ReviewCard';
import CustomButton from '../Components/CustomButton';
import Share from 'react-native-share';
import navigationService from '../navigationService';

const ProductDetails = props => {
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.commonReducer.cartData);
  const detail = props?.route?.params?.detail;
  const [showMore, setShowMore] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedIndex, setIndex] = useState();

  // console.log(
  //   '🚀 ~ file: SelectedCategory.js:50 ~ SelectedCategory ~ cartData',
  //   JSON.stringify(cartData,null ,2),
  // );
  console.log(
    '🚀 ~ file: ProductDetails.js:35 ~ ProductDetails ~ index',
    selectedIndex,
  );
  // console.log("🚀 ~ file: ProductDetails.js:31 ~ ProductDetails ~ detail", detail?.id)

  useEffect(() => {
    let Index1 = cartData?.findIndex(x => x?.id == detail?.id);
    setIndex(Index1);
  }, []);

  return (
    <ScreenBoiler
      showHeader={true}
      title={'Details'}
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}
      // headerColor={Color.white}
      headerType={1}
      showBack={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: windowWidth,
          backgroundColor: 'white',
          // maxHeight : windowHeight * 0.8
        }}
        contentContainerStyle={{
          paddingTop: moderateScale(10, 0.3),
          alignItems: 'center',
          paddingBottom: moderateScale(30, 0.3),
        }}>
        <View
          style={{
            width: windowWidth * 0.87,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(26, 0.3),
              color: Color.black,
              width: windowWidth * 0.45,
              textAlign: 'left',
            }}>
            {detail?.name}
          </CustomText>
          <View>
            <Icon
              name={
                cartData.length == 0 ? 'remove-shopping-cart' : 'shopping-cart'
              }
              as={MaterialIcons}
              size={moderateScale(25, 0.3)}
              color={Color.black}
              onPress={() => {
                cartData.length > 0 && navigationService.navigate('ViewCart');
              }}
            />
            {cartData.length > 0 && (
              <View
                style={{
                  width: moderateScale(12, 0.3),
                  height: moderateScale(12, 0.3),
                  borderRadius: moderateScale(6, 0.3),
                  backgroundColor: Color.green,
                  position: 'absolute',
                  right: -5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText
                  style={{
                    fontSize: moderateScale(9, 0.3),
                    color: Color.white,
                  }}>
                  {cartData.length}
                </CustomText>
              </View>
            )}
          </View>
        </View>
        <FlatList
          style={styles.bannerView}
          data={detail?.array}
          horizontal
          pagingEnabled
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: windowWidth * 0.95,
                  height: windowHeight * 0.46,
                }}>
                <CustomImage
                  source={item}
                  resizeMode={'stretch'}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
                {/* <View style={{position : 'absolute' , bottom : 0}}> */}
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  colors={['#8A8A8A00', '#000000']}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    borderRadius: 5,
                    justifyContent: 'flex-end',
                    shadowOffset: {height: 2, width: 0},
                    shadowOpacity: 1,
                    shadowRadius: 4,
                    width: '100%',
                    alignItems: 'center',
                    paddingBottom: moderateScale(20, 0.3),
                    paddingTop: moderateScale(60, 0.3),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginTop: moderateScale(10, 0.3),
                      alignItems: 'center',
                    }}>
                    {detail?.array.map((x, index1) => {
                      return (
                        <View
                          style={{
                            width: index1 == index ? 11 : 7,
                            height: index1 == index ? 11 : 7,
                            backgroundColor:
                              index1 == index ? Color.green : Color.white,
                            marginRight: moderateScale(5, 0.3),
                            borderRadius: index1 == index ? 5.5 : 3.5,
                          }}></View>
                      );
                    })}
                  </View>
                </LinearGradient>
                {/* </View> */}
              </View>
            );
          }}
        />
        <View
          style={{
            marginTop: moderateScale(10, 0.3),
            width: windowWidth * 0.87,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(25, 0.3),
              color: Color.green,
              width: windowWidth * 0.45,
              textAlign: 'left',
            }}>
            {numeral(detail?.price).format('$0,0.0')}
          </CustomText>
          <Icon
            name={'share'}
            as={MaterialIcons}
            size={moderateScale(25, 0.3)}
            color={Color.green}
            onPress={() => {
              Share.open({
                title: 'My Message',
                url: 'https://Google.com',
              })
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  err && console.log(err);
                });
            }}
          />
        </View>
        <ShowMoreAndShowLessText
          style={{
            marginTop: moderateScale(10, 0.3),
            fontSize: moderateScale(13, 0.3),
          }}
          minTextLength={25}>
          {detail?.description}
        </ShowMoreAndShowLessText>
        <View
          style={{
            width: windowWidth * 0.87,
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: 'red',
            marginTop: moderateScale(10, 0.3),
          }}>
          <CustomText
            style={{
              fontSize: moderateScale(15, 0.3),
              color: Color.themeLightGray,
              width: windowWidth * 0.35,
            }}>
            Brand
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(15, 0.3),
              color: Color.black,
              width: windowWidth * 0.45,
            }}>
            {detail?.brandName}
          </CustomText>
        </View>
        <View
          style={{
            width: windowWidth * 0.87,
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: 'red',
            marginTop: moderateScale(10, 0.3),
          }}>
          <CustomText
            style={{
              fontSize: moderateScale(15, 0.3),
              color: Color.themeLightGray,
              width: windowWidth * 0.35,
            }}>
            Available Sizes
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: windowWidth * 0.45,
            }}>
            {detail?.availbleSizes.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    if (selectedIndex == -1) {
                      console.log('here for set');
                      setSelectedSize(item);
                    } else {
                      console.log('here for dispatch');
                      dispatch(
                        setProductSize({
                          id: detail?.id,
                          size: item,
                        }),
                      );
                    }
                  }}
                  style={[
                    styles.sizeBox,
                    selectedIndex == -1
                      ? {
                          backgroundColor:
                            selectedSize == item ? Color.green : 'transparent',
                        }
                      : {
                          backgroundColor:
                            cartData[selectedIndex]?.selectedSize == item
                              ? Color.green
                              : 'transparent',
                        },
                  ]}>
                  <CustomText
                    style={[
                      {color: Color.black},
                      selectedIndex == -1
                      ? {
                          color:
                          selectedSize == item ? Color.white : 'black',
                        }
                      : {
                          color:
                            cartData[selectedIndex]?.selectedSize == item
                              ? Color.white
                              : 'black',
                        },
                    ]}>
                    {item}
                  </CustomText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View
          style={{
            width: windowWidth * 0.87,
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: 'red',
            marginTop: moderateScale(10, 0.3),
          }}>
          <CustomText
            style={{
              fontSize: moderateScale(15, 0.3),
              color: Color.themeLightGray,
              width: windowWidth * 0.35,
            }}>
            Available Colors
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: windowWidth * 0.45,
            }}>
            {detail?.availbleColor.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (selectedIndex == -1) {
                      console.log('here for set');
                      setSelectedColor(item.toLowerCase());
                    } else {
                      console.log('here for dispatch');
                      dispatch(
                        setProductColor({
                          id: detail?.id,
                          color: item.toLowerCase(),
                        }),
                      );
                    }
                  }}
                  activeOpacity={0.9}
                  style={[
                    styles.colorBox,
                    {backgroundColor: item.toLowerCase(), borderWidth: 2},
                    selectedIndex == -1
                      ? {
                          borderColor:
                            selectedColor == item.toLowerCase()
                              ? Color.green
                              : item.toLowerCase(),
                        }
                      : {
                          borderColor:
                            cartData[selectedIndex]?.selectedColor ==
                            item.toLowerCase()
                              ? Color.green
                              : item?.toLowerCase(),
                        },
                  ]}></TouchableOpacity>
              );
            })}
          </View>
        </View>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(20, 0.3),
            color: Color.black,
            width: windowWidth * 0.87,
            marginTop: moderateScale(20, 0.3),
            //   textDecorationLine : 'underline'
          }}>
          Satisfied Customers
        </CustomText>
        {detail?.Reviews.slice(
          0,
          showMore == false ? 3 : detail?.Reviews.length,
        ).map((x, index) => {
          return <ReviewCard item={x} />;
        })}
        {detail?.Reviews?.length > 3 && (
          <CustomButton
            text={showMore ? 'Show less' : 'Show More'}
            isBold
            textColor={Color.white}
            width={windowWidth * 0.8}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              setShowMore(!showMore);
            }}
            bgColor={Color.green}
            // borderColor={Color.white}
            // borderWidth={2}
            borderRadius={moderateScale(10, 0.3)}
          />
        )}
        <CustomButton
          text={
            cartData.some(x => x?.id == detail?.id)
              ? 'Added To cart'
              : 'Add To Cart'
          }
          isBold
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.06}
          marginTop={moderateScale(20, 0.3)}
          onPress={() => {
            if (selectedColor == '' || selectedSize == '') {
              Platform.OS == 'android'
                ? ToastAndroid.show(
                    'Please Select Size and Color Both',
                    ToastAndroid.SHORT,
                  )
                : alert('Please Select Size and Color Both');
            } else {
              dispatch(setCartData(detail));
            }
          }}
          bgColor={Color.green}
          disabled={cartData.some(x => x?.id == detail?.id)}
        />
      </ScrollView>
    </ScreenBoiler>
  );
};

export default ProductDetails;

const styles = ScaledSheet.create({
  bannerView: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.46,
    backgroundColor: 'black',
    marginTop: moderateScale(10, 0.3),
  },
  sizeBox: {
    paddingVertical: moderateScale(3, 0.3),
    paddingHorizontal: moderateScale(5, 0.3),
    borderRadius: moderateScale(5, 0.3),
    borderWidth: 1,
    borderColor: Color.themeLightGray,
    marginRight: moderateScale(5, 0.3),
  },
  colorBox: {
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    borderRadius: moderateScale(10, 0.3),
    marginRight: moderateScale(5, 0.3),
  },
});
