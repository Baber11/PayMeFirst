import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import Color from "../Assets/Utilities/Color";
import { windowHeight, windowWidth } from "../Utillity/utils";
import CustomText from "./CustomText";
import CustomImage from "./CustomImage";
import { Icon } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import { imageUrl } from "../Config";
import LinearGradient from "react-native-linear-gradient";

const Chatcard = ({
  image,
  name,
  lastMessage,
  time,
  unread,
  count,
  onPress,
  item,
  id,
}) => {
  {
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        activeBackgroundTintColor: "red",
        // backgroundColor: "red",
        paddingLeft: moderateScale(30, 0.3),
      }}
    >
      <View style={[styles.chatcard]}>
        <CustomImage
          source={
            image
              ? { uri: `${imageUrl}${image}` }
              : require("../Assets/Images/defualtProfile.png")
          }
          // source={image}
          style={styles.image}
        />
        <View
          style={{
            marginHorizontal: moderateScale(15, 0.3),
          }}
        >
          <View
            style={{
              width: windowWidth * 0.7,
              flexDirection: "row",
              justifyContent: "space-between",

              // backgroundColor: "red",
            }}
          >
            <CustomText style={styles.subHeading}>
              {name ? name : "Dimebag Darrel"}
            </CustomText>
            <CustomText
              style={[
                styles.text,
                {
                  textTransform: "uppercase",
                },
              ]}
            >
              {time ? time : "02:14 PM"}
            </CustomText>
          </View>
          <CustomText
            numberOfLines={2}
            style={[
              styles.text,
              {
                marginTop: moderateScale(5, 0.3),
                // backgroundColor: "red",
                width: windowWidth * 0.6,
              },
            ]}
          >
            {lastMessage ? lastMessage : "no last message"}
          </CustomText>
        </View>

        {count > 0 && (
          <LinearGradient colors={Color.splashBGColor} style={styles.unRead}>
            <CustomText isBold style={{ color: Color.white }}>
              {count ? count : 0}
            </CustomText>
          </LinearGradient>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  headingText: {
    fontSize: moderateScale(35, 0.3),
    // marginLeft: moderateScale(10, 0.3),
    color: Color.black,
  },
  image: {
    height: moderateScale(50, 0.3),
    width: moderateScale(50, 0.3),
    borderRadius: moderateScale(25, 0.3),
  },
  unRead: {
    position: "absolute",
    // bottom: moderateScale(20, 0.3),
    top: moderateScale(25, 0.3),
    right: moderateScale(25, 0.3),
    width: moderateScale(17, 0.3),
    height: moderateScale(17, 0.3),
    borderRadius: moderateScale(8.5, 0.3),
    backgroundColor: Color.themeColor1,
    alignItems: "center",
    justifyContent: "center",
  },
  footerContainer: {
    flex: 1,
    backgroundColor: Color.white,
    width: windowWidth,
    // overflow: "hidden",
    // minHeight: windowHeight * 0.7,
    marginTop: moderateScale(-60, 0.3),
    borderTopRightRadius: moderateScale(40, 0.3),
    borderTopLeftRadius: moderateScale(40, 0.3),
    shadowColor: Color.splashBGLeft,
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 30,
    borderTopColor: Color.splashBGLeft,
    // paddingTop: moderateScale(40, 0.3),
    overflow: "hidden",
    paddingTop: moderateScale(40, 0.3),
    // paddingHorizontal: moderateScale(10, 0.3),
  },
  subHeading: {
    fontSize: moderateScale(16, 0.3),
    color: Color.themeBlack,
    fontWeight: "bold",
    textTransform: "capitalize",
    // marginLeft: moderateScale(10, 0.3),
  },
  chatcard: {
    // backgroundColor: "red",
    width: windowWidth * 0.9,
    height: windowHeight * 0.1,
    // borderWidth: 1,
    borderColor: Color.veryLightGray,
    flexDirection: "row",
    // paddingTop: moderateScale(10, 0.3),
    // paddingLeft: moderateScale(10, 0.3),
    marginBottom: moderateScale(20, 0.3),
  },
  text: {
    color: Color.themeLightGray,
    fontSize: moderateScale(13, 0.3),
    marginRight: moderateScale(10, 0.3),
  },
});

export default Chatcard;
