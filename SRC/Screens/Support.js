import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  ToastAndroid,
  Platform,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import CustomAlertModal from '../Components/CustomAlertModal';
import navigationService from '../navigationService';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import CustomButton from '../Components/CustomButton';

const Support = () => {
  const token = useSelector((state)=>state.authReducer.token)
  const isFocused = useIsFocused();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [supportData, setSupportData] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);

  const GetSupportData = async () => {
    const url = 'auth/admin/info';
    setLoading(true);
    const response = await Get(url,token);
    setLoading(false);
    if (response != undefined) {
      console.log(response?.data);
      setSupportData(response?.data?.data);
    }
  };
  useEffect(() => {
    GetSupportData();
    // setFullName('');
    // setPhone('');
    // setEmail('');
    // setSubject('');
    // setMessage('');
  }, [isFocused]);
  const sendQuestion = async () => {
    const url = 'auth/contact/submit';
    const body = {
      name: fullName,
      phone: phone,
      email: email,
      subject: subject,
      description: message,
    };
    for (let key in body) {
      if (body[key] === '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key}  is required`, ToastAndroid.SHORT)
          : alert(`${key}  is required`);
      }
    }
    setSubmitLoading(true);

    const response = await Post(url, body, apiHeader(token));
    setSubmitLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show(
            'Sent Successfully',
            ToastAndroid.SHORT,
          )
        : alert('Sent Successfully');
      navigationService.navigate('HomeScreen');
    }
  };

  return (
    <ScreenBoiler
      showHeader={true}
      title={'Support'}
      statusBarBackgroundColor={Color.themeBlack}
      headerColor={Color.white}
      headerType={1}
      showBack={true}
    >
      <ImageBackground
        source={require('../Assets/Images/chatBackground.png')}
        // imageStyle={{flex: 1}}
        style={{
          flex: 1,
          backgroundColor: '#E8E8E9',
          marginTop: moderateScale(-20, 0.3),
          zIndex: -1,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: moderateScale(50, 0.3),
          }}
        >
          <CustomText style={styles.Txt1} isBold>
            {'Contact Us'}
          </CustomText>
          <TouchableOpacity
            style={[styles?.ContactInfoContainer]}
            activeOpacity={0.85}
            onPress={() => {
              Linking.openURL(`tel:${supportData?.contact}`);
            }}
          >
            <FontAwesome
              name="phone"
              color={Color.green}
              style={styles.icon1}
              size={moderateScale(22, 0.6)}
            />
            <CustomText style={[styles.contactInfoText]} isRegular>
              {loading
                ? 'loading...'
                : supportData?.phone
                ? supportData?.phone
                : 'no contact added yet'}
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles?.ContactInfoContainer]}
            activeOpacity={0.85}
            onPress={() => {
              Linking.openURL(`mailto: ${supportData?.email}`);
            }}
          >
            <Entypo
              name="mail"
              color={Color.green}
              style={styles.icon1}
              size={moderateScale(22, 0.6)}
            />
            <CustomText style={[styles.contactInfoText]} isRegular>
              {loading
                ? 'loading...'
                : supportData?.official_email
                ? supportData?.official_email
                : 'not added yet'}
            </CustomText>
          </TouchableOpacity>
          <CustomText
            style={[styles.Txt1, {marginTop: moderateScale(10, 0.3)}]}
            isBold
          >
            {'Ask a Question'}
          </CustomText>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TextInputWithTitle
              titleText={'Your Name'}
              secureText={false}
              placeholder={'Your Name'}
              setText={setFullName}
              value={fullName}
              viewHeight={0.06}
              viewWidth={0.85}
              inputWidth={0.8}
              border={1}
              borderColor={Color.themeLightGray}
              placeholderColor={Color.black}
              marginTop={moderateScale(15, 0.3)}
              backgroundColor={'#F5F5F5'}
            />
            <TextInputWithTitle
              titleText={'Phone'}
              secureText={false}
              placeholder={'Phone'}
              keyboardType={'numeric'}
              setText={setPhone}
              value={phone}
              viewHeight={0.06}
              viewWidth={0.85}
              inputWidth={0.8}
              border={1}
              placeholderColor={Color.black}
              borderColor={Color.themeLightGray}
              backgroundColor={'#F5F5F5'}
              marginTop={moderateScale(15, 0.3)}
            />

            <TextInputWithTitle
              titleText={'Email'}
              secureText={false}
              placeholder={'Email'}
              setText={setEmail}
              value={email}
              viewHeight={0.06}
              viewWidth={0.85}
              inputWidth={0.8}
              marginTop={moderateScale(15, 0.3)}
              border={1}
              placeholderColor={Color.black}
              borderColor={Color.themeLightGray}
              backgroundColor={'#F5F5F5'}
            />
            <TextInputWithTitle
              titleText={'Subject'}
              secureText={false}
              placeholder={'Subject'}
              setText={setSubject}
              value={subject}
              viewHeight={0.07}
              viewWidth={0.85}
              inputWidth={0.8}
              marginTop={moderateScale(15, 0.3)}
              border={1}
              placeholderColor={Color.black}
              borderColor={Color.themeLightGray}
              backgroundColor={'#F5F5F5'}
            />

            <TextInputWithTitle
              titleText={'Enter Description'}
              secureText={false}
              placeholder={'Enter Description'}
              setText={setMessage}
              value={message}
              viewHeight={0.15}
              viewWidth={0.85}
              inputWidth={0.7}
              inputHeight={0.1}
              border={1}
              borderColor={Color.themeLightGray}
              backgroundColor={'#F5F5F5'}
              marginTop={moderateScale(20, 0.3)}
              multiline={true}
              inputStyle={{textAlign: 'vertical'}}
              borderRadius={moderateScale(10, 0.3)}
              placeholderColor={Color.black}
            />
            <CustomButton
              // textTransform={"capitalize"}
              text={
                submitLoading ? (
                  <ActivityIndicator color={'#ffffff'} size={'small'} />
                ) : (
                  'send'
                )
              }
              isBold
              textColor={Color.white}
              width={windowWidth * 0.75}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              onPress={sendQuestion}
              bgColor={Color.green}
              borderColor={Color.white}
              borderWidth={2}
              borderRadius={moderateScale(30, 0.3)}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </ScreenBoiler>
  );
};

export default Support;

const styles = ScaledSheet.create({
  Tou: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.055,
    marginTop: windowHeight * 0.05,
    marginBottom: moderateScale(50, 0.3),
  },
  icon: {
    fontWeight: 'bold',
    marginLeft: 30,
    width: windowWidth * 0.3,
  },
  icon1: {
    fontWeight: 'bold',
    marginLeft: 30,
    width: windowWidth * 0.09,
  },
  Txt: {
    fontSize: moderateScale(25, 0.3),
    color: 'black',
    fontWeight: 'bold',
  },
  Txt1: {
    fontSize: moderateScale(20, 0.3),
    fontWeight: 'bold',
    color: Color.themeBlack,
    marginTop: moderateScale(40, 0.3),

    marginLeft: moderateScale(30, 0.3),
    // alignSelf: "flex-start",
  },
  contactInfoText: {
    fontSize: moderateScale(13, 0.3),
  },

  input: {
    width: windowWidth * 0.8,
    fontSize: moderateScale(14, 0.7),
    paddingLeft: windowWidth * 0.02,
  },

  ContactInfoContainer: {
    width: windowWidth,
    paddingVertical: moderateScale(10, 0.3),
    // marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
