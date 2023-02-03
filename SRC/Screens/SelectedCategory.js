import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import {FlatList, Icon} from 'native-base';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CategoriesSelector from '../Components/CategoriesSelector';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import {ScrollView} from 'react-native';
import SearchContainer from '../Components/SearchContainer';
import ProductCard from '../Components/ProductCard';
import {setCartData} from '../Store/slices/common';
import {useDispatch, useSelector} from 'react-redux';
import navigationService from '../navigationService';

var categoryData = [
  {
    id: 1,
    quantity: 1,
    image: require('../Assets/Images/shoes2.jpg'),
    name: 'shoes2',
    price: 200,
    array : [require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg')

    ],
    description : 'Best shoes2 up so far in the market with the comfort',
    brandName : 'Nike',
    availbleSizes : ['8','8.5','9','9.5','10'],
    Reviews : [
      {
        name : 'John',
        rating : 3,
        description : 'good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
    ],
    availbleColor : ['Red','Yellow','grey','pink','blue'],


  },
  {
    image: require('../Assets/Images/shoes2.jpg'),
    name: 'Shoes nike',
    id: 2,
    quantity: 1,
    price: 200,
      array : [require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg')

    ],
    description : 'Best shoes2 up so far in the market with the comfort',
    brandName : 'Nike',
    availbleSizes : ['8','8.5','9','9.5','10'],
  Reviews : [
      {
        name : 'John',
        rating : 3,
        description : 'good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
    ],
    availbleColor : ['Red','Yellow','grey','pink','blue'],

  },
  {
    image: require('../Assets/Images/shoes2.jpg'),
    name: 'Addidas',
    id: 3,
    quantity: 1,
    price: 200,
      array : [require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg')

    ],
    description : 'Best shoes2 up so far in the market with the comfort',
    brandName : 'Nike',
    availbleSizes : ['8','8.5','9','9.5','10'],
  Reviews : [
      {
        name : 'John',
        rating : 3,
        description : 'good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
    ],
    availbleColor : ['Red','Yellow','grey','pink','blue'],

  },
  {
    image: require('../Assets/Images/shoes2.jpg'),
    name: 'Training Suit',
    id: 4,
    quantity: 1,
    price: 200,
      array : [require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg')

    ],
    description : 'Best shoes2 up so far in the market with the comfort',
    brandName : 'Nike',
    availbleSizes : ['L','M','xl','xxl'],
  Reviews : [
      {
        name : 'John',
        rating : 3,
        description : 'good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
     
    ],
    availbleColor : ['Red','Yellow','grey','pink','blue'],

  },
  {
    id: 5,
    quantity: 1,
    image: require('../Assets/Images/shoes2.jpg'),
    name: 'shoes2',
    price: 200,
      array : [require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg')

    ],
    description : 'Best shoes2 up so far in the market with the comfort',
    brandName : 'Nike',
    availbleSizes : ['8','8.5','9','9.5','10'],
  Reviews : [
      {
        name : 'John',
        rating : 3,
        description : 'good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
    ],
    availbleColor : ['Red','Yellow','grey','pink','blue'],

  },
  {
    image: require('../Assets/Images/shoes2.jpg'),
    name: 'Shoes nike',
    id: 6,
    quantity: 1,
    price: 200,
      array : [require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg'),
    require('../Assets/Images/shoes2.jpg')

    ],
    description : 'Best shoes2 up so far in the market with the comfort',
    brandName : 'Nike',
    availbleSizes : ['8','8.5','9','9.5','10'],
  Reviews : [
      {
        name : 'John',
        rating : 3,
        description : 'good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
      {
        name : 'John bro',
        rating : 5,
        description : 'Very good Product',
        image : require('../Assets/Images/basicman.jpg')
      },
    ],
    availbleColor : ['Red','Yellow','grey','pink','blue'],

  },
];
const SelectedCategory = () => {
    const dispatch = useDispatch();
  const cartData = useSelector(state => state.commonReducer.cartData);
  console.log(
    '🚀 ~ file: SelectedCategory.js:50 ~ SelectedCategory ~ cartData',
    cartData,
  );
  const [searchData, setSearchData] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [flatListData, setFlatListData] = useState([]);

  useEffect(() => {
    if (searchData == '') {
      setFlatListData(categoryData);
    }
    if (searchData != '') {
      setFlatListData(categoryData.filter(x => x?.name == searchData));
    }
  }, [searchData]);

  return (
    <ScreenBoiler
      showHeader={true}
      title={'seleted Category'}
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}
      // headerColor={Color.white}
      headerType={1}
      showBack={true}>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: windowWidth,
          backgroundColor: 'white',
          // maxHeight : windowHeight * 0.8
        }}
        contentContainerStyle={{
          paddingTop: moderateScale(50, 0.3),
          alignItems: 'center',
        }}> */}
        <View 
        
        style={{
            width: windowWidth,
            backgroundColor: 'white',
            // paddingTop: moderateScale(50, 0.3),
            alignItems: 'center',
            paddingTop: moderateScale(40,0.3)
            // minHeight : windowHeight * 0.8
          }}>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(20, 0.3),
            color: Color.black,
            width: windowWidth * 0.85,
            textAlign: 'left',
          }}>
          The Best Stuff in Market
        </CustomText>
        <View
          style={{
            width: windowWidth * 0.87,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems : 'center'
          }}>
          <SearchContainer
            width={windowWidth * 0.65}
            input
            inputStyle={{
              height: windowHeight * 0.05,
            }}
            style={{
              height: windowHeight * 0.06,
              marginBottom: moderateScale(10, 0.3),
              borderRadius: moderateScale(20, 0.3),
              
            }}
            data={searchData}
            setData={setSearchData}
          />
          <View style={[styles.smallContainer]}>
            <Icon
              name={'sound-mix'}
              as={Entypo}
              size={moderateScale(25, 0.3)}
              color={Color.black}
              onPress={() => {
                setShowSearch(!showSearch);
              }}
            />

            <View>
              <Icon
                name={cartData.length == 0 ? 'remove-shopping-cart' : 'shopping-cart'}
                as={MaterialIcons}
                size={moderateScale(25, 0.3)}
                color={Color.black}
                onPress={() => {
                  cartData.length > 0 && navigationService.navigate('ViewCart')
                }}

              />
              {
                cartData.length > 0 &&
              
          
              <View
                style={{
                  width: moderateScale(12, 0.3),
                  height: moderateScale(12, 0.3),
                  borderRadius: moderateScale(6, 0.3),
                  backgroundColor: Color.green,
                  position: 'absolute',
                  right: -5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText
                  style={{
                    fontSize: moderateScale(9, 0.3),
                    color: Color.white,
                  }}>
                  {cartData.length}
                </CustomText>
              </View>
}
            </View>
          </View>
        </View>
        </View>

        <FlatList
          data={flatListData}
          style={{
            width: windowWidth,
            backgroundColor: Color.white,
          }}
          numColumns={2}
          contentContainerStyle={{
              paddingTop: moderateScale(20, 0.3),
            alignItems: 'center',
            paddingBottom: moderateScale(20, 0.3),
          }}
          renderItem={({item, index}) => {
        
            return (
              <ProductCard
                item={item}
                onPress={() => {
                  !cartData?.some(data => data.id == item?.id) &&
                    dispatch(setCartData(item));
                }}
                style={[index % 2 != 0 ? {marginLeft : moderateScale(10,0.3)} : {marginRight : moderateScale(10,0.3)}]}
                // height={index % 2 == 0 ? windowHeight * 0.26 : windowHeight * 0.3}
              />
            );
          }}
        />
      {/* </ScrollView> */}
      {/* </View> */}
    </ScreenBoiler>
  );
};
        

export default SelectedCategory;

const styles = ScaledSheet.create({
  smallContainer: {
    width: windowWidth * 0.17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    flexGrow : 0
    // backgroundColor : 'red'
  },
});
