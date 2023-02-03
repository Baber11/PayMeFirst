import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import {FlatList, Icon} from 'native-base';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CategoriesSelector from '../Components/CategoriesSelector';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import { ScrollView } from 'react-native';
import SearchContainer from '../Components/SearchContainer';
import navigationService from '../navigationService';
import { useDispatch, useSelector } from 'react-redux';

var categoryData = [
  {
    image: require('../Assets/Images/shoesCover.jpg'),
    title: 'New Collection',
  },
  {
    image: require('../Assets/Images/shoesCover.jpg'),
    title: 'Woman Clothes',
  },
  {
    image: require('../Assets/Images/manCover.jpg'),
    title: 'man Clothes',
  },
  {
      image: require('../Assets/Images/glasses.jpg'),
      title: 'Glasses',
    },
];
const Category = () => {
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.commonReducer.cartData);
    const [searchData , setSearchData] = useState('');
    const [showSearch , setShowSearch] = useState(false);
    const [flatListData , setFlatListData] = useState([])
    console.log("🚀 ~ file: Category.js:36 ~ Category ~ flatListData", flatListData)

  useEffect(() => {
    if(searchData == ''){
        setFlatListData(categoryData)
    }
   if(searchData != ''){

       setFlatListData(categoryData.filter((x)=>x?.title == searchData))
    }
  }, [searchData])
  

  return (
    <ScreenBoiler
      showHeader={true}
      title={'Categories'}
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}
      orderHistory={true}
      // headerColor={Color.white}
      headerType={1}
      showBack={true}>
        <ScrollView
        showsVerticalScrollIndicator={false}
         style={{
            width: windowWidth,
            backgroundColor : 'white',
            // maxHeight : windowHeight * 0.8
          }}
          contentContainerStyle={{
            paddingTop: moderateScale(50, 0.3),
            alignItems: 'center',
          }}
        >
        <View
              style={{
                width: windowWidth * 0.87,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(20, 0.3),
                  color: Color.black,
                }}>
                Categories
              </CustomText>
              <View style={styles.smallContainer}>
                <Icon
                  name={'search'}
                  as={Ionicons}
                  size={moderateScale(25, 0.3)}
                  color={Color.black}
               
                  onPress={() => {
                   setShowSearch(!showSearch)
                  }}
                />
              
                <View>
                  <Icon
                     name={
                      cartData.length == 0 ? 'remove-shopping-cart' : 'shopping-cart'
                    }
                    as={MaterialIcons}
                    size={moderateScale(25, 0.3)}
                    color={Color.black}
                  
                    onPress={() => {
                      cartData.length > 0 && navigationService.navigate('ViewCart')
                    }}
                  />
                  <View
                    style={{
                      width: moderateScale(12, 0.3),
                      height: moderateScale(12, 0.3),
                      borderRadius: moderateScale(6, 0.3),
                      backgroundColor: Color.green,
                      position : 'absolute',
                      right : -5,
                      justifyContent : 'center',
                      alignItems : 'center',
                    }}>
                        <CustomText style={{
                            fontSize : moderateScale(9,0.3),
                            color : Color.white
                        }}>{ cartData.length}</CustomText>
                    </View>
                </View>
              </View>
            </View>
            {showSearch &&
            <SearchContainer
            width={windowWidth * 0.8}
            input
            style={{
                height : windowHeight * 0.07,
                marginBottom : moderateScale(10,0.3),
            }}
            data={searchData}
            setData={setSearchData}

            />
        }
      <FlatList
        data={flatListData}
        nestedScrollEnabled={true}
        style={{
          width: windowWidth,
          backgroundColor : Color.white
        }}
        contentContainerStyle={{
        //   paddingTop: moderateScale(50, 0.3),
          alignItems: 'center',
          paddingBottom: moderateScale(20, 0.3),
        }}
        renderItem={({item, index}) => {
          return (
            <CategoriesSelector
              item={item}
              onPress={() => {
                navigationService.navigate('SelectedCategory',{categoryName : item?.title})
              }}
            />
          );
        }}
       
      />

</ScrollView>

    </ScreenBoiler>
  );
};

export default Category;

const styles = ScaledSheet.create({
  smallContainer: {
    width: windowWidth * 0.17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems : 'center'
  },
});
