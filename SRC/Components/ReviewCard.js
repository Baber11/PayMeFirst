import React, { useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";

import navigationService from "../navigationService";

import TextInputWithTitle from "../Components/TextInputWithTitle";
import CustomText from "../Components/CustomText";

import Constants from "../Assets/Utilities/Constants";
import { Icon } from "native-base";
import { windowHeight, windowWidth } from "../Utillity/utils";
import Color from "../Assets/Utilities/Color";
import { imageUrl } from "../Config";

const ReviewCard = ({ photo, title, date, message }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={
            photo
              ? { uri: `${imageUrl}${photo}` }
              : require("../Assets/Images/dummyPhoto.png")
          }
          style={styles.image}
        />
        <View style={{ marginLeft: moderateScale(10, 0.3) }}>
          <CustomText
            noOfLines={2}
            style={[
              Constants.h4,
              {
                width: windowWidth * 0.5,
                color: Color.black,
                fontWeight: "bold",
              },
            ]}
          >
            {title}
          </CustomText>
          <CustomText noOfLines={1} style={[Constants.h5]}>
            {date}
          </CustomText>
        </View>
      </View>
      <CustomText
        numberOfLines={4}
        style={[
          Constants.h3,
          {
            marginTop: moderateScale(10, 0.3),
            width: "90%",
            fontWeight: "400",
            color: Color.themeBlack,
            fontFamily: "PlusJakartaDisplay-Bold",
          },
        ]}
      >
        {message}
      </CustomText>
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.83,
    height: windowHeight * 0.3,
    marginTop: moderateScale(20, 0.3),
    marginRight: moderateScale(10, 0.3),
    borderWidth: 0.5,
    borderColor: Color.lightGrey,
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.3),
    paddingTop: moderateScale(20, 0.3),
    paddingHorizontal: moderateScale(15, 0.3),
    marginBottom: moderateScale(20, 0.3),
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
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,

    borderRadius: moderateScale((windowWidth * 0.1) / 2, 0.3),
  },
});

export default ReviewCard;
