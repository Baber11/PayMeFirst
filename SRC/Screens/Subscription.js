import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import {ScrollView} from 'react-native';
import {apiHeader, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import SubscriptionCard from '../Components/SubscriptionCard';
import { useState } from 'react';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../Store/slices/common';
import navigationService from '../navigationService';

const Subscription = (props) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  const fromStores = props?.route?.params?.fromStores ;
  // console.log("🚀 ~ file: Subscription.js:20 ~ Subscription ~ fromStores", fromStores)
  
  const [isLoading, setIsLoading] = useState(false);




    const getSubscription = async () =>{
      const url = 'auth/cuurent/plan';
      const params ={
        current_plan : user?.current_plan
      }
   
      setIsLoading(true)
      const response = await Post(url , params , apiHeader(token))
      setIsLoading(false);
      if(response != undefined){
        // console.log( 'here is the response ===>',response?.data);
        dispatch(setUserData(response?.data?.user_info))
        fromStores && props.navigation.goBack()
      }
    }
  return (
    <ScreenBoiler
      showHeader={true}
      title={'Subscription'}
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}
      // headerColor={Color.white}
      headerType={1}
      showBack={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={{
          width: windowWidth,
          // backgroundColor : Color.white
        }}>
        <CustomText style={styles.heading}>Get Started Today</CustomText>
        <CustomText style={styles.subheading}>
          Choose the right plan and start saving your money
        </CustomText>
        <SubscriptionCard
          type={'basic'}
          price={0}
          featuresArray={[
            'no access to e-commerce sites',
            '15% will be fined on upto $100 and 5% on more than $100 after due date payment',
            'only in app reminder',
            'can not change card',
            'can set plan for upto $1000',
          ]}
          onPress={getSubscription}
          currentPlan={user?.current_plan}
          loader={isLoading}
        />
        <SubscriptionCard
          type={'premium'}
          price={30}
          featuresArray={[
            'get access to various well known e-commerce sites',
            'get leverage 2 times on late payment deduction',
            'get reminder on phone and email before deadline',
            'can change card 2 times (after discussing with backend',
            'can save unlimited money',
          ]}
          onPress={getSubscription}
          currentPlan={user?.current_plan}
          loader={isLoading}

        />
      </ScrollView>
    </ScreenBoiler>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  heading: {
    fontSize: moderateScale(20, 0.6),
    fontWeight: '700',
    marginTop: moderateScale(20, 0.3),
    color: Color.black,
  },
  subheading: {
    fontSize: moderateScale(12, 0.6),
    // fontWeight : '700',
    marginTop: moderateScale(10, 0.3),
    color: Color.themeLightGray,
  },
});
