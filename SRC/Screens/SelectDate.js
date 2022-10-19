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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

let markedDay = {};
let daysdifference = null;

const SelectDate = props => {
  const dispatch = useDispatch();
  const {selectedPlan} = props.route.params;
  //   console.log(selectedPlan);

  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState([]);
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

  daysdifference =
    // selectedPlan == 'Weekly'
    //   ? 7
    //   : selectedPlan == 'Monthly'
    //   ? 30
    //   : selectedPlan == 'bi-weekly'
    //   ? 14
    // :
    dateDifferenceInDays;
  const dateDifference =
    dates.length == 2
      ? moment.duration(moment(dates[1]).diff(moment(dates[0]))).asHours()
      : 0;

  console.log(daysdifference, dateDifferenceInDays, dates.length);

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
    // if (dates.length == 1) {
    //   for (let index = 1; index < daysdifference; index++) {
    //     console.log('here', index);
    //     setBetweenDates(x => [
    //       ...x,
    //       moment(dates[0]).add(index, 'days').format('YYYY-MM-DD'),
    //     ]);
    //   }
    // }
    if (dates.length == 2) {
      for (let index = 1; index < daysdifference; index++) {
        console.log('here', index);
        setBetweenDates(x => [
          ...x,
          moment(dates[0]).add(index, 'days').format('YYYY-MM-DD'),
        ]);
      }
    }
    // incrementCounter();
    if (dates.length == 2) {
      dateDifference < 0 && (setBetweenDates([]), setDates([dates[1]]));
    }
  }, [dates]);

  // useEffect(() => {
  //   // if (selectedPlan != 'Custom' && dates.length == 1) {
  //   //   setDates(x => [
  //   //     ...x,
  //   //     moment(dates[0]).add(daysdifference, 'days').format('YYYY-MM-DD'),
  //   //   ]);

  //     if (dates.length == 1) {
  //       Platform.OS == 'android'
  //         ? ToastAndroid.show(
  //             'end date is set acc to your plan',
  //             ToastAndroid.SHORT,
  //           )
  //         : alert('end date is set acc to your plan');
  //     }
  //   }
  // }, [selectedPlan, dates]);

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
              dispatch(setUserToken({token: true}));
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
    color: Color.green,
    fontSize: moderateScale(20, 0.6),
    fontWeight: 'bold',
    // textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: moderateScale(10, 0.3),
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

export default SelectDate;
