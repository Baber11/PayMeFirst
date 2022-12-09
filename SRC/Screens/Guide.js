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
import {TouchableOpacity} from 'react-native';
import {Linking} from 'react-native';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import CustomAlertModal from '../Components/CustomAlertModal';
// import {TabView, SceneMap} from 'react-native-tab-view';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Guide = ({valueFormatter, data}) => {
  const token = useSelector(state => state.authReducer.token);
  const user = useSelector(state => state.commonReducer.userData);
  // console.log('🚀 ~ file: Guide.js:51 ~ Guide ~ user', user);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [selected, setSelected] = useState('Guide');
  const [guideData, setGuideData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('');
  console.log('🚀 ~ file: Guide.js:60 ~ Guide ~ currentRoute', currentRoute);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'guide', title: 'Guide'},
    {key: 'stores', title: 'Stores'},
  ]);

  const FirstRoute = () => {
    return (
      <ScrollView
        nestedScrollEnabled={true}
        style={styles.subcontainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.3),
        }}>
        {isLoading ? (
          <View
            style={{
              height: windowHeight * 0.6,
              justifyContent: 'center',
            }}>
            <ActivityIndicator color={Color.green} size={'large'} />
          </View>
        ) : (
          guideData.map((x, index) => {
            return (
              <>
                <CustomText style={styles.Txt}>{x?.question}</CustomText>
                <CustomText style={styles.txt4}>{x?.description}</CustomText>
              </>
            );
          })
        )}
      </ScrollView>
    );
  };

  const SecondRoute = () => {
    return (
      <FlatList
        style={{marginTop: moderateScale(20, 0.3)}}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: moderateScale(20, 0.3),
        }}
        data={dummyData}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                Linking.openURL(item?.link);
              }}>
              <ExpenditureComponent
                image={item.image}
                text1={item.title}
                fromGuide={true}
                index={index == dummyData.length - 1}
                onPress={() => {
                  Linking.openURL(item?.link);
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const renderScene = SceneMap({
    guide: FirstRoute,
    stores: SecondRoute,
  });

  const renderSceneCustom = ({route, position}) => {
    if (position == 'stores' && user?.current_plan == 'basic') {
      
      setAlertModalVisible(true);
    } else {
      switch (route.key) {
        case 'guide':
          return <FirstRoute />;
        case 'stores':
          return <SecondRoute />;
      }
    }
  };

  const getGuide = async () => {
    // console.log('here token =>' , token);
    const url = 'guide';
    setIsLoading(true);
    const response = await Get(url);
    setIsLoading(false);
    if (response != undefined) {
      // console.log(response?.data?.data);
      setGuideData(response?.data?.data);
    }
  };
  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => x);
    setCurrentRoute(inputRange[index].key);

    if (currentRoute == 'stores' && user?.current_plan == 'basic') {
      return setAlertModalVisible(true);
    }

    return (
      <TabBar
        {...props}
        inactiveColor={Color.veryLightGray}
        indicatorStyle={{
          backgroundColor: 'white',
          height: moderateScale(3, 0.5),
        }}
        style={{backgroundColor: Color.green}}
        labelStyle={{
          fontWeight: 'bold',
        }}
        onTabPress={({route, preventDefault}) => {
          if (route.key === 'stores' && user?.current_plan == 'basic') {
            preventDefault();
            setAlertModalVisible(true);

            // Do something else
          }
        }}
      
      />
    );
  };

  useEffect(() => {
    getGuide();
    return ()=>{
      setCurrentRoute('guide'),
      setIndex(0)
    }
  }, []);

 
  

  const dummyData = [
    {
      image: require('../Assets/Images/ebay.png'),
      title: 'Ebay',
      link: 'https://www.ebay.com/',
    },
    {
      image: require('../Assets/Images/amazon.png'),
      title: 'amazon',
      link: 'https://www.amazon.com/',
    },
    {
      image: require('../Assets/Images/rakuten.png'),
      title: 'Rakuten',
      link: 'https://www.rakuten.com/',
    },
    {
      image: require('../Assets/Images/alibaba.png'),
      title: 'Ali Baba ',
      link: 'https://www.alibaba.com/',
    },
    {
      image: require('../Assets/Images/aliExpress.png'),
      title: 'Ali Express',
      link: 'https://www.aliexpress.com/',
    },
    {
      image: require('../Assets/Images/walmart.png'),
      title: 'Wallmart',
      link: 'https://www.walmart.com/',
    },
    {
      image: {uri : 'https://www.kindpng.com/picc/m/286-2864990_newegg-marketplace-hd-png-download.png'},
      title: 'NewEgg',
      link: 'https://www.newEgg.com/',
    },
    {
      image: require('../Assets/Images/flipcart.png'),
      title: 'Flipcart',
      link: 'https://www.flipkart.com/',
    },
    {
      image: require('../Assets/Images/target.png'),
      title: 'target',
      link: 'https://www.target.com/',
    },
    {
      image: require('../Assets/Images/etsy.png'),
      title: 'etsy',
      link: 'https://www.etsy.com/',
    },
    
  ];

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={false}
      statusBarBackgroundColor={'#F6F6F6'}
      statusBarContentStyle={'dark-content'}
      headerType={2}
      // showList={false}
      headerColor={'#F6F6F6'}
      showList={true}>
      <TabView
        // lazy
        navigationState={{index, routes}}
        renderScene={renderSceneCustom}
        onIndexChange={setIndex}
        initialLayout={{width: windowWidth}}
        style={[
          styles.subcontainer,
          {
            borderTopLeftRadius: moderateScale(10, 0.3),
            borderTopRightRadius: moderateScale(10, 0.3),
            // marginTop: moderateScale(10, 0.3),
          },
        ]}
        renderTabBar={renderTabBar}
      />

      <CustomAlertModal
        isModalVisible={alertModalVisible}
        onClose={() => {
          if (currentRoute == 'stores' && user?.current_plan == 'basic') {
            setCurrentRoute('guide')
            setIndex(0);
          }
          setAlertModalVisible(false);
        }}
        onOKPress={() => {
          setCurrentRoute('guide')
          setIndex(0);
          setAlertModalVisible(false);
          navigationService.navigate('Subscription',{fromStores : true});
        }}
        title={'Hold On !!'}
        message={
          'You are on Basic plan , please upgrade it to avail this feature'
        }
        iconType={2}
        areYouSureAlert
      />
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

{
  /* <View style={styles.sectionContainer}>
<View style={[styles.row]}>
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
    ]}>
    {' '}
    Guide
  </CustomText>
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
    ]}>
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
  }}>
  {selected == 'Guide' &&
    (isLoading ? (
      <View
        style={{
          height: windowHeight * 0.6,
          justifyContent: 'center',
        }}>
        <ActivityIndicator color={Color.green} size={'large'} />
      </View>
    ) : (
      guideData.map((x, index) => {
        return (
          <>
            <CustomText style={styles.Txt}>{x?.question}</CustomText>
            <CustomText style={styles.txt4}>
              {x?.description}
            </CustomText>
          </>
        );
      })
    ))}

  {selected == 'Stores' && (
    <FlatList
      style={{marginTop: moderateScale(20, 0.3)}}
      contentContainerStyle={{alignItems: 'center'}}
      data={dummyData}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              Linking.openURL(item?.link);
            }}>
            <ExpenditureComponent
              image={item.image}
              text1={item.title}
              fromGuide={true}
              index={index == dummyData.length - 1}
              onPress={() => {
                Linking.openURL(item?.link);
              }}
            />
          </TouchableOpacity>
        );
      }}
    />
  )}
</ScrollView>
    </View> */
}
