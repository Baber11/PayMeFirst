import React, { useState, useEffect } from "react";
import { Dimensions, View } from "react-native";
import { scale, moderateScale, ScaledSheet } from "react-native-size-matters";
import SelectDropdown from "react-native-select-dropdown";
import { Icon } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import Color from "../Assets/Utilities/Color";
import Entypo from "react-native-vector-icons/Entypo";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const DropDownSingleSelect = (props) => {
  const {
    array,
    item,
    setItem,
    placeholder,
    buttonTextAfterSelection,
    rowTextForSelection,
    iconName,
    iconType,
    disabled,
    width: ContainerWidth,
  } = props;
  const diff = width * 0.9 - width * 0.75;
  const InnerWidth = ContainerWidth - diff;
  return (
    <View
      style={[
        styles.dropDownContainer,
        disabled && { backgroundColor: `${Color.veryLightGray}90` },
        ContainerWidth && {
          width: ContainerWidth,
        },
      ]}
    >
      {iconName && (
        <Icon
          name={iconName}
          as={iconType}
          style={{
            color: Color.themePurpleLevel4,
            marginLeft: moderateScale(5, 0.3),
          }}
          size={moderateScale(18, 0.7)}
        />
      )}

      <SelectDropdown
        data={array}
        defaultValue={item}
        buttonStyle={[
          styles.dropDownBtn,
          iconName && {
            width: width * 0.8,
          },
          ContainerWidth && {
            width: ContainerWidth,
          },
        ]}
        buttonTextStyle={[
          styles.dropDownBtnText,
          item !== "" && { color: Color.black },
          iconName && {
            width: width * 0.7,
          },
          ContainerWidth && {
            width: InnerWidth,
          },
        ]}
        rowTextStyle={[
          styles.dropDownRowText,
          iconName && {
            width: width * 0.7,
          },
          ContainerWidth && {
            width: InnerWidth,
          },
        ]}
        rowStyle={[styles.dropDownRow]}
        dropdownStyle={[
          {
            width: width * 0.9,
            margin: 0,
            borderRadius: 10,
            marginTop: moderateScale(2, 0.3),
          },
          ContainerWidth && {
            width: ContainerWidth,
          },
        ]}
        defaultButtonText={placeholder}
        renderDropdownIcon={() => {
          return (
            <Icon name="chevron-small-down" as={Entypo} style={styles.icon} />
          );
        }}
        // renderDropdownIcon={() => {
        //   return (
        //     <Icon
        //       name={'caretdown'}
        //       as={AntDesign}
        //       style={{
        // fontSize: moderateScale(20, 0.6),
        // color: Color.gray,
        //       }}
        //     />
        //   );
        // }}
        onSelect={(selectedItem, index) => {
          setItem(selectedItem);
        }}
        buttonTextAfterSelection={buttonTextAfterSelection}
        rowTextForSelection={rowTextForSelection}
        disabled={disabled}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  dropDownContainer: {
    width: width * 0.9,
    color: "#ebd6ff",
    borderWidth: scale(1),
    borderColor: "lightgrey",
    flexDirection: "row",
    marginTop: height * 0.02,
    borderRadius: scale(9),
    justifyContent: "center",
    borderWidth: 1,
    alignItems: "center",
    backgroundColor: "#EBEBEB",
    alignSelf: "center",
  },

  dropDownBtn: {
    width: width * 0.9,
    backgroundColor: "transparent",
    height: height * 0.065,
  },
  dropDownBtnText: {
    width: width * 0.75,
    fontSize: moderateScale(18, 0.3),
    // color: Color.lightGrey,
    textAlign: "left",
    textTransform: "capitalize",
  },
  dropDownRow: {
    backgroundColor: Color.white,
  },
  dropDownRowText: {
    width: width * 0.75,
    fontSize: moderateScale(16, 0.3),
    color: "black",
    textAlign: "left",
    textTransform: "capitalize",
    marginLeft: moderateScale(15, 0.3),
  },
  icon: {
    // fontSize: moderateScale(20, 0.6),
    color: Color.gray,
  },
});

export default DropDownSingleSelect;
