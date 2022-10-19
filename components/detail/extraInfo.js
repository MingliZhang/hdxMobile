import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {isEmpty} from 'lodash';

const styles = EStyleSheet.create({
  container: {
    // marginTop: 20,
  },
  title: {
    fontSize: '$thirdtitleFontSize',
    fontWeight: 'bold',
    marginBottom: '$smPadding',
  },
  listItems: {
    fontSize: '$contentFontSize',
    marginBottom: '$smPadding',
    paddingLeft: '$lgPadding',
  },
});

export default function ExtraInfo({data}) {
  return (
    <View style={styles.container}>
      <>
        <Text style={styles.title}>Honor Award</Text>
        {data.honor_award && !isEmpty(data.honor_award) ? (
          data.honor_award.map((element, index) => (
            <Text style={styles.listItems} key={`honor_award_${index}`}>
              {element}
            </Text>
          ))
        ) : (
          <Text style={styles.listItems}>Sorry, no data yet</Text>
        )}
      </>
      <>
        <Text style={styles.title}>Research Interest</Text>
        {data.research_interest && !isEmpty(data.research_interest) ? (
          data.research_interest.map((element, index) => (
            <Text style={styles.listItems} key={`research_interest_${index}`}>
              {element}
            </Text>
          ))
        ) : (
          <Text style={styles.listItems}>Sorry, no data yet</Text>
        )}
      </>
      <>
        <Text style={styles.title}>Experties</Text>
        {data.experties && !isEmpty(data.experties) ? (
          data.experties.map((element, index) => (
            <Text style={styles.listItems} key={`experties_${index}`}>
              {element}
            </Text>
          ))
        ) : (
          <Text style={styles.listItems}>Sorry, no data yet</Text>
        )}
      </>
      <>
        <Text style={styles.title}>Projects</Text>
        {data.project && !isEmpty(data.project) ? (
          data.project.map((element, index) => (
            <Text style={styles.listItems} key={`project_${index}`}>
              {element}
            </Text>
          ))
        ) : (
          <Text style={styles.listItems}>Sorry, no data yet</Text>
        )}
      </>
    </View>
  );
}
