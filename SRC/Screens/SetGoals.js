import React, {useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Platform,
  ToastAndroid,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

import {useDispatch, useSelector} from 'react-redux';

import navigationService from '../navigationService';

import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomButton from '../Components/CustomButton';
import {setIsVerified, setUserLogout, setUserToken} from '../Store/slices/auth';
import {validateEmail} from '../Config';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setUserData} from '../Store/slices/common';
import CardContainer from '../Components/CardContainer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'native-base';
import numeral from 'numeral';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import TextInputWithTitle from '../Components/TextInputWithTitle';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SetGoals = () => {
  const user = useSelector((state)=>state.commonReducer.userData);
  console.log(user);
  const dispatch = useDispatch();
  const {fcmToken} = useSelector(state => state.commonReducer);


  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(2000);
  const [plan, setPlan] = useState('');
  const [name, setName] = useState('');

  // const cardImage = user?.

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}
      headerType={1}
      title={'Set Goals'}
      showList={true}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.sectionContainer}
        contentContainerStyle={{paddingBottom: moderateScale(20, 0.3)}}
      >
        <View style={styles.walletContainer}>
          <Image
            source={require('../Assets/Images/card.png')}
            resizeMode={'contain'}
            style={{
              //   backgroundColor: 'red',
              height: windowHeight * 0.2,
              width: windowWidth * 0.4,
              marginTop: moderateScale(10, 0.3),
            }}
          />
          <View>
            <CustomText style={styles.txt4}>{user?.pm_type}</CustomText>
            <CustomText style={styles.txt3}>**** **** **** {user?.pm_last_four}</CustomText>
          </View>
          <Icon
            name="right"
            as={AntDesign}
            color={Color.black}
            size={moderateScale(20, 0.3)}
            style={styles.icon}
          />
        </View>

        <CardContainer
          style={{
            height: windowHeight * 0.7,
            paddingTop: moderateScale(30, 0.3),
          }}
        >
          <View style={styles.amountContainer}>
            <CustomText style={styles.txt5}>amount</CustomText>
            <CustomText style={styles.txt2}>${price1}</CustomText>
          </View>
          <MultiSlider
            isMarkersSeparated={true}
            // values={[ranges?.minPriceProperty, ranges?.maxPriceProperty]}
            values={[0]}
            allowOverlap={false}
            sliderLength={windowWidth * 0.75}
            customLabel={'baber'}
            min={0}
            max={100002}
            // enabledOne={true}
            markerStyle={{backgroundColor: Color.green}}
            step={2}
            containerStyle={{
              marginLeft: moderateScale(10, 0.3),
              // backgroundColor: 'red',
            }}
            onValuesChange={values => {
              setPrice1(values[0]);
            }}
            customMarkerLeft={() => {
              return (
                <View style={styles.markerView}>
                  <View style={styles.circle}></View>
                  <CustomText style={{marginTop: moderateScale(2, 0.3)}}>
                    {numeral(price1).format('0,0a')}
                  </CustomText>
                </View>
              );
            }}
          />
          <CustomText
            style={[
              styles.txt3,
              {alignSelf: 'flex-start', marginLeft: moderateScale(20, 0.3)},
            ]}
          >
            Set a name of your Goal
          </CustomText>
          <TextInputWithTitle
            titleText={'Goal Name'}
            secureText={false}
            placeholder={'Goal Name'}
            setText={setName}
            value={name}
            viewHeight={0.06}
            viewWidth={0.8}
            inputWidth={0.7}
            // inputHeight={0.0}
            border={1}
            marginTop={moderateScale(10, 0.3)}
            borderColor={Color.themeLightGray}
            backgroundColor={'#F5F5F5'}
            borderRadius={moderateScale(10, 0.3)}
            placeholderColor={Color.themeLightGray}
            // disable={true}
            color
          />
          <CustomText
            style={[
              styles.txt3,
              {
                alignSelf: 'flex-start',
                marginLeft: moderateScale(20, 0.3),
                marginTop: moderateScale(10, 0.3),
              },
            ]}
          >
            Saving Plans
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.8,
              flexWrap: 'wrap',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setPlan('Weekly');
              }}
              style={[
                styles.cont,
                plan == 'Weekly' && {backgroundColor: 'orange'},
              ]}
              activeOpacity={0.7}
            >
              <CustomText
                style={[styles.txt6, plan == 'Weekly' && {color: 'white'}]}
              >
                Weekly
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPlan('bi-weekly');
              }}
              style={[
                styles.cont,
                plan == 'bi-weekly' && {backgroundColor: 'orange'},
              ]}
              activeOpacity={0.7}
            >
              <CustomText
                style={[styles.txt6, plan == 'bi-weekly' && {color: 'white'}]}
              >
                bi-weekly
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPlan('Monthly');
              }}
              style={[
                styles.cont,
                plan == 'Monthly' && {backgroundColor: 'orange'},
              ]}
              activeOpacity={0.7}
            >
              <CustomText
                style={[styles.txt6, plan == 'Monthly' && {color: 'white'}]}
              >
                Monthly
              </CustomText>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                setPlan('Custom');
              }}
              style={[
                styles.cont,
                plan == 'Custom' && {backgroundColor: 'orange'},
              ]}
              activeOpacity={0.7}
            >
              <CustomText
                style={[styles.txt6, plan == 'Custom' && {color: 'white'}]}
              >
                Custom
              </CustomText>
            </TouchableOpacity> */}
          </View>
          <CustomButton
            // textTransform={"capitalize"}
            text={
             'Next'
          }
            isBold
            textColor={Color.white}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              plan && price1 != 0
                ? navigationService.navigate('SelectDate', {
                    selectedPlan: plan,
                    amount: price1,
                    planName: name,
                  })
                : Platform.OS == 'android'
                ? ToastAndroid.show(
                    'Please Select Plan and Amont',
                    ToastAndroid.SHORT,
                  )
                : alert('Please Select Plan and Amont');
            }}
            bgColor={Color.green}
            borderColor={Color.white}
            borderWidth={2}
            borderRadius={moderateScale(30, 0.3)}
          />
           <CustomText
            onPress={() => {
              dispatch(setUserLogout());
            }}
            style={{
              marginTop: moderateScale(10, 0.3),
              color: Color.themeBlack,
              fontSize: moderateScale(12, 0.3),
              textDecorationLine: 'underline',
              // fontStyle : 'italic' ,
              fontWeight: 'bold',
            }}>
            Logout
          </CustomText>
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
  icon: {
    position: 'absolute',
    right: moderateScale(15, 0.3),
  },

  cont: {
    // height: windowHeight * 0.05,
    // width: windowWidth * 0.23,
    borderRadius: moderateScale(20, 0.3),
    // opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#EAEAEA',
    marginVertical: moderateScale(7, 0.3),
    marginRight: moderateScale(10, 0.3),
    padding: moderateScale(8, 0.3),
    paddingHorizontal: moderateScale(20, 0.3),
  },

  txt2: {
    color: Color.black,
    fontSize: moderateScale(35, 0.6),
    fontWeight: 'bold',
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(13, 0.6),
    marginTop: moderateScale(5, 0.3),
    // width: '60%',
  },
  txt4: {
    color: Color.black,
    fontSize: moderateScale(16, 0.6),
    fontWeight: 'bold',
    marginTop: moderateScale(-10, 0.3),
    // borderBottomWidth: 1,
    // borderColor: Color.white,
  },
  txt6: {
    color: Color.themeLightGray,
    fontSize: moderateScale(12, 0.6),
    fontWeight: 'bold',
    // marginTop: moderateScale(-10, 0.3),
    // borderBottomWidth: 1,
    // borderColor: Color.white,
  },
  txt5: {
    color: Color.themeLightGray,

    fontSize: moderateScale(15, 0.6),
  },

  walletContainer: {
    marginVertical: moderateScale(30, 0.3),
    width: windowWidth * 0.9,
    height: windowHeight * 0.14,
    borderRadius: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: moderateScale(12, 0.3),
    height: moderateScale(12, 0.3),
    borderRadius: 6,
    backgroundColor: Color.green,
    marginTop: moderateScale(20, 0.3),
    marginLeft: moderateScale(5, 0.3),
  },
  amountContainer: {
    width: '80%',
    height: windowHeight * 0.17,
    borderRadius: moderateScale(10, 0.3),
    // flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.themeLightGray,
    margin: moderateScale(10, 0.3),
  },
});

export default SetGoals;
