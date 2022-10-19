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
import {AchievmentCard} from '../Components/AchievmentCard';
import {useNavigation} from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Rewards = () => {
  const navigation = useNavigation();
  const [state, setState] = useState(null);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      statusBarBackgroundColor={'#F6F6F6'}
      statusBarContentStyle={'dark-content'}
      headerType={2}
      showList={false}
      headerColor={'#F6F6F6'}
    >
      <Icon
        name={'arrowleft'}
        as={AntDesign}
        color={Color.green}
        size={moderateScale(25, 0.3)}
        position={'absolute'}
        style={{top: moderateScale(30, 0.3), left: moderateScale(10, 0.3)}}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View
        // showsVerticalScrollIndicator={false}
        style={styles.sectionContainer}
      >
        <CustomText style={styles.txt2}>Rewards</CustomText>

        <View style={styles.subcontainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            // style={{marginTop: moderateScale(20, 0.3)}}
            contentContainerStyle={{
              alignItems: 'center',
              paddingTop: moderateScale(40, 0.3),
            }}
            data={[
              {
                image: require('../Assets/Images/cup.png'),
                title: 'Golden Trophy',
              },
              {
                image: require('../Assets/Images/madel.png'),
                title: 'completed task',
              },
              {
                image: require('../Assets/Images/cup.png'),
                title: '5 day buffer',
              },
            ]}
            renderItem={({item, index}) => {
              return <AchievmentCard image={item.image} title={item.title} />;
            }}
          />
        </View>
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
    paddingBottom: moderateScale(20, 0.3),
    width: windowWidth,
    height: windowHeight * 0.75,
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
    backgroundColor: Color.white,
    marginLeft: moderateScale(15, 0.3),
    fontWeight: '400',
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

export default Rewards;
