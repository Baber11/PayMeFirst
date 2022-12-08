import { View, Text } from "react-native";
import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Color from "../Assets/Utilities/Color";
import { windowHeight, windowWidth } from "../Utillity/utils";
import { moderateScale } from "react-native-size-matters";

const ChatCardSkeleton = ({ width, height }) => {
  return (
    <View
      style={{
        width: width ? width : windowWidth * 0.9,
        // height: height ? height : windowHeight * 0.12,

        borderBottomWidth: 0.5,
        borderColor: Color.themeLightGray,
     
        borderRadius: moderateScale(5, 0.3),
        paddingVertical: moderateScale(10, 0.3),
        paddingHorizontal: moderateScale(5, 0.3),
        flexDirection: "row",
        justifyContent: "space-between",
        marginright: moderateScale(5, 0.3),
        marginLeft: moderateScale(20, 0.3),
        marginBottom: moderateScale(10, 0.3),
      }}
    >
    
      <SkeletonPlaceholder>
        <View
          style={{
            width: windowWidth * 0.1,
            height: windowHeight * 0.02,
            borderRadius: moderateScale(5, 0.3),
            marginTop: moderateScale(20, 0.3),
            marginLeft: moderateScale(25, 0.3),
          }}
        ></View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        <View
          style={{
            width: windowWidth * 0.3,
            height: windowHeight * 0.02,
            borderRadius: moderateScale(5, 0.3),
            marginTop: moderateScale(20, 0.3),
            marginLeft: moderateScale(25, 0.3),
          }}
        ></View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        <View
          style={{
            width: windowWidth * 0.1,
            height: windowHeight * 0.02,
            borderRadius: moderateScale(5, 0.3),
            marginTop: moderateScale(20, 0.3),
            marginLeft: moderateScale(25, 0.3),
          }}
        ></View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default ChatCardSkeleton;
