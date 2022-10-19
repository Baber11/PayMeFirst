import { View, Text } from "react-native";
import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Color from "../Assets/Utilities/Color";
import { windowHeight, windowWidth } from "../Utillity/utils";
import { moderateScale } from "react-native-size-matters";

const ServiceProviderSkeleton = () => {
  return (
    <View
      style={{
        width: windowWidth * 0.3,
        height: windowHeight * 0.1,
        marginTop: moderateScale(20, 0.3),
        marginRight: moderateScale(15, 0.3),

        backgroundColor: Color.white,
        borderRadius: moderateScale(5, 0.3),
        paddingTop: moderateScale(10, 0.3),
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
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: windowWidth * 0.15,
              height: windowHeight * 0.07,
              borderRadius: moderateScale(5, 0.3),
            }}
          ></View>

          <View
            style={{
              width: windowWidth * 0.1,
              marginTop: "50%",
              marginLeft: moderateScale(5, 0.3),
              height: windowHeight * 0.01,
              borderRadius: moderateScale(5, 0.3),
            }}
          ></View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default ServiceProviderSkeleton;
