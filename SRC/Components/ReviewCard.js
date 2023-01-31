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
import moment from "moment";
import StarRating from "react-native-star-rating";

const ReviewCard = ({ item ,photo, title, date, message }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={item?.image}
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
            {item?.name}
          </CustomText>
          <StarRating
        disabled={true}
        maxStars={5}
        rating={item?.rating}
        starSize={moderateScale(12,0.3)}
        halfStarColor={'yellow'}
        fullStarColor={'yellow'}
        starStyle={{
        }}
        containerStyle={{
          width : moderateScale(55,0.3)
        }}
        // selectedStar={(rating) => this.onStarRatingPress(rating)}
      />
        
        </View>
      </View>
      <CustomText
        numberOfLines={4}
        style={[
          {
            marginTop: moderateScale(10, 0.3),
            width: "80%",
            
            color: Color.themeBlack,
          },
        ]}
      >
        {item?.description}
      </CustomText>
      <CustomText noOfLines={1} style={{
        marginTop : moderateScale(10,0.3),
        // position : 'absolute',
        // right : 0,
        // bottom : 0
        width : '100%',
        textAlign : 'right'
      }}>
            {moment().format('ll')}
          </CustomText>
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.87,
    // height: windowHeight * 0.3,
    // marginTop: moderateScale(20, 0.3),
    marginRight: moderateScale(10, 0.3),
    borderBottomWidth: 1,
    borderColor: Color.lightGrey,
    // backgroundColor: Color.green,
    borderRadius: moderateScale(10, 0.3),
    paddingTop: moderateScale(20, 0.3),
    // paddingHorizontal: moderateScale(15, 0.3),
    marginBottom: moderateScale(20, 0.3),
   
  },
  image: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,

    borderRadius: moderateScale((windowWidth * 0.1) / 2, 0.3),
  },
});

export default ReviewCard;
