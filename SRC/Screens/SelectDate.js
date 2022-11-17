import React, {useCallback, useState} from 'react';
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

import {useDispatch, useSelector} from 'react-redux';

import navigationService from '../navigationService';

import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomButton from '../Components/CustomButton';
import {setIsVerified, setUserLogin, setUserToken} from '../Store/slices/auth';
import {validateEmail} from '../Config';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setUserData} from '../Store/slices/common';
import {Icon, ScrollView, Toast} from 'native-base';
import CardContainer from '../Components/CardContainer';
import {Calendar} from 'react-native-calendars';
import {useEffect} from 'react';
import moment from 'moment/moment';
import numeral from 'numeral';
import {round} from 'react-native-reanimated';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

let markedDay = {};
let daysdifference = null;

const SelectDate = props => {
  const dispatch = useDispatch();
  const {selectedPlan, amount, planName} = props.route.params;
  console.log('selected Plan =>', selectedPlan);

  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState([]);
  const [selectedPlanInNumber, setSelectedPlanInNumber] = useState(0);
  const [betWeenDates, setBetweenDates] = useState([]);
  console.log(betWeenDates);
  const [toDisable, setDisAble] = useState({});

  console.log('it is here disablee === > ', toDisable);

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
  let dateDifferenceInDays =
    dates.length == 2
      ? moment.duration(moment(dates[1]).diff(moment(dates[0]))).asDays()
      : 0;

  daysdifference = dateDifferenceInDays;
  const dateDifference =
    dates.length == 2
      ? moment.duration(moment(dates[1]).diff(moment(dates[0]))).asHours()
      : 0;

  console.log(daysdifference, dateDifferenceInDays, dates.length);

  // const getRecommendations = () =>{

  // }

  useEffect(() => {
    setDisAble([]);
    markedDay = {};
    if (Object.keys(betWeenDates).length > 0) {
      betWeenDates.map(item => {
        console.log('in map');
        markedDay[moment(item).format('YYYY-MM-DD')] = {
          selected: true,
          //   startingDay: true,
          color: Color.green,
          textColor: '#FFFFFF',
        };
      });
      setDisAble(markedDay);
    }
  }, [betWeenDates]);

  useEffect(() => {
    if (dates.length == 2) {
      for (let index = 1; index < daysdifference; index++) {
        console.log('here', index);
        setBetweenDates(x => [
          ...x,
          moment(dates[0]).add(index, 'days').format('YYYY-MM-DD'),
        ]);
      }
      // getRecommendations();
    }
    // incrementCounter();
    if (dates.length == 2) {
      dateDifference < 0
        ? (setBetweenDates([]), setDates([dates[1]]))
        : selectedPlan == 'Weekly' && daysdifference < 7
        ? (alert('There must be minimum 7 days according to your plan !'),
          setBetweenDates([]),
          setDates([dates[0]]))
        : selectedPlan == 'bi-weekly' && daysdifference < 14
        ? (alert('There must be minimum 14 days according to your plan !'),
          setBetweenDates([]),
          setDates([dates[0]]))
        : selectedPlan == 'Monthly' && daysdifference < 30
        ? (alert('There must be minimum 30 days according to your plan !'),
          setBetweenDates([]),
          setDates([dates[0]]))
        : null;
    }
  }, [dates]);

  useEffect(() => {
    selectedPlan == 'Weekly'
      ? setSelectedPlanInNumber(7)
      : selectedPlan == 'bi-weekly'
      ? setSelectedPlanInNumber(14)
      : setSelectedPlanInNumber(30);
  }, [selectedPlan]);

  const today = moment().format('DD MMM YYYY');

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}
      headerType={1}
      title={'Select Date'}
      showList={true}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.sectionContainer}
        contentContainerStyle={{paddingBottom: moderateScale(20, 0.3)}}
      >
        <Image
          source={require('../Assets/Images/calendar.png')}
          resizeMode={'contain'}
          style={{
            alignSelf: 'center',
            height: windowHeight * 0.3,
          }}
        />
        {dates.length == 2 && (
          <View style={styles.recommendationContainer}>
            <CustomText style={styles.txt2}>Summary</CustomText>
            <CustomText style={styles.subHeading}>
              Goal Name <CustomText style={styles.text}>{planName}</CustomText>
            </CustomText>
            <CustomText style={styles.subHeading}>
              Amount to save{' '}
              <CustomText style={styles.text}>{amount}</CustomText>
            </CustomText>
            <CustomText style={styles.subHeading}>
              Selected Plan{' '}
              <CustomText style={styles.text}>{selectedPlan}</CustomText>
            </CustomText>
            <CustomText style={styles.subHeading}>
              Duration{' '}
              <CustomText style={styles.text}>
                {dateDifferenceInDays}
              </CustomText>
            </CustomText>

            <CustomText style={styles.subHeading}>
              No of deductions{' '}
              <CustomText style={styles.text}>
                {Math.round(dateDifferenceInDays / selectedPlanInNumber)}
              </CustomText>
            </CustomText>
            <CustomText style={styles.subHeading}>
              Amount per deduction{' '}
              <CustomText style={styles.text}>
                {numeral(
                  amount /
                    Math.round(dateDifferenceInDays / selectedPlanInNumber),
                ).format('$0,0.00')}
              </CustomText>
            </CustomText>
            <CustomText
              style={[styles.subHeading, {marginTop: moderateScale(10, 0.3)}]}
            >
              recommendation{' '}
              <CustomText style={styles.text}>
                abouve stats are according to your setted Goal and it can be
                change with the variation in setting goal{' '}
              </CustomText>
            </CustomText>
          </View>
        )}
        <CardContainer
          style={{
            height: windowHeight * 0.7,
            paddingTop: moderateScale(30, 0.3),
          }}
        >
          <CustomText style={styles.txt2}>Select Duration</CustomText>
          <Calendar
            style={{
              width: windowWidth * 0.9,
            }}
            minDate={today}
            markingType={'period'}
            onDayPress={day => {
              dates.length < 2
                ? setDates([...dates, day?.dateString])
                : (setBetweenDates([]), setDates([day?.dateString]));
            }}
            theme={{
              backgroundColor: Color.white,
              calendarBackground: Color.white,
              textSectionTitleColor: Color.green,
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: Color.green,
              selectedDayTextColor: Color.lightGreen,
              todayTextColor: Color.green,
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',

              arrowColor: Color.green,
              disabledArrowColor: '#d9e1e8',
              monthTextColor: Color.green,
              indicatorColor: Color.green,
              textDayFontWeight: 'bold',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'bold',
              textDayFontSize: moderateScale(16, 0.3),
              textMonthFontSize: moderateScale(16, 0.3),
              textDayHeaderFontSize: moderateScale(16, 0.3),
            }}
            markedDates={{
              ...toDisable,
              ...{
                [dates[0]]: {
                  selected: true,
                  startingDay: true,
                  color: Color.green,
                  textColor: '#FFFFFF',
                },
                [dates[1]]: {
                  selected: true,
                  endingDay: true,
                  color: Color.green,
                  textColor: '#FFFFFF',
                },
                // [dateAfter]: {
                //   selected: true,
                //   endingDay: true,
                //   color: Color.green,
                //   textColor: '#FFFFFF',
                // },
              },
            }}
          />

          <CustomButton
            // textTransform={"capitalize"}
            text={
              isLoading ? (
                <ActivityIndicator color={'#000'} size={'small'} />
              ) : (
                'Complete'
              )
            }
            isBold
            textColor={Color.white}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              dates.length == 2
                ? dispatch(setUserToken({token: true}))
                : Platform.OS == 'android'
                ? ToastAndroid.show(
                    'Please Complete Duration',
                    ToastAndroid.SHORT,
                  )
                : alert('Please Complete Duration');
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

  cont: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.3,
    borderRadius: moderateScale(20, 0.3),
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  txt2: {
    color: Color.green,
    fontSize: moderateScale(20, 0.6),
    fontWeight: 'bold',
    // textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: moderateScale(10, 0.3),
  },
  recommendationContainer: {
    width: windowWidth * 0.9,
    // backgroundColor: 'red',
    paddingVertical: moderateScale(10, 0.3),
    alignSelf: 'center',
    marginVertical: moderateScale(10, 0.3),
    borderRadius: moderateScale(10, 0.3),
    borderColor: Color.green,
    borderWidth: 1,
  },
  subHeading: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: '700',
    color: Color.black,
    marginLeft: moderateScale(10, 0.3),
  },
  text: {
    fontSize: moderateScale(14, 0.3),
    color: Color.black,
  },
});

export default SelectDate;
