import React, {useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

import {useDispatch, useSelector} from 'react-redux';

import navigationService from '../navigationService';

import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
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
import CardContainer from '../Components/CardContainer';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AddCard = () => {
  const dispatch = useDispatch();
  const {fcmToken} = useSelector(state => state.commonReducer);

  const [phone, setPhone] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const Header = apiHeader();

  const Login = async () => {
    const params = {
      email: email?.trim(),
      password: password,
    };
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
    const url = 'users/login';
    setIsLoading(true);
    const response = await Post(url, params, apiHeader());
    setIsLoading(false);

    if (response != undefined) {
      // console.log("response?.data?.data?.user", response?.data);
      dispatch(setIsVerified(response?.data?.data?.user?.isActive));
      dispatch(setUserData(response?.data?.data?.user));
      dispatch(setUserToken(response?.data));
    }
  };

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}
      headerType={1}
      title={'Connect cash account'}
      showList={true}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.sectionContainer}
        contentContainerStyle={{paddingBottom: moderateScale(20, 0.3)}}
      >
        <Image
          source={require('../Assets/Images/card.png')}
          resizeMode={'contain'}
          style={{
            alignSelf: 'center',
            // backgroundColor : 'red',
            height: windowHeight * 0.35,
            marginTop: moderateScale(10, 0.3),
          }}
        />
        <CardContainer
          style={{
            height: windowHeight * 0.45,
            paddingTop: moderateScale(30, 0.3),
          }}
        >
          <TextInputWithTitle
            titleText={'Email'}
            placeholder={'number'}
            setText={setPhone}
            value={phone}
            viewHeight={0.05}
            viewWidth={0.75}
            inputWidth={0.72}
            border={1}
            borderColor={Color.lightGrey}
            backgroundColor={'#EAEAEA'}
            marginTop={moderateScale(8, 0.3)}
            color={'#11A44C'}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(20, 0.3)}
            keyboardType={'numeric'}
          />
          <View style={[styles.phoneView, {marginTop: moderateScale(8, 0.3)}]}>
            <TextInputWithTitle
              titleText={'Email'}
              placeholder={'number'}
              setText={setPhone}
              value={phone}
              viewHeight={0.05}
              viewWidth={0.47}
              inputWidth={0.45}
              border={1}
              borderColor={Color.lightGrey}
              backgroundColor={'#EAEAEA'}
              //   marginTop={moderateScale(10, 0.3)}
              color={'#11A44C'}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(20, 0.3)}
              keyboardType={'numeric'}
            />

            <View style={styles.cont}>
              <CustomText style={styles.txt4}>Scan</CustomText>
            </View>
          </View>
          <View style={[styles.phoneView, {marginTop: moderateScale(5, 0.3)}]}>
            <TextInputWithTitle
              titleText={'Email'}
              placeholder={'number'}
              setText={setPhone}
              value={phone}
              viewHeight={0.05}
              viewWidth={0.35}
              inputWidth={0.32}
              border={1}
              borderColor={Color.lightGrey}
              backgroundColor={'#EAEAEA'}
              //   marginTop={moderateScale(10, 0.3)}
              color={'#11A44C'}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(20, 0.3)}
              keyboardType={'numeric'}
            />

            <TextInputWithTitle
              titleText={'Email'}
              placeholder={'number'}
              setText={setPhone}
              value={phone}
              viewHeight={0.05}
              viewWidth={0.35}
              inputWidth={0.32}
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
          <TextInputWithTitle
            titleText={'Email'}
            placeholder={'number'}
            setText={setPhone}
            value={phone}
            viewHeight={0.05}
            viewWidth={0.75}
            inputWidth={0.72}
            border={1}
            borderColor={Color.lightGrey}
            backgroundColor={'#EAEAEA'}
            marginTop={moderateScale(8, 0.3)}
            color={'#11A44C'}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(20, 0.3)}
            keyboardType={'numeric'}
          />
          <CustomButton
            // textTransform={"capitalize"}
            text={
              isLoading ? (
                <ActivityIndicator color={'#000'} size={'small'} />
              ) : (
                'Send'
              )
            }
            isBold
            textColor={Color.white}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              navigationService.navigate('SetGoals');
            }}
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
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.3),
    marginTop: moderateScale(10, 0.3),
    backgroundColor: 'orange',
  },
  cont: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.23,
    borderRadius: moderateScale(20, 0.3),
    // opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'orange',
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
    color: Color.white,
    fontSize: moderateScale(14, 0.6),
    fontWeight: 'bold',
    // borderBottomWidth: 1,
    // borderColor: Color.white,
  },
  txt5: {
    color: Color.black,

    fontSize: moderateScale(12, 0.6),
  },

  phoneView: {
    width: windowWidth * 0.75,
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: moderateScale(20, 0.3),
    // backgroundColor: 'red',
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

export default AddCard;
