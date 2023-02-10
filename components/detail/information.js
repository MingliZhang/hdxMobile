import React from 'react';
import {View, Image, Text} from 'react-native';
import {isValidUrl} from '../../utilities/utility';
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
  console.log(data);
  return (
    <View>
      <View style={styles.basicInfo}>
        <Image
          style={styles.image}
          source={
            data.image_url && isValidUrl(data.image_url)
              ? {uri: `data:image/png;base64,${data.image_url}`}
              : require('../../assets/image/profile_image.jpg')
          }
        />
        <View style={styles.infoList}>
          <Text style={styles.nameText}>{data.name}</Text>
          <Text style={styles.subText}>{data.education_name}</Text>

          <Text style={styles.subText}>
            {data.email ? data.email : 'Email Unknown'}
          </Text>
          <Text style={styles.subText}>
            {data.phone_no ? data.phone_no : 'Phone # Unknown'}
          </Text>
          <Text style={styles.subText}>
            {data.country_name ? data.country_name : 'Country Unknown'}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.subText}>
          {data.organization_name ? data.organization_name : null}
        </Text>
        <Text style={styles.subText}>
          {data.designation ? data.designation : null}
        </Text>
      </View>
    </View>
  );
}
