import {Center, Icon} from 'native-base';
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
// import {windowHeight, windowWidth} from '../Assets/Utilities/Utils';
import CustomText from '../Components/CustomText';
import moment from 'moment';
import CustomStatusBar from '../Components/CustomStatusBar';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import CustomTable from '../Components/CustomTable';
import navigationService from '../navigationService';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Modal from 'react-native-modal';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useDispatch, useSelector} from 'react-redux';
import numeral from 'numeral';
import { setUserData } from '../Store/slices/common';

const Wallet = () => {
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.commonReducer.userData);
  const focused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [pendingAmount, setPendingAmount] = useState(0);
  // console.log("🚀 ~ file: Wallet.js:44 ~ Wal ~ filteredData", filteredData)
  const dummyArray1 = ['Reason', 'Status', 'date', 'amount'];
  // const dummyArray = [
  //   {
  //     name: 'shopping',
  //     Status: 'pending',
  //     date: moment().format('ll'),
  //     amount: 250,
  //   },
  //   {
  //     name: 'food',
  //     Status: 'Paid',
  //     date: moment().format('ll'),
  //     amount: 250,
  //   },
  //   {
  //     name: 'gift',
  //     Status: 'pending',
  //     date: moment().format('ll'),
  //     amount: 250,
  //   },
  //   {
  //     name: 'shopping',
  //     Status: 'Paid',
  //     date: moment().format('ll'),
  //     amount: 250,
  //   },
  //   {
  //     name: 'food',
  //     Status: 'Paid',
  //     date: moment().format('ll'),
  //     amount: 250,
  //   },
  //   {
  //     name: 'shopping',
  //     Status: 'Paid',
  //     date: moment().format('ll'),
  //     amount: 250,
  //   },
  //   {
  //     name: 'shopping',
  //     Status: 'Paid',
  //     date: moment().format('ll'),
  //     amount: 250,
  //   },
  //   {
  //     name: 'shopping',
  //     Status: 'Paid',
  //     date: moment().format('ll'),
  //     amount: 250,
  //   },
  //   {
  //     name: 'shopping',
  //     Status: 'Paid',
  //     date: moment().format('ll'),
  //     amount: 250,
  //   },
  //   {
  //     name: 'shopping',
  //     Status: 'Paid',
  //     date: moment().format('ll'),
  //     amount: 250,
  //   },
  //   {
  //     name: 'shopping',
  //     Status: 'Paid',
  //     date: moment().format('ll'),
  //     amount: 250,
  //   },
  //   {
  //     name: 'shopping',
  //     Status: 'Paid',
  //     date: moment().format('ll'),
  //     amount: 250,
  //   },
  //   {
  //     name: 'shopping',
  //     Status: 'Paid',
  //     date: moment().format('ll'),
  //     amount: 250,
  //   },
  //   {
  //     name: 'shopping',
  //     Status: 'Paid',
  //     date: moment().format('ll'),
  //     amount: 250,
  //   },
  //   {
  //     name: 'food',
  //     Status: 'Paid',
  //     date: moment().format('ll'),
  //     amount: 250,
  //   },
  // ];
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

  const withDraw = async () => {
    const url = 'auth/withdraw';
    const body = {
      amount: amount,
      date: moment().format('ll'),
      reason: category,
      type: 'Debit',
    };
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      console.log( 'thee data iss ==== >',response?.data);
      dispatch(setUserData(response?.data?.user_info));
      setFilteredData(prev => [
        {
          reason: response?.data?.date?.reason,
          status: response?.data?.date?.status,
          date: response?.data?.date?.date,
          amount: response?.data?.date?.amount,
        },
        ...prev,
      ]);

      Platform.OS == 'android'
        ? ToastAndroid.show(
            `Withdraw request of £${amount} has been done`,
            ToastAndroid.SHORT,
          )
        : Alert.alert(`Withdraw request of £${amount} has been done`);
      setShowModal(false);
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
    setFilteredData([]);
    if (tableData.length > 0) {
      tableData.map((data, index) => {
        return setFilteredData(prev => [
          {
            reason: data?.reason,
            status: data?.status,
            date: data?.date,
            amount: data?.amount,
          },
          ...prev,
        ]);
      });
    }
  }, [tableData]);

  useEffect(() => {
    setPendingAmount(1);
    if (filteredData.length > 0) {
     
       
          filteredData
            .filter(x => x?.status == 'Pending')
            .map((x, index) => {return(  setPendingAmount(
              prev => prev + x?.amount))})
      
    }
  }, [filteredData]);

  return (
    <View
      style={{
        height: windowHeight,
        backgroundColor: 'transparent',
      }}>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <LinearGradient
        colors={[Color.lightGreen, Color.green, Color.lightGreen]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={styles.header}>
        <View
          style={{
            width: windowWidth,
            height: windowHeight,
            alignSelf: 'center',
          }}>
          <CustomText style={styles.title}>Wallet</CustomText>
          {/* <Icon
            name={'left'}
            as={AntDesign}
            color={Color.white}
            size={moderateScale(20, 0.3)}
            style={styles.arrow}
          /> */}
          <View
            style={{marginTop: moderateScale(40, 0.3), alignSelf: 'center'}}>
            <CustomText
              isBold
              style={[styles.title, {fontSize: moderateScale(50, 0.3)}]}>
             {numeral(user?.wallet?.amount).format('$0,0.0')}
            </CustomText>
            <CustomText
              style={[
                styles.title,
                {
                  fontSize: moderateScale(18, 0.3),
                  marginTop: moderateScale(-8, 0.3),
                },
              ]}>
              Current Balance
            </CustomText>
            <CustomButton
              textTransform={'capitalize'}
              text={'Withdraw'}
              isBold
              textColor={Color.white}
              width={windowWidth * 0.3}
              height={windowHeight * 0.05}
              onPress={() => {
                if(user?.current_role == 'Child'){
                  return  Platform.OS === 'android'
                  ? ToastAndroid.show('Access Denied', ToastAndroid.SHORT)
                  : Alert.alert("Access Denied");
                }
                setShowModal(true);
              }}
              marginTop={moderateScale(20, 0.3)}
              bgColor={'#F66565'}
              borderRadius={moderateScale(10, 0.3)}
              alignSelf={'center'}
            />
          </View>
        </View>
      </LinearGradient>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={styles.MainSection}
        contentContainerStyle={{
          backgroundColor: 'white',
          alignItems: 'center',
          paddingTop: moderateScale(90, 0.3),
          paddingBottom: moderateScale(20, 0.3),
        }}>
        <View style={styles.container}>
          <CustomText
            isBold
            style={[
              styles.title,
              {color: Color.themeBlack, fontSize: moderateScale(32, 0.3)},
            ]}>
         {numeral(user?.wallet?.withdraw).format('$0,0.0')}
          </CustomText>
          <CustomText> overall Withdrawal</CustomText>
        </View>
        <View style={styles.container}>
          <CustomText
            isBold
            style={[
              styles.title,
              {color: Color.themeBlack, fontSize: moderateScale(32, 0.3)},
            ]}>
          {numeral(user?.wallet?.pending_amount).format('$0,0.0')}
          </CustomText>
          <CustomText>Pending Amount</CustomText>
        </View>
        <CustomText
          style={[
            styles.title,
            {
              alignSelf: 'flex-start',
              color: Color.black,
              fontSize: moderateScale(17, 0.3),
              marginLeft: moderateScale(20, 0.3),
              marginTop: moderateScale(20, 0.3),
            },
          ]}>
          All Transactions
        </CustomText>
        <CustomTable
          data={filteredData}
          tableFields={dummyArray1}
          headingStyle={{
            width: windowWidth * 0.2,
            // backgroundColor: 'red',
          }}
          customStyle={{
            // backgroundColor: 'red',
            marginBottom: moderateScale(70, 0.3),
          }}
          dataStyle={{
            width: windowWidth * 0.2,
          }}
        />
      </ScrollView>
      <Modal
        isVisible={showModal}
        hasBackdrop={true}
        onBackdropPress={() => {
          setShowModal(false);
        }}
        style={styles.Modal}>
        <View style={styles.addItem}>
          <View style={styles.headerModal}>
            <CustomText
              style={[
                styles.title,
                {
                  marginTop: moderateScale(-10, 0.3),
                  fontSize: moderateScale(20, 0.3),
                },
              ]}>
              Withdraw Request
            </CustomText>
          </View>
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

          <CustomButton
            // textTransform={"capitalize"}
            text={
              isLoading ? (
                <ActivityIndicator color={Color.white} size={'small'} />
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
              withDraw();
            }}
            bgColor={Color.green}
            borderColor={Color.white}
            borderWidth={2}
            borderRadius={moderateScale(30, 0.3)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Wallet;

const styles = ScaledSheet.create({
  header: {
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: Color.themeColor,
    width: windowWidth * 1.4,
    height: windowWidth * 0.7,
    borderBottomLeftRadius: moderateScale(windowWidth * 0.7, 0.3),
    borderBottomRightRadius: moderateScale(windowWidth * 0.7, 0.3),
  },
  headerModal: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.08,
    borderBottomLeftRadius: moderateScale(20, 0.3),
    borderBottomRightRadius: moderateScale(20, 0.3),
    backgroundColor: Color.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(20, 0.3),
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
    // justifyContent: 'center',
    // paddingTop: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    overflow: 'hidden',
  },
  Modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.14,
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    margin: moderateScale(5, 0.3),
    borderRadius: moderateScale(20, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(10, 0.3),
  },
  title: {
    fontSize: moderateScale(24, 0.3),
    alignSelf: 'center',
    marginTop: moderateScale(10, 0.3),
    color: Color.white,
    fontWeight: '600',
  },
  arrow: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    left: moderateScale(20, 0.3),
    top: moderateScale(20, 0.3),
  },
  MainSection: {
    backgroundColor: 'white',
    marginTop: moderateScale(-80, 0.3),
    zIndex: -1,
  },
});
