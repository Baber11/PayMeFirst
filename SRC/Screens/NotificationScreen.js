import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenBoiler from '../Components/ScreenBoiler'
import moment from 'moment'
import { FlatList } from 'native-base'
import { moderateScale } from 'react-native-size-matters'
import NotificationCard from '../Components/NotificationCard'

const NotificationScreen = () => {



    const dummyData = [
        {
            image : require('../Assets/Images/user2.png'),
             text : '2 days left for your installment', 
             name : 'Admin',
              time : moment().format('ll'),
              unread : true,
               onPress : ()=>{console.log('no action yet')}
        },
        {
            image : require('../Assets/Images/user2.png'),
             text : 'You have earned a skilled bedge', 
             name : 'Admin',
              time : moment().format('ll'),
              unread : false,
               onPress : ()=>{console.log('no action yet')}
        },
        {
            image : require('../Assets/Images/user2.png'),
             text : '2 days left for your installment', 
             name : 'Admin',
              time : moment().format('ll'),
              unread : true,
               onPress : ()=>{console.log('no action yet')}
        },
        {
            image : require('../Assets/Images/user2.png'),
             text : '1 days left for your installment', 
             name : 'Admin',
              time : moment().format('ll'),
              unread : false,
               onPress : ()=>{console.log('no action yet')}
        },
        {
            image : require('../Assets/Images/user2.png'),
             text : '2 days left for your installment', 
             name : 'Admin',
              time : moment().format('ll'),
              unread : true,
               onPress : ()=>{console.log('no action yet')}
        },
        {
            image : require('../Assets/Images/user2.png'),
             text : '2 days left for your installment', 
             name : 'Admin',
              time : moment().format('ll'),
              unread : true,
               onPress : ()=>{console.log('no action yet')}
        }
    ]

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}
      headerType={1}
      title={'Notifications'}
      >
        <FlatList
        data={dummyData}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            paddingBottom : moderateScale(20,0.3),
        }}
        renderItem={({item , index})=>{
            return(
                <NotificationCard
                image={item.image}
                name={item.name}
                text={item.text}
                unread={item.unread}
                time={item.time}
                onPress={item.onPress}
                />
            )
        }}
        
        />
      </ScreenBoiler>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({})