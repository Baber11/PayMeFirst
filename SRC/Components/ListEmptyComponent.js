import React from 'react';
import {View, Dimensions} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

import {Icon} from 'native-base';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ListEmptyComponent = props => {
  const {iconName, iconType, textMessage, width, height} = props;
  return (
    <View
      style={[
        styles.emptyListContainer,
        width && {width: width},
        height && {height: height},
      ]}>
      <Icon
        name={iconName}
        as={iconType}
        color={Color.themePurpleLevel4}
        size={moderateScale(40, 0.6)}
      />
      <CustomText
        style={{
          color: Color.themePurpleLevel4,
          fontSize: moderateScale(20, 0.3),
        }}
        isBold>
        {textMessage}
      </CustomText>
    </View>
  );
};

const styles = ScaledSheet.create({
  emptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.7,
    width: width,
  },
});

export default ListEmptyComponent;
