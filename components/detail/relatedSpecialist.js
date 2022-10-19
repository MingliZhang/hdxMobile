import React from 'react';
import {Text, View, FlatList, Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SpeciallistImage} from '../';

const styles = EStyleSheet.create({
  title: {
    fontSize: '$subtitleFontSize',
    fontWeight: 'bold',
  },
  flatListContainer: {
    height: 170,
  },
  listItem: {
    marginVertical: 10,
    marginRight: 20,
  },
  nameTitle: {
    width: 100,
    textAlign: 'center',
  },
});

export default function RelatedSpecialist({navigation, related_data}) {
  return related_data.length ? (
    <>
      <Text style={styles.title}>Related Specialists</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          horizontal={true}
          data={related_data}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => (
            <Pressable
              style={styles.listItem}
              onPress={() =>
                navigation.push('Detail', {
                  id: item.id,
                  title: item.name,
                })
              }>
              <SpeciallistImage url={item.image_url} />
              <Text style={styles.nameTitle}>{item.name}</Text>
            </Pressable>
          )}
        />
      </View>
    </>
  ) : (
    <Text style={styles.title}>No related specialists found</Text>
  );
}
