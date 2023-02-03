import {
  TouchableOpacity,
  Text,
  Platform,
  ToastAndroid,
  ActivityIndicator,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Color from "../Assets/Utilities/Color";
import CustomText from "../Components/CustomText";
import { apiHeader, windowHeight, windowWidth } from "../Utillity/utils";
import Constants from "../Assets/Utilities/Constants";
import { FlatList, Icon } from "native-base";
import IconWithName from "../Components/IconWithName";
import TextInputWithTitle from "./TextInputWithTitle";
import moment from "moment";
import CustomImage from "./CustomImage";
import { useDispatch, useSelector } from "react-redux";
import navigationService from "../navigationService";
import { Get, Post } from "../Axios/AxiosInterceptorFunction";
import { imageUrl } from "../Config";
import {
  setCategoriesProperties,
  setCategoryProperties,
} from "../Store/slices/common";

const CategoryPropertyModal = ({
  modalVisible,
  setModalVisible,
  detail,
  dates,
  type,
  onPress,
  data,
  setData,
}) => {
  const token = useSelector((state) => state.authReducer.token);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [guests, setGuests] = useState(0);
  const [pets, setPets] = useState(0);
  const [total, setTotal] = useState(0);
  const [listingPageNumber, setListingPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const category = useSelector(
    (state) => state.commonReducer.categoryProperties
  );

  return (
    <Modal
      isVisible={modalVisible}
      hasBackdrop={true}
      swipeDirection="up"
      onBackdropPress={() => {
        setModalVisible(false);
      }}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <View style={styles.container}>
        <FlatList
          data={category}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: moderateScale(10, 0.3),
                  paddingHorizontal: moderateScale(10, 0.3),
                  borderBottomColor: Color.lightGrey,
                  borderBottomWidth: 1,
                }}
                onPress={() => {
                  setData(item?._id), setModalVisible(false);
                }}
              >
                <Image
                  source={
                    item?.icon
                      ? { uri: `${imageUrl}${item?.iconForApp}` }
                      : require("../Assets/Images/dummyPhoto.png")
                  }
                  style={{
                    resizeMode: "contain",
                    width: moderateScale(50, 0.3),
                    height: moderateScale(30, 0.3),
                    // borderRadius: moderateScale(25, 0.3),
                    marginRight: moderateScale(15, 0.3),
                  }}
                />
                <CustomText
                  style={{
                    fontWeight: "bold",
                    fontSize: moderateScale(15, 0.3),
                  }}
                >
                  {item?.name}
                </CustomText>
              </TouchableOpacity>
            );
          }}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  backgroundColor: Color.themeColor,
                  borderTopLeftRadius: moderateScale(10, 0.3),
                  borderTopRightRadius: moderateScale(10, 0.3),
                }}
              >
                <CustomText
                  isBold
                  style={{
                    alignSelf: "center",
                    margin: moderateScale(10, 0.3),
                    marginBottom: moderateScale(20, 0.3),

                    fontSize: moderateScale(20, 0.3),
                    color: Color.white,
                  }}
                >
                  Properties Categories
                </CustomText>
              </View>
            );
          }}
        />
      </View>
    </Modal>
  );
};
const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.83,
    // height: windowHeight * 0.6,
    // marginTop: moderateScale(20, 0.3),
    // borderWidth: 1,
    borderColor: Color.lightGrey,
    backgroundColor: Color.white,
    borderRadius: moderateScale(15, 0.3),
    // paddingVertical: moderateScale(10, 0.3),
    paddingBottom: moderateScale(15, 0.3),
    // marginBottom: moderateScale(20, 0.3),
  },
  image: {
    width: 20,
    height: 20,
    marginVertical: moderateScale(5, 0.3),
  },
  totalContainer: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: moderateScale(17, 0.3),

    borderColor: Color.themeLightGray,
    justifyContent: "space-between",
  },
  button: {
    marginTop: moderateScale(20, 0.3),
    height: windowHeight * 0.07,
    width: "100%",
    borderRadius: moderateScale(7, 0.3),
    backgroundColor: Color.themeColor,

    alignItems: "center",
    justifyContent: "center",
  },
  smallContainer: {
    marginTop: moderateScale(20, 0.3),
    width: "100%",
    // height: windowWidth * 0.3,
    borderRadius: moderateScale(20, 0.3),
    borderBottomWidth: 1,
    borderColor: Color.themeLightGray,
    // backgroundColor: "red",
  },
});
export default CategoryPropertyModal;
