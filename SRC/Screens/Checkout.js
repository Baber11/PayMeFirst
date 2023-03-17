import {
  FlatList,
  View,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CartItem from '../Components/CartItem';
import CustomText from '../Components/CustomText';
import {useState} from 'react';
import numeral from 'numeral';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {Icon} from 'native-base';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import {setWholeCart} from '../Store/slices/common';
import navigationService from '../navigationService';
import {useEffect} from 'react';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';

const Checkout = ({route}) => {
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.commonReducer.cartData);
  const user = useSelector(state => state.commonReducer.userData);
  const token = useSelector((state)=>state.authReducer.token)
  // console.log('🚀 ~ file: Checkout.js:29 ~ Checkout ~ user:', user);
  const [finalAmount, setFinalAmount] = useState(0);
  const [shipping, setShipping] = useState({});
  const [shippingArray , setShippingArray] = useState([]);
  console.log("🚀 ~ file: Checkout.js:36 ~ Checkout ~ shippingArray:", shippingArray)
  // console.log("🚀 ~ file: Checkout.js:35 ~ Checkout ~ shipping:", shipping)
  const [paymentType, setPaymentType] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [productsForCard, setProdctsForCart] = useState([]);
  // console.log("🚀 ~ file: Checkout.js:36 ~ Checkout ~ productsForCard:", productsForCard)
  // console.log('🚀 ~ file: Checkout.js:20 ~ Checkout ~ shipping', shipping);
  const subTotal = route?.params?.subTotal;
  // console.log('🚀 ~ file: Checkout.js:22 ~ Checkout ~ subTotal', subTotal);

  // const ShippingArray = [
  //   {
  //     id : 1 ,
  //     name: 'Cargo',
  //     duration: '60 days',
  //     price: 5,
  //   },
  //   {
  //     id : 2 ,
  //     name: 'Deluxe',
  //     duration: '6 days',
  //     price: 25,
  //   },
  //   {
  //     id : 3 ,
  //     name: 'Express',
  //     duration: '3 days',
  //     price: 50,
  //   },
  //   {
  //     id : 4 ,
  //     name: 'Local',
  //     duration: '2 days',
  //     price: 15,
  //   },
  // ];

  const getShippingTypes = async()=>{
    const url = 'auth/shipping';
    const response = await Get(url , token);
    if(response != undefined){
      console.log(response?.data)
      setShippingArray(response?.data?.data)
    }
    
  }

  const BookOrder = async () => {
    const url = 'auth/checkout';
    const body = {
     product : productsForCard ,
     total_amount : subTotal + shipping?.price ,
     address : 'xyz road' ,
     method : paymentType ,
     shipping_id : shipping?.id ,
    };
    console.log('body ===========>' ,JSON.stringify(body , null ,2))
    setIsLoading(true);
    const response = await Post(url , body , apiHeader(token))
    setIsLoading(false)
    if(response != undefined){
      console.log( 'Product =================> ', response?.data)
       Platform.OS == 'android'
                    ? ToastAndroid.show(
                        'Order Booked',
                        ToastAndroid.SHORT,
                      )
                    : alert('Order Booked');
                    dispatch(setWholeCart([]));
                    navigationService.navigate('Category');
    }
  };

  useEffect(() => {
    setProdctsForCart([])
    cartData.map((item, index) => {
      return setProdctsForCart(prev => [
        ...prev,
        {
          product_id: item?.id,
          selectedColor: item?.selectedColor,
          selectedSize: item?.selectedSize,
          selectedQuantity: item?.selectedQuantity,
        },
      ]);
    });
    getShippingTypes()
  }, []);

  return (
    <ScreenBoiler
      showHeader={true}
      title={'Checkout'}
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}
      // headerColor={Color.white}
      headerType={1}
      showBack={true}>
      {/* <View style={styles.container}> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cartData}
        style={{
          height: '90%',
          backgroundColor: 'white',
          width: windowWidth,
        }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: moderateScale(20, 0.3),
        }}
        renderItem={({item, index}) => {
          return <CartItem item={item} fromCheckout={true} />;
        }}
        ListFooterComponent={() => {
          return (
            <>
              <CustomText isBold style={styles.heading}>
                Cart Total
              </CustomText>
              <View style={styles.row}>
                <CustomText isBold style={styles.subHeading}>
                  SubTotal
                </CustomText>
                <CustomText style={styles.price}>
                  {numeral(subTotal).format('$0,0.0')}
                </CustomText>
              </View>
              <View style={styles.row}>
                <CustomText isBold style={styles.subHeading}>
                  Shipping
                </CustomText>
                <View
                  style={{
                    width: windowWidth * 0.6,
                    // backgroundColor : 'red'
                  }}>
                  {shippingArray.length > 0 && shippingArray.map((x, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setShipping(x);
                        }}
                        activeOpacity={0.7}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          //   backgroundColor : 'red'
                        }}>
                        <Icon
                          name={
                            x?.type != shipping?.type
                              ? 'circle'
                              : 'raft-with-circle'
                          }
                          as={Entypo}
                          size={moderateScale(10, 0.3)}
                          color={Color.themeLightGray}
                          style={{
                            marginRight: moderateScale(5, 0.3),
                          }}
                        />
                        <CustomText
                          style={{
                            width: windowWidth * 0.2,
                            // textAlign : 'center'
                          }}>
                          {' '}
                          {x?.type}
                        </CustomText>
                        <CustomText style={{}}>{x?.days}</CustomText>
                        <CustomText>
                          {numeral(x?.price).format('$0,0.0')}
                        </CustomText>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <View style={styles.row}>
                <CustomText isBold style={styles.subHeading}>
                  Total
                </CustomText>
                <CustomText style={styles.subHeading}>
                  {numeral(subTotal + shipping?.price).format('$0,0.0')}
                </CustomText>
              </View>
              {user?.wallet?.amount > 0 && (
                <View
                  style={{
                    flexDirection: 'row',
                    width: windowWidth * 0.9,
                  }}>
                  <CustomText
                    isBold
                    style={[
                      styles.subHeading,
                      {marginTop: moderateScale(20, 0.3)},
                    ]}>
                    Payment Method :{' '}
                  </CustomText>

                  <View style={styles.userTypeContainer}>
                    <View style={styles.innerContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          setPaymentType('card');
                        }}
                        activeOpacity={0.9}
                        style={[
                          styles.circle,
                          paymentType == 'card' && {
                            backgroundColor: Color.green,
                            borderColor: Color.green,
                          },
                        ]}></TouchableOpacity>
                      <CustomText
                        onPress={() => {
                          setPaymentType('card');
                        }}
                        isBold={paymentType == 'card'}
                        style={styles.txt2}>
                        {'   '}Card Attached
                      </CustomText>
                    </View>
                    <View style={styles.innerContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          setPaymentType('wallet');
                        }}
                        activeOpacity={0.9}
                        style={[
                          styles.circle,
                          paymentType == 'wallet' && {
                            backgroundColor: Color.green,
                            borderColor: Color.green,
                          },
                        ]}></TouchableOpacity>
                      <CustomText
                        onPress={() => {
                          setPaymentType('wallet');
                        }}
                        isBold={paymentType == 'wallet'}
                        style={styles.txt2}>
                        {'   '}Wallet
                      </CustomText>
                    </View>
                  </View>
                </View>
              )}
              <CustomButton
                text={
                  isLoading ? (
                    <ActivityIndicator color={'#ffffff'} size={'small'} />
                  ) : (
                    'Book your order'
                  )
                }
                isBold
                textColor={Color.white}
                width={windowWidth * 0.9}
                height={windowHeight * 0.07}
                marginTop={moderateScale(20, 0.3)}
                onPress={() => {
                  if (Object.keys(shipping).length > 0) {
                    BookOrder();
                   
                  } else {
                    Platform.OS == 'android'
                      ? ToastAndroid.show(
                          'Please Select Shipping Type',
                          ToastAndroid.SHORT,
                        )
                      : alert('Please Select Shipping Type');
                  }
                }}
                bgColor={Color.green}
                borderColor={Color.white}
                borderWidth={2}
                borderRadius={moderateScale(30, 0.3)}
              />
            </>
          );
        }}
      />
    </ScreenBoiler>
  );
};

export default Checkout;

const styles = ScaledSheet.create({
  heading: {
    fontSize: moderateScale(20, 0.3),
    textAlign: 'left',
    width: windowWidth * 0.9,
    // backgroundColor : 'red'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.9,
    marginTop: moderateScale(10, 0.3),
    borderBottomWidth: 1,
    borderColor: Color.lightGrey,
    paddingBottom: moderateScale(10, 0.3),
  },
  subHeading: {
    fontSize: moderateScale(16, 0.3),
  },
  userTypeContainer: {
    // width: windowWidth * 0.7,
    // backgroundColor : Color.red,
    padding: moderateScale(10, 0.3),
    marginTop: moderateScale(10, 0.3),
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  innerContainer: {
    // width: '48%',
    // backgroundColor : 'green',
    // paddingVertical : moderateScale(5,0.3),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(5, 0.3),
  },
  circle: {
    height: moderateScale(13, 0.3),
    width: moderateScale(13, 0.3),
    borderRadius: moderateScale(6.5, 0.3),
    borderWidth: 1,
    backgroundColor: Color.white,
    borderColor: Color.green,
    marginLeft: moderateScale(15, 0.3),
  },
  txt2: {
    fontSize: moderateScale(12, 0.3),
  },
});
