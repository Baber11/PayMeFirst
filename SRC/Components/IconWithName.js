import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { windowHeight, windowWidth } from "../Utillity/utils";
import CustomImage from "./CustomImage";
import CustomText from "./CustomText";
import Constants from "../Assets/Utilities/Constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Color from "../Assets/Utilities/Color";
import { Icon } from "native-base";
import { imageUrl } from "../Config";

const IconWithName = ({ imageStyle, item, image, icon, width, onPress }) => {
  const [tintColor, setTintColor] = useState("");

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.container, width && { width: width }]}
      onPress={onPress}
    >
      {image &&
        (console.log("here", `${imageUrl}${item?.photo}`),
        (
          <CustomImage
            resizeMode={"contain"}
            source={{ uri: `${imageUrl}${item?.photo}` }}
            style={[styles.image, imageStyle && imageStyle]}
          />
        ))}
      {icon && (
        <CustomImage
          resizeMode={"contain"}
          source={item?.image}
          style={[styles.image, imageStyle && imageStyle]}
        />
      )}
      <CustomText
        numberOfLines={2}
        style={[
          Constants.h5,
          {
            width: windowWidth * 0.2,
            color: Color.themeBlack,
            fontWeight: "bold",
          },
        ]}
      >
        {icon ? item?.name : `${item?.firstName} ${item?.lastName}`}
      </CustomText>
    </TouchableOpacity>
  );
};
const styles = ScaledSheet.create({
  container: {
    borderWidth: 0.5,
    borderRadius: moderateScale(5, 0.3),
    borderColor: Color.lightGrey,
    marginVertical: moderateScale(10, 0.3),
    marginRight: moderateScale(15, 0.3),
    backgroundColor: Color.white,
    // alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: moderateScale(5, 0.3),
    paddingVertical: moderateScale(5, 0.3),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  image: {
    width: moderateScale(50, 0.3),
    height: moderateScale(50, 0.3),
    marginRight: moderateScale(5, 0.3),
    borderRadius: moderateScale(5, 0.3),
    // tintColor: Color.lightGrey,
    //   alignSelf: "center",
  },
});

export default IconWithName;
