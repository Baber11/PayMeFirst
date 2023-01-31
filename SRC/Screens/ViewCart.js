import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenBoiler from '../Components/ScreenBoiler'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import CartItem from '../Components/CartItem'
import CustomText from '../Components/CustomText'
import { useState } from 'react'
import numeral from 'numeral'
import { useDispatch, useSelector } from 'react-redux'
import { setCartData, setWholeCart } from '../Store/slices/common'
import { useEffect } from 'react'
import navigationService from '../navigationService'

const ViewCart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.commonReducer.cartData);
  const [finalAmount , setFinalAmount] = useState(0);
  console.log("🚀 ~ file: ViewCart.js:20 ~ ViewCart ~ finalAmount", finalAmount)

  useEffect(() => {
    setFinalAmount(0)
    if(cartData.find(x=>x?.quantity == 0)){
    let newData =  cartData.filter((x,index)=> x?.quantity != 0);
    dispatch(setWholeCart(newData))
    }

  cartData.map((data , index)=>{
      return   setFinalAmount(prev=>prev + data?.price * data?.quantity)
  })

  }, [cartData])
  
  return (
    <ScreenBoiler
      showHeader={true}
      title={'Cart'}
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}
      // headerColor={Color.white}
      headerType={1}
      showBack={true}>
        <View style={styles.container}>
          <FlatList
          showsVerticalScrollIndicator={false}
          data={cartData}
          
          style={{
            height : '90%',
            backgroundColor : 'white',
            width : windowWidth

          }}
          contentContainerStyle={{
            alignItems : 'center'
          }}
          renderItem={({item , index})=>{
            return(
              <CartItem item={item} />
            )
          }}
          />
          <View style={{
            backgroundColor : 'white',
            height : '11%',
            width : windowWidth,
            flexDirection : 'row',
            borderTopWidth  :1,
              borderColor : Color.themeLightGray

          }}>
            <View style={{
              height : '100%',
              width : '50%',
              justifyContent : 'center',
              alignItems :  'center',
              backgroundColor : Color.white,
              
            }}>
              <CustomText isBold style={{
                fontSize : moderateScale(13,0.3),
                color : Color.themeLightGray,
              }}>SubTotal {<CustomText isBold style={{
                fontSize : moderateScale(18,0.3),
                color : Color.green,
              }}>{numeral(finalAmount).format('$0,0.00')}</CustomText>}</CustomText>
            </View>
              <TouchableOpacity 
              activeOpacity={0.9}
              onPress={async()=>{
                let goAhead = false ;
                await cartData.map((x,index)=>{
                  return(
                    [x?.selectedColor , x?.selectedSize]?.includes(undefined) ? goAhead = false : goAhead = true
                  )
                })
               goAhead == false ? alert('Please Select Sizes and Colors of all products in the cart') :
               navigationService.navigate('Checkout',{subTotal : finalAmount})
              }}
              style={{
              height : '100%',
              width : '50%',
              justifyContent : 'center',
              alignItems :  'center',
              backgroundColor : Color.green
            }}>
              <CustomText  style={{
                fontSize : moderateScale(15,0.3),
                color : Color.white,
              }}>CheckOut</CustomText>
            </TouchableOpacity>
          </View>
        </View>

      </ScreenBoiler>
  )
}

export default ViewCart

const styles = ScaledSheet.create({
  container :{ 
    width : windowWidth,
    height : windowHeight * 0.9,
     backgroundColor : Color.white,

  },
})