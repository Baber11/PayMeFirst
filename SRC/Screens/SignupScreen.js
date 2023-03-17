import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  Alert,
  Platform,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import navigationService from '../navigationService';

import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CountryPicker from 'react-native-country-picker-modal';

import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomButton from '../Components/CustomButton';
import {validateEmail} from '../Config';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setGoalCreated, setIsVerified, setUserToken} from '../Store/slices/auth';
import {setUserData} from '../Store/slices/common';
import ImagePickerModal from '../Components/ImagePickerModal';
import CustomImage from '../Components/CustomImage';
import {Icon} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignupScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const {fcmToken} = useSelector(state => state.commonReducer);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passCode, setPassCode] = useState('');
  const [confirmPassCode, setConfirmPassCode] = useState('');
  const [childName , setChildName] = useState('');
  const [childAge , setChildAge] = useState('');
  console.log("🚀 ~ file: SignupScreen.js:60 ~ SignupScreen ~ childAge:", childAge)
  const [childGender , setChildGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [image, setImage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [countryCodePrefex, setCountryCodePrefex] = useState('');
  const [showNumberModal, setShowNumberModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const formData = new FormData();

  const onSelect = country => {
    setCountryCode(`+${country.callingCode}`);
    setCountryCodePrefex(country.cca2);
    setCountry(country);
  };
  const SignUp = async () => {
   
    const params = {
     
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      c_password: confirmPassword,
      phone: `${countryCode}${phone}`,
      country: country,
      passcode : confirmPassCode ,
      child_name : childName ,
      child_age : childAge ,
      child_gander : childGender ,


    
    };
    
    for (let key in params) {
      if (params[key] === '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show('Required field is empty', ToastAndroid.SHORT)
          : Alert.alert('Required field is empty');
      }
      formData.append(key , params[key]);
    }
    if(Object.keys(image).length > 0 ){

      formData.append('photo',image)
    }
    console.log(JSON.stringify(formData,null,2))
    if (isNaN(phone)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('phone is not a number', ToastAndroid.SHORT)
        : Alert.alert('phone is not a number');
    }
    if (!validateEmail(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('email is not validate', ToastAndroid.SHORT)
        : Alert.alert('email is not validate');
    }
    if (password.length < 8) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            'Password should atleast 8 character long',
            ToastAndroid.SHORT,
          )
        : Alert.alert('Password should atleast 8 character long');
    }
    if (password != confirmPassword) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Password does not match', ToastAndroid.SHORT)
        : Alert.alert('Password does not match');
    }
    if(passCode.length > 4 || passCode.length < 4){
      return Platform.OS == 'android'
      ? ToastAndroid.show('Passcode should be of 4 digit only', ToastAndroid.SHORT)
      : Alert.alert('Passcode should be of 4 digit only');
    }
    if (passCode != confirmPassCode) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('PassCode does not match', ToastAndroid.SHORT)
        : Alert.alert('PassCode does not match');
    }
    if(isNaN(childAge)){
      return Platform.OS == 'android'
      ? ToastAndroid.show('Age should be in numberic only', ToastAndroid.SHORT)
      : Alert.alert('Age should be in numberic only');
    }

    const url = 'register';
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      console.log("response?.data", response?.data);
      Platform.OS === 'android'
        ? ToastAndroid.show('User Registered Succesfully', ToastAndroid.SHORT)
        : Alert.alert("User Registered Succesfully");
        navigation.goBack()
        // dispatch(setUserData(response?.data?.user_info));
        // dispatch(setUserToken(response?.data));
        // dispatch(setGoalCreated(response?.data?.user_info?.is_goal))
    }
  };
  return (
    <ScreenBoiler
      showHeader={false}
      showBack={false}
      showDrawer={false}
      statusBarBackgroundColor={Color.green}
      statusBarContentStyle={'light-content'}
    >
       <ImageBackground
        source={require('../Assets/Images/chatBackground.png')}
        // imageStyle={{flex: 1}}
        style={{
          // height : windowHeight *1,
          // flex: 1,
          backgroundColor: '#E8E8E9',
          // marginTop: moderateScale(-20, 0.3),
          // zIndex: -1,
          // backgroundColor : 'red'
        }}
      >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: moderateScale(50, 0.3),
          paddingTop: moderateScale(30, 0.3),

          // backgroundColor : '#FFFFFF'
        }}
      >
        <CustomText style={styles.Txt}>
          {'Welcome to \n'}
          <CustomText
            isBold
            style={{
              // lineHeight: moderateScale(50, 0.3),
              fontSize: moderateScale(35, 0.3),
              color: Color.themeGreen,
              fontWeight: 'bold',
              // textTransform : 'uppercase'
            }}
          >
            PayMeFirst
          </CustomText>
        </CustomText>
        <View>
          {Object.keys(image).length > 0 ? (
            <CustomImage source={{uri: image?.uri}} style={styles.image} />
          ) : (
            <CustomImage
              style={styles.image}
              source={require('../Assets/Images/defualtProfile.png')}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
            }}
            style={styles.edit}
          >
            <Icon
              name="pencil"
              as={FontAwesome}
              style={styles.icon2}
              color={Color.white}
              size={moderateScale(16, 0.3)}
            />
          </TouchableOpacity>
        </View>

        <TextInputWithTitle
          iconName="user"
          iconType={FontAwesome}
          titleText={'First Name'}
          secureText={false}
          placeholder={'First Name'}
          setText={setFirstName}
          value={firstName}
          viewHeight={0.07}
          viewWidth={0.9}
          inputWidth={0.88}
          border={1}
          borderColor={Color.themeLightGray}
          backgroundColor={'transparent'}
          marginTop={moderateScale(30, 0.3)}
          color={Color.green}
          placeholderColor={Color.themeLightGray}
        />
        <TextInputWithTitle
          iconName="user"
          iconType={FontAwesome}
          titleText={'LastName'}
          secureText={false}
          placeholder={'LastName'}
          setText={setLastName}
          value={lastName}
          viewHeight={0.07}
          viewWidth={0.9}
          inputWidth={0.88}
          border={1}
          borderColor={Color.themeLightGray}
          backgroundColor={'transparent'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.green}
          placeholderColor={Color.themeLightGray}
        />
        <View
          style={[
            {
              flexDirection: 'row',
              width: moderateScale(width * 0.78, 0.3),
              justifyContent: 'space-between',
              alignItems: 'center',
              // backgroundColor: 'red',
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setShowNumberModal(true);
            }}
            style={
              {
                // width: width * 0.2,
                // justifyContent: 'center',
                // marginLeft: moderateScale(10, 0.3),
                // height: height * 0.08,
              }
            }
          >
            <CountryPicker
              {...{
                onSelect,
              }}
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
              placeholder={`select \u25BC`}
              placeholderColor={Color.themeLightGray}
              visible={showNumberModal}
              containerButtonStyle={{
                borderRadius: moderateScale(8, 0.3),
                borderWidth: 1,
                borderColor: Color.themeLightGray,
                color: Color.lightGrey,
                width: width * 0.2,
                marginLeft: -moderateScale(15,0.3),
                height: height * 0.07,
                marginTop: moderateScale(15,0.3),
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: moderateScale(10, 0.3),
              }}
            />
          </TouchableOpacity>
          <TextInputWithTitle
            iconName="phone"
            iconType={FontAwesome}
            titleText={'Phone'}
            secureText={false}
            placeholder={'Phone'}
            setText={setPhone}
            value={phone}
            viewHeight={0.07}
            viewWidth={0.67}
            inputWidth={0.65}
            border={1}
            borderColor={Color.themeLightGray}
            backgroundColor={'transparent'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.green}
            placeholderColor={Color.themeLightGray}
            keyboardType={'phone-pad'}
          />
        </View>

        <TextInputWithTitle
          iconName="envelope"
          iconType={FontAwesome}
          titleText={'Email'}
          secureText={false}
          placeholder={'Email'}
          setText={setEmail}
          value={email}
          viewHeight={0.07}
          viewWidth={0.9}
          inputWidth={0.88}
          border={1}
          borderColor={Color.themeLightGray}
          backgroundColor={'transparent'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.green}
          placeholderColor={Color.themeLightGray}
          keyboardType={'email-address'}
        />
        <TextInputWithTitle
          iconName="globe"
          iconType={FontAwesome}
          titleText={'Country'}
          secureText={false}
          placeholder={'Country'}
          setText={setCountry}
          value={country}
          viewHeight={0.07}
          viewWidth={0.9}
          inputWidth={0.88}
          border={1}
          borderColor={Color.themeLightGray}
          backgroundColor={'transparent'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.green}
          placeholderColor={Color.themeLightGray}
        />
          <TextInputWithTitle
          iconName="user"
          iconType={FontAwesome}
          titleText={'Child Name'}
          secureText={false}
          placeholder={'Child Name'}
          setText={setChildName}
          value={childName}
          viewHeight={0.07}
          viewWidth={0.9}
          inputWidth={0.88}
          border={1}
          borderColor={Color.themeLightGray}
          backgroundColor={'transparent'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.green}
          placeholderColor={Color.themeLightGray}
        />
         <TextInputWithTitle
          iconName="calendar"
          iconType={FontAwesome}
          titleText={'Child Age'}
          secureText={false}
          placeholder={'Child Age'}
          setText={setChildAge}
          value={childAge}
          viewHeight={0.07}
          viewWidth={0.9}
          inputWidth={0.88}
          border={1}
          borderColor={Color.themeLightGray}
          backgroundColor={'transparent'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.green}
          placeholderColor={Color.themeLightGray}
        />
         {/* <TextInputWithTitle
          iconName="user"
          iconType={FontAwesome}
          titleText={'Child Gender'}
          secureText={false}
          placeholder={'Child Gender'}
          setText={setChildName}
          value={childName}
          viewHeight={0.07}
          viewWidth={0.9}
          inputWidth={0.88}
          border={1}
          borderColor={Color.themeLightGray}
          backgroundColor={'transparent'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.green}
          placeholderColor={Color.themeLightGray}
        /> */}
          <DropDownSingleSelect
            array={['Male' , 'Female']}
            item={childGender}
            setItem={setChildGender}
            placeholder={'Select Child Gender'}
            width={windowWidth * 0.9}
            dropDownHeight={windowHeight * 0.07}
            dropdownStyle={{
              width: windowWidth * 0.9,
              // borderBottomWidth: 0,
              marginTop: moderateScale(15, 0.3),
              borderColor : Color.themeLightGray,
              borderWidth : 1 ,
              borderRadius : moderateScale(10,0.6),
              height : windowHeight * 0.07,
            }}
          />
         <TextInputWithTitle
          iconName="lock"
          iconType={FontAwesome}
          titleText={'Enter 4 digit Passcode'}
          secureText={true}
          placeholder={'Enter 4 digit Passcode'}
          setText={setPassCode}
          value={passCode}
          viewHeight={0.07}
          viewWidth={0.9}
          inputWidth={0.88}
          // marginTop={0.04}
          border={1}
          borderColor={Color.themeLightGray}
          backgroundColor={'transparent'}
          marginTop={moderateScale(5, 0.3)}
          color={Color.green}
          placeholderColor={Color.themeLightGray}
        />
        <TextInputWithTitle
          iconName="lock"
          iconType={FontAwesome}
          titleText={'Confirm Passcode'}
          secureText={true}
          placeholder={'Confirm Passcode'}
          setText={setConfirmPassCode}
          value={confirmPassCode}
          viewHeight={0.07}
          viewWidth={0.9}
          inputWidth={0.88}
          // marginTop={0.04}
          border={1}
          borderColor={Color.themeLightGray}
          backgroundColor={'transparent'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.green}
          placeholderColor={Color.themeLightGray}
        />

        <TextInputWithTitle
          iconName="lock"
          iconType={FontAwesome}
          titleText={'Password'}
          secureText={true}
          placeholder={'Password'}
          setText={setPassword}
          value={password}
          viewHeight={0.07}
          viewWidth={0.9}
          inputWidth={0.88}
          // marginTop={0.04}
          border={1}
          borderColor={Color.themeLightGray}
          backgroundColor={'transparent'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.green}
          placeholderColor={Color.themeLightGray}
        />
        <TextInputWithTitle
          iconName="lock"
          iconType={FontAwesome}
          titleText={'Confirm Password'}
          secureText={true}
          placeholder={'Confirm Password'}
          setText={setConfirmPassword}
          value={confirmPassword}
          viewHeight={0.07}
          viewWidth={0.9}
          inputWidth={0.88}
          // marginTop={0.04}
          border={1}
          borderColor={Color.themeLightGray}
          backgroundColor={'transparent'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.green}
          placeholderColor={Color.themeLightGray}
        />

        <CustomButton
          // textTransform={"capitalize"}
          text={
            isLoading ? (
              <ActivityIndicator color={'white'} size={'small'} />
            ) : (
              'SIGN UP'
            )
          }
          isBold
          textColor={Color.white}
          width={windowWidth * 0.9}
          height={windowHeight * 0.07}
          marginTop={moderateScale(20, 0.3)}
          onPress={SignUp}
          bgColor={Color.green}
          borderColor={Color.green}
          // borderWidth={1}

          borderRadius={moderateScale(10, 0.3)}
        />

        <View style={styles.container2}>
          <CustomText style={styles.txt5}>
            {'Already have an account? '}
          </CustomText>
          <TouchableOpacity
            style={{marginLeft: width * 0.01}}
            onPress={() => navigationService.navigate('LoginScreen')}
          >
            <CustomText style={styles.txt4}>{'Sign In'}</CustomText>
          </TouchableOpacity>
        </View>
      <ImagePickerModal
        show={showModal}
        setShow={setShowModal}
        setFileObject={setImage}
      />
      </ScrollView>
      </ImageBackground>
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
    color: Color.themeGreen,
    fontSize: moderateScale(22, 0.6),
    textAlign: 'center',
  },
  // icon2: {paddingTop: 5, paddingLeft: 5},

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
  image: {
    width: moderateScale(100, 0.3),
    height: moderateScale(100, 0.3),
    borderRadius: moderateScale(49, 0.3),
    marginLeft: moderateScale(2.5, 0.3),
    marginTop: moderateScale(2.5, 0.3),
  },
  edit: {
    backgroundColor: Color.green,
    width: moderateScale(25, 0.3),
    height: moderateScale(25, 0.3),
    position: 'absolute',
    bottom: moderateScale(5, 0.3),
    right: moderateScale(1, 0.3),
    borderRadius: moderateScale(12.5, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt2: {
    color: 'green',
    fontSize: moderateScale(16, 0.6),
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(14, 0.6),
  },
  txt4: {
    color: Color.green,
    fontSize: moderateScale(14, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.green,
  },
  txt5: {
    color: Color.themeLightGray,

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

export default SignupScreen;
