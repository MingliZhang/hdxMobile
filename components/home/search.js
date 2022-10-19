import React from 'react';
import Toast from 'react-native-toast-message';
import {useState} from 'react';
import {View, Button, TextInput, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import DropDownPicker from 'react-native-dropdown-picker';
import {trim} from 'lodash';
import DropdownItem from '../dropdownItem';

const styles = EStyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    backgroundColor: 'white',
    width: '60%',
    marginTop: 16,
    fontSize: 20,
  },
  dropDownText: {
    fontSize: 18,
    paddingLeft: 15,
  },
  dropDown: {
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  dropDownContainer: {
    width: '50%',
  },
  button: {
    padding: 6,
    marginTop: 8,
  },
});

export default function Search({navigation}) {
  const [query, setQuery] = useState('');
  const [field, setField] = useState('name');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState([
    {label: 'Name', value: 'name'},
    {label: 'Country', value: 'country'},
    {label: 'Department', value: 'department'},
    {label: 'Education', value: 'education'},
    {label: 'Expertise', value: 'expertise'},
  ]);

  function searchHandler() {
    query && field
      ? navigation.push('Results', {
          query: trim(query),
          field: field,
        })
      : Toast.show({
          type: 'error',
          text1: 'No Query',
          text2: 'Please input your text!',
        });
  }

  return (
    <View style={styles.alignCenter}>
      <TextInput
        style={styles.textInput}
        placeholder="Keywords"
        onChangeText={input => setQuery(input)}
        value={query}
        onSubmitEditing={searchHandler}
      />
      <DropDownPicker
        open={dropdownOpen}
        value={field}
        items={data}
        maxHeight={200}
        style={styles.dropDown}
        containerStyle={styles.dropDownContainer}
        textStyle={styles.dropDownText}
        renderListItem={props => (
          <DropdownItem args={props} setField={setField} />
        )}
        // setValue={setField}s
        setItems={setData}
        setOpen={setDropdownOpen}
      />
      <View style={styles.button}>
        <Button title="Search" onPress={searchHandler} />
      </View>
      <View style={styles.button}>
        <Button
          title="Reset"
          onPress={() => {
            setField('name');
            setQuery('');
          }}
        />
      </View>
    </View>
  );
}
