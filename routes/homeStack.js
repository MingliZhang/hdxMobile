import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Header} from '../components';
import {Home, Detail, Results, Feedback} from '../screens';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => <Header navigation={navigation} title="Home" />,
      };
    },
  },
  Results: {
    screen: Results,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => <Header navigation={navigation} title="Results" />,
      };
    },
  },
  Detail: {
    screen: Detail,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => <Header navigation={navigation} />,
      };
    },
  },
  Feedback: {
    screen: Feedback,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => <Header navigation={navigation} title="Feedback" />,
      };
    },
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
