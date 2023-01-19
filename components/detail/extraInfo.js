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
      {/* <>
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
      </> */}
      <>
        <Text style={styles.title}>Research Interest</Text>
        {data.research_interest ? (
          <Text style={styles.listItems}>{data.research_interest}</Text>
        ) : (
          <Text style={styles.listItems}>Sorry, no data yet</Text>
        )}
      </>
      <>
        <Text style={styles.title}>Expertise</Text>
        {data.expertise ? (
          <Text style={styles.listItems}>{data.expertise}</Text>
        ) : (
          <Text style={styles.listItems}>Sorry, no data yet</Text>
        )}
      </>
      {/* <>
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
      </> */}
    </View>
  );
}
