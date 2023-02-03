import React from "react";
import { Text } from "react-native";
import Color from "../Assets/Utilities/Color";

const CustomText = (props) => {
  const { children, numberOfLines, style, isBold, onPress } = props;
  return (
    <Text
      onPress={onPress}
      style={[
        {
          textTransform: "capitalize",
          // textTransform: "capitalize",
          color: Color.black,
        },
        style,
        { fontFamily: "Montserrat-Regular" },
        isBold && {
          fontFamily: "Montserrat-Bold",
          fontWeight: "bold",
        },
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export default CustomText;
