import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Platform,
  ToastAndroid,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {Circle, G, Rect, Text} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import {Icon, ScrollView} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';
import * as Progress from 'react-native-progress';
import {ExpenditureComponent} from '../Components/ExpenditureComponent';

import numeral from 'numeral';
import {ActivityIndicator} from 'react-native';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {setUserData} from '../Store/slices/common';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import { useIsFocused } from '@react-navigation/native';
import CustomImage from '../Components/CustomImage';




const HomeScreen = ({valueFormatter, data}) => {
  const focused = useIsFocused()
  const token = useSelector(state => state.authReducer.token);
  const user = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ file: HomeScreen.js:54 ~ HomeScreen ~ user', JSON.stringify(user , null ,2));
  const dispatch = useDispatch();


  const [state, setState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [months, setMoths] = useState([]);
  const [cashPaid, setCashPaid] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [ pageNumber , setPageNumber] = useState(1);
  console.log('🚀 ~ file: HomeScreen.js:63 ~ HomeScreen ~ cashPaid', cashPaid);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
 

  const breakArray = array => {
    array.map((item, index) => {
      setMoths(data => [...data, moment(item.created_at).format('DD-MM-YY')]);
      setCashPaid(data => [...data, item.amount]);
    });
  };

 
  const getUserData = async () => {
    const url = 'auth/me';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);

    if (response != undefined) {
      console.log('This is the response ', response?.data);
      dispatch(setUserData(response?.data?.user_info));
    }
  };

  const getData = async () => {
    const url = `auth/withdraw/list?page=${pageNumber}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      console.log('dasdasdasdasdasdasdasdasdasdasda' ,response?.data?.date?.data);
      setTableData(response?.data?.date?.data);
    }
  };

  useEffect(() => {
    getData();
  }, [focused]);

  useEffect(() => {
    setMoths([]);
    setCashPaid([]);
    if(!['' , null , undefined].includes(user?.payments)){

      breakArray(user?.payments);
    }
    // getDeviceInfo();
  }, []);

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={false}
      statusBarBackgroundColor={'#F6F6F6'}
      statusBarContentStyle={'dark-content'}
      headerType={2}
      showList={true}
      headerColor={'#F6F6F6'}
      Notify>
      <View
        // showsVerticalScrollIndicator={false}
        style={styles.sectionContainer}>
          {!user?.is_goal &&

            <View  style={{
              width : windowWidth,
              // height : moderateScale(30,0.3),
              justifyContent: 'center',
              alignItems :   'center',
              backgroundColor : 'rgba(255, 0, 0,0.9)',
              marginBottom : moderateScale(10,0.3),
              paddingHorizontal : moderateScale(5,0.3)

            }}>
              <CustomText style={{
                fontSize : moderateScale(11,0.3),
                color : Color.white,
                textAlign : 'center'

              }}>it seems Like your last goal is completed so click the button following to create a new one!!</CustomText>
            </View>
          }
        <TouchableOpacity
          onPress={() => {
            getUserData();
          }}
          style={{
            alignSelf: 'flex-end',
            paddingHorizontal: moderateScale(10, 0.3),
            paddingVertical: moderateScale(5, 0.3),
            borderWidth: 1,
            borderColor: Color.green,
            marginRight: moderateScale(10, 0.3),
            borderRadius: moderateScale(5, 0.3),
            backgroundColor: Color.white,
          }}>
          <CustomText
            style={{
              color: Color.green,
            }}>
            {isLoading ? (
              <ActivityIndicator color={Color.green} size={'small'} />
            ) : (
              'Refresh'
            )}{' '}
          </CustomText>
        </TouchableOpacity>
         {user?.is_goal ? (
          <>
        <CustomText
          style={[
            styles.txt4,
            
          ]}>
          {'Current Goal Amount'}
        </CustomText>
      
           <View style={styles.row}>
              <CustomText style={styles.txt2}>
                {numeral(user?.temporary_wallet?.amount).format('$0,0.00')}
              </CustomText>
              </View>
            <CustomText style={styles.txt5}>
              last updated :{' '}
              {moment(user?.temporary_wallet?.created_at).format('ll')}
            </CustomText>
            <View style={{width: windowWidth * 0.8}}>
              <Progress.Bar
                width={windowWidth * 0.8}
                progress={
                  
                  user?.temporary_wallet?.amount / user?.goal?.amount_save
                
                }
                color={Color.green}
                style={{
                  marginTop: moderateScale(20, 0.3),
                  backgroundColor: '#000',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  width: windowWidth * 0.8,
                  // backgroundColor: 'red',
                  justifyContent: 'space-between',
                }}>
                <CustomText
                  style={{color: Color.green, width: windowWidth * 0.35}}>
                  {Math.round(
                    (user?.temporary_wallet?.amount / user?.goal?.amount_save) *
                      100,
                  )}
                  %
                  {`(${numeral(user?.temporary_wallet?.amount).format(
                    '$0,0.0',
                  )})`}
                </CustomText>
                <CustomText
                  style={{
                    color: Color.black,
                    width: windowWidth * 0.35,
                    textAlign: 'right',
                  }}>
                  {100 -
                    Math.round(
                      (user?.temporary_wallet?.amount /
                        user?.goal?.amount_save) *
                        100,
                    )}
                  %
                  {`(${numeral(
                    user?.goal?.amount_save - user?.temporary_wallet?.amount,
                  ).format('$0,0.0')})`}
                </CustomText>
              </View>
            </View> 
          </> 
         ) : (  
           <CustomButton
       
          text={'Start New Goal'}
          isBold
          textColor={Color.white}
          width={windowWidth * 0.5}
          height={windowHeight * 0.07}
          marginTop={moderateScale(20, 0.3)}
          onPress={()=>{

          navigationService.navigate('SetGoals')}}
          
          bgColor={Color.green}
          borderColor={Color.white}
          borderWidth={2}
          borderRadius={moderateScale(10, 0.3)}
        /> 
        )} 

        <View style={styles.subcontainer}> 
         
           <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: windowWidth}}
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: moderateScale(100, 0.3),
            }}>
            {months.slice(startIndex, endIndex)[0] != months[0] && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setStartIndex(startIndex - 6);
                  setEndIndex(endIndex - 6);
                }}
                style={[
                  styles.absolute,
                  {left: moderateScale(5, 0.3), zIndex: 1},
                ]}>
                <Icon
                  name="left"
                  as={AntDesign}
                  color={Color.black}
                  size={moderateScale(18, 0.3)}
                />
              </TouchableOpacity>
            )}
            {
              user?.is_goal &&  Object.keys(months).length > 0 ? (
              <LineChart
                data={{
                  labels: months.slice(startIndex, endIndex),
                  datasets: [
                    {
                      // data : [100.8]
                      data: cashPaid.slice(startIndex, endIndex),
                    },
                  ],
                }}
                width={Dimensions.get('window').width * 0.9} // from react-native
                height={windowHeight * 0.22}
                yAxisLabel="$"
                withHiddenDots={true}
                yAxisInterval={2} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: Color.white,
                  backgroundGradientFrom: Color.white,
                  backgroundGradientTo: Color.white,
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(90,146,14, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                onDataPointClick={setState}
                withShadow={true}
                //   {...props}
                decorator={tooltipDecorators(state, data, valueFormatter)}
              />
            ) :  user?.is_goal &&  Object.keys(months).length > 0 ?  (
              <ActivityIndicator color={Color.lightGreen} />
            ) : <View></View>}
            {months.slice(startIndex, endIndex)[
              months.slice(startIndex, endIndex).length - 1
            ] != months[months.length - 1] && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setStartIndex(startIndex + 6);
                  setEndIndex(endIndex + 6);
                }}
                style={styles.absolute}>
                <Icon
                  name="right"
                  as={AntDesign}
                  color={Color.black}
                  size={moderateScale(18, 0.3)}
                />
              </TouchableOpacity>
            )}
            <FlatList
              style={{marginTop: moderateScale(20, 0.3)}}
              contentContainerStyle={{
                alignItems: 'center',
              }}
              data={tableData.reverse()}
              renderItem={({item, index}) => {
                return (
                  <ExpenditureComponent
                    amount={item.amount}
                    image={item.image}
                    text1={item.reason}
                    text2={item.date}
                    type={item.type}
                  />
                );
              }}
              ListEmptyComponent={()=>{
                return(

                  <View style={{
                    width : windowWidth ,
                    height : windowHeight * 0.3 ,
                    // justifyContent : 'center',
                    alignItems : 'center',
                    // backgroundColor : 'green'
                  }}>
                     <CustomImage
                    resizeMode={'contain'}
                    source={require('../Assets/Images/notfound.png')}
                    style={{
                      width: windowWidth * 0.5,
                      height: windowHeight * 0.2,
                      // backgroundColor : 'red',
                      alignSelf: 'center',
                    }}
                    />
                    <CustomText style={{
                      fontSize : moderateScale(16,0.3),
                      color : Color.black
                      
                      // backgroundColor : 'yellow'
                  }}>No Transaction yet</CustomText>
                </View>
                  )
              }}
            />
          </ScrollView> 
         </View>
      </View>
    </ScreenBoiler>
    // <View></View>
  );
};

const styles = ScaledSheet.create({
  sectionContainer: {
    // flex: 1,
    height: windowHeight,
    paddingTop: moderateScale(5, 0.3),
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    width: windowWidth,
  },

  smallContainer: {
    paddingHorizontal: moderateScale(15, 0.3),
    width: windowWidth * 0.38,
    height: windowHeight * 0.08,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(10, 0.3),
    borderRadius: moderateScale(20, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 14,
  },

  subcontainer: {
    overflow: 'hidden',
    paddingBottom: moderateScale(20, 0.3),
    width: windowWidth,
    height: windowHeight * 0.6,
    backgroundColor: Color.white,
    borderTopLeftRadius: moderateScale(45, 0.3),
    borderTopRightRadius: moderateScale(45, 0.3),
    marginTop: moderateScale(60, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  txtContainer: {
    marginTop: moderateScale(5, 0.3),
    backgroundColor: Color.themeGreen,
    borderRadius: moderateScale(5, 0.3),
    color: Color.white,
    padding: moderateScale(5, 0.3),
    paddingHorizontal: moderateScale(15, 0.3),
  },

  row: {
    width: windowWidth,
    // height: moderateScale(60, 0.3),
    marginTop: moderateScale(10, 0.3),
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

  txt2: {
    color: Color.green,
    fontSize: moderateScale(25, 0.6),
    // fontWeight: 'bold',
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
    // width: '60%',
    // marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },
  txt4: {
    color: Color.black,
    fontSize: moderateScale(14, 0.6),
    fontWeight: '700',
    // borderBottomWidth: 1,
    // borderColor: Color.green,
    // borderStyle : 'dashed',
  },
  txt5: {
    color: Color.themeLightGray,
    fontSize: moderateScale(11, 0.6),
  },

  absolute: {
    width: moderateScale(30, 0.3),
    height: moderateScale(30, 0.3),
    borderRadius: moderateScale(15, 0.3),
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: moderateScale(10, 0.3),
    top: moderateScale(60, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

export default HomeScreen;

const IncomeContainer = ({icon, text1, text2, backgroundColor}) => {
  return (
    <View style={styles.smallContainer}>
      <View
        style={[
          styles.absolute,
          {
            position: 'relative',
            backgroundColor: backgroundColor,
            width: moderateScale(30, 0.3),
            height: moderateScale(30, 0.3),
            borderRadius: moderateScale(15, 0.3),
          },
        ]}>
        <Icon
          name={icon}
          as={AntDesign}
          color={Color.black}
          size={moderateScale(20, 0.3)}
        />
      </View>
      <View>
        <CustomText isBold style={[styles.txt4, {textAlign: 'center'}]}>
          {text1}
        </CustomText>
        <CustomText style={styles.txt3}>{text2}</CustomText>
      </View>
    </View>
  );
};

const Tooltip = ({x, y, textX, textY, stroke, pointStroke, position}) => {
  let tipW = 50,
    tipH = 30,
    tipX = 5,
    tipY = -9,
    tipTxtX = 12,
    tipTxtY = 6;
  const posY = y;
  const posX = x;

  if (posX > windowWidth - tipW) {
    tipX = -(tipX + tipW);
    tipTxtX = tipTxtX - tipW - 6;
  }

  const boxPosX = position === 'left' ? posX - tipW - 10 : posX;

  return (
    <G>
      <Circle
        cx={posX}
        cy={posY}
        r={4}
        stroke={pointStroke}
        strokeWidth={2}
        fill={'orange'}
      />
      <G x={boxPosX < 40 ? 40 : boxPosX} y={posY}>
        {/* <Rect
          x={tipX + 1}
          y={tipY - 1}
          width={tipW - 2}
          height={tipH - 2}
          fill={'rgba(255, 255, 255, 0.9)'}
          rx={2}
          ry={2}
        /> */}
        <Rect
          x={tipX}
          y={tipY}
          width={tipW}
          height={tipH}
          rx={2}
          ry={2}
          fill={'white'}
          stroke={stroke}
        />

        <Text
          fill={Color.green}
          x={tipTxtX}
          y={tipTxtY + 5}
          fontSize="12"
          textAnchor="start">
          ${textY}
        </Text>
      </G>
    </G>
  );
};

Tooltip.propTypes = {
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired,
  height: PropTypes.number,
  stroke: PropTypes.string,
  pointStroke: PropTypes.string,
  textX: PropTypes.string,
  textY: PropTypes.string,
  position: PropTypes.string,
};

Tooltip.defaultProps = {
  position: 'rigth',
};

const tooltipDecorators = (state, data, valueFormatter) => () => {
  if (state === null) {
    return null;
  }

  const {index, value, x, y} = state;
  const textX = data?.labels[index];
  console.log(data?.labels);
  const position = data?.labels.length === index + 1 ? 'left' : 'right';

  return (
    <Tooltip
      textX={String(textX)}
      textY={String(value)}
      x={x}
      y={y}
      stroke={Color.white}
      pointStroke={'orange'}
      position={position}
    />
  );
};
