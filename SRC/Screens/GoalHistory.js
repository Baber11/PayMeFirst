import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {useState} from 'react';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import numeral from 'numeral';
import moment from 'moment/moment';

const GoalHistory = () => {
  const token = useSelector(state => state.authReducer.token);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const getHistory = async () => {
    const url = 'auth/goal/list';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      console.log(JSON.stringify(response?.data?.data, null, 2));
      setHistory(response?.data?.data);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <ScreenBoiler
      showHeader={true}
      title={'History'}
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}
      // headerColor={Color.white}
      headerType={1}
      showBack={true}>
      <FlatList
        data={history}
        showsVerticalScrollIndicator={false}
        style={{
          width: windowWidth,
          backgroundColor: 'white',
        }}
        contentContainerStyle={{
          paddingTop: moderateScale(50, 0.3),
          alignItems: 'center',
          paddingBottom: moderateScale(20, 0.3),
        }}
        renderItem={({item, index}) => {
          return <GoalCard item={item} />;
        }}
      />
    </ScreenBoiler>
  );
};

export default GoalHistory;

const styles = ScaledSheet.create({
  container: {
    marginVertical: moderateScale(5, 0.3),
    width: windowWidth * 0.95,

    alignItems: 'center',
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    borderRadius: moderateScale(10, 0.3),
    overflow: 'hidden',
  },
  nameContainer: {
    flexDirection: 'row',
    width: windowWidth * 0.9,
    paddingVertical: moderateScale(12, 0.3),
    // height: windowHeight * 0.06,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(10, 0.3),
  },
  detailContainer: {
    // flexDirection : 'row',
    width: windowWidth * 0.9,
    paddingVertical: moderateScale(12, 0.3),
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(10, 0.3),
  },
  entity: {
    fontSize: moderateScale(14, 0.3),
  },
});

const GoalCard = ({item}) => {
  const [show, setShow] = useState(false);
  console.log('🚀 ~ file: GoalHistory.js:85 ~ GoalCard ~ show', show);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        setShow(!show);
      }}
      style={styles.container}>
      <View style={styles.nameContainer}>
        {!show ? (
          <CustomText>
            {item?.goal_name ? item?.goal_name : 'Goal For Saving'}
          </CustomText>
        ) : (
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(20, 0.3),
            }}>
            Details
          </CustomText>
        )}

        <CustomText
          style={{
            position: 'absolute',
            top: 0,
            right: 5,
            fontSize: moderateScale(10, 0.3),
            color: Color.lightGreen,
          }}>
          completed
        </CustomText>
        <Icon
          name={show ? 'minus' : 'plus'}
          as={AntDesign}
          color={Color.black}
          size={moderateScale(15, 0.3)}
          onPress={() => {
            setShow(!show);
          }}
        />
      </View>

      {show && (
        <View style={styles.detailContainer}>
          <CustomText style={styles.entity} isBold>
            Goal Name :{' '}
            {
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.3),
                }}>
                {item?.goal_name ? item?.goal_name : 'Goal For Saving'}
              </CustomText>
            }
          </CustomText>
          <CustomText style={styles.entity} isBold>
            Amount to Save :{' '}
            {
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.3),
                }}>
                {numeral(item?.amount_save).format('$0,0.00')}
              </CustomText>
            }
          </CustomText>
          <CustomText style={styles.entity} isBold>
            Selected Plan :{' '}
            {
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.3),
                }}>
                {item?.plan}
              </CustomText>
            }
          </CustomText>
          <CustomText style={styles.entity} isBold>
            Started :{' '}
            {
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.3),
                }}>
                {moment(item?.starting_date).format('ll')}
              </CustomText>
            }
          </CustomText>
          
          <CustomText style={styles.entity} isBold>
            Ended :{' '}
            {
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.3),
                }}>
                {moment(item?.ending_date).format('ll')}
              </CustomText>
            }
          </CustomText>
          <CustomText style={styles.entity} isBold>
            Numer Of Transaction to complete goal :{' '}
            {
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.3),
                }}>
                {item?.number_deduction}
              </CustomText>
            }
          </CustomText>
          <CustomText style={styles.entity} isBold>
            Amount Per Transaction :{' '}
            {
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.3),
                }}>
                {numeral(item?.amount_per_deduction).format('$0,0.00')}
              </CustomText>
            }
          </CustomText>
        </View>
      )}
    </TouchableOpacity>
  );
};
