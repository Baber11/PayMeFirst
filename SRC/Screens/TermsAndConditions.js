import React, {useEffect, useState} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';

import {windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';

import {Get} from '../Axios/AxiosInterceptorFunction';
import Loader from '../Components/Loader';

const TermsAndConditions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [termsData, setTermsData] = useState('');

  // const GetSupportData = async () => {
  //   const url = 'users/terms';
  //   setIsLoading(true);
  //   const response = await Get(url);
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     console.log(response?.data?.data);
  //     setTermsData(response?.data?.data);
  //   }
  // };

  // useEffect(() => {
  //   GetSupportData();
  // }, []);

  // useEffect(() => {
  //   let a = parser?.parseFromString(
  //     "<p>Hello world <b>world</b> <i>foo</i> abc</p>",
  //     "text/html"
  //   );
  //   console.log(
  //     parser?.parseFromString(termsData?.content, "text/html"),
  //     termsData?.content
  //   );
  // }, [termsData]);

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      headerType={1}
      title={'Terms & Conditions'}
      statusBarContentStyle={'dark-content'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.3),
          backgroundColor: 'transparent',
          paddingHorizontal: moderateScale(25, 0.3),
          minHeight: windowHeight * 0.9,
        }}
      >
        {isLoading ? (
          <View style={styles.loaderView}>
            <Loader
              bgColor={'transparent'}
              // textColor={Color.Gray}
              height={windowHeight * 0.8}
              width={windowWidth * 0.9}
              size={'large'}
              text={true}
            />
          </View>
        ) : (
          <>
            <CustomText
              style={[
                {color: Color.themeBlack, marginTop: moderateScale(20, 0.3)},
              ]}
            >
              Terms & Conditions
            </CustomText>
            <CustomText
              style={[{marginTop: moderateScale(8, 0.3)}]}
            >{`Effective Date : June 16 ,2022`}</CustomText>
            <CustomText
              style={[
                {
                  // backgroundColor: 'red',
                  color: '#292929',
                  textAlign: 'left',
                  marginTop: moderateScale(20, 0.3),
                  lineHeight: moderateScale(20, 0.3),
                  fontSize: moderateScale(15, 0.3),
                },
              ]}
            >
              {
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum \n\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
              }
            </CustomText>
          </>
        )}
      </ScrollView>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    height: windowHeight * 0.9,
    width: windowWidth,
    backgroundColor: Color.white,
    alignItems: 'center',
  },
  button: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.25,
    borderRadius: moderateScale(5, 0.3),
    backgroundColor: Color.themeColor,
    position: 'absolute',
    bottom: 50,
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    width: windowWidth * 0.85,
    // backgroundColor: "red",
    // marginHorizontal: moderateScale(20, 0.3),
    borderBottomWidth: 0.5,
    borderColor: Color.lightGrey,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: moderateScale(15, 0.3),
  },
  image: {
    width: moderateScale(25, 0.3),
    height: moderateScale(25, 0.3),
    // marginRight: moderateScale(5, 0.3),
  },
});

export default TermsAndConditions;
