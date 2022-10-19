import React from 'react';
import {View, Image, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  basicInfo: {
    flexDirection: 'row',
  },
  image: {
    width: '$40screenWidth',
    height: '$40screenWidth',
    borderRadius: 50,
    alignSelf: 'center',
  },
  infoList: {
    marginLeft: '5%',
    width: '55%',
  },
  label: {
    fontSize: '$subtitleFontSize',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  nameText: {
    fontSize: '$subtitleFontSize',
    flexShrink: 1,
    fontWeight: 'bold',
    paddingBottom: '$mdPadding',
  },
  subText: {
    fontSize: '$thirdtitleFontSize',
    paddingBottom: '$smPadding',
  },
});

export default function Information({data}) {
  return (
    <View style={styles.basicInfo}>
      <Image
        style={styles.image}
        source={
          data.image_url
            ? {uri: data.image_url}
            : require('../../assets/image/profile_image.jpg')
        }
      />
      <View style={styles.infoList}>
        <Text style={styles.nameText}>{data.name}</Text>
        <Text style={styles.subText}>{data.education.join(' / ')}</Text>
        <Text style={styles.subText}>
          {data.organization ? data.organization : 'Organization Unknown'} /{' '}
          {data.department ? data.department : 'Department Unknown'} /{' '}
          {data.country ? data.country : 'Country Unknown'}
        </Text>
        <Text style={styles.subText}>
          {data.email ? data.email : 'Email Unknown'}
        </Text>
        <Text style={styles.subText}>
          {data.phone_no ? data.phone_no : 'Phone # Unknown'}
        </Text>
      </View>
    </View>
  );
}
