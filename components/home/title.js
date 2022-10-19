import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  alignItemsContainer: {
    alignItems: 'center',
  },
  mainTitle: {
    fontWeight: 'bold',
    fontSize: '$titleFontSize',
    paddingBottom: '$lgPadding',
  },
  secondTitle: {
    // display: 'flexbox',
    fontWeight: 'normal',
    flexWrap: 'wrap',
    fontSize: '$subtitleFontSize',
    justifyContent: 'center',
  },
  thirdTitle: {
    fontWeight: 'normal',
    fontSize: '$thirdtitleFontSize',
    justifyContent: 'center',
    paddingBottom: '$lgPadding',
  },
});
export default function Title() {
  return (
    <View style={styles.alignItemsContainer}>
      <Text style={styles.mainTitle}>Welcome to HDX</Text>
      <Text style={styles.secondTitle}>Health Data Exchange</Text>
      <Text style={styles.thirdTitle}>
        A directory service for health experts
      </Text>
    </View>
  );
}
