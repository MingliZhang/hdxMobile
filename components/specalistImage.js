import React from 'react';
import {Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
  },
});

export default function SpeciallistImage({url}) {
  return (
    <Image
      style={styles.image}
      defaultSource={require('../assets/image/profile_image.jpg')}
      source={url ? {uri: url} : require('../assets/image/profile_image.jpg')}
    />
  );
}
