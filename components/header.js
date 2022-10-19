import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: '$titleFontSize',
    color: '#333',
    letterSpacing: 1,
  },
});

export default function Header({navigation, title = null}) {
  const text = navigation.getParam('title')
    ? navigation.getParam('title')
    : title;

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerText}>{text}</Text>
      </View>
    </View>
  );
}
