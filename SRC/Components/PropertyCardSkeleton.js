import { View, Text } from "react-native";
import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Color from "../Assets/Utilities/Color";
import { windowHeight, windowWidth } from "../Utillity/utils";
import { moderateScale } from "react-native-size-matters";

const PropertyCardSkeleton = ({ width, height }) => {
  return (
    <View
      style={{
        backgroundColor: "red",
        width: width ? width : windowWidth * 0.5,
        height: height ? height : windowHeight * 0.36,
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
      }}
    >
      <SkeletonPlaceholder>
        <View
          style={{
            width: "100%",
            height: windowHeight * 0.18,
            alignSelf: "center",
            borderRadius: moderateScale(5, 0.3),
          }}
        ></View>
      </SkeletonPlaceholder>
      <View style={{ marginTop: moderateScale(10, 0.3) }}>
        <SkeletonPlaceholder>
          <View
            style={{
              width: "100%",
              height: windowHeight * 0.01,
              alignSelf: "center",
              borderRadius: moderateScale(5, 0.3),
            }}
          ></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{ marginTop: moderateScale(10, 0.3) }}>
        <SkeletonPlaceholder>
          <View
            style={{
              width: "30%",
              height: windowHeight * 0.01,
              borderRadius: moderateScale(5, 0.3),
            }}
          ></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{ marginTop: moderateScale(20, 0.3) }}>
        <SkeletonPlaceholder>
          <View
            style={{
              width: "100%",
              height: windowHeight * 0.03,
              alignSelf: "center",
              borderRadius: moderateScale(5, 0.3),
            }}
          ></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{ marginTop: moderateScale(10, 0.3) }}>
        <SkeletonPlaceholder>
          <View
            style={{
              width: "30%",
              height: windowHeight * 0.02,
              borderRadius: moderateScale(5, 0.3),
            }}
          ></View>
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

export default PropertyCardSkeleton;
