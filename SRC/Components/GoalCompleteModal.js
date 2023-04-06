import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import CustomText from './CustomText'
import { moderateScale } from 'react-native-size-matters'
import CustomImage from './CustomImage'
import CustomButton from './CustomButton'
import { setPoints, showGoalCompleted } from '../Store/slices/common'
import { useDispatch, useSelector } from 'react-redux'

const GoalCompleteModal = ({modalVisible , setModalVisible }) => {
    const dispatch = useDispatch();
    const GoalCompleted = useSelector((state)=>state.commonReducer.GoalCompleted)
    const points = useSelector((state)=>state.commonReducer.points)
    console.log("🚀 ~ file: GoalCompleteModal.js:17 ~ GoalCompleteModal ~ points:", points)
    const user = useSelector((state)=>state.commonReducer.userData)

    console.log("🚀 ~ file: GoalCompleteModal.js:17 ~ GoalCompleteModal ~ points:", user?.points)

  return (
    <Modal  
    isVisible={modalVisible}
    onBackdropPress={()=>{
        setModalVisible(false)
    }}
    style={{
        justifyContent : 'center',
        alignItems : 'center'
    }}
    >
        <View style={{
            width : windowWidth * 0.8 ,
            paddingBottom : moderateScale(30,0.6),
            // height : windowHeight * 0.45 ,
            backgroundColor : Color.white,
            alignItems : 'center',
        }}>
      <View style={{
        width : windowWidth * 0.8 ,
        height : windowHeight * 0.05 ,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : Color.lightGreen
      }}>
        <CustomText isBold style={{
            color : Color.white , 
            fontSize : moderateScale(15,0.6)
        }}>Goal Accomplished</CustomText>
      </View>
      <View style={{
        width : '60%',
        height : windowHeight * 0.2,
        marginTop : moderateScale(10,0.3)
      }}>
        <CustomImage 
        source={require('../Assets/Images/goalCompleted.jpg')}
        style={{
            width : '100%',
            height : '100%'
        }}
        />
      </View>
      <CustomText isBold style={{
            color : Color.veryLightGray , 
            fontSize : moderateScale(11,0.6),
            textAlign : 'center',
            width : '80%'
        }}>You have completed your goal. amount is transered to your wallet</CustomText>
        <CustomText isBold style={{
            color : '#967444' , 
            fontSize : moderateScale(17,0.6),
            textAlign : 'center',
        }}>You won:</CustomText>
       
            <CustomText isBold style={{
            color : '#CD7F32' , 
            fontSize : moderateScale(20,0.6),

            // textAlign : 'center',
        }}>{user?.points -  points} {
            <CustomText isBold style={{
                color : '#CD7F32' , 
                fontSize : moderateScale(9,0.6),
                textAlign : 'center',
                textTransform : 'uppercase'
            }}>PayMe Points</CustomText>
        }</CustomText>
          <CustomButton
          text={'Close'}
          isBold
          textColor={Color.white}
          width={windowWidth * 0.7}
          height={windowHeight * 0.07}
          marginTop={moderateScale(10, 0.3)}
          onPress={()=>{
            dispatch(setPoints(user?.points))
            dispatch(showGoalCompleted(false))
            setModalVisible(false)
          }}
          bgColor={Color.green}
          borderColor={Color.green}

          borderRadius={moderateScale(10, 0.3)}
        />
       
     
        
        </View>
    </Modal >
  )
}

export default GoalCompleteModal

const styles = StyleSheet.create({})