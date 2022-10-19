import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  footerContainer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: '$subtextFontSize',
  },
});

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>
        Copyright © School of information science at UNC-CH
      </Text>
    </View>
  );
}
