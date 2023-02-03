import React from "react";
import { ImageBackground, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Color from "../Assets/Utilities/Color";
import CustomStatusBar from "../Components/CustomStatusBar";
import CustomText from "../Components/CustomText";
import CustomImage from "../Components/CustomImage";
import { windowHeight, windowWidth } from "../Utillity/utils";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import ScreenBoiler from "../Components/ScreenBoiler";

const SplashScreen = () => {
  const backgroundImage = require("../Assets/Images/splash.png");
  return (
    <ScreenBoiler
     
      statusBarBackgroundColor={Color.green}
      statusBarContentStyle={"light-content"}
    >
     <View style={styles.container}>
     
        <Animatable.View
          animation="zoomInUp"
          duration={2500}
          useNativeDriver
          style={[styles?.textContainer]}
        
          
        >
          <CustomImage
            source={backgroundImage}
            resizeMode={"contain"}
            style={[styles.bottomImage]}
          />
        </Animatable.View>
      </View>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    height: windowHeight,
    width: windowWidth,
    backgroundColor : Color.green
  },
  bottomImage: {
    width : windowWidth * 0.45
  },
  textContainer: {
    flexDirection: "row",
    alignSelf :'center',
    width : windowWidth * 0.7,
    height :windowWidth * 0.7,
    borderRadius : moderateScale(windowWidth* 0.7 / 2 , 0.3),
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : Color.white,
    

  },
  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: "bold",
  },
 
});

export default SplashScreen;
