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
import {ExpenditureComponent} from '../Components/ExpenditureComponent';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Guide = ({valueFormatter, data}) => {
  const [state, setState] = useState(null);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState('Guide');
  console.log('Selected =>', selected);

  const [isLoading, setIsLoading] = useState(false);

  const Header = apiHeader();
  const dummyData = [
    {
      image: require('../Assets/Images/ebay.png'),
      title: 'Ebay',
      link : 'https://www.ebay.com/'
    },
    {
      image: require('../Assets/Images/amazon.png'),
      title: 'amazon',
      link : 'https://www.amazon.com/'
    },
    {
      image: require('../Assets/Images/rakuten.png'),
      title: 'Rakuten',
      link : 'https://www.rakuten.com/'
    },
    {
      image: require('../Assets/Images/aliExpress.png'),
      title: 'Ali Express',
      link : 'https://www.aliexpress.com/'
      
      
    },
  ];

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={false}
      statusBarBackgroundColor={'#F6F6F6'}
      statusBarContentStyle={'dark-content'}
      headerType={2}
      showList={false}
      headerColor={'#F6F6F6'}
    >
      <View
        // showsVerticalScrollIndicator={false}
        style={styles.sectionContainer}
      >
        {/* <CustomText style={styles.txt4}>Total Balance</CustomText> */}
        <View style={[styles.row]}>
          {/* <CustomText
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
          </CustomText> */}
          {/* <CustomText
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
          </CustomText> */}
          <CustomText
            onPress={() => {
              setSelected('Guide');
            }}
            style={[
              styles.textWithContainer,
              {fontSize: moderateScale(20, 0.3)},
              selected == 'Guide' && {
                backgroundColor: Color.green,
                color: 'white',
              },
            ]}
          >
            {' '}
            Guide
          </CustomText>
          {/* <CustomText
            onPress={() => {
              setSelected('My Profile');
            }}
            style={[
              styles.textWithContainer,
              {fontSize: moderateScale(20, 0.3)},
              selected == 'My Profile' && {
                backgroundColor: Color.green,
                color: 'white',
              },
            ]}
          >
            {' '}
            My Profile
          </CustomText> */}
          <CustomText
            onPress={() => {
              setSelected('Stores');
            }}
            style={[
              styles.textWithContainer,
              {fontSize: moderateScale(20, 0.3)},
              selected == 'Stores' && {
                backgroundColor: Color.green,
                color: 'white',
              },
            ]}
          >
            {' '}
            Stores
          </CustomText>
        </View>

        <ScrollView
          nestedScrollEnabled={true}
          style={styles.subcontainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: moderateScale(200, 0.3),
          }}
        >
          {selected == 'Guide' && (
            <>
              <CustomText style={styles.Txt}>What is Lorem Ipsum?</CustomText>
              <CustomText style={styles.txt4}>
                {
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                }
              </CustomText>
              <CustomText style={styles.Txt}>What is Lorem Ipsum?</CustomText>
              <CustomText style={styles.txt4}>
                {
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                }
              </CustomText>
              <CustomText style={styles.Txt}>What is Lorem Ipsum?</CustomText>
              <CustomText style={styles.txt4}>
                {
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                }
              </CustomText>
            </>
          )}

          {selected == 'Stores' && (
            <FlatList
              style={{marginTop: moderateScale(20, 0.3)}}
              contentContainerStyle={{alignItems: 'center'}}
              data={dummyData}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity activeOpacity={0.8} onPress={()=>{Linking.openURL(item?.link)}}>

                  <ExpenditureComponent
                    image={item.image}
                    text1={item.title}
                    fromGuide={true}
                    index={index == dummyData.length - 1}
                    />
                    </TouchableOpacity>
                );
              }}
            />
          )}
        </ScrollView>
      </View>
    </ScreenBoiler>
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

  Txt: {
    margin: moderateScale(20, 0.3),
    color: Color.themeBlack,
    fontSize: moderateScale(22, 0.6),
    // textAlign: 'center',
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
  subcontainer: {
    width: windowWidth,
    minHeight: windowHeight * 0.6,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: Color.white,
    // backgroundColor: 'red',
    borderTopLeftRadius: moderateScale(25, 0.3),
    borderTopRightRadius: moderateScale(25, 0.3),
    marginTop: moderateScale(30, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    overflow: 'hidden',
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
    marginLeft: moderateScale(10, 0.3),
    // fontWeight: 'bold',
    // borderBottomWidth: 1,
    // borderColor: Color.white,
  },
  txt5: {
    color: Color.black,

    fontSize: moderateScale(12, 0.6),
  },
});

export default Guide;
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
