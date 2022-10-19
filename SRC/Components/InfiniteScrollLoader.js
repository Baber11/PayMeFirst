import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Color from '../Assets/Utilities/Color';

const InfiniteScrollLoader = ({shouldFetch}) => {
  if (!shouldFetch) {
    return null;
  }

  return (
    <View style={styles.flatlistFooter}>
      <ActivityIndicator size="large" color={Color.themePurpleLevel4} />
    </View>
  );
};

export default InfiniteScrollLoader;

const styles = StyleSheet.create({
  flatlistFooter: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
});
