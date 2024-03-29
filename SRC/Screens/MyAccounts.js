import React, {useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ImageView from "react-native-image-viewing";
import ScreenBoiler from '../Components/ScreenBoiler';
import {Icon} from 'native-base';
import CustomImage from '../Components/CustomImage';
import {setUserData} from '../Store/slices/common';
import {Patch, Post} from '../Axios/AxiosInterceptorFunction';
import ImagePickerModal from '../Components/ImagePickerModal';
import {formRegEx, formRegExReplacer, imageUrl} from '../Config';
import CustomButton from '../Components/CustomButton';

const MyAccounts = props => {
  const dispatch = useDispatch();
  
  const user = useSelector(state => state.commonReducer.userData);
  console.log(user?.photo);
  const token = useSelector(state => state.authReducer.token);
  const [showModal, setShowModal] = useState(false);
  const [imageObject, setImageObject] = useState({});
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [phone, setPhone] = useState(user?.phone);
  const [email, setEmail] = useState(user?.email);
  const [country, setCountry] = useState(user?.country);
  // const [description, setDescription] = useState(user?.description);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible , setIsVisible] = useState(false);
  
  const imageArray = Object.keys(imageObject).length > 0 ?
  [{
    uri : imageObject.uri
  }]
  :
  [{
    uri : `${user?.photo}`
  }]


  const EditProfile = async () => {
    const params = {
      first_name: firstName,
      last_name: lastName,
      phone : phone ,
      email: email,
      country: country,
     
    };
    const formdata = new FormData();
    for (let key in params) {
      if ([undefined, '', null].includes(params[key])) {
        return Platform.OS == 'android'
          ? ToastAndroid.show(
              `${key.replace(formRegEx, formRegExReplacer)} is empty`,
              ToastAndroid.SHORT,
            )
          : Alert.alert(
              `${key.replace(formRegEx, formRegExReplacer)} is empty`,
            );
      }
      formdata.append(key, params[key]);
    }
    if (Object.keys(imageObject).length > 0) {
      formdata.append('photo', imageObject);
    }
    console.log(formdata);

    const url = 'auth/profile';
    setIsLoading(true);
    const response = await Post(url, formdata, apiHeader(token, true));
    setIsLoading(false);

    if (response !== undefined) {
      console.log('response?.data?.data?.user', response?.data);
      dispatch(setUserData(response?.data?.user_info));

      Platform.OS == 'android'
        ? ToastAndroid.show('Profile Updated Succesfully', ToastAndroid.SHORT)
        : Alert.alert('Profile Updated Succesfully');
      props.navigation.goBack();
    }
  };
  return (
    <ScreenBoiler
      showHeader={true}
      title={'Account Info'}
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}
      // headerColor={Color.white}
      headerType={1}
      showBack={true}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{maxHeight: windowHeight * 0.9}}
        contentContainerStyle={{
          //   paddingLeft: moderateScale(30, 0.3),
          backgroundColor: 'transparent',
          alignItems: 'center',
          paddingBottom: moderateScale(30, 0.3),
          minHeight: windowHeight * 0.9,
        }}
      >
        <View>
          {Object.keys(imageObject).length > 0 ? (
            <CustomImage
            onPress={()=>{setIsVisible(true)}}
              source={{uri: imageObject?.uri}}
              style={[styles.image]}
            />
          ) : (
            <CustomImage
            onPress={()=>{setIsVisible(true)}}
              style={[styles.image]}
              source={
                user?.photo
                  ? {uri: `${user?.photo}`}
                  : require('../Assets/Images/user2.png')
              }
            />
          )}

          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              width: moderateScale(30, 0.3),
              height: moderateScale(30, 0.3),
              borderRadius: moderateScale(15, 0.3),
              backgroundColor: Color.green,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: moderateScale(8, 0.3),
              right: moderateScale(10, 0.3),
            }}
            onPress={() => setShowModal(true)}
          >
            <Icon
              name="pencil"
              as={FontAwesome}
              size={moderateScale(18, 0.3)}
              color={Color.white}
             
            />
          </TouchableOpacity>
        </View>
        <TextInputWithTitle
          iconName={'user'}
          iconType={FontAwesome}
          titleText={'First Name'}
          secureText={false}
          placeholder={'First Name'}
          setText={setFirstName}
          value={firstName}
          viewHeight={0.07}
          viewWidth={0.8}
          inputWidth={0.76}
          border={1}
          borderColor={Color.themeLightGray}
          backgroundColor={'#F8F8F8'}
          marginTop={moderateScale(30, 0.3)}
          placeholderColor={Color.black}
          color={Color.green}
        />
        <TextInputWithTitle
          iconName={'user'}
          iconType={FontAwesome}
          titleText={'Last Name'}
          secureText={false}
          placeholder={'Last Name'}
          setText={setLastName}
          value={lastName}
          viewHeight={0.07}
          viewWidth={0.8}
          inputWidth={0.76}
          border={1}
          borderColor={Color.themeLightGray}
          backgroundColor={'#F8F8F8'}
          marginTop={moderateScale(15, 0.3)}
          placeholderColor={Color.black}
          color={Color.green}
        />
        <TextInputWithTitle
          iconName={'phone'}
          iconType={FontAwesome}
          titleText={'Phone'}
          secureText={false}
          placeholder={'Phone'}
          setText={setPhone}
          value={phone}
          viewHeight={0.07}
          viewWidth={0.8}
          inputWidth={0.76}
          border={1}
          borderColor={Color.themeLightGray}
          backgroundColor={'#F8F8F8'}
          marginTop={moderateScale(15, 0.3)}
          placeholderColor={Color.black}
       color={Color.green}
          disable={true}
        />
        <TextInputWithTitle
          iconName={'envelope'}
          iconType={FontAwesome}
          // disable
          titleText={'Email'}
          secureText={false}
          placeholder={'Email'}
          setText={setEmail}
          value={email}
          viewHeight={0.07}
          viewWidth={0.8}
          inputWidth={0.76}
          border={1}
          borderColor={Color.themeLightGray}
          backgroundColor={'#F8F8F8'}
          marginTop={moderateScale(15, 0.3)}
          placeholderColor={Color.black}
       color={Color.green}
          disable
        />
        <TextInputWithTitle
          iconName={'globe'}
          iconType={FontAwesome}
          titleText={'Country'}
          secureText={false}
          placeholder={'Country'}
          setText={setCountry}
          value={country}
          viewHeight={0.07}
          viewWidth={0.8}
          inputWidth={0.76}
          border={1}
          inputStyle={{}}
          borderColor={Color.themeLightGray}
          backgroundColor={'#F8F8F8'}
          marginTop={moderateScale(15, 0.3)}
          placeholderColor={Color.black}
       color={Color.green}
        
        />
        {/* <TextInputWithTitle
          titleText={'Description'}
          secureText={false}
          placeholder={'Description'}
          setText={setDescription}
          value={description}
          viewHeight={0.13}
          viewWidth={0.8}
          inputWidth={0.76}
          inputHeight={0.1}
          border={1}
          borderColor={Color.themeLightGray}
          backgroundColor={'#F8F8F8'}
          marginTop={moderateScale(25, 0.3)}
          multiline={true}
          inputStyle={{
            textAlign: 'vertical',
          }}
          borderRadius={moderateScale(10, 0.3)}
          placeholderColor={Color.black}
       color={Color.themeDarkGray}
        /> */}
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
          marginTop={moderateScale(20, 0.3)}
          onPress={EditProfile}
          bgColor={Color.green}
        
          borderRadius={moderateScale(30, 0.3)}
        />
      </ScrollView>
      <ImagePickerModal
        show={showModal}
        setShow={setShowModal}
        setFileObject={setImageObject}
        crop={true}
      />
      <ImageView
  images={imageArray}
  imageIndex={0}
  visible={isVisible}
  onRequestClose={() => setIsVisible(false)}
/>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  filterContainer: {
    height: windowHeight * 0.078,
    width: windowWidth * 0.15,
    // paddingHorizontal: moderateScale(7, 0.3),
    marginTop: moderateScale(10, 0.3),
    marginLeft: moderateScale(10, 0.3),
    borderRadius: moderateScale(5, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    height: windowHeight * 0.9,
    width: windowWidth,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20, 0.3),
  },
  button: {
    marginTop: moderateScale(20, 0.3),
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
    paddingHorizontal: moderateScale(40, 0.3),
    borderRadius: moderateScale(10, 0.3),
    backgroundColor: Color.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: windowWidth * 0.35,
    width: windowWidth * 0.35,
    borderRadius: moderateScale((windowWidth * 0.35) / 2, 0.3),
    right: moderateScale(5, 0.3),
    marginTop: moderateScale(20, 0.3),
  },
});

export default MyAccounts;
