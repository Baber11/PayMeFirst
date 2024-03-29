import { View, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import CustomText from "./CustomText";
import Constants from "../Assets/Utilities/Constants";
import Color from "../Assets/Utilities/Color";
import TextInputWithTitle from "./TextInputWithTitle";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Icon } from "native-base";
import { TextInput } from "react-native-gesture-handler";
import { windowHeight, windowWidth } from "../Utillity/utils";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const SearchContainer = ({ width, text, input, onPress, data, setData , style , places , inputStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View
        style={[
          styles.container,
          width && { width: width },
          input && { padding: 0 },
        style && style
        ]}
      >
        {text && (
          <>
            <CustomText
              style={[
                Constants.h4,
                { color: Color.black, lineHeight: moderateScale(20, 0.3) },
              ]}
            >
              {"Where to? \n"}
              <CustomText style={[Constants.h5]}>Anytime anyWhere</CustomText>
            </CustomText>
            <Icon
              name="search"
              as={FontAwesome}
              size={moderateScale(20)}
              style={{ alignSelf: "center" }}
              color={Color.themeColor}
            />
          </>
        )}
        {places && (
          <GooglePlacesAutocomplete
            placeholder="Enter location"
            fetchDetails={true}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              let lat = details?.geometry?.location?.lat;
              let lng = details?.geometry?.location?.lng;
              console.log(lat, lng);
              setData({ latitute: lat, longitute: lng });
            }}
            query={{
              key: "AIzaSyDa3hGQ1LsGw7cyjCwCKx6rxU62g6vt0b8",
              language: "en",
            }}
            />
            )}
           
           {input && (

             <TextInput
             placeholder="Search"
             placeholderTextColor={Color.themeLightGray}
            numberOfLines={1}
            value={data}
            onChangeText={(text) => {
              setData(text);
            }}
            style={[{
            
              width: windowWidth * 0.6,
              // height : windowHeight * 0.02,
              // fontSize: moderateScale(15, 0.3),
              color: Color.black,
            },
          inputStyle && inputStyle
          
          ]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    // flexGrow: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(10, 0.3),
    borderWidth: 0.5,
    borderColor: Color.lightGrey,
    backgroundColor: Color.white,
    borderRadius: moderateScale(5, 0.3),
    paddingVertical: moderateScale(8, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default SearchContainer;
