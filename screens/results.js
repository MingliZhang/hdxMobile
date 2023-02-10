import React from 'react';
import Toast from 'react-native-toast-message';
import {useEffect, useState} from 'react';
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import EStyleSheet from 'react-native-extended-stylesheet';
import {HDivider, DropdownItem} from '../components/';
import {ResultItem} from '../components/results';
import getDataFromMySQL from '../utilities/mySQL';
import {trim} from 'lodash';

const styles = EStyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#4B9CD3',
  },
  searchArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  resultsArea: {
    flex: 9,
  },
  loadingArea: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderColor: 'black',
    borderRadius: 6,
    padding: 10,
    marginLeft: '8%',
    backgroundColor: 'white',
    width: '40%',
    fontSize: '$thirdtitleFontSize',
  },
  dropDownText: {
    fontSize: '$thirdtitleFontSize',
    paddingLeft: '$lgPadding',
  },
  warningContainer: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningText: {
    fontSize: '$subtitleFontSize',
  },
  dropDown: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  dropDownContainer: {
    width: '40%',
    marginLeft: 10,
  },
});

export default function Results({navigation}) {
  const [query, setQuery] = useState(navigation.getParam('query'));
  const [field, setField] = useState(navigation.getParam('field'));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Name', value: 'name'},
    {label: 'Country', value: 'country'},
    {label: 'Department', value: 'department'},
    {label: 'Education', value: 'education'},
    {label: 'Expertise', value: 'expertise'},
  ]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(
    'No match found. Please reformate your query.',
  );
  const [data, setData] = useState([]);
  const [titles, setTitles] = useState(['name', 'organization_name']);
  useEffect(() => {
    switch (field) {
      case 'country':
        setTitles(['name', 'country_name']);
        break;
      case 'name':
      case 'department':
      case 'education':
      case 'expertise':
      default:
        setTitles(['name', 'organization_name']);
        break;
    }

    getDataFromMySQL(navigation.state.routeName, {
      field: field,
      query: trim(query),
    })
      .then(response => {
        // console.log('response', response);
        setData(response);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setMessage('An error Occured. Please check back latter.');
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: error,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, field]);
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.searchArea}>
          <TextInput
            style={styles.textInput}
            defaultValue={query}
            onSubmitEditing={({nativeEvent: {text}}) =>
              text
                ? setQuery(text)
                : Toast.show({
                    type: 'error',
                    text1: 'No Query',
                    text2: 'Please input your text!',
                  })
            }
          />
          <DropDownPicker
            open={dropdownOpen}
            value={field}
            items={items}
            maxHeight={200}
            style={styles.dropDown}
            labelProps={{fontSize: 10}}
            containerStyle={styles.dropDownContainer}
            textStyle={styles.dropDownText}
            renderListItem={props => (
              <DropdownItem args={props} setField={setField} />
            )}
            setValue={setField}
            setItems={setItems}
            setOpen={setDropdownOpen}
          />
        </View>
        <HDivider />
        {loading ? (
          <View style={styles.loadingArea}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <View style={styles.resultsArea}>
            {data.length ? (
              <FlatList
                data={data}
                numColumns={2}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => (
                  <ResultItem
                    navigation={navigation}
                    item={item}
                    titles={titles}
                  />
                )}
              />
            ) : (
              <View style={styles.warningContainer}>
                <Text style={styles.warningText}>{message}</Text>
              </View>
            )}
          </View>
        )}
      </SafeAreaView>
    </>
  );
}
