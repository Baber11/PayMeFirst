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
        height: height ? height : windowHeight * 0.12,

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
            marginTop: moderateScale(10, 0.3),
            width: windowHeight * 0.08,
            height: windowHeight * 0.08,
            borderRadius: moderateScale((windowHeight * 0.08) / 2, 0.3),
          }}
        ></View>
      </SkeletonPlaceholder>
      <View
        style={{
          marginLeft: moderateScale(15, 0.3),
          marginTop: moderateScale(20, 0.3),
        }}
      >
        <SkeletonPlaceholder>
          <View
            style={{
              width: windowWidth * 0.4,
              height: windowHeight * 0.02,
              borderRadius: moderateScale(5, 0.3),
            }}
          ></View>
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View
            style={{
              width: windowWidth * 0.4,
              height: windowHeight * 0.02,
              borderRadius: moderateScale(5, 0.3),
              marginTop: moderateScale(10, 0.3),
            }}
          ></View>
        </SkeletonPlaceholder>
      </View>
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
