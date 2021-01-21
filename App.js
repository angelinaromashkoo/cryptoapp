import * as React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  AboutMeStackScreen,
  ConverterStackScreen,
  MainStackScreen,
} from './src/routes/mainRoutes';
import {store} from './src/services/apiClient';

const Tab = createBottomTabNavigator();

const tabBarIconHandler = (route, focused, color, size) => {
  let iconName;
  switch (route.name.toString()) {
    case 'Coins':
      iconName = focused ? 'home-outline' : 'home';
      break;
    case 'Converter':
      iconName = focused ? 'cash-outline' : 'cash';
      break;
    case 'About me':
      iconName = focused ? 'body-outline' : 'body';
      break;
    default:
      return null;
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) =>
              tabBarIconHandler(route, focused, color, size),
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Coins" component={MainStackScreen} />
          <Tab.Screen name="Converter" component={ConverterStackScreen} />
          <Tab.Screen name="About me" component={AboutMeStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
