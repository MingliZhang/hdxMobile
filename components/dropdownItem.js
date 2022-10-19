import React from 'react';
import {Text, Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    padding: '$mdPadding',
  },
  text: {
    fontSize: '$thirdtitleFontSize',
  },
});

export default function DropdownItem({args, setField}) {
  const pressHandle = props => {
    args.onPress(props);
    setField(args.value);
  };
  return (
    <Pressable onPress={pressHandle} style={styles.container}>
      <Text style={styles.text}>{args.label}</Text>
    </Pressable>
  );
}
