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

const CategoriesSelector = ({ item, data, setData }) => {
  const [tintColor, setTintColor] = useState("");
  // console.log("hereeeeeeeeeeee", data, item?._id);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => {
        setData(item?._id);
      }}
    >
      <CustomImage
        onPress={() => {
          setData(item?._id);
        }}
        resizeMode={"contain"}
        source={
          item?.iconForApp
            ? { uri: `${imageUrl}${item?.iconForApp}` }
            : require("../Assets/Images/all.png")
        }
        style={[
          styles.image,
          {
            tintColor:
              data == item?._id ? Color.themeColor : Color.themeLightGray,
          },
        ]}
      />
      <CustomText
        style={[
          Constants.h5,
          {
            color: data == item?._id ? Color.themeColor : Color.themeLightGray,
            marginTop: moderateScale(5, 0.3),
          },
        ]}
      >
        {item?.name}
      </CustomText>
    </TouchableOpacity>
  );
};
const styles = ScaledSheet.create({
  container: {
    // paddingVertical: moderateScale(10, 0.3),
    // height: 40,
    marginTop: moderateScale(10, 0.3),
    marginRight: moderateScale(25, 0.3),
    // backgroundColor: "yellow",
    alignItems: "center",
  },
  image: {
    width: moderateScale(30, 0.3),
    height: moderateScale(30, 0.3),
    tintColor: Color.lightGrey,
    //   alignSelf: "center",
  },
});

export default CategoriesSelector;
