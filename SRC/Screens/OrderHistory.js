import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import {useSelector} from 'react-redux';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import OrderHistoryCard from '../Components/OrderHistoryCard';
import {Icon, ScaleFade} from 'native-base';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
import {ScrollView} from 'react-native';
import CustomButton from '../Components/CustomButton';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const OrderHistory = () => {
  const orderHistory = useSelector(state => state.commonReducer.cartData);
   const [filterArray, setFilterArray] = useState([]);
  console.log("🚀 ~ file: OrderHistory.js:27 ~ OrderHistory ~ filterArray", filterArray)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const dummyFilter = ['delivered', 'ongoing', 'cancelled'];

  return (
    <ScreenBoiler
      showHeader={true}
      title={'History'}
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}
      // headerColor={Color.white}
      headerType={1}
      showBack={true}>
      <ScrollView
        horizontal
        style={styles.filter}
        contentContainerStyle={{
          // height : moderateScale(50,0.3),
          // paddingVertical: moderateScale(10, 0.3),
          alignItems: 'center',
          // backgroundColor : 'red'
        }}>
        <TouchableOpacity
          onPress={() => {
            setIsModalVisible(true);
          }}
          activeOpacity={0.9}
          style={{}}>
          {filterArray.length > 0 && (
            <View
              style={{
                width: moderateScale(12, 0.3),
                height: moderateScale(12, 0.3),
                borderRadius: moderateScale(6, 0.3),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                position: 'absolute',
                right: 0,
                top: -3,
                zIndex: 1,
              }}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(8, 0.3),
                  color: Color.white,
                }}>
                {filterArray.length}
              </CustomText>
            </View>
          )}
          <Icon
            name={'filter'}
            as={FontAwesome}
            color={Color.green}
            size={moderateScale(18, 0.3)}
            style={{
              marginLeft: moderateScale(5, 0.3),
              // width : moderateScale(19,0.3)
            }}
          />
        </TouchableOpacity>
        
        {filterArray.length > 0 &&
        <View style={{
          flexDirection : 'row', 
          marginLeft : moderateScale(10,0.3)
        }}>
          {
          filterArray.map((x , index)=>{
            return(
              <TouchableOpacity
              onPress={() => {
                // setFilter('completed');
              }}
              style={{
                paddingHorizontal : moderateScale(10,0.3),
                paddingVertical : moderateScale(3,0.3),
                // borderWidth : 1,
                // borderColor : Color.green,
                backgroundColor : 'orange',
          marginRight : moderateScale(5,0.3),
          borderRadius : moderateScale(20,0.3)

              }}
              activeOpacity={1}>
              <CustomText
                style={[
                  styles.txt6,
                  {color: Color.white , fontSize : moderateScale(11,0.3)},
                ]}>
                {x}
              </CustomText>
            </TouchableOpacity>
              )
            })}
            </View>
        }
      </ScrollView>

      <FlatList
        data={orderHistory}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.3),
          paddingTop: moderateScale(10, 0.3),
        }}
        renderItem={({item, index}) => {
          return <OrderHistoryCard item={item} />;
        }}
      />
      <Modal
        isVisible={isModalVisible}
        swipeDirection="up"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* Modal main View */}
        <View
          style={{
            backgroundColor: Color.white,
            width: windowWidth * 0.8,
            borderTopLeftRadius: moderateScale(20, 0.3),
            borderTopRightRadius: moderateScale(20, 0.3),
            borderBottomLeftRadius: moderateScale(10, 0.3),
            borderBottomRightRadius: moderateScale(10, 0.3),
            paddingBottom: moderateScale(10, 0.3),
            // height: windowHeight * 0.4,
          }}>
          <View style={styles.modalUpperView}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(17, 0.3),
                color: Color.white,
              }}>
              Choose Filters
            </CustomText>
          </View>
          <CustomText
            style={{
              margin: moderateScale(10, 0.3),
            }}
            isBold>
            Order Status
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.7,
              flexWrap: 'wrap',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setFilter('completed');
              }}
              style={[
                styles.cont,
                filter == 'completed' && {backgroundColor: 'orange'},
              ]}
              activeOpacity={0.7}>
              <CustomText
                style={[
                  styles.txt6,
                  filter == 'completed' && {color: 'white'},
                ]}>
                completed
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilter('ongoing');
              }}
              style={[
                styles.cont,
                filter == 'ongoing' && {backgroundColor: 'orange'},
              ]}
              activeOpacity={0.7}>
              <CustomText
                style={[styles.txt6, filter == 'ongoing' && {color: 'white'}]}>
                on going
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilter('cancelled');
              }}
              style={[
                styles.cont,
                filter == 'cancelled' && {backgroundColor: 'orange'},
              ]}
              activeOpacity={0.7}>
              <CustomText
                style={[
                  styles.txt6,
                  filter == 'cancelled' && {color: 'white'},
                ]}>
                cancelled
              </CustomText>
            </TouchableOpacity>
          </View>
          <CustomText
            style={{
              margin: moderateScale(10, 0.3),
            }}
            isBold>
            Select Date :{' '}
          </CustomText>

          <TouchableOpacity
            onPress={() => {
              setOpen(!open);
            }}
            activeOpacity={0.8}
            style={[
              {
                width : windowWidth * 0.3,
                backgroundColor: 'orange',
                paddingVertical: moderateScale(3, 0.3),
                // alignSelf : 'center',
                height : windowHeight * 0.045,
                borderRadius : moderateScale(20,0.3),
                justifyContent : 'center',
                alignItems : 'center',
                marginLeft : moderateScale(20,0.3)
              },
            ]}>
            <CustomText
              style={[styles.txt6, {color: 'white', textAlign: 'center'}]}>
              {date ? moment(date).format('ll') : moment().format('ll')}
            </CustomText>
          </TouchableOpacity>

          <DatePicker
            maximumDate={new Date()}
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            mode={'date'}
            androidVariant="iosClone"
          />
          <CustomButton
            text={'Apply Filters'}
            isBold
            textColor={Color.white}
            width={windowWidth * 0.75}
            height={windowHeight * 0.05}
            marginTop={moderateScale(20, 0.3)}
            onPress={()=>{

            setFilterArray([moment(date).format('ll') , filter])
            setIsModalVisible(false)
          }}
            bgColor={Color.green}
            borderColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
          />
        </View>
      </Modal>
    </ScreenBoiler>
  );
};

export default OrderHistory;

const styles = ScaledSheet.create({
  filter: {
    marginTop: moderateScale(20, 0.3),
    height: windowHeight * 0.06,
    // width : windowWidth ,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    flexGrow : 0
  },
  modalUpperView: {
    backgroundColor: Color.green,
    width: windowWidth * 0.8,
    height: windowHeight * 0.06,
    borderTopLeftRadius: moderateScale(20, 0.3),
    borderTopRightRadius: moderateScale(20, 0.3),

    justifyContent: 'center',
    alignItems: 'center',
  },
  cont: {
    // height: windowHeight * 0.05,
    // width: windowWidth * 0.23,
    borderRadius: moderateScale(20, 0.3),
    // opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#EAEAEA',
    marginVertical: moderateScale(5, 0.3),
    marginRight: moderateScale(10, 0.3),
    padding: moderateScale(7, 0.3),
    paddingHorizontal: moderateScale(20, 0.3),
  },
  txt6: {
    color: Color.themeLightGray,
    fontSize: moderateScale(12, 0.6),
    fontWeight: 'bold',
    // marginTop: moderateScale(-10, 0.3),
    // borderBottomWidth: 1,
    // borderColor: Color.white,
  },
});
