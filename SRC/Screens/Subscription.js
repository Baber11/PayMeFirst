import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import {ScrollView} from 'react-native';
import {windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import SubscriptionCard from '../Components/SubscriptionCard';
import { useState } from 'react';

const Subscription = () => {
    const [currentPlan , setCurrentPlan] = useState('basic')
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
          onPress={()=>{setCurrentPlan('basic')}}
          currentPlan={currentPlan}
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
          onPress={()=>{setCurrentPlan('premium')}}
          currentPlan={currentPlan}
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
