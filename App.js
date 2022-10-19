import React from 'react';
import Toast from 'react-native-toast-message';
import Navigator from './routes/homeStack';
import {useWindowDimensions, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function App() {
  const {fontScale} = useWindowDimensions();
  EStyleSheet.build({
    $carolinaBlue: '#7BAFD4',
    $titleFontSize: 30,
    $subtitleFontSize: 22,
    $thirdtitleFontSize: 15,
    $contentFontSize: 12,
    $subtextFontSize: 10,
    $smPadding: 2,
    $mdPadding: 5,
    $lgPadding: 10,
    $screenWidth: Dimensions.get('window').width,
    $screenHeight: Dimensions.get('window').height,
    $40screenWidth: Dimensions.get('window').width * 0.4,
  });
  return (
    <>
      <Navigator />
      <Toast position="bottom" bottomOffset={50} visibilityTime={10000} />
    </>
  );
}
