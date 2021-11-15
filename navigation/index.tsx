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
import { useEffect, useState } from 'react';
import { ColorSchemeName } from 'react-native';
import Descriptions from '../constants/Descriptions';
import firebase from '../firebase';
import ConfigureMyCircleFriendsScreen from '../screens/ConfigureMyCircleFriendsScreen';
import ConfigureMyCircleMessageScreen from '../screens/ConfigureMyCircleMessageScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import InfoScreen from '../screens/InfoScreen';
import LoginScreen from '../screens/LoginScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignupScreen from '../screens/SignupScreen';
import {
  ConfigureMyCircleFriendsParamList,
  ConfigureMyCircleMessageParamList,
  DescriptionType,
  InfoParamList,
  RootStackParamList,
  SettingsParamList,
} from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

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

// TODO: add typing
const AuthStack = createStackNavigator();
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: true }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // If user not null, user is logged in
      setLoggedIn(user !== null ? true : false);
    });
  }, [loggedIn]);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!loggedIn && (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </>
      )}
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="Settings" component={SettingsNavigator} />
      <Stack.Screen
        name="ConfigureMyCircleFriends"
        component={ConfigureMyCircleFriendsNavigator}
      />
      <Stack.Screen
        name="ConfigureMyCircleMessage"
        component={ConfigureMyCircleMessageNavigator}
      />
      <Stack.Screen name="Info" component={InfoNavigator} />
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

const ConfigureMyCircleFriendsStack =
  createStackNavigator<ConfigureMyCircleFriendsParamList>();
function ConfigureMyCircleFriendsNavigator({ route }) {
  const isSendingPanicMessage: boolean = route.params.isSendingPanicMessage;
  const headerTitle: string = isSendingPanicMessage
    ? 'Choose Friends'
    : 'Configure MyCircle Friends';
  return (
    <ConfigureMyCircleFriendsStack.Navigator>
      <ConfigureMyCircleFriendsStack.Screen
        name="ConfigureMyCircleFriendsScreen"
        component={ConfigureMyCircleFriendsScreen}
        options={() => {
          return { headerTitle };
        }}
      />
    </ConfigureMyCircleFriendsStack.Navigator>
  );
}

const ConfigureMyCircleMessageStack =
  createStackNavigator<ConfigureMyCircleMessageParamList>();
function ConfigureMyCircleMessageNavigator() {
  return (
    <ConfigureMyCircleMessageStack.Navigator>
      <ConfigureMyCircleMessageStack.Screen
        name="ConfigureMyCircleMessageScreen"
        component={ConfigureMyCircleMessageScreen}
        options={() => {
          return { headerTitle: 'Configure MyCircle Message' };
        }}
      />
    </ConfigureMyCircleMessageStack.Navigator>
  );
}

const InfoStack = createStackNavigator<InfoParamList>();

function InfoNavigator({ route }) {
  const infoType: DescriptionType = route.params.infoType;
  const headerTitle = Descriptions[infoType].title;
  return (
    <InfoStack.Navigator>
      <InfoStack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={() => {
          return { headerTitle };
        }}
      />
    </InfoStack.Navigator>
  );
}
