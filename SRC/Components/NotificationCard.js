import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import Color from "../Assets/Utilities/Color";
import { windowHeight, windowWidth } from "../Utillity/utils";
import CustomText from "./CustomText";
import CustomImage from "./CustomImage";
import { Icon } from "native-base";
import Entypo from "react-native-vector-icons/Entypo";
import { imageUrl } from "../Config";

const NotificationCard = ({ image, text, name, time, unread, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={[
          styles.NotificationCard,

          unread && {
            borderWidth: 1,
            borderColor: Color.green,
          },
        ]}
      >
        <View style={styles.image}>
          <CustomImage
            source={image}
            style={styles.imageBg}
          />
        </View>
        <View style={{ marginLeft: moderateScale(10, 0.3) }}>
          <View
            style={{
              width: windowWidth * 0.7,
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: moderateScale(10, 0.3),
              marginHorizontal: moderateScale(15, 0.3),
            }}
          >
            <CustomText style={styles.subHeading}>
              {name ? name : "Dimebag Darrel"}
            </CustomText>
            <CustomText style={styles.time}>
              {time ? time : "- Just Now"}
            </CustomText>
          </View>
          <CustomText
            numberOfLines={2}
            style={{
              marginLeft: moderateScale(15, 0.3),
              width: windowWidth * 0.7,
              color: Color.themeBlack,
              //   backgroundColor: "red",
            }}
          >
            {text ? text : "your notification msg here"}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  time: {
    position: "absolute",
    color: Color.themeLightGray,
    right: moderateScale(0, 0.3),
    top: moderateScale(5, 0.3),
    marginLeft: moderateScale(5, 0.3),
  },
  imageBg: {
    height: moderateScale(70, 0.3),
    width: moderateScale(70, 0.3),
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: moderateScale(35, 0.3),
    borderColor: Color.green,
    borderWidth: 2,
  },
  image: {
    height: moderateScale(63, 0.3),
    width: moderateScale(63, 0.3),
    borderRadius: moderateScale(32, 0.3),
  },
  unRead: {
    position: "absolute",
    bottom: moderateScale(30, 0.3),
    right: moderateScale(25, 0.3),
    // top: moderateScale(59, 0.3),
    marginLeft: moderateScale(5, 0.3),
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    borderRadius: moderateScale(10, 0.3),
    backgroundColor: Color.green,
    alignItems: "center",
    justifyContent: "center",
  },
  subHeading: {
    fontSize: moderateScale(16, 0.3),
    color: Color.themeBlack,
    fontWeight: "bold",
    textTransform: "capitalize",
    width: windowWidth * 0.575,
  },
  NotificationCard: {
    backgroundColor: Color.white,
    // width: windowWidth * 0.9,
    height: windowHeight * 0.12,
    marginVertical: 4,
    flexDirection: "row",
    paddingTop: moderateScale(10, 0.3),
    paddingLeft: moderateScale(10, 0.3),
    marginHorizontal: moderateScale(6, 0.3),
    borderRadius: moderateScale(10, 0.3),
    borderWidth: 1,
    borderColor: Color.themeLightGray,
  },
});

export default NotificationCard;
