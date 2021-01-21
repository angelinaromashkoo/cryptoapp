import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../screens/mainScreen/mainScreen';
import MainScreenDetails from '../screens/mainScreen/mainScreenDetails';
import {LogoTitleIcon, InfoScreen} from '../screens';
import ConverterScreen from '../screens/converterScreen/converterScreen';

const stackStyle = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center',
};

const MainStack = createStackNavigator();
const ConverterStack = createStackNavigator();
const AboutMeStack = createStackNavigator();

export function MainStackScreen() {
  return (
    <MainStack.Navigator screenOptions={stackStyle}>
      <MainStack.Screen
        options={{
          headerTitle: (props) => <LogoTitleIcon title="Coins" {...props} />,
        }}
        name="Main"
        component={MainScreen}
      />
      <MainStack.Screen
        options={{title: 'Coin Detail', headerBackTitle: 'Back'}}
        name="MainDetails"
        component={MainScreenDetails}
      />
    </MainStack.Navigator>
  );
}

export function ConverterStackScreen() {
  return (
    <ConverterStack.Navigator screenOptions={stackStyle}>
      <ConverterStack.Screen
        options={{
          headerTitle: (props) => (
            <LogoTitleIcon title="Converter" {...props} />
          ),
        }}
        name="Converter"
        component={ConverterScreen}
      />
    </ConverterStack.Navigator>
  );
}

export function AboutMeStackScreen() {
  return (
    <AboutMeStack.Navigator screenOptions={stackStyle}>
      <AboutMeStack.Screen
        options={{
          headerTitle: (props) => <LogoTitleIcon title="About me" {...props} />,
        }}
        name="AboutMe"
        component={InfoScreen}
      />
    </AboutMeStack.Navigator>
  );
}
