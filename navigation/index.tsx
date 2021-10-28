/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { ColorSchemeName } from 'react-native';
import ConfigureMyCircleScreen from '../screens/ConfigureMyCircleScreen';
import LoginScreen from '../screens/LoginScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignupScreen from '../screens/SignupScreen';
import { ConfigureMyCircleParamList, RootStackParamList, SettingsParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import { RootState } from '../redux/store';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* TODO: change to LoginScreen after development */}
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="Settings" component={SettingsNavigator} />
      <Stack.Screen name="ConfigureMyCircle" component={ConfigureMyCircleNavigator} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParamList>();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={() => {
          return { headerTitle: 'Settings' };
        }}
      />
    </SettingsStack.Navigator>
  );
}

const ConfigureMyCircleStack = createStackNavigator<ConfigureMyCircleParamList>();
function ConfigureMyCircleNavigator({ route }) {
  console.log('props', route.params.isSendingPanicMessage)
  const isSendingPanicMessage: boolean = route.params.isSendingPanicMessage;
  const headerTitle: string = isSendingPanicMessage
    ? 'Choose Friends'
    : 'Configure MyCircle Friends';
  return (
    <ConfigureMyCircleStack.Navigator>
      <ConfigureMyCircleStack.Screen
        name="ConfigureMyCircleScreen"
        component={ConfigureMyCircleScreen}
        options={() => {
          return { headerTitle: headerTitle };
        }}
      />
    </ConfigureMyCircleStack.Navigator>
  );
}
