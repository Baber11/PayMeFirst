import React, {useState} from 'react';
import {Icon} from 'native-base';
import {View, Platform, Dimensions, TouchableOpacity} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
const {height, width} = Dimensions.get('window');
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Modal from 'react-native-modal';

import {useDispatch, useSelector} from 'react-redux';
import {imageUrl} from '../Config';
import {setUserLogout} from '../Store/slices/auth';

const Header = props => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.commonReducer.notification)
  const navigationN = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const {
    title,
    showBack,
    showList,
    headerColor,
    titleColor,
    orderHistory,
    headerType,
    Notify ,
  } = props;

  const [searchText, setSearchText] = useState('');
  const user = useSelector(state => state.commonReducer.userData);
  // console.log(JSON.stringify(  user, null ,2));
  const token = useSelector(state => state.authReducer.token);
  const statusArray = [
    {label: 'Change Password', value: 'ChangePassword'},

    {label: 'Terms & Conditions', value: 'TermsAndConditions'},
    {label: 'Financial Breakdown', value: 'FinancialBreakDown'},
    {label: 'Logout', value: 'Logout'},
  ];

  return headerType == 1 ? (
    <View
      style={[
        styles.header1,
        headerColor && {
          backgroundColor: headerColor,
          borderWidth: 0.5,
          borderColor: Color.themeLightGray,
        },
      ]}
    >
      {showBack && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => showBack && navigationN.goBack()}
          style={{
            position: 'absolute',
            zIndex: 1,
            left: moderateScale(20, 0.3),
            height: moderateScale(30, 0.3),
            width: moderateScale(30, 0.3),
            borderRadius: moderateScale(5, 0.3),
            // backgroundColor: Color.themeBlack,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            name={'arrowleft'}
            as={AntDesign}
            color={Color.themeBlack}
            size={moderateScale(25, 0.3)}
          />
        </TouchableOpacity>
      )}
      <CustomText
        style={{
          color: titleColor ? titleColor : Color.themeBlack,
          textAlign: 'center',
          fontSize: moderateScale(24, 0.3),
          fontWeight: 'bold',
        }}
      >
        {title}
      </CustomText>
      {orderHistory &&
      <Icon
            name={'history'}
            as={FontAwesome}
            color={Color.black}
            size={moderateScale(22, 0.3)}
            style={{
              position: 'absolute',
              zIndex: 1,
              right: moderateScale(20, 0.3),
            
              
            }}
          />
}
    </View>
  ) : (
    <View
      style={[
        styles.header2,
        headerColor && {
          backgroundColor: headerColor,
        },
      ]}
    >
      {
        Notify && (
        <View style={{
          position: 'absolute',
          left: moderateScale(20, 0.3),
          height: moderateScale(30, 0.3),
          width: moderateScale(30, 0.3),
          borderRadius: moderateScale(5, 0.3),
          // backgroundColor : 'red'
        }}>
          <Icon
          name={'bell-o'}
          as={FontAwesome}
          color={Color.green}
          size={moderateScale(25, 0.3)}
          style={{
            position: 'absolute',
            // left: moderateScale(20, 0.3),
            // height: moderateScale(30, 0.3),
            // width: moderateScale(30, 0.3),
            // borderRadius: moderateScale(5, 0.3),
          }}
          onPress={()=>{
            navigationN.navigate('NotificationScreen')
          }}
          />
        {
          notification &&
          <View style={styles.notificationCircle}>

          </View>
        }
          </View>  
        )

      }
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          
          navigationN.navigate('MyAccounts');
        }}
        style={{
          alignSelf: 'center',
          width: moderateScale(40, 0.3),
          height: moderateScale(40, 0.3),
          borderRadius: moderateScale(20, 0.3),
          borderColor: Color.themeLightGray,
          overflow: 'hidden',
          borderWidth : 1
        }}
      >
        <CustomImage
        onPress={() => {
          
          navigationN.navigate('MyAccounts');
        }}
          source={
            user?.photo
              ? {uri: `${user?.photo}`}
              : require('../Assets/Images/Profile.png')
          }
          resizeMode={'cover'}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        {/* )} */}
      </TouchableOpacity>
      {showList && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setModalVisible(true)}
          style={{
            position: 'absolute',
            right: moderateScale(20, 0.3),
            height: moderateScale(30, 0.3),
            width: moderateScale(30, 0.3),
            borderRadius: moderateScale(5, 0.3),
            // backgroundColor: Color.themeBlack,

            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            name={'ios-menu-outline'}
            as={Ionicons}
            color={Color.green}
            size={moderateScale(25, 0.3)}
          />
        </TouchableOpacity>
      )}
      <Modal
        isVisible={isModalVisible}
        hasBackdrop={true}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        animationInTiming={700}
        animationOutTiming={700}
        backdropOpacity={0}
        style={{
          // alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
        
      >
        <View style={styles.statusModal}>
          {statusArray.map(item => {
            return (
              <CustomText
                onPress={() => {
                  if (item?.value == 'Logout') {
                    return dispatch(setUserLogout());
                  }
                  navigationN.navigate(item?.value);
                  setModalVisible(false);
                }}
                style={{
                  borderBottomWidth: moderateScale(1),
                  borderColor: Color.themeBlack,
                  // width: windowWidth * 0.,
                  lineHeight: moderateScale(25, 0.3),
                  marginTop: moderateScale(10, 0.3),
                  textAlign: 'center',
                }}
              >
                {item?.label}
              </CustomText>
            );
          })}
        </View>
      </Modal>
    </View>
  );
};
const styles = ScaledSheet.create({
  header1: {
    width: windowWidth,
    height: windowHeight * 0.1,
    backgroundColor: Color.white,
    // marginBottom: moderateScale(5, 0.3),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  statusModal: {
    alignSelf: 'flex-end',
    paddingVertical: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    // borderRadius: moderateScale(5, 0.3),
    marginTop: moderateScale(60, 0.3),
    // borderWidth: 1,
    borderColor: Color.green,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 3,
  },
  header2: {
    width: windowWidth,
    height: windowHeight * 0.14,
    backgroundColor: 'white',
    justifyContent: 'center',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20, 0.3),
    // backgroundColor: 'red',
  },
  notificationCircle : { 
    position : 'absolute',
    height : moderateScale(10,0.3),
    width : moderateScale(10,0.3),
    borderRadius : moderateScale(5,0.3),
    backgroundColor : Color.green,
    right : moderateScale(5,0.3)
    // marginTop : moderateScale(10,0.3)
  },
});
export default Header;
