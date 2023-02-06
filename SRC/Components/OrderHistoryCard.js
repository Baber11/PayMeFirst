import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
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
import { TouchableOpacity } from 'react-native';


const OrderHistoryCard = ({item, onPress}) => {
  const orderHistory = useSelector(state => state.commonReducer.cartData);
//   console.log(
//     '🚀 ~ file: OrderHistoryCard.js:16 ~ OrderHistoryCard ~ orderHistory',
//     orderHistory,
//   );
  return (
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
              .duration(moment().diff(moment('2/2/2023').format('ll')))
              .asDays() >= 5
              ? moment('2/2/2023').format('ll')
              : moment('2/2/2023').fromNow()}
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
              {numeral(item?.price).format('$0,0.0')}
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
            marginLeft : moderateScale(10,0.3),marginTop : moderateScale(20,0.3),
            alignItems : 'center'
          }}>
             <Icon
              name={'calendar'}
              as={FontAwesome}
              color={Color.themeLightGray}
              size={moderateScale(13, 0.3)}
              style={{
                marginRight : moderateScale(5,0.3),
                width : moderateScale(19,0.3)
              }}
            />
              <CustomText style={styles.text1}>{moment('1/01/2023').format('ll')}{<CustomText style={{
                textTransform : 'uppercase',
                fontSize : moderateScale(11,0.3)
              }} isBold > {`( Booking date)`}</CustomText>}</CustomText>
          </View>
      
        <View
          style={{
            flexDirection: 'row',
            width: windowWidth * 0.8,
            flexWrap: 'wrap',
            // backgroundColor : 'red',
            marginLeft : moderateScale(10,0.3),marginTop : moderateScale(10,0.3),
            alignItems : 'center'
          }}>
             <Icon
              name={'calendar'}
              as={FontAwesome}
              color={Color.themeLightGray}
              size={moderateScale(13, 0.3)}
              style={{
                marginRight : moderateScale(5,0.3),
                width : moderateScale(19,0.3)
              }}
            />
              <CustomText style={styles.text1}>{moment('1/01/2023').format('ll')}{<CustomText style={{
                textTransform : 'uppercase',
                fontSize : moderateScale(11,0.3)

              }} isBold > {`( d.o.d expected )`}</CustomText>}</CustomText>
          </View>
          <View
          style={{
            flexDirection: 'row',
            width: windowWidth * 0.8,
            flexWrap: 'wrap',
            // backgroundColor : 'red',
            marginLeft : moderateScale(10,0.3),marginTop : moderateScale(10,0.3),
            alignItems : 'center'
          }}>
             <Icon
              name={'address-card'}
              as={FontAwesome}
              color={Color.themeLightGray}
            //   size={moderateScale(30, 0.3)}
              style={{
                marginRight : moderateScale(5,0.3),
                width : moderateScale(19,0.3)
              }}
            />
              <CustomText style={styles.text1}>31869 Reyna View Apt. 931</CustomText>
          </View>
          <View
          style={{
            width : moderateScale(50,0.3),
            height : moderateScale(50,0.3),
            position : 'absolute',
            right : '10%',
            top : '35%',
            // backgroundColor : 'red'
            
        }}
          >
          <CustomImage
          source={require('../Assets/Images/delivered.png')}
          style={{
              width : '100%',
              height : '100%'
              
          }}
          />

          </View>
      
        <View
          style={{
            flexDirection: 'row',
            width: windowWidth * 0.85,
            flexWrap: 'wrap',
            // backgroundColor : 'red',
            marginLeft : moderateScale(10,0.3),marginTop : moderateScale(10,0.3),
            alignItems : 'center'
          }}>
              <Icon
              name={'shopping-basket'}
              as={FontAwesome}
              color={Color.themeLightGray}
              size={moderateScale(13, 0.3)}
              style={{
                marginRight : moderateScale(5,0.3),
                width : moderateScale(19,0.3)
              }}
            />
          {orderHistory.map((item1, index) => {
            return (
              <CustomText style={styles.text1}>{`${item1?.name}(${
                item?.quantity
              }) ${index == orderHistory?.length - 1 ? '.' : ','}`}</CustomText>
            );
          })}
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.row}>
            <CustomText isBold style={{
                fontSize : moderateScale(10,0.3),
                color : Color.green,
                textTransform : 'uppercase',
            }}>Order again</CustomText>
            <StarRating
        disabled={true}
        maxStars={5}
        rating={4}
        
        starSize={moderateScale(12,0.3)}
        halfStarColor={'#FF9529'}
        fullStarColor={'#FF9529'}
        starStyle={{
            marginRight :moderateScale(2.5,0.3)
        }}
        containerStyle={{
        //   width : moderateScale(55,0.3)
        }}
        // selectedStar={(rating) => this.onStarRatingPress(rating)}
      />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderHistoryCard;

const styles = ScaledSheet.create({
  card: {
    width: windowWidth,
    // height: windowHeight * 0.24,
    backgroundColor: Color.white,
    marginVertical: moderateScale(3, 0.3),
    paddingVertical : moderateScale(5,0.3)
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
  container2:{
    marginTop : moderateScale(10,0.3),
    paddingBottom : moderateScale(5,0.3),
    // backgroundColor : 'green',
    // height : '18%',
    borderTopWidth : 1,
    borderColor : Color.lightGrey
  },
  text1: {
    fontSize: moderateScale(12, 0.3),
    color: Color.themeLightGray,
    marginRight: moderateScale(4, 0.3),
  },
});
