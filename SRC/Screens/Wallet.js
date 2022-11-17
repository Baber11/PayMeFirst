import {Center, Icon} from 'native-base';
import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
// import {windowHeight, windowWidth} from '../Assets/Utilities/Utils';
import CustomText from '../Components/CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import CustomStatusBar from '../Components/CustomStatusBar';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import CustomTable from '../Components/CustomTable';
import navigationService from '../navigationService';
import {useNavigation} from '@react-navigation/native';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Modal from 'react-native-modal';
import {ToastAndroid} from 'react-native';
import {Platform} from 'react-native';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import TextInputWithTitle from '../Components/TextInputWithTitle';

const Wallet = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const dummyArray1 = ['Reason', 'Status', 'date', 'amount'];
  const dummyArray = [
    {
      name: 'shopping',
      Status: 'pending',
      date: moment().format('ll'),
      amount: 250,
    },
    {
      name: 'food',
      Status: 'Paid',
      date: moment().format('ll'),
      amount: 250,
    },
    {
      name: 'gift',
      Status: 'pending',
      date: moment().format('ll'),
      amount: 250,
    },
    {
      name: 'shopping',
      Status: 'Paid',
      date: moment().format('ll'),
      amount: 250,
    },
    {
      name: 'food',
      Status: 'Paid',
      date: moment().format('ll'),
      amount: 250,
    },
    {
      name: 'shopping',
      Status: 'Paid',
      date: moment().format('ll'),
      amount: 250,
    },
    {
      name: 'shopping',
      Status: 'Paid',
      date: moment().format('ll'),
      amount: 250,
    },
    {
      name: 'shopping',
      Status: 'Paid',
      date: moment().format('ll'),
      amount: 250,
    },
    {
      name: 'shopping',
      Status: 'Paid',
      date: moment().format('ll'),
      amount: 250,
    },
    {
      name: 'shopping',
      Status: 'Paid',
      date: moment().format('ll'),
      amount: 250,
    },
    {
      name: 'shopping',
      Status: 'Paid',
      date: moment().format('ll'),
      amount: 250,
    },
    {
      name: 'shopping',
      Status: 'Paid',
      date: moment().format('ll'),
      amount: 250,
    },
    {
      name: 'shopping',
      Status: 'Paid',
      date: moment().format('ll'),
      amount: 250,
    },
    {
      name: 'shopping',
      Status: 'Paid',
      date: moment().format('ll'),
      amount: 250,
    },
    {
      name: 'food',
      Status: 'Paid',
      date: moment().format('ll'),
      amount: 250,
    },
  ];
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
  return (
    <View
      style={{
        height: windowHeight,
        backgroundColor: 'transparent',
      }}
    >
      <CustomStatusBar
        backgroundColor={[Color.green, Color.green]}
        barStyle={'light-content'}
      />
      <LinearGradient
        colors={[Color.green, Color.green]}
        start={{x: 1, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.header}
      >
        <View
          style={{
            width: windowWidth,
            height: windowHeight,
            alignSelf: 'center',
          }}
        >
          <CustomText style={styles.title}>Wallet</CustomText>
          {/* <Icon
            name={'left'}
            as={AntDesign}
            color={Color.white}
            size={moderateScale(20, 0.3)}
            style={styles.arrow}
          /> */}
          <View
            style={{marginTop: moderateScale(40, 0.3), alignSelf: 'center'}}
          >
            <CustomText
              isBold
              style={[styles.title, {fontSize: moderateScale(50, 0.3)}]}
            >
              $2500
            </CustomText>
            <CustomText
              style={[
                styles.title,
                {
                  fontSize: moderateScale(18, 0.3),
                  marginTop: moderateScale(-8, 0.3),
                },
              ]}
            >
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
        }}
      >
        <View style={styles.container}>
          <CustomText
            isBold
            style={[
              styles.title,
              {color: Color.themeBlack, fontSize: moderateScale(32, 0.3)},
            ]}
          >
            $250
          </CustomText>
          <CustomText>Withdraw Amount</CustomText>
        </View>
        <View style={styles.container}>
          <CustomText
            isBold
            style={[
              styles.title,
              {color: Color.themeBlack, fontSize: moderateScale(32, 0.3)},
            ]}
          >
            $400
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
          ]}
        >
          All Transactions
        </CustomText>
        <CustomTable
          data={dummyArray}
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
        style={styles.Modal}
      >
        <View style={styles.addItem}>
          <View style={styles.headerModal}>
            <CustomText
              style={[
                styles.title,
                {
                  marginTop: moderateScale(-10, 0.3),
                  fontSize: moderateScale(20, 0.3),
                },
              ]}
            >
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
            text={'Add'}
            isBold
            textColor={Color.white}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              Platform.OS == 'android'
                ? ToastAndroid.show(
                    `Withdraw request of £${amount} has been done`,
                    ToastAndroid.SHORT,
                  )
                : Alert.alert(`Withdraw request of £${amount} has been done`);
              setShowModal(false);
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
