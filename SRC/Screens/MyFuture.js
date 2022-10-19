import React, {useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Platform,
  ToastAndroid,
  Alert,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {Circle, G, Rect, Text} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';

import navigationService from '../navigationService';

import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomButton from '../Components/CustomButton';
import {validateEmail} from '../Config';
import {ActivityIndicator} from 'react-native';
import {Icon, ScrollView} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LineChart} from 'react-native-chart-kit';
import * as Progress from 'react-native-progress';
import moment from 'moment';
import {AchievmentCard} from '../Components/AchievmentCard';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const MyFuture = ({valueFormatter, data}) => {
  const [state, setState] = useState(null);
  const dispatch = useDispatch();
  const {fcmToken} = useSelector(state => state.commonReducer);

  const [selected, setSelected] = useState('My Future');
  console.log('Selected =>', selected);

  const [isLoading, setIsLoading] = useState(false);

  const Header = apiHeader();

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={false}
      statusBarBackgroundColor={'#F6F6F6'}
      statusBarContentStyle={'dark-content'}
      headerType={2}
      showList={true}
      headerColor={'#F6F6F6'}
    >
      <View
        // showsVerticalScrollIndicator={false}
        style={styles.sectionContainer}
      >
        {/* <CustomText style={styles.txt4}>Total Balance</CustomText> */}
        <View style={[styles.row]}>
          <CustomText
            onPress={() => {
              setSelected('My Wallet');
            }}
            style={[
              styles.textWithContainer,
              selected == 'My Wallet' && {
                backgroundColor: Color.green,
                color: 'white',
              },
            ]}
          >
            My Wallet
          </CustomText>
          <CustomText
            onPress={() => {
              setSelected('My Future');
            }}
            style={[
              styles.textWithContainer,
              selected == 'My Future' && {
                backgroundColor: Color.green,
                color: 'white',
              },
            ]}
          >
            My Future
          </CustomText>
          <CustomText
            onPress={() => {
              setSelected('Add');
            }}
            style={[
              styles.textWithContainer,
              selected == 'Add' && {
                backgroundColor: Color.green,
                color: 'white',
              },
            ]}
          >
            {' '}
            + Add
          </CustomText>
        </View>

        <>
          <View
            style={{
              alignSelf: 'flex-start',
              marginTop: moderateScale(20, 0.3),
              width: windowWidth,
            }}
          >
            <CustomText style={[styles.textWithContainer]}>
              My Performance
            </CustomText>
            <CustomText
              style={[
                styles.textWithContainer,
                {lineHeight: moderateScale(10, 0.3)},
              ]}
            >
              Asset Performance
            </CustomText>
            <CustomText
              style={[
                styles.textWithContainer,
                {
                  // lineHeight: moderateScale(10, 0.3),
                  position: 'absolute',
                  right: moderateScale(25, 0.3),
                  backgroundColor: Color.green,
                  color: Color.white,
                  bottom: 0,
                },
              ]}
            >
              2.65%
            </CustomText>
          </View>
          <View style={{width: windowWidth * 0.8}}>
            <Progress.Bar
              width={windowWidth * 0.8}
              progress={0.4}
              color={Color.green}
              style={{
                marginTop: moderateScale(20, 0.3),
                backgroundColor: '#000',
              }}
              // showsText={true}
              // textStyle={{color: 'red', backgroundColor: 'red'}}
              // formatText={progress => {
              //   <CustomText>{progress}</CustomText>;
              // }}
            />
            <View
              style={{
                flexDirection: 'row',
                width: windowWidth * 0.8,
                // backgroundColor: 'red',
                justifyContent: 'space-between',
              }}
            >
              <CustomText style={{color: Color.green}}>30%</CustomText>
              <CustomText style={{color: Color.black}}>70%</CustomText>
            </View>
          </View>
        </>

        <View style={[styles.subcontainer]}>
          <View
            style={{
              width: windowWidth,
              alignItems: 'center',
              justifyContent: 'center',
              // height: windowHeight * 0.5,
              // backgroundColor: 'red',
            }}
          >
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'july'],
                datasets: [
                  {
                    data: [500, 220, 300, 400, 420, 600],
                  },
                ],
              }}
              width={Dimensions.get('window').width * 0.9} // from react-native
              height={windowHeight * 0.22}
              yAxisLabel="$"
              //   yAxisSuffix="k"
              withHiddenDots={true}
              yAxisInterval={2} // optional, defaults to 1
              chartConfig={{
                backgroundColor: Color.white,
                backgroundGradientFrom: Color.white,
                backgroundGradientTo: Color.white,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(90,140,14, ${opacity})`,
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
          </View>
        </View>
      </View>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  sectionContainer: {
    // flex: 1,
    height: windowHeight * 0.8,
    paddingTop: moderateScale(5, 0.3),
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    width: windowWidth,
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: moderateScale(20, 0.3),
    width: windowWidth,
    height: windowHeight * 0.52,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: moderateScale(0, 0.3),
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

    elevation: 25,
  },
  txtContainer: {
    marginTop: moderateScale(5, 0.3),
    backgroundColor: Color.themeGreen,
    borderRadius: moderateScale(5, 0.3),
    color: Color.white,
    padding: moderateScale(5, 0.3),
    paddingHorizontal: moderateScale(15, 0.3),
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
  row: {
    width: windowWidth,
    // height: moderateScale(60, 0.3),
    marginTop: moderateScale(10, 0.3),
    // backgroundColor: 'red',
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  textWithContainer: {
    fontSize: moderateScale(16, 0.3),
    padding: moderateScale(5, 0.3),
    borderRadius: moderateScale(5, 0.3),
    backgroundColor: '#F6F6F6',
    marginLeft: moderateScale(15, 0.3),
    fontWeight: '700',
  },

  txt2: {
    color: Color.green,
    fontSize: moderateScale(30, 0.6),
    fontWeight: 'bold',
    marginTop: moderateScale(20, 0.3),
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
    // fontWeight: 'bold',
    // borderBottomWidth: 1,
    // borderColor: Color.white,
  },
  txt5: {
    color: Color.black,

    fontSize: moderateScale(12, 0.6),
  },

  absolute: {
    width: moderateScale(40, 0.3),
    height: moderateScale(40, 0.3),
    borderRadius: moderateScale(20, 0.3),
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: moderateScale(10, 0.3),
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

export default MyFuture;

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
        ]}
      >
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
          textAnchor="start"
        >
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
