import {
  View,
  Text,
  Platform,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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
import { useSelector } from "react-redux";
import navigationService from "../navigationService";
import { Post } from "../Axios/AxiosInterceptorFunction";
import DropDownSingleSelect from "./DropDownSingleSelect";
import { duration } from "moment";

const DetailModal = ({
  modalVisible,
  setModalVisible,
  detail,
  dates,
  type,
  provider,
}) => {
  const token = useSelector((state) => state.authReducer.token);
  const user = useSelector((state) => state.commonReducer.userData);
  // console.log("🚀 ~ file: DetailModal.js ~ line 39 ~ user", user);
  const [value, setValue] = useState("");
  // console.log("🚀 ~ file: DetailModal.js ~ line 39 ~ setValue", value);
  const [description, setDescription] = useState("");
  const [guests, setGuests] = useState(0);
  const [pets, setPets] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoadingReserve, setIsLoadingReserve] = useState(false);
  const [servicesArray, setServicesArray] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedServiceData, setSelectedServiceData] = useState();
  const [reportListing, setReportLoading] = useState();
  const [dateRange, setDateRange] = useState([]);
  const [fromatedDateRange, setFormatedDateRange] = useState([]);

  console.log(
    "🚀 ~ file: DetailModal.js ~ line 52 ~ dateRange",
    dateRange,
    dates,
    fromatedDateRange
  );
  // console.log("🚀 ~ file: DetailModal.js ~ line 43 ~ selected", detail);

  useEffect(() => {
    setSelectedServiceData(
      detail?.portfolio?.serviceType.find(
        (x) => x?.serviceId?.name == selectedService
      )
    );
    setGuests(0);
  }, [selectedService]);
  useEffect(() => {
    console.log(provider, "hereeeeeeeeeeeeeeeeeeeeeee");
    provider == true &&
      setServicesArray(
        detail?.portfolio?.serviceType.map((x) => x?.serviceId?.name)
      );
  }, [provider]);

  const GetDaysBetweenDates = function (startDate, endDate) {
    var now = startDate.clone(),
      dates = [];

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format());
      now.add(1, "days");
    }
    return dates;
  };
  useEffect(() => {
    Object.keys(dates).length > 1 &&
      setDateRange(GetDaysBetweenDates(moment(dates[0]), moment(dates[1])));
  }, [dates]);
  useEffect(() => {
    setFormatedDateRange(
      dateRange.map((item) => moment(item).format("DD MMM YYYY"))
    );
  }, [dateRange]);

  const ReportListing = async () => {
    const url = `report`;
    const bodyListing = {
      user: user?._id,
      reason: value == "Other" ? description : value,
      listing: detail?._id,
      reportOn: "listing",
    };
    const bodyOther = {
      user: user?._id,
      reason: value == "Other" ? description : value,
      other: detail?._id,
      reportOn: "portfolio",
    };
    if (value == "") {
      return Platform.OS == "android"
        ? ToastAndroid.show("Please Select any option", ToastAndroid.SHORT)
        : alert("Please Select any option");
    }
    if (value == "Other" && description == "") {
      return Platform.OS == "android"
        ? ToastAndroid.show("Please Fill description", ToastAndroid.SHORT)
        : alert("Please Fill description");
    }
    setReportLoading(true);

    const response = await Post(
      url,
      provider ? bodyOther : bodyListing,
      apiHeader(token)
    );
    setReportLoading(false);

    if (response != undefined) {
      Platform.OS == "android"
        ? ToastAndroid.show(
            "your appeal has sent sucessfully",
            ToastAndroid.SHORT
          )
        : alert("your appeal has sent sucessfully");
      navigationService.navigate("HomeScreen");
    }
  };

  const Reservation = async () => {
    const url = "booking";
    const otherBookingUrl = "other-booking";
    const body = {
      listing: detail?._id,
      startDate: moment(dates[0]).format(),
      endDate: moment(dates[1]).format(),
      dateRange: fromatedDateRange,
      noOfGuests: guests,
      noOfPets: pets,
    };
    const otherBody = {
      otherId: detail?._id,
      service: selectedServiceData?._id,
      price: parseInt(selectedServiceData?.price * difference),
      dateRange: fromatedDateRange,
      noOfPersons: guests,
      startDate: moment(dates[0]).format(),
      endDate: moment(dates[1]).format(),
    };
    provider
      ? console.log("otherBody=>", otherBody, "other url=>", otherBookingUrl)
      : console.log(
          "body=>",
          body,

          "url =>",
          url
        );
    setIsLoadingReserve(true);
    const response = await Post(
      provider ? otherBookingUrl : url,
      provider ? otherBody : body,
      apiHeader(token)
    );
    setIsLoadingReserve(false);
    if (response != undefined) {
      setModalVisible(false);
      Platform.OS == "android"
        ? ToastAndroid.show("Reserve Successfully", ToastAndroid.SHORT)
        : alert("Reserve Successfully");
      navigationService.navigate("HomeScreen");
    }
  };
  // console.log("here is the date", dates);

  const difference = dates
    ? moment.duration(moment(dates[1]).diff(moment(dates[0]))).asDays()
    : 0;
  // console.log("days========>", difference);

  const reportData = [
    { data: "It’s inaccurate or incorrect" },
    { data: "It’s not a real place to stay" },
    { data: "It’s a scam" },
    { data: "Other" },
  ];
  const platFormData = [
    {
      image: require("../Assets/Images/copy.png"),
      name: "Copy Link",
    },
    {
      image: require("../Assets/Images/gmail.png"),
      name: "Gmail",
    },
    {
      image: require("../Assets/Images/message.png"),
      name: "message",
    },
    {
      image: require("../Assets/Images/whatsapp.png"),
      name: "whatsapp",
    },
    {
      image: require("../Assets/Images/facebook.png"),
      name: "Facebook",
    },
    {
      image: require("../Assets/Images/messenger.png"),
      name: "messenger",
    },
    {
      image: require("../Assets/Images/snapchat.png"),
      name: "snapchat",
    },
    {
      image: require("../Assets/Images/twitter.png"),
      name: "twitter",
    },
    {
      image: require("../Assets/Images/more.png"),
      name: "more options",
    },
  ];
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
        {type == "reserve" && (
          <View>
            <CustomText
              style={
                (Constants.h1,
                {
                  fontSize: moderateScale(30, 0.3),
                  // fontWeight: "bold",
                  color: Color.black,
                })
              }
            >
              $
              {provider
                ? selectedServiceData
                  ? selectedServiceData?.price
                  : detail?.portfolio?.price
                : detail?.price}{" "}
              /
              {
                <CustomText
                  style={
                    (Constants.h3,
                    {
                      fontSize: moderateScale(15, 0.3),
                      color: Color.themeColor1,
                    })
                  }
                >
                  night
                </CustomText>
              }
            </CustomText>
            <View style={styles.smallContainer}>
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: moderateScale(10, 0.3),
                  // paddingHorizontal: moderateScale(25, 0.3),
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  marginHorizontal: moderateScale(20, 0.3),
                  // width: "100%",
                  borderColor: Color.themeLightGray,
                }}
              >
                <View>
                  <CustomText style={Constants.h5}>Check-In</CustomText>
                  <CustomText style={(Constants.h4, { color: Color.black })}>
                    {moment(dates[0]).format("MMM Do YY")}
                  </CustomText>
                </View>
                <View>
                  <CustomText style={Constants.h5}>Check-out</CustomText>
                  <CustomText style={(Constants.h4, { color: Color.black })}>
                    {moment(dates[1]).format("MMM Do YY")}
                  </CustomText>
                </View>
              </View>
              {provider && (
                <DropDownSingleSelect
                  array={servicesArray}
                  item={selectedService}
                  setItem={setSelectedService}
                  placeholder={"Select Service"}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  width={windowWidth * 0.7}
                />
              )}
              <CustomText
                style={[
                  Constants.h5,
                  {
                    marginLeft: moderateScale(20, 0.3),
                    marginTop: moderateScale(5, 0.3),
                  },
                ]}
              >
                Guests
              </CustomText>
              <View
                style={{
                  paddingVertical: moderateScale(5, 0.3),
                  paddingHorizontal: moderateScale(20, 0.3),
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CustomText style={[Constants.h4, { color: Color.black }]}>
                  {guests} Guests
                </CustomText>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: moderateScale(-5, 0.3),
                  }}
                >
                  <CustomImage
                    onPress={() => {
                      guests > 0 && setGuests(guests - 1);
                    }}
                    resizeMode={"contain"}
                    source={require("../Assets/Images/minus.png")}
                    style={[styles.image]}
                  />
                  <CustomText
                    style={[
                      Constants.h4,
                      {
                        color: Color.black,
                        marginBottom: moderateScale(10, 0.3),
                        marginTop: moderateScale(2, 0.3),
                        marginHorizontal: moderateScale(15, 0.3),
                      },
                    ]}
                  >
                    {guests}
                  </CustomText>
                  <CustomImage
                    onPress={() => {
                      provider == true
                        ? selectedServiceData?.noOfPersons > guests
                          ? setGuests(guests + 1)
                          : Platform.OS == "android"
                          ? ToastAndroid.show(
                              "Limit Exceeded",
                              ToastAndroid.SHORT
                            )
                          : alert("Limit Exceeded")
                        : detail?.noOfGuests > guests
                        ? setGuests(guests + 1)
                        : Platform.OS == "android"
                        ? ToastAndroid.show(
                            "Limit Exceeded",
                            ToastAndroid.SHORT
                          )
                        : alert("Limit Exceeded");
                    }}
                    resizeMode={"contain"}
                    source={require("../Assets/Images/plus.png")}
                    style={[styles.image]}
                  />
                </View>
              </View>
              {provider == undefined && (
                <>
                  <CustomText
                    style={[
                      Constants.h5,
                      {
                        marginLeft: moderateScale(20, 0.3),
                        marginTop: moderateScale(5, 0.3),
                      },
                    ]}
                  >
                    Pets
                  </CustomText>
                  <View
                    style={{
                      paddingVertical: moderateScale(5, 0.3),
                      paddingHorizontal: moderateScale(20, 0.3),
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <CustomText style={[Constants.h4, { color: Color.black }]}>
                      {pets} Pets
                    </CustomText>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: moderateScale(-5, 0.3),
                      }}
                    >
                      <CustomImage
                        onPress={() => {
                          pets > 0 && setPets(pets - 1);
                        }}
                        resizeMode={"contain"}
                        source={require("../Assets/Images/minus.png")}
                        style={[styles.image]}
                      />
                      <CustomText
                        style={[
                          Constants.h4,
                          {
                            color: Color.black,
                            marginBottom: moderateScale(10, 0.3),
                            marginTop: moderateScale(2, 0.3),
                            marginHorizontal: moderateScale(15, 0.3),
                          },
                        ]}
                      >
                        {pets}
                      </CustomText>
                      <CustomImage
                        onPress={() => {
                          detail?.Pets > pets
                            ? setPets(pets + 1)
                            : Platform.OS == "android"
                            ? ToastAndroid.show(
                                "Limit Exceeded",
                                ToastAndroid.SHORT
                              )
                            : alert("Limit Exceeded");
                        }}
                        resizeMode={"contain"}
                        source={require("../Assets/Images/plus.png")}
                        style={[styles.image]}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
            <View style={styles.button}>
              <CustomText
                style={[
                  Constants.h3,
                  { color: Color.white, fontWeight: "100" },
                ]}
                onPress={Reservation}
              >
                {isLoadingReserve ? (
                  <ActivityIndicator size={"small"} color={Color.white} />
                ) : (
                  "Reserve"
                )}
              </CustomText>
            </View>
            <CustomText
              style={[
                Constants.h6,
                { alignSelf: "center", marginTop: moderateScale(10, 0.3) },
              ]}
            >
              you won't be charged yet{" "}
            </CustomText>
            <View style={[styles.totalContainer, { borderBottomWidth: 0.5 }]}>
              <CustomText style={[Constants.h4]}>
                $
                {provider
                  ? selectedServiceData
                    ? selectedServiceData?.price
                    : detail?.portfolio?.price
                  : detail?.price}{" "}
                x {difference}
              </CustomText>
              <CustomText style={[Constants.h4]}>
                $
                {(provider
                  ? selectedServiceData
                    ? selectedServiceData?.price
                    : detail?.portfolio?.price
                  : detail?.price) * difference}
              </CustomText>
            </View>
            <View style={styles.totalContainer}>
              <CustomText style={[Constants.h4, { color: Color.black }]}>
                total before taxes
              </CustomText>
              <CustomText style={[Constants.h4, { color: Color.black }]}>
                $
                {(provider
                  ? selectedServiceData
                    ? selectedServiceData?.price
                    : detail?.portfolio?.price
                  : detail?.price) * difference}
              </CustomText>
            </View>
          </View>
        )}
        {type == "share" && (
          <View>
            <Icon
              name={"close"}
              as={Ionicons}
              size={moderateScale(25, 0.3)}
              color={Color.black}
              style={[{ alignSelf: "flex-end" }]}
              onPress={() => {
                setModalVisible(false);
              }}
            />

            <CustomText
              style={[
                {
                  marginTop: moderateScale(10, 0.3),
                  fontSize: moderateScale(13, 0.3),
                  fontWeight: "bold",
                  color: Color.black,
                  alignSelf: "center",
                  textAlign: "center",
                  width: windowWidth * 0.7,
                },
              ]}
            >
              Share this place with friends and family
            </CustomText>
            <CustomText
              style={[
                Constants.h6,
                {
                  marginTop: moderateScale(10, 0.3),
                  alignSelf: "center",
                  textAlign: "center",
                  width: windowWidth * 0.7,
                  color: Color.darkGray,
                },
              ]}
            >
              lorem ipsum is simply dummy text of the printing
            </CustomText>
            <FlatList
              //   horizontal={true}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              data={platFormData}
              style={{ flexGrow: 0 }}
              renderItem={({ item, index }) => (
                <IconWithName
                  item={item}
                  icon={true}
                  imageStyle={styles.image}
                  width={windowWidth * 0.35}
                />
              )}
            />
          </View>
        )}
        {type == "report" && (
          <View>
            <Icon
              name={"close"}
              as={Ionicons}
              size={moderateScale(25, 0.3)}
              color={Color.black}
              style={[{ alignSelf: "flex-end" }]}
              onPress={() => {
                setModalVisible(false);
              }}
            />

            <CustomText
              style={[
                {
                  marginTop: moderateScale(10, 0.3),
                  fontSize: moderateScale(13, 0.3),
                  fontWeight: "bold",
                  color: Color.black,
                  alignSelf: "center",
                  textAlign: "center",
                  width: windowWidth * 0.7,
                },
              ]}
            >
              Why are you reporting this listing
            </CustomText>
            <CustomText
              style={[
                Constants.h6,
                {
                  marginTop: moderateScale(10, 0.3),
                  alignSelf: "center",
                  textAlign: "center",
                  width: windowWidth * 0.7,
                  color: Color.darkGray,
                },
              ]}
            >
              lorem ipsum is simply dummy text of the printing
            </CustomText>
            <FlatList
              //   horizontal={true}
              //   numColumns={2}
              showsHorizontalScrollIndicator={false}
              data={reportData}
              style={{ flexGrow: 0 }}
              renderItem={({ item, index }) => (
                <ToggleText item={item} data={value} setData={setValue} />
              )}
            />
            {value == "Other" && (
              <TextInputWithTitle
                titleText={"Reason"}
                secureText={false}
                placeholder={"Reason"}
                setText={setDescription}
                value={description}
                viewHeight={0.13}
                viewWidth={0.75}
                inputWidth={0.7}
                inputHeight={0.1}
                border={1}
                borderColor={Color.themeLightGray}
                backgroundColor={Color.white}
                marginTop={moderateScale(25, 0.3)}
                multiline={true}
                inputStyle={{ textAlign: "vertical" }}
                borderRadius={moderateScale(20, 0.3)}
                placeholderColor={Color.black}
                color
              />
            )}
            <View style={styles.button}>
              <CustomText
                style={[
                  Constants.h3,
                  { color: Color.white, fontWeight: "100" },
                ]}
                onPress={ReportListing}
              >
                {reportListing ? (
                  <ActivityIndicator color={"#FFFFFF"} size={"small"} />
                ) : (
                  "Submit"
                )}
              </CustomText>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};
const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.83,
    // height: windowHeight * 0.6,
    // marginTop: moderateScale(20, 0.3),
    borderWidth: 1,
    borderColor: Color.lightGrey,
    backgroundColor: Color.white,
    borderRadius: moderateScale(20, 0.3),
    paddingVertical: moderateScale(30, 0.3),
    paddingHorizontal: moderateScale(15, 0.3),
    // marginBottom: moderateScale(20, 0.3),
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
export default DetailModal;

const ToggleText = ({ data, setData, item, onPress }) => {
  return (
    <View
      style={[
        styles.totalContainer,
        { borderBottomWidth: 1, justifyContent: "flex-start" },
      ]}
    >
      <Icon
        name={data == item?.data ? "circle" : "circle-o"}
        as={FontAwesome}
        size={moderateScale(15, 0.3)}
        color={Color.themeColor1}
        style={{ marginRight: moderateScale(20, 0.3) }}
        onPress={() => {
          setData(item?.data);
        }}
      />
      <CustomText
        style={[Constants.h5, { color: Color.black, fontWeight: "bold" }]}
      >
        {item?.data}
      </CustomText>
    </View>
  );
};
