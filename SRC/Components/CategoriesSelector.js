import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { windowHeight, windowWidth } from "../Utillity/utils";
import CustomImage from "./CustomImage";
import CustomText from "./CustomText";
import Constants from "../Assets/Utilities/Constants";
import Color from "../Assets/Utilities/Color";
import { imageUrl } from "../Config";
import { useIsFocused } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

const CategoriesSelector = ({ item , onPress }) => {
  const [tintColor, setTintColor] = useState("");
  // console.log("hereeeeeeeeeeee", data, item?._id);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={onPress}
    >
      <CustomImage
          onPress={onPress}
        resizeMode={"stretch"}
      source={item?.image}
        style={{
          width : windowWidth * 0.86,
          height : windowHeight * 0.2
        }}
      />
        <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 0, y: 1}}
                      colors={['#8A8A8A00', '#222222']}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        borderRadius: 5,
                        justifyContent: 'flex-end',
                        shadowOffset: {height: 2, width: 0},
                        shadowOpacity: 1,
                        shadowRadius: 4,
                        width: '100%',
                        alignItems: 'center',
                        paddingBottom: moderateScale(20, 0.3),
                        paddingTop: moderateScale(50, 0.3),
                      }}>
                      
      <CustomText
        style={{
          position : 'absolute',
        bottom : moderateScale(10,0.3),
          fontSize : moderateScale(20,0.3),
          color : Color.white,
          textShadowColor : '#000000',
       }}
        isBold
      >
        {item?.title}
      </CustomText>
                    </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = ScaledSheet.create({
  container: {
    // paddingVertical: moderateScale(10, 0.3),
    // height: 40,
    marginTop: moderateScale(15, 0.3),
    // marginRight: moderateScale(25, 0.3),
    // backgroundColor: "yellow",
    width : windowWidth * 0.86,
    height : windowHeight * 0.2,
    borderRadius : moderateScale(15,0.3),
    backgroundColor : 'black',
    alignItems : 'center',
    overflow : 'hidden',
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.32,
shadowRadius: 5.46,

elevation: 9,
    
  },
  image: {
    // width: '100%',
    // height: '100%',
  },
});

export default CategoriesSelector;
