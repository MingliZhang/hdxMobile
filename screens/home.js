import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Search, Title, Footer} from '../components/home';
import {HDivider} from '../components';

const styles = EStyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 27,
    justifyContent: 'center',
  },
  footerContainer: {
    flex: 3,
  },
});

export default function Home({navigation}) {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.contentContainer}>
          <Title />
          <HDivider />
          <Search navigation={navigation} />
        </View>
        <View style={styles.footerContainer}>
          <Footer />
        </View>
      </SafeAreaView>
    </>
  );
}
