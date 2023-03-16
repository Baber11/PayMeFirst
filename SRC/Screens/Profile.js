import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';

import {FlatList, Icon, ScrollView} from 'native-base';
import CustomText from '../Components/CustomText';
import ToggleSwitch from 'toggle-switch-react-native';
import {set} from 'immer/dist/internal';
import {useState} from 'react';
import navigationService from '../navigationService';
import {setUserLogout} from '../Store/slices/auth';
import {useDispatch, useSelector} from 'react-redux';
import ImageView from 'react-native-image-viewing';
import { profilePicUrl } from '../Config';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.commonReducer.userData);
  const points = useSelector((state)=>state.commonReducer.points);
  console.log("🚀 ~ file: Profile.js:38 ~ Profile ~ points", points)

  const [isVisible , setIsVisible] = useState(false);

  return (
    <ScreenBoiler
      showHeader={false}
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}
    >
      <View style={styles.header}>
        <ImageBackground
          source={require('../Assets/Images/vector-up.png')}
          resizeMode={'stretch'}
          style={{
            // position: 'absolute',
            left: 0,
            height: windowHeight * 0.18,
            width: windowWidth ,
            zIndex: -1,
          }}
        >
          <View
            style={{
              // flexDirection: 'row',
              width: windowWidth,
              // justifyContent: 'space-between',
              marginTop: moderateScale(20, 0.3),
              paddingHorizontal: moderateScale(10, 0.3),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                dispatch(setUserLogout());
              }}
              activeOpacity={0.8}
              style={{flexDirection: 'row', alignSelf: 'flex-end'}}
            >
              <CustomText isBold style={styles.text}>
                Logout
              </CustomText>
              <Icon
                name={'logout'}
                as={SimpleLineIcons}
                color={Color.white}
                size={moderateScale(25, 0.3)}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View

          style={{
            // backgroundColor : 'red',
            // alignSelf: 'center',
            marginTop: moderateScale(-20, 0.3),
            width : windowWidth,
            alignItems  :'center'
          
        
          }}
        >
          <View style={[styles.image1]}>
            <CustomImage
            onPress={()=>{
              setIsVisible(true)
            }}
              source={{
                uri : `${user?.photo}`
              }}
              style={[styles.image]}
            />
          </View>
          <CustomText
            isBold
            style={[styles.text, {fontSize: moderateScale(17, 0.3)}]}
          >
          {`${user?.first_name} ${user?.last_name}`}
          </CustomText>
          <CustomText
            isBold
            style={[
              styles.text,
              {
                marginTop: moderateScale(0, 0.3),
                lineHeight: moderateScale(13, 0.3),
              },
            ]}
          >
           {user?.email}
          </CustomText>
          <View style={{
            flexDirection : 'row',
            marginTop : moderateScale(5,0.3),
            alignItems : 'center'
          }}>
            <Icon
            name={'trophy'}
            as={Entypo}
            size={moderateScale(17,0.3)}
            color={'#FFD700'}
            />
            <CustomText isBold style={
              {
                marginLeft : moderateScale(5,0.3),
                color : Color.white ,
                fontSize : moderateScale(11,0.3)
              }
            }>{points} points</CustomText>
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingTop: moderateScale(10, 0.3),
          paddingBottom: moderateScale(20, 0.3),
        }}
      >
        <ProfileContainer
          icon1Type={FontAwesome}
          icon1={'user-circle-o'}
          title={'My Account'}
          icon2={'right'}
          icon2type={AntDesign}
          onPress={() => {
            navigationService.navigate('MyAccounts');
          }}
        />
        {/* <ProfileContainer
          icon1Type={Entypo}
          icon1={'bell'}
          title={'notifications'}
          notification={true}
        /> */}
        <ProfileContainer
          icon1Type={MaterialCommunityIcons}
          icon1={'wallet-membership'}
          title={'Subscription'}
          icon2={'right'}
          icon2type={AntDesign}
          onPress={() => {
            navigationService.navigate('Subscription');
          }}
        />
          <ProfileContainer
          icon1Type={Fontisto}
          icon1={'shopify'}
          title={'Ecommerce Store'}
          icon2={'right'}
          icon2type={AntDesign}
          onPress={() => {
            navigationService.navigate('Category');
          }}
        />
          <ProfileContainer
          icon1Type={Fontisto}
          icon1={'history'}
          title={'Goals History'}
          icon2={'right'}
          icon2type={AntDesign}
          onPress={() => {
            navigationService.navigate('GoalHistory');
          }}
        />
        <ProfileContainer
          icon1Type={MaterialCommunityIcons}
          icon1={'finance'}
          title={'Financial Breakdown'}
          icon2={'right'}
          icon2type={AntDesign}
          onPress={() => {
            navigationService.navigate('FinancialBreakDown');
          }}
        />

        <ProfileContainer
          icon1Type={FontAwesome}
          icon1={'lock'}
          title={'change Password'}
          icon2={'right'}
          icon2type={AntDesign}
          onPress={() => {
            navigationService.navigate('ChangePassword');
          }}
        />
        <ProfileContainer
          icon1Type={AntDesign}
          icon1={'creditcard'}
          title={'Payment Method'}
          icon2={'right'}
          icon2type={AntDesign}
          onPress={() => {
            navigationService.navigate('PaymentMethod');
          }}
        />
        <ProfileContainer
          icon1Type={FontAwesome}
          icon1={'trophy'}
          title={'Rewards'}
          icon2={'right'}
          icon2type={AntDesign}
          onPress={() => {
            navigationService.navigate('Rewards');
          }}
        />
        <ProfileContainer
          icon1Type={MaterialIcons}
          icon1={'support-agent'}
          title={'Support'}
          icon2={'right'}
          icon2type={AntDesign}
          onPress={() => {
            navigationService.navigate('Support');
          }}
        />
        <ProfileContainer
          icon1Type={FontAwesome}
          icon1={'file-text'}
          title={'Terms & Conditions'}
          icon2={'right'}
          icon2type={AntDesign}
          onPress={() => {
            navigationService.navigate('TermsAndConditions');
          }}
        />
      </ScrollView>
      <ImageView
      images={[{uri : `${user?.photo}`}]}
      imageIndex={0}
      visible={isVisible}
      onRequestClose={()=>{setIsVisible(false)}}

      />
    </ScreenBoiler>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    // height: windowHeight * 0.42,
    paddingBottom : moderateScale(10,0.6),
    width: windowWidth,
    backgroundColor: Color.green,
    borderBottomLeftRadius: moderateScale(30, 0.3),
    borderBottomRightRadius: moderateScale(30, 0.3),
    overflow: 'hidden',
  },
  image: {
    height: windowWidth * 0.3,
    width: windowWidth * 0.3,
    borderRadius: moderateScale((windowWidth * 0.3) / 2, 0.3),
    // right: moderateScale(15, 0.3),
    // marginTop: moderateScale(20, 0.3),
  },
  image1: {
    height: windowWidth * 0.3,
    width: windowWidth * 0.3,
    borderRadius: moderateScale((windowWidth * 0.3) / 2, 0.3),
    // right: moderateScale(15, 0.3),
    // marginTop: moderateScale(20, 0.3),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: moderateScale(12, 0.3),
    marginRight: moderateScale(5, 0.3),
    marginTop: moderateScale(5, 0.3),
    textAlign: 'center',
  },
  container: {
    alignSelf: 'center',
    width: windowWidth * 0.9,
    height: windowHeight * 0.07,
    backgroundColor: Color.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.3),
    alignItems: 'center',
    borderRadius: moderateScale(10, 0.3),
    marginVertical: moderateScale(10, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 4,
  },
});

const ProfileContainer = ({
  icon1,
  icon1Type,
  icon2type,
  icon2,
  title,
  notification,
  onPress,
}) => {
  const [on, setOn] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.container,Platform.OS == 'ios' && {
        shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  
      }]}
      onPress={onPress}>
      <Icon
        name={icon1}
        as={icon1Type}
        color={Color.green}
        size={moderateScale(25, 0.3)}
        style={{width: moderateScale(40,0.3)}}
      />
      <CustomText
        style={{
          position: 'absolute',
          left: moderateScale(70, 0.3),
          fontSize: moderateScale(17, 0.3),
          color: Color.green,
          fontWeight: '700',
        }}
      >
        {title}
      </CustomText>
      {notification ? (
        <ToggleSwitch
          isOn={on}
          onColor={Color.green}
          offColor="grey"
          size="medium"
          onToggle={isOn => setOn(isOn)}
        />
      ) : (
        <Icon
          name={icon2}
          as={icon2type}
          color={Color.green}
          size={moderateScale(17, 0.3)}
        />
      )}
    </TouchableOpacity>
  );
};
