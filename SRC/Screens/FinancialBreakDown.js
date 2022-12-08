import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import ScreenBoiler from '../Components/ScreenBoiler';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FlatList, Icon, ScrollView, Toast} from 'native-base';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {ColorPicker} from 'react-native-color-picker';
import Modal from 'react-native-modal';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import {useDebugValue} from 'react';
import CustomImage from '../Components/CustomImage';
import {useEffect} from 'react';
import {setFinanceBreakDown} from '../Store/slices/common';
import {useDispatch, useSelector} from 'react-redux';
import numeral from 'numeral';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Pie from 'react-native-pie';
import {Get, Patch, Post} from '../Axios/AxiosInterceptorFunction';
import {ActivityIndicator} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import ChatCardSkeleton from '../Components/ChatCardSkeleton';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import DatePicker from 'react-native-date-picker';
import moment from 'moment/moment';

const Profile = ({navigation}) => {
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const financeData = useSelector(
    state => state.commonReducer.financeBreakDown,
  );
  const token = useSelector(state => state.authReducer.token);

  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [color, setColor] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [ChartData, setChartData] = useState([]);
  const [addSection, setAddSection] = useState(false);
  const [forChart, setforChart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForPost, setIsLoadingForPost] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  // console.log("🚀 ~ file: FinancialBreakDown.js:62 ~ Profile ~ date", date)

  // console.log('pie chart data  data => ', forChart);

  const postFinanceData = async () => {
    const url = 'auth/financial/breakdowns/post';
    const body = {
      name: category,
      value: amount,
      color: color,
    };
    setIsLoadingForPost(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoadingForPost(false);
    if (response != undefined) {
      console.log('hfhgfygf', response?.data);
      ToastAndroid.show('Saved', ToastAndroid.SHORT);
      setAddSection(false);
    }
  };

  const getData = async () => {
    // https://54ac-103-125-71-14.ap.ngrok.io/api/auth/financial/breakdowns
    const url = `auth/financial/breakdowns/${moment(date).format(
      'YYYY-MM-DD',
    )}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      console.log('dsdasdasda ==========>', response?.data);
      setChartData(response?.data?.data);
    }
  };

  const categoryData = [
    'food',
    'shopping',
    'rent',
    'car maintainance',
    'gift',
    'transport',
    'donation',
    'others',
  ];
  const DATA = [
    {name: 'test1', value: 200, color: 'red'},
    {name: 'test1', value: 200, color: 'blue'},
    {name: 'test1', value: 200, color: 'green'},
  ];

  useEffect(() => {
    setTotal(0);
    ChartData.map(item => {
      return setTotal(x => parseInt(x) + parseInt(item.value));
    });
    // if (ChartData.length > 0) {
    //   dispatch(setFinanceBreakDown(ChartData));
    // }
  }, [ChartData]);

  useEffect(() => {
    getData();
  }, [focused, date]);

  useEffect(() => {
    if (total != 0) {
      setforChart([]);
      ChartData.map(item => {
        const percentage = Math.round((item?.value / total) * 100).toFixed(0);
        return setforChart(x => [
          ...x,
          {
            percentage: percentage == 0 ? 2 : parseInt(percentage),
            color: item?.color,
          },
        ]);
      });
    }
  }, [total]);

  return (
    <ScreenBoiler
      showHeader={false}
      showBack={true}
      title={'Financial BreakDown'}
      statusBarBackgroundColor={'#ffffff'}
      statusBarContentStyle={'dark-content'}
      headerType={1}>
      <View style={styles.header}>
        <ImageBackground
          source={require('../Assets/Images/vector-up.png')}
          resizeMode={'stretch'}
          style={{
            // position: 'absolute',
            left: 0,
            height: windowHeight * 0.2,
            width: windowWidth,
            zIndex: -1,
          }}>
          <Icon
            name={'arrowleft'}
            as={AntDesign}
            size={moderateScale(30, 0.3)}
            color={Color.white}
            style={{
              position: 'absolute',
              // marginTop: moderateScale(20, 0.3),
              // marginLeft: moderateScale(20, 0.3),
              top: moderateScale(20, 0.3),
              left: moderateScale(20, 0.3),
            }}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <CustomText
            style={[
              styles.text,
              {alignSelf: 'center', marginTop: moderateScale(20, 0.3)},
            ]}>
            Financial BreakDown
          </CustomText>
        </ImageBackground>
        <View
          style={{
            alignItems: 'center',
            marginTop: moderateScale(-50, 0.3),
            paddingHorizontal: moderateScale(5, 0.3),
            width: windowWidth,
            // backgroundColor: 'red',
          }}>
          {forChart?.length > 0 ? (
            <View
              style={{
                width: windowWidth,
                height: windowHeight * 0.2,
                // backgroundColor: 'red',
                alignItems: 'center',
              }}>
              <ReactNativeZoomableView
                maxZoom={5}
                minZoom={1}
                zoomStep={0.5}
                initialZoom={1}
                bindToBorders={true}
                // onZoomAfter={this.logOutZoomState}
                style={
                  {
                    // width : windowWidth * 0.4 ,
                    // height : windowHeight * 0.2,
                    // padding: 10,
                    // backgroundColor: 'red',
                  }
                }>
                <Pie
                  radius={80}
                  innerRadius={60}
                  sections={forChart}
                  dividerSize={4}
                  strokeCap={'butt'}
                />
              </ReactNativeZoomableView>
            </View>
          ) : (
            <>
              <CustomImage
                resizeMode={'contain'}
                source={require('../Assets/Images/notfound.png')}
                style={{
                  width: windowWidth * 0.5,
                  height: windowHeight * 0.22,
                  alignSelf: 'center',
                }}
              />
              <CustomText style={[styles.text]}>No Record found</CustomText>
            </>
          )}
          <View
            style={{flexDirection: 'row', marginTop: moderateScale(10, 0.3)}}>
            <CustomText style={styles.text}>Total Consumption : </CustomText>
            <CustomText style={styles.text}>${total}</CustomText>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white'}}>
        <CustomText
          style={styles.dateContainer}
          onPress={() => {
            setOpen(true), setAddSection(false);
          }}>
          selected date : {<CustomText>{moment(date).format('ll')}</CustomText>}
        </CustomText>
        <Icon
          name={'add-circle-sharp'}
          as={Ionicons}
          color={Color.green}
          size={moderateScale(40, 0.3)}
          style={{
            alignSelf: 'flex-end',
            marginTop: moderateScale(10, 0.3),
            marginRight: moderateScale(20, 0.3),
          }}
          onPress={() => {
            setDate(new Date());
            setAddSection(!addSection);
          }}
        />
        {addSection && (
          <View style={styles.addItem}>
            <CustomButton
              // textTransform={"capitalize"}
              text={'Choose Color'}
              isBold
              textColor={Color.green}
              width={windowWidth * 0.25}
              height={windowHeight * 0.06}
              marginTop={moderateScale(10, 0.3)}
              onPress={() => {
                setIsVisible(true);
              }}
            />
            <DropDownSingleSelect
              dropdownStyle={[styles.dropdown]}
              array={categoryData}
              item={category}
              setItem={setCategory}
              placeholder={'Select Category'}
              Colors={Color.green}
            />
            <TextInputWithTitle
              titleText={'Enter Amount'}
              secureText={false}
              placeholder={'Enter Amount'}
              setText={setAmount}
              value={amount}
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.7}
              inputHeight={0.05}
              border={1}
              marginTop={moderateScale(5, 0.3)}
              borderColor={Color.themeLightGray}
              backgroundColor={'#F5F5F5'}
              borderRadius={moderateScale(10, 0.3)}
              placeholderColor={Color.themeLightGray}
              // color
            />
            {color != '' && (
              <TextInputWithTitle
                titleText={'Selected Color'}
                secureText={false}
                placeholder={'Selected Color'}
                setText={setColor}
                value={color}
                viewHeight={0.06}
                viewWidth={0.8}
                inputWidth={0.7}
                inputHeight={0.05}
                border={1}
                marginTop={moderateScale(5, 0.3)}
                borderColor={Color.themeLightGray}
                backgroundColor={'#F5F5F5'}
                borderRadius={moderateScale(10, 0.3)}
                placeholderColor={Color.themeLightGray}
                disable={true}
                // color
              />
            )}

            <CustomButton
              // textTransform={"capitalize"}
              text={
                isLoadingForPost ? (
                  <ActivityIndicator color={'#ffffff'} size={'small'} />
                ) : (
                  'Add'
                )
              }
              isBold
              textColor={Color.white}
              width={windowWidth * 0.75}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
                if (category == '' || amount == '' || color == '') {
                  return Platform.OS == 'android'
                    ? ToastAndroid.show(
                        'Required Field Is Empty',
                        ToastAndroid.SHORT,
                      )
                    : Alert.alert('Required Field Is Empty');
                }
                setChartData(x => [
                  ...x,
                  {name: category, value: amount, color: color},
                ]);

                postFinanceData();
              }}
              bgColor={Color.green}
              borderColor={Color.white}
              borderWidth={2}
              borderRadius={moderateScale(30, 0.3)}
              disable={isLoadingForPost}
            />
          </View>
        )}
        {isLoading ? (
          <View style={styles.list}>
            <ChatCardSkeleton />
            <ChatCardSkeleton />
            <ChatCardSkeleton />
            <ChatCardSkeleton />
            <ChatCardSkeleton />
            <ChatCardSkeleton />
            <ChatCardSkeleton />
            <ChatCardSkeleton />
            <ChatCardSkeleton />
            <ChatCardSkeleton />
            <ChatCardSkeleton />
            <ChatCardSkeleton />
            <ChatCardSkeleton />
            <ChatCardSkeleton />
            <ChatCardSkeleton />
          </View>
        ) : (
          // Object.keys(ChartData).length > 0 && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={ChartData}
            contentContainerStyle={{
              paddingTop: moderateScale(20, 0.3),
              paddingBottom: moderateScale(20, 0.3),
            }}
            style={styles.list}
            renderItem={({item, index}) => {
              return <DataCard data={item} total={total} />;
            }}
            ListFooterComponent={() => {
              return (
                <View
                  style={{
                    // backgroundColor: 'red',
                    flexDirection: 'row',
                    width: windowWidth,
                    alignSelf: 'center',
                    // justifyContent: 'space-between',
                    paddingLeft: windowWidth * 0.43, // backgroundColor : 'red',
                    marginTop: moderateScale(20, 0.3),
                  }}>
                  <CustomText
                    style={[styles.text1, {marginRight: windowWidth * 0.1}]}>
                    Total
                  </CustomText>
                  <CustomText style={styles.text1}>
                    {'  '}${total}
                  </CustomText>
                </View>
              );
            }}
            ListEmptyComponent={() => {
              return (
                // <View style={{backgroundColor : 'red' , height : windowHeight * 0.2 , width : windowWidth}}>
                <>
                  <CustomImage
                    resizeMode={'contain'}
                    source={require('../Assets/Images/notfound.png')}
                    style={{
                      width: windowWidth * 0.5,
                      height: windowHeight * 0.22,
                      alignSelf: 'center',
                    }}
                  />
                </>
                // </View>
              );
            }}
            ListHeaderComponent={() => {
              return (
                <View style={styles.cardView}>
                  <CustomText
                    style={{
                      color: '#000000',
                      fontSize: moderateScale(15, 0.3),
                      textAlign: 'left',
                      // width: windowWidth * 0.2,
                      fontWeight: '700',
                    }}>
                    Color
                  </CustomText>
                  <CustomText
                    style={{
                      color: '#000000',
                      fontSize: moderateScale(15, 0.3),
                      textAlign: 'right',
                      width: windowWidth * 0.2,
                      fontWeight: '700',
                    }}>
                    Reason
                  </CustomText>
                  <CustomText style={styles.text1}>Amount</CustomText>
                </View>
              );
            }}
          />
          // )
        )}
      </ScrollView>

      <DatePicker
        maximumDate={new Date()}
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode={'date'}
        androidVariant="iosClone"
      />
      <Modal
        hasBackdrop={true}
        style={{justifyContent: 'center', alignItems: 'center'}}
        isVisible={isVisible}
        onBackdropPress={() => {
          setIsVisible(false);
        }}>
        <View style={styles.modal}>
          <View style={styles.headerModal}>
            <CustomText style={styles.text}>Select a Color</CustomText>
          </View>
          <ColorPicker
            onColorSelected={color => {
              setColor(color),
                Platform.OS == 'android'
                  ? ToastAndroid.show('Color is Selected', ToastAndroid.SHORT)
                  : Alert.alert('Color is Selected'),
                setIsVisible(false);
            }}
            style={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.3,
              marginTop: moderateScale(40, 0.3),
            }}
          />
        </View>
      </Modal>
    </ScreenBoiler>
  );
};

export default Profile;

const styles = StyleSheet.create({
  modal: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.5,
    borderRadius: moderateScale(20, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  list: {
    borderRadius: moderateScale(20, 0.3),
    width: windowWidth,
    backgroundColor: 'white',
    minHeight: windowHeight * 0.5,
    marginTop: moderateScale(20, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },

  headerModal: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.08,
    backgroundColor: Color.green,
    position: 'absolute',
    top: 0,
    borderRadius: moderateScale(5, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: windowHeight * 0.45,
    width: windowWidth,
    backgroundColor: Color.green,
    borderBottomLeftRadius: moderateScale(30, 0.3),
    borderBottomRightRadius: moderateScale(30, 0.3),
    overflow: 'hidden',
  },
  image: {
    height: windowWidth * 0.31,
    width: windowWidth * 0.31,
    borderRadius: moderateScale((windowWidth * 0.31) / 2, 0.3),
  },

  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: moderateScale(20, 0.3),
    textAlign: 'center',
  },
  dateContainer: {
    top: moderateScale(5, 0.3),
    position: 'absolute',
    margin: moderateScale(10, 0.3),
    borderWidth: 1,
    borderColor: Color.green,
    paddingHorizontal: moderateScale(10, 0.3),
    paddingVertical: moderateScale(5, 0.3),
    borderStyle: 'dotted',
    borderRadius: moderateScale(5, 0.3),
    fontWeight: 'bold',
  },
  text1: {
    color: '#000000',
    fontSize: moderateScale(15, 0.3),
    textAlign: 'left',
    width: windowWidth * 0.2,
    fontWeight: '700',
  },
  text2: {
    color: '#000000',
    fontSize: moderateScale(15, 0.3),
    textAlign: 'center',
    width: windowWidth * 0.3,
    fontWeight: '700',
  },
  container: {
    alignSelf: 'center',
    width: windowWidth * 0.9,
    height: windowHeight * 0.07,
    backgroundColor: Color.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.3),
    alignItems: 'center',
    borderRadius: moderateScale(10, 0.3),
    marginVertical: moderateScale(10, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 4,
  },
  addItem: {
    width: windowWidth * 0.9,
    alignSelf: 'center',
    height: windowHeight * 0.4,
    borderWidth: 1,
    borderColor: Color.green,
    borderRadius: moderateScale(10, 0.3),
    marginTop: moderateScale(10, 0.3),
    alignItems: 'center',
    paddingTop: moderateScale(10, 0.3),
  },
  dropdown: {
    borderRadius: moderateScale(10, 0.3),
    borderWidth: 1,
    borderBottomColor: 'lightgrey',
    width: windowWidth * 0.8,
    borderColor: Color.themeLightGray,
    marginBottom: moderateScale(5, 0.3),
    marginTop: moderateScale(2, 0.3),
    borderBottomColor: Color.themeLightGray,
    backgroundColor: '#F5F5F5',
  },
  cardView: {
    width: '100%',
    height: windowHeight * 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20, 0.3),
    borderBottomWidth: 0.5,
    borderColor: Color.themeLightGray,
  },
});

const DataCard = ({data, total}) => {
  return (
    <View style={styles.cardView}>
      <View
        style={{
          flexDirection: 'row',
          width: windowWidth * 0.15,
        }}>
        <View
          style={{
            width: moderateScale(20, 0.3),
            height: moderateScale(20, 0.3),
            borderRadius: moderateScale(10, 0.3),
            backgroundColor: `${data.color}`,
          }}></View>
        <CustomText style={{color: `${data.color}`}}>
          {((data?.value / total) * 100).toFixed(1)}%
        </CustomText>
      </View>
      <CustomText style={[styles.text2]}>{data?.name}</CustomText>
      <CustomText style={[styles.text1]}>
        ${numeral(data?.value).format('0,0')}
      </CustomText>
    </View>
  );
};
