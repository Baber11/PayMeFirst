import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import moment from 'moment/moment';
import numeral from 'numeral';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'native-base';
import {useSelector} from 'react-redux';
import StarRating from 'react-native-star-rating';
import CustomImage from './CustomImage';
import {TouchableOpacity} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from './CustomButton';

const OrderHistoryCard = ({item, onPress, forApproval , setData , data , index}) => {
  console.log(
    '🚀 ~ file: OrderHistoryCard.js:19 ~ OrderHistoryCard ~ item:',
    item,
  );
  const orderHistory = useSelector(state => state.commonReducer.cartData);
  const token = useSelector(state => state.authReducer.token);
  const [isLoading, setIsLoading] = useState(false);

  const approveOrder = async (action) => {
    console.log("🚀 ~ file: OrderHistoryCard.js:29 ~ approveOrder ~ action:", action)
    const url = `auth/order/${item?.id}`;
    const body = {
      status: action,
    };
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      let newData = [...data]
      newData.splice(index , 1)
      setData(newData)
      console.log( 'data here -----------,,,,,,,,,,,,,,,,,,,,,,,', response?.data);
    }
  };

  return (
    <>
      <TouchableOpacity activeOpacity={0.8} style={styles.card}>
        <View style={styles.container1}>
          <View
            style={[
              styles.row,
              {
                width: windowWidth,
              },
            ]}>
            <CustomText isBold style={styles.date}>
              {moment
                .duration(moment().diff(moment(item?.created_at).format('ll')))
                .asDays() >= 5
                ? moment(item?.created_at).format('ll')
                : moment(item?.created_at).fromNow()}
            </CustomText>
            <View
              style={[
                styles.row,
                {
                  marginTop: moderateScale(0, 0.3),
                },
              ]}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(13, 0.3),
                  marginRight: moderateScale(3, 0.3),
                }}>
                {numeral(item?.total_amount).format('$0,0.0')}
              </CustomText>
              <Icon
                name={'right'}
                as={AntDesign}
                color={Color.darkGray}
                size={moderateScale(13, 0.3)}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.8,
              flexWrap: 'wrap',
              // backgroundColor : 'red',
              marginLeft: moderateScale(10, 0.3),
              marginTop: moderateScale(20, 0.3),
              alignItems: 'center',
            }}>
            <Icon
              name={'calendar'}
              as={FontAwesome}
              color={Color.themeLightGray}
              size={moderateScale(13, 0.3)}
              style={{
                marginRight: moderateScale(5, 0.3),
                width: moderateScale(19, 0.3),
              }}
            />
            <CustomText style={styles.text1}>
              {moment(item?.created_at).format('ll')}
              {
                <CustomText
                  style={{
                    textTransform: 'uppercase',
                    fontSize: moderateScale(11, 0.3),
                  }}
                  isBold>
                  {' '}
                  {`( Booking date)`}
                </CustomText>
              }
            </CustomText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.8,
              flexWrap: 'wrap',
              // backgroundColor : 'red',
              marginLeft: moderateScale(10, 0.3),
              marginTop: moderateScale(10, 0.3),
              alignItems: 'center',
            }}>
            <Icon
              name={'calendar'}
              as={FontAwesome}
              color={Color.themeLightGray}
              size={moderateScale(13, 0.3)}
              style={{
                marginRight: moderateScale(5, 0.3),
                width: moderateScale(19, 0.3),
              }}
            />
            <CustomText style={styles.text1}>
              {moment('1/01/2023').format('ll')}
              {
                <CustomText
                  style={{
                    textTransform: 'uppercase',
                    fontSize: moderateScale(11, 0.3),
                  }}
                  isBold>
                  {' '}
                  {`( d.o.d expected )`}
                </CustomText>
              }
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.8,
              flexWrap: 'wrap',
              // backgroundColor : 'red',
              marginLeft: moderateScale(10, 0.3),
              marginTop: moderateScale(10, 0.3),
              alignItems: 'center',
            }}>
            <Icon
              name={'address-card'}
              as={FontAwesome}
              color={Color.themeLightGray}
              //   size={moderateScale(30, 0.3)}
              style={{
                marginRight: moderateScale(5, 0.3),
                width: moderateScale(19, 0.3),
              }}
            />
            <CustomText style={styles.text1}>{item?.address}</CustomText>
          </View>
          {!['parent-approval' , 'admin-approval' , 'ongoing' , 'rejected'].includes(item?.status) &&

            <View
            style={{
              width: moderateScale(50, 0.3),
              height: moderateScale(50, 0.3),
              position: 'absolute',
              right: '10%',
              top: '35%',
              // backgroundColor : 'red'
            }}>
            <CustomImage
              source={require('../Assets/Images/delivered.png')}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
              }

          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.85,
              flexWrap: 'wrap',
              // backgroundColor : 'red',
              marginLeft: moderateScale(10, 0.3),
              marginTop: moderateScale(10, 0.3),
              alignItems: 'center',
            }}>
            <Icon
              name={'shopping-basket'}
              as={FontAwesome}
              color={Color.themeLightGray}
              size={moderateScale(13, 0.3)}
              style={{
                marginRight: moderateScale(5, 0.3),
                width: moderateScale(19, 0.3),
              }}
            />
            {item?.order_detail?.product.map((item1, index) => {
              return (
                <CustomText style={styles.text1}>{`${item1?.name}(${
                  item1?.quantity
                }) ${
                  index == item?.order_detail?.product?.length ? '.' : ','
                }`}</CustomText>
              );
            })}
          </View>
        </View>
        <View style={styles.container2}>
          <View style={styles.row}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(10, 0.3),
                color: Color.green,
                textTransform: 'uppercase',
              }}>
              {item?.order_number}
            </CustomText>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(10, 0.3),
                color: Color.green,
                textTransform: 'uppercase',
              }}>
              {item?.status}
            </CustomText>

            {/* <StarRating
              disabled={true}
              maxStars={5}
              rating={4}
              starSize={moderateScale(12, 0.3)}
              halfStarColor={'#FF9529'}
              fullStarColor={'#FF9529'}
              starStyle={{
                marginRight: moderateScale(2.5, 0.3),
              }}
              containerStyle={
                {
                  //   width : moderateScale(55,0.3)
                }
              }
              // selectedStar={(rating) => this.onStarRatingPress(rating)}
            /> */}
          </View>
        </View>
      </TouchableOpacity>
      {forApproval && (
        <View style={styles.button}>
          <CustomButton
            text={'Approve'}
            isBold
            textColor={Color.white}
            width={windowWidth * 0.34}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={()=>{approveOrder('approved')}}
            bgColor={Color.green}
            //  borderColor={Color.white}
            borderWidth={0}
            borderRadius={moderateScale(20, 0.3)}
            marginBottom={moderateScale(20,0.6)}
          />

          <CustomButton
            text={'Reject'}
            isBold
            textColor={Color.white}
            width={windowWidth * 0.34}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={()=>{approveOrder('rejected')}}
            bgColor={Color.green}
            //  borderColor={Color.white}
            borderWidth={0}
            borderRadius={moderateScale(20, 0.3)}
            marginBottom={moderateScale(20,0.6)}
          />
        </View>
      )}
    </>
  );
};

export default OrderHistoryCard;

const styles = ScaledSheet.create({
  card: {
    width: windowWidth,
    // height: windowHeight * 0.24,
    backgroundColor: Color.white,
    marginVertical: moderateScale(3, 0.3),
    paddingVertical: moderateScale(5, 0.3),
  },
  row: {
    flexDirection: 'row',
    marginTop: moderateScale(7, 0.3),
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.3),
    alignItems: 'center',

    // ,    backgroundColor : 'green'
  },
  date: {
    fontSize: moderateScale(12, 0.3),
    color: Color.black,
  },
  container1: {
    // backgroundColor : 'red',
    // height : '82%'
    // alignItems: 'center',
  },
  container2: {
    marginTop: moderateScale(10, 0.3),
    paddingBottom: moderateScale(5, 0.3),
    // backgroundColor : 'green',
    // height : '18%',
    borderTopWidth: 1,
    borderColor: Color.lightGrey,
  },
  text1: {
    fontSize: moderateScale(11, 0.6),
    color: Color.themeLightGray,
    marginRight: moderateScale(4, 0.3),
  },
  button: {
    flexDirection: 'row',
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
