import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ShowMoreAndShowLessText = props => {
  const {children, style, minTextLength = 5} = props;
  const reduxTextObject = useSelector(state => state.langViewReducer.data);
  const [showMore, setShowMore] = useState(false);
  const [textMaxLength, setTextMaxLength] = useState(0);
  const [renderText, setRenderText] = useState();
  useEffect(() => {
    let stringArray = children !== null ? children.split(' ') : [];
    setTextMaxLength(stringArray.length);
    if (showMore == false && textMaxLength > minTextLength) {
      stringArray = stringArray.splice(0, minTextLength);
      let newString = stringArray.join().replaceAll(',', ' ');
      newString = newString + '...';
      setRenderText(newString);
    } else {
      setRenderText(children);
    }
  }, [showMore]);

  return (
    // <View>
    //   <CustomText
    //     style={[styles.generalText, style]}
    //     isRegular
    //     // numberOfLines={showMore ? maxMumberOfLines : minMumberOfLines}
    //   >
    //     {renderText}
    //   </CustomText>
    //   {textMaxLength > minTextLength && (
    //     <TouchableOpacity
    //       activeOpacity={0.9}
    //       onPress={() => {
    //         setShowMore(!showMore);
    //       }}>
    //       <CustomText
    //         style={{
    //           color: 'blue',
    //           fontSize: moderateScale(16, 0.3),
    //           marginTop: moderateScale(5, 0.3),
    //         }}>
    //         {showMore ? 'Show Less' : 'Show More'}
    //       </CustomText>
    //     </TouchableOpacity>
    //   )}
    // </View>
    <CustomText style={[styles.generalText, style]} isRegular>
      {renderText}{' '}
      {/* {children?.substring(0, showMore ? children.length : minTextLength)} */}
      {textMaxLength > minTextLength && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setShowMore(!showMore);
          }}
          style={{
            marginBottom: -moderateScale(2, 0.3),
          }}>
          <CustomText
            style={{
              fontSize: moderateScale(13, 0.3),
              color: 'blue',
            }}
            isRegular>
            {showMore ? reduxTextObject?.Show_Less : reduxTextObject?.Show_More}
          </CustomText>
        </TouchableOpacity>
      )}
    </CustomText>

    // <CustomText
    //   style={[styles.generalText, style]}
    //   isRegular
    //   numberOfLines={showMore ? maxMumberOfLines : minMumberOfLines}>
    //   {children}{' '}
    //   <TouchableOpacity
    //     activeOpacity={0.9}
    //     onPress={() => {
    //       setShowMore(!showMore);
    //     }}>
    //     <CustomText>{showMore ? 'show less' : 'show more'}</CustomText>
    //   </TouchableOpacity>
    // </CustomText>

    // <View>
    //   <CustomText
    //     style={[styles.generalText, style]}
    //     isRegular
    //     numberOfLines={showMore ? maxMumberOfLines : minMumberOfLines}>
    //     {children}
    //   </CustomText>
    //   <TouchableOpacity
    //     activeOpacity={0.9}
    //     onPress={() => {
    //       setShowMore(!showMore);
    //     }}>
    // <CustomText
    //   style={{
    //     color: 'blue',
    //     fontSize: moderateScale(16, 0.3),
    //     marginTop: moderateScale(5, 0.3),
    //   }}>
    //   {showMore ? 'Show Less' : 'Show More'}
    // </CustomText>
    //   </TouchableOpacity>
    // </View>
  );
};

const styles = ScaledSheet.create({
  generalText: {
    fontSize: moderateScale(15, 0.3),
    color: Color.black,
    maxWidth: width * 0.85,
    // backgroundColor: 'red',
    // alignItems: 'flex-end',
    // alignItems: 'center',
    // textAlignVertical: 'center',
    // justifyContent: 'center',
  },
});

export default ShowMoreAndShowLessText;
