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
import {setIsVerified, setUserToken} from '../Store/slices/auth';
import {validateEmail} from '../Config';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setUserData} from '../Store/slices/common';
import {Icon, ScrollView} from 'native-base';
import CustomImage from '../Components/CustomImage';
import CardContainer from '../Components/CardContainer';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const EnterPhone = props => {
  const dispatch = useDispatch();
  const {fcmToken} = useSelector(state => state.commonReducer);

  const fromForgot = props?.route?.params?.fromForgot;
  console.log('here=>',fromForgot);
  const [phone, setPhone] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [showNumberModal, setShowNumberModal] = useState(false);
  const [countryCodePrefex, setCountryCodePrefex] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [country, setCountry] = useState('');
console.log(countryCode)

const sendOTP = async()=>{

  const url = "password/email"
  if(['',null ,undefined].includes(phone) || ['',null ,undefined].includes(countryCode) ){
   return Platform.OS =='android' ? 
    ToastAndroid.show('Phone number is required' , ToastAndroid.SHORT) :
    alert('Phone number is required');
    
  }
  setIsLoading(true);
  const response = await Post(url ,{email : 'syedbaber115@gmail.com'} , apiHeader());
  setIsLoading(false);
  if(response != undefined){
    console.log('response data =>' , response?.data)
    Platform.OS == 'android' ?
    ToastAndroid.show(`OTP sent to syedbaber115@gmail.com` , ToastAndroid.SHORT) :
    alert(`OTP sent to syedbaber115@gmail.com`)
    fromForgot
    ? navigationService.navigate('VerifyNumber', {
      fromForgot: fromForgot,
      phoneNumber : `${countryCode}${phone}`
    })
    : navigationService.navigate('VerifyNumber',{
      phoneNumber : `${countryCode}${phone}`
    });
  }
}


 
  const onSelect = country => {
    setCountryCode(`+${country.callingCode}`);
    setCountryCodePrefex(country.cca2);
    setCountry(country);
  };

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}
      headerType={1}
      title={'Enter Phone number'}
      showList={true}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.sectionContainer}
        contentContainerStyle={{paddingBottom: moderateScale(20, 0.3)}}
      >
        <Image
          source={require('../Assets/Images/phone.png')}
          resizeMode={'contain'}
          style={{
            alignSelf: 'center',
            // backgroundColor : 'red',
            height: windowHeight * 0.41,
            marginTop: moderateScale(10, 0.3),
          }}
        />
        <CardContainer style={{paddingTop: moderateScale(30, 0.3)}}>
          <CustomText style={styles.txt2}>Your Phone</CustomText>
          <CustomText style={styles.txt3}>
            {fromForgot
              ? 'Enter your mobile number to get verification code '
              : 'Enter Your Mobile number to dd register an account'}
          </CustomText>
          <View style={styles.phoneView}>
            <TouchableOpacity
              onPress={() => {
                setShowNumberModal(true);
              }}
            >
              <CountryPicker
                {...{
                  onSelect,
                }}
                // theme={DARK_THEME}
                withCallingCode={true}
                countryCode={countryCodePrefex}
                withCallingCodeButton={true}
                withFlagButton={false}
                withCountryNameButton={false}
                withFlag={true}
                withFilter={true}
                withAlphaFilter={true}
                onClose={() => {
                  setShowNumberModal(false);
                }}
                placeholder={`Select`}
                placeholderColor={Color.black}
                visible={showNumberModal}
                containerButtonStyle={styles.countryCode}
              />
            </TouchableOpacity>
            <TextInputWithTitle
              titleText={'Email'}
              //   secureText={true}
              placeholder={'number'}
              setText={setPhone}
              value={phone}
              viewHeight={0.05}
              viewWidth={0.6}
              inputWidth={0.55}
              border={1}
              borderColor={Color.lightGrey}
              backgroundColor={'#EAEAEA'}
              //   marginTop={moderateScale(10, 0.3)}
              color={'#11A44C'}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(20, 0.3)}
              keyboardType={'numeric'}
            />
          </View>
          <CustomButton
            // textTransform={"capitalize"}
            text={
              isLoading ? (
                <ActivityIndicator color={'#ffffff'} size={'small'} />
              ) : (
                'Send'
              )
            }
            isBold
            textColor={Color.white}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={sendOTP}
            bgColor={Color.green}
            borderColor={Color.white}
            borderWidth={2}
            borderRadius={moderateScale(30, 0.3)}
          />
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
    color: Color.black,
    fontSize: moderateScale(20, 0.6),
    fontWeight: 'bold',
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
    width: '60%',
    marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(17, 0.3),
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
  phoneView: {
    width: '80%',
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    // justifyContent: 'space-around',
    marginTop: moderateScale(20, 0.3),
  },
  countryCode: {
    borderRadius: moderateScale(17, 0.3),
    color: Color.themeLightGray,
    height: height * 0.047,
    paddingHorizontal: moderateScale(10, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10, 0.3),
    backgroundColor: '#EAEAEA',
  },
});

export default EnterPhone;
