import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Text, Pressable} from 'react-native';
import {SpeciallistImage, HDivider} from '../';

const styles = EStyleSheet.create({
  itemContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '46%',
    marginLeft: '2%',
    marginBottom: '2%',
    padding: '$lgPadding',
  },
  mainText: {
    textAlign: 'center',
    fontSize: '$contentFontSize',
  },
  subText: {
    textAlign: 'center',
    fontSize: '$subtextFontSize',
  },
});
export default function ResultItem({navigation, item, titles}) {
  return (
    <Pressable
      onPress={() =>
        navigation.push('Detail', {
          id: item.id,
        })
      }
      style={styles.itemContainer}>
      <SpeciallistImage url={item.image_url} />
      <Text style={styles.mainText}>
        {item[titles[0]] ? item[titles[0]] : 'Unknown'}
      </Text>
      <HDivider />
      <Text style={styles.subText}>
        {item[titles[1]] ? item[titles[1]] : 'Unknown'}
      </Text>
    </Pressable>
  );
}
