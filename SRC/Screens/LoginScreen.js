import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  ImageBackground,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import navigationService from '../navigationService';

import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomAlertModal from '../Components/CustomAlertModal';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomButton from '../Components/CustomButton';
import {
  setGoalCreated,
  setIsVerified,
  setPm_Type,
  setUserToken,
} from '../Store/slices/auth';
import {validateEmail} from '../Config';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setUserData} from '../Store/slices/common';
import {Icon, ScrollView} from 'native-base';
import CustomImage from '../Components/CustomImage';
import CardContainer from '../Components/CardContainer';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LoginScreen = () => {
  const dispatch = useDispatch();
  const {fcmToken} = useSelector(state => state.commonReducer);

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Parent');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [alertText, setAlertText] = useState(null);
  const [alertTitle, setAlertTitle] = useState(null);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalIconType, setAlertModalIconType] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const Header = apiHeader();

  const Login = async () => {
    const params = {
      email: email?.trim().toLowerCase(),
      password: password,
      current_role: role,
    };
    console.log(params);

    if (email == '' || password == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Required field is empty', ToastAndroid.SHORT)
        : Alert.alert('Required field is empty');
    }
    if (!validateEmail(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('email is not validate', ToastAndroid.SHORT)
        : Alert.alert('email is not validate');
    }
    const url = 'login';
    setIsLoading(true);
    const response = await Post(url, params, apiHeader());
    setIsLoading(false);

    if (response != undefined) {
    //  return console.log('response?.data?.data?.user', response?.data?.user_info);
      if (
        [null, '', undefined].includes(response?.data?.user_info?.pm_type) &&
        response?.data?.user_info?.current_role == 'Child'
      ) {
        return Platform.OS == 'android'
          ? ToastAndroid.show('Parent Card is Not Attached', ToastAndroid.SHORT)
          : Alert.alert('Parent Card is Not Attached yet');
      }
      else{
        dispatch(setUserData(response?.data?.user_info));
        dispatch(setUserToken(response?.data));
        dispatch(setGoalCreated(response.data?.user_info?.is_goal))
        dispatch(setPm_Type(response?.data?.user_info?.pm_type));

      }

    }
  };

  return (
    <ScreenBoiler
      showHeader={true}
      // showBack={true}
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}
      headerType={1}
      title={'Sign in'}
      showList={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.sectionContainer}
        contentContainerStyle={{paddingBottom: moderateScale(20, 0.3)}}>
        <Image
          source={require('../Assets/Images/login.png')}
          resizeMode={'contain'}
          style={{
            height: windowHeight * 0.4,
            marginTop: moderateScale(10, 0.3),
          }}
        />
        <CardContainer>
          <DropDownSingleSelect
            array={['Parent', 'Child']}
            item={role}
            setItem={setRole}
            placeholder={'Select User Role'}
            width={windowWidth * 0.75}
            dropDownHeight={windowHeight * 0.05}
            dropdownStyle={{
              width: windowWidth * 0.75,
              borderBottomWidth: 0,
              marginTop: moderateScale(15, 0.3),
              // borderColor : Color.themeLightGray,
              // borderWidth : 1 ,
              borderRadius: moderateScale(20, 0.6),
              height: windowHeight * 0.05,
              backgroundColor: Color.lightGrey,
            }}
          />
          <TextInputWithTitle
            iconName="envelope"
            iconType={FontAwesome}
            titleText={'Email'}
            secureText={false}
            placeholder={'Email'}
            setText={setEmail}
            value={email}
            viewHeight={0.05}
            viewWidth={0.75}
            inputWidth={0.7}
            border={1}
            borderColor={Color.lightGrey}
            backgroundColor={'#EAEAEA'}
            // marginTop={moderateScale(30, 0.3)}
            color={'#11A44C'}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(20, 0.3)}
          />
          <TextInputWithTitle
            iconName="lock"
            iconType={FontAwesome}
            titleText={'password'}
            secureText={true}
            placeholder={'password'}
            setText={setPassword}
            value={password}
            viewHeight={0.05}
            viewWidth={0.75}
            inputWidth={0.7}
            border={1}
            borderColor={Color.lightGrey}
            backgroundColor={'#EAEAEA'}
            marginTop={moderateScale(10, 0.3)}
            color={'#11A44C'}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(20, 0.3)}
          />
          <CustomText
            onPress={() => {
              navigationService.navigate('EnterPhone', {fromForgot: true});
            }}
            style={styles.txt3}>
            {'Forgot Password ?'}
          </CustomText>
          {/* <View style={styles.iconContainer}>
            <View style={[styles.cont, {backgroundColor: '#87CEEB'}]}>
              <Icon
                name="sc-facebook"
                as={EvilIcons}
                color={'#2196F3'}
                size={moderateScale(20, 0.3)}
              />
              <CustomText
                style={{fontSize: moderateScale(14, 0.3), color: '#2196F3'}}
              >
                facebook
              </CustomText>
            </View>
            <View style={[styles.cont, {backgroundColor: '#E94F09'}]}>
              <Icon
                name="google"
                as={AntDesign}
                color={'#ffffff'}
                size={moderateScale(18, 0.3)}
                style={{marginRight: moderateScale(5, 0.3)}}
              />
              <CustomText
                style={{fontSize: moderateScale(14, 0.3), color: '#ffffff'}}
              >
                Google
              </CustomText>
            </View>
          </View> */}
          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Sign In'
              )
            }
            isBold
            textColor={Color.white}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={Login}
            bgColor={Color.green}
            borderColor={Color.white}
            borderWidth={2}
            borderRadius={moderateScale(30, 0.3)}
          />

          <View style={styles.container2}>
            <CustomText style={styles.txt5}>
              {"Don't have an account? "}
            </CustomText>
            <TouchableOpacity
              style={{marginLeft: width * 0.01}}
              onPress={() => navigationService.navigate('SignupScreen')}>
              <CustomText style={styles.txt4}>{'Sign Up'}</CustomText>
            </TouchableOpacity>
          </View>
        </CardContainer>
      </ScrollView>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  sectionContainer: {
    // flex: 1,
    height: windowHeight,
    paddingTop: moderateScale(5, 0.3),
  },
  Txt: {
    marginTop: moderateScale(10, 0.3),
    color: Color.themeBlack,
    fontSize: moderateScale(22, 0.6),
    textAlign: 'center',
  },
  tou: {
    marginTop: height * 0.03,
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: windowWidth * 0.75,
    // backgroundColor : 'red',
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.3),
    marginTop: moderateScale(10, 0.3),
  },
  cont: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.3,
    borderRadius: moderateScale(20, 0.3),
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: Color.white,
    borderRadius: moderateScale(30, 0.3),
    paddingHorizontal: moderateScale(25, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    marginVertical: moderateScale(40, 0.3),
  },
  img: {height: windowHeight * 0.26},
  Tou: {
    width: width * 0.9,
    height: height * 0.055,
    marginTop: height * 0.03,
  },
  txt2: {
    color: 'white',
    fontSize: moderateScale(16, 0.6),
  },
  txt3: {
    color: Color.lightGreen,
    fontSize: moderateScale(12, 0.6),
    alignSelf: 'flex-end',
    marginTop: moderateScale(10, 0.3),
    marginRight: moderateScale(30, 0.3),
  },
  txt4: {
    color: Color.lightGreen,
    fontSize: moderateScale(14, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.white,
  },
  txt5: {
    color: Color.black,

    fontSize: moderateScale(12, 0.6),
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9,
    // marginTop: moderateScale(10,0.3),
  },
});

export default LoginScreen;
