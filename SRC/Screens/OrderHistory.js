import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../Components/CustomText'
import ScreenBoiler from '../Components/ScreenBoiler'

const OrderHistory = () => {
  return (
    <ScreenBoiler
    showHeader={true}
    title={'History'}
    statusBarBackgroundColor={Color.white}
    statusBarContentStyle={'dark-content'}
    // headerColor={Color.white}
    headerType={1}
    showBack={true}>
        <CustomText>Ui in making</CustomText>
        </ScreenBoiler>
  )
}

export default OrderHistory

const styles = StyleSheet.create({})