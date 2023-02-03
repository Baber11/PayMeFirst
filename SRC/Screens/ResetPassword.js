import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  ImageBackground,
  ScrollView,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomButton from '../Components/CustomButton';
import {setIsVerified, setUserLogin, setUserToken} from '../Store/slices/auth';
import CustomImage from '../Components/CustomImage';
import {Platform} from 'react-native';
import {setUserData} from '../Store/slices/common';
import {Post} from '../Axios/AxiosInterceptorFunction';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const ResetPassword = props => {
  const phoneNumber = props?.route?.params?.phoneNumber;
  console.log(phoneNumber);

  const dispatch = useDispatch();
  const {fcmToken} = useSelector(state => state.commonReducer);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const passwordReset = async () => {
    const params = {
      password: password,
      c_password: confirmPassword,
      phone: phoneNumber,
    };
    for (let key in params) {
      if (params[key] === '') {
        return (Platform.OS = 'android'
          ? ToastAndroid.show('Required field is empty', ToastAndroid.SHORT)
          : Alert.alert('Required field is empty'));
      }
    }


    // Password Length
    if (password.length < 8) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            'Password should atleast 8 character long',
            ToastAndroid.SHORT,
          )
        : Alert.alert('Password should atleast 8 character long');
    }
    if (password != confirmPassword) {
      return (Platform.OS = 'android'
        ? ToastAndroid.show('passwords MissMatched !', ToastAndroid.SHORT)
        : Alert.alert('passwords MissMatched !'));
    }

    const url = 'password/reset';
    setIsLoading(true);
    const response = await Post(url, params, apiHeader());
    setIsLoading(false);
    if (response !== undefined) {
      console.log(response?.data);
      // dispatch(setIsVerified(response?.data?.data?.user?.isActive));
      // dispatch(setUserLogin(response?.data));
      // dispatch(setUserData(response?.data?.data?.user));
    }
  };
  // dispatch(setUserToken('123456'));

  return (
    <ScreenBoiler
      showHeader={false}
      showBack={false}
      showDrawer={false}
      statusBarBackgroundColor={Color.green}
      statusBarContentStyle={'light-content'}
    >
      <View
        style={{
          // borderWidth: 4,
          // borderColor: Color.themeColor1,
          alignItems: 'center',
          height: windowHeight,
          width: windowWidth,
          paddingVertical: moderateScale(30, 0.3),
          backgroundColor: Color.white,
        }}
      >
        <CustomImage
          style={styles.img}
          resizeMode={'contain'}
          source={require('../Assets/Images/splash.png')}
        />

        <CustomText style={styles.Txt}>
          {'Set your new \n'}
          <CustomText
            isBold
            style={{
              // lineHeight: moderateScale(50, 0.3),
              fontSize: moderateScale(40, 0.3),
              color: Color.themeBlack,
              fontWeight: 'bold',
            }}
          >
            password
          </CustomText>
        </CustomText>
        <View style={{marginTop: moderateScale(50, 0.3)}}>
          <TextInputWithTitle
            iconName="lock"
            iconType={FontAwesome5}
            titleText={'New Password'}
            secureText={true}
            placeholder={'New Password'}
            setText={setPassword}
            value={password}
            viewHeight={0.06}
            viewWidth={0.9}
            inputWidth={0.8}
            border={1}
            borderColor={Color.themeLightGray}
            backgroundColor={'#F5F5F5'}
            marginTop={moderateScale(30, 0.3)}
            color={Color.themeLightGray}
            placeholderColor={Color.themeLightGray}
          />
          <TextInputWithTitle
            iconName="lock"
            iconType={FontAwesome5}
            titleText={'Confirm Password'}
            secureText={true}
            placeholder={'Confirm Password'}
            setText={setConfirmPassword}
            value={confirmPassword}
            viewHeight={0.06}
            viewWidth={0.9}
            inputWidth={0.8}
            // marginTop={0.04}
            border={1}
            borderColor={Color.themeLightGray}
            backgroundColor={'#F5F5F5'}
            marginTop={moderateScale(20, 0.3)}
            color={Color.themeLightGray}
            placeholderColor={Color.themeLightGray}
          />
        </View>
        <CustomButton
          // textTransform={"capitalize"}
          text={
            isLoading ? (
              <ActivityIndicator color={'#ffffff'} size={'small'} />
            ) : (
              'Submit'
            )
          }
          isBold
          textColor={Color.white}
          width={windowWidth * 0.75}
          height={windowHeight * 0.06}
          marginTop={moderateScale(40, 0.3)}
          onPress={passwordReset}
          bgColor={Color.green}
          borderColor={Color.white}
          borderWidth={2}
          borderRadius={moderateScale(30, 0.3)}
        />
      </View>
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

  img: {height: windowHeight * 0.16},
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
    color: '#FFFFFF',
    fontSize: moderateScale(14, 0.6),
  },
  txt4: {
    color: '#FFFFFF',
    fontSize: moderateScale(14, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.white,
  },
  txt5: {
    color: '#FFFFFF',

    fontSize: moderateScale(14, 0.6),
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9,
    marginTop: height * 0.01,
  },
});

export default ResetPassword;
