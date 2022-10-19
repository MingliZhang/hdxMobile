import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  hDivider: {
    borderBottomColor: 'black',
    width: '80%',
    borderBottomWidth: EStyleSheet.hairlineWidth,
    alignSelf: 'center',
  },
});
export default function HDivider() {
  return <View style={styles.hDivider} />;
}
