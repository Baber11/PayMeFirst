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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LoginScreen = () => {
  const dispatch = useDispatch();
  const {fcmToken} = useSelector(state => state.commonReducer);

  const [email, setEmail] = useState('');
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
        <CardContainer >
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
            marginTop={moderateScale(30, 0.3)}
            color={'#11A44C'}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(20,0.3)}
          />
           <TextInputWithTitle
            iconName="lock"
            iconType={FontAwesome}
            titleText={'Email'}
            secureText={true}
            placeholder={'Email'}
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
            borderRadius={moderateScale(20,0.3)}
          
          />
            <CustomText style={styles.txt3}>{"Forgot Password ?"}</CustomText>
            <View style={styles.iconContainer}>
              <View style={[styles.cont,{backgroundColor : '#87CEEB' }]}>
                <Icon
                name='sc-facebook'
                as={EvilIcons}
                color={'#2196F3'}
                size={moderateScale(20,0.3)}
                />
            <CustomText style={{fontSize : moderateScale(14,0.3) , color : '#2196F3'}} >facebook</CustomText>

              </View>
              <View style={[styles.cont,{backgroundColor : '#E94F09' }]}>
           
                <Icon
                name='google'
                as={AntDesign}
                color={'#ffffff'}
                size={moderateScale(18,0.3)}
                style={{marginRight : moderateScale(5,0.3)}}
                />
            <CustomText style={{fontSize : moderateScale(14,0.3) , color : '#ffffff'}} >Google</CustomText>

              </View>

            </View>
            <CustomButton
            // textTransform={"capitalize"}
            text={
              isLoading ? (
                <ActivityIndicator color={"#000"} size={"small"} />
              ) : (
                "Sign In"
              )
            }
            isBold
            textColor={Color.white}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={()=>{navigationService.navigate('EnterPhone')}}
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
              style={{ marginLeft: width * 0.01 }}
              onPress={() => navigationService.navigate("SignupScreen")}
            >
              <CustomText style={styles.txt4}>{"Sign Up"}</CustomText>
            </TouchableOpacity>
          </View>
        </CardContainer>
      </ScrollView>

      {/* <View
          style={{
            // borderWidth: 4,
            // borderColor: Color.themeColor1,
            alignItems: "center",
            height: windowHeight * 0.95,
            paddingVertical: moderateScale(30, 0.3),
          }}
        >
          <Image
            style={styles.img}
            resizeMode={"contain"}
            source={require("../Assets/Images/pig.png")}
          />

          <CustomText style={styles.Txt} isBold>
            {"Welcome Back \n"}
            <CustomText
              isBold
              style={{
                // lineHeight: moderateScale(50, 0.3),
                fontSize: moderateScale(11, 0.3),
                color: Color.mediumGray,
                fontWeight: "bold",
                lineHeight : moderateScale(30,0.3)

              }}
            >
              login to continue
            </CustomText>
          </CustomText>
          <TextInputWithTitle
            // iconName="envelope"
            // iconType={FontAwesome}
            titleText={"Email"}
            secureText={false}
            placeholder={"Email"}
            setText={setEmail}
            value={email}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.8}
            border={2}
            borderColor={Color.lightGrey}
            backgroundColor={"transparent"}
            marginTop={moderateScale(60, 0.3)}
            color={Color.themeLightGray}
            placeholderColor={Color.themeLightGray}
          />
          <TextInputWithTitle
            // iconName="lock"
            // iconType={FontAwesome5}
            titleText={"Password"}
            secureText={true}
            placeholder={"Password"}
            setText={setPassword}
            value={password}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.8}
            // marginTop={0.04}
            border={2}
            borderColor={Color.lightGrey}
            backgroundColor={"transparent"}
            marginTop={moderateScale(10, 0.3)}
            color={Color.themeLightGray}
            placeholderColor={Color.themeLightGray}
          />
          <CustomButton
            // textTransform={"capitalize"}
            text={
              isLoading ? (
                <ActivityIndicator color={"#000"} size={"small"} />
              ) : (
                "SIGN IN"
              )
            }
            isBold
            textColor={Color.white}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(30, 0.3)}
            onPress={Login}
            bgColor={Color.themeColor}
            borderColor={Color.white}
            borderWidth={2}
            borderRadius={moderateScale(10, 0.3)}
          />

          <TouchableOpacity
            onPress={() => navigationService.navigate("ForgetPassword")}
            style={styles.tou}
          >
            <CustomText style={styles.txt3}>{"Forgot Password"}</CustomText>
          </TouchableOpacity>

          <View style={styles.container2}>
            <CustomText style={styles.txt5}>
              {"Don't have an account? "}
            </CustomText>
            <TouchableOpacity
              style={{ marginLeft: width * 0.01 }}
              onPress={() => navigationService.navigate("SignupScreen")}
            >
              <CustomText style={styles.txt4}>{"Sign Up"}</CustomText>
            </TouchableOpacity>
          </View>
        </View> */}
      {/* </ImageBackground> */}
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
  iconContainer:{
    width : windowWidth * 0.75,
    // backgroundColor : 'red',
    paddingVertical : moderateScale(5,0.3),
    flexDirection : 'row',
    justifyContent : 'space-between',
    paddingHorizontal : moderateScale(15,0.3),
    marginTop : moderateScale(10,0.3)

  },
  cont :{
    height : windowHeight * 0.05 ,
    width : windowWidth * 0.3 ,
    borderRadius : moderateScale(20,0.3),
    opacity : 0.6,
    justifyContent : 'center',
    alignItems : 'center',
    flexDirection  :'row',
    
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
    alignSelf : 'flex-end',
    marginTop  :moderateScale(10,0.3),
    marginRight : moderateScale(30,0.3),
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
