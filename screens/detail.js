import React from 'react';
import Toast from 'react-native-toast-message';
import {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Information, ExtraInfo, RelatedSpecialist} from '../components/detail';

import getDataFromMySQL from '../utilities/mySQL';

const styles = EStyleSheet.create({
  backgorund: {
    backgroundColor: '#4B9CD3',
    flex: 1,
  },
  contentContainer: {
    flex: 9,
    margin: 10,
  },
  loadingArea: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Detail({navigation}) {
  const id = navigation.getParam('id');
  const [relatedSpecialist, setRelatedSpecialist] = useState([]);
  const [data, setData] = useState({});
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [loadingRela, setLoadingRelaInfo] = useState(true);
  // const id = navigation.getParam('id');
  useEffect(() => {
    getDataFromMySQL(navigation.state.routeName, {
      id: id,
    })
      .then(response => {
        setData(response.details[0]);
        setLoadingInfo(false);
        setRelatedSpecialist(response.related);
        setLoadingRelaInfo(false);
      })
      .catch(error => {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: error,
        });
      });
  }, []);
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.backgorund}>
        <ScrollView style={styles.contentContainer}>
          {loadingInfo ? (
            <View style={styles.loadingArea}>
              <ActivityIndicator size="large" color="black" />
            </View>
          ) : (
            <>
              <Information data={data} />
              <ExtraInfo data={data} />
            </>
          )}
          {loadingRela ? (
            <View style={styles.loadingArea}>
              <ActivityIndicator size="large" color="black" />
            </View>
          ) : (
            <RelatedSpecialist
              navigation={navigation}
              related_data={relatedSpecialist}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
