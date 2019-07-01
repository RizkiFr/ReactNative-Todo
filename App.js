import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './screens/Home'
import List from './screens/List';
import About from './screens/About'

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: Home,
  List: List
})
const AboutStack = createStackNavigator({
  About: About
})

const TabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  About: AboutStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`;
        } else if (routeName === 'About') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#03A9F4',
      inactiveTintColor: 'gray',
    },
  });

const AppContainer = createAppContainer(TabNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
