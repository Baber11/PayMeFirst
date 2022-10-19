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

import {useSelector} from 'react-redux';
import {imageUrl} from '../Config';

const Header = props => {
  const navigationN = useNavigation();
  const {
    title,
    showBack,
    showList,
    headerColor,
    titleColor,
    close,

    navigateTO,
    headerType,
  } = props;
  const [searchText, setSearchText] = useState('');
  const user = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
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
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => token != null && navigationN.navigate('Profile')}
        style={{
          alignSelf: 'center',
          width: moderateScale(40, 0.3),
          height: moderateScale(40, 0.3),
          borderRadius: moderateScale(20, 0.3),
          // backgroundColor: '#000',
          overflow: 'hidden',
        }}
      >
        {/* {token != null && ( */}
        <CustomImage
          source={
            user?.photo
              ? {uri: `${imageUrl}${user?.photo}`}
              : require('../Assets/Images/Profile.png')
            // require('../Assets/Images/avatar.png')
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
          onPress={() => navigationN.goBack()}
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
    </View>
  );
};
const styles = ScaledSheet.create({
  header1: {
    width: windowWidth,
    height: windowHeight * 0.1,
    backgroundColor: Color.white,
    marginBottom: moderateScale(5, 0.3),
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
});
export default Header;
