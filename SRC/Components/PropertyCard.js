import React, { useState } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
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
import CustomImage from "./CustomImage";
import { imageUrl } from "../Config";

const PropertyCard = ({
  item,
  height,
  width,
  user,
  onPress,
  fromReservation,
  selectedPerson,
}) => {
  // console.log(
  //   "🚀 ~ file: PropertyCard.js ~ line 28 ~ fromReservation",
  //   fromReservation
  // );
  // console.log(
  //   "🚀 ~ file: PropertyCard.js ~ line 28 ~ selectedPerson",
  //   selectedPerson
  // );
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View
        style={[
          styles.container,
          height && { height: height },
          width && { width: width },
        ]}
      >
        <Image
          source={
            fromReservation
              ? selectedPerson == "Other"
                ? { uri: `${imageUrl}${item?.other?.portfolio?.images[0]}` }
                : { uri: `${imageUrl}${item?.listing?.images[0]}` }
              : item?.role == "other"
              ? { uri: `${imageUrl}${item?.portfolio?.images[0]}` }
              : { uri: `${imageUrl}${item?.images[0]}` }
          }
          style={styles.image}
        />

        {((fromReservation && item?.other?.photo) || item?.photo) && (
          <View
            style={{
              width: windowWidth * 0.12,
              // backgroundColor: "red",
              height: windowWidth * 0.12,
              left: moderateScale(15, 0.3),
              top: "38%",
              borderRadius: moderateScale((windowWidth * 0.12) / 2, 0.3),

              position: "absolute",
              backgroundColor: "#FFFF",
            }}
          >
            <CustomImage
              source={
                fromReservation
                  ? { uri: `${imageUrl}${item?.other?.photo}` }
                  : { uri: `${imageUrl}${item?.photo}` }
              }
              style={{
                width: windowWidth * 0.12,
                height: windowWidth * 0.12,
                borderRadius: moderateScale((windowWidth * 0.12) / 2, 0.3),
              }}
            />
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: moderateScale(10, 0.3),
          }}
        >
          <CustomText
            numberOfLines={1}
            style={[
              Constants.h4,
              { color: Color.black, fontWeight: "bold", width: "85%" },
            ]}
          >
            {fromReservation
              ? selectedPerson == "Other"
                ? `${item?.other?.firstName}`
                : `${item?.listing?.title}`
              : item?.role == "other"
              ? item?.displayName
              : item?.title}
          </CustomText>
          <View
            style={{ flexDirection: "row", marginTop: moderateScale(3, 0.3) }}
          >
            <CustomText style={[Constants.h5]}>
              {fromReservation
                ? selectedPerson == "Other"
                  ? `${item?.other?.ratingsAverage}`
                  : `${item?.listing?.ratingsAverage}`
                : item?.ratingsAverage}
            </CustomText>
            <Icon
              name="star"
              as={FontAwesome}
              size={moderateScale(10, 0.3)}
              color={Color.themeColor1}
              style={{
                marginTop: moderateScale(2, 0.3),
                marginLeft: moderateScale(2, 0.3),
              }}
            />
          </View>
        </View>
        <CustomText numberOfLines={2} style={[Constants.h5, { width: "80%" }]}>
          {fromReservation
            ? selectedPerson == "Other"
              ? `${item?.other?.address}`
              : `${item?.listing?.address}`
            : item?.address}
        </CustomText>
        <CustomText
          numberOfLines={2}
          style={[
            Constants.h5,
            { marginTop: moderateScale(5, 0.3), width: "90%" },
          ]}
        >
          {fromReservation
            ? selectedPerson == "Other"
              ? `${item?.other?.description}`
              : `${item?.listing?.description}`
            : item?.description}
        </CustomText>
        {(selectedPerson != "Other" || item?.role != "other") && (
          <View
            style={{
              flexDirection: "row",

              marginTop: moderateScale(5, 0.3),
            }}
          >
            <CustomText
              style={[
                Constants.h4,
                {
                  color: Color.themeColor,
                  fontWeight: "bold",
                },
              ]}
            >
              ${item?.price}
            </CustomText>
            <Icon
              name="arrow-right"
              as={FontAwesome}
              size={moderateScale(11, 0.3)}
              color={Color.themeColor}
              style={{
                marginTop: moderateScale(5, 0.3),
                marginLeft: moderateScale(3, 0.3),
              }}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.35,
    marginVertical: moderateScale(20, 0.3),
    marginRight: moderateScale(15, 0.3),
    borderWidth: 0.5,
    borderColor: Color.lightGrey,
    backgroundColor: Color.white,
    borderRadius: moderateScale(5, 0.3),
    paddingVertical: moderateScale(5, 0.3),
    paddingHorizontal: moderateScale(5, 0.3),

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
    width: "100%",
    height: "50%",
    alignSelf: "center",
    borderRadius: moderateScale(5, 0.3),
  },
});
export default PropertyCard;
