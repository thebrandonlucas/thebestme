/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import HabitsScreen from '../screens/HabitsScreen';
import JournalScreen from '../screens/JournalScreen';
import CBTScreen from '../screens/CBTScreen';
import AWAREScreen from '../screens/AWAREScreen';
import DataScreen from '../screens/DataScreen';

import {
  BottomTabParamList, 
  HabitsParamList, 
  JournalParamList, 
  CBTParamList,
  AWAREParamList,
  DataParamList, 
} from '../types';
import { Icon } from 'react-native-elements/dist/icons/Icon';

import SettingsButton from '../components/HeaderButtons/SettingsButton';
import MyCircleButton from '../components/HeaderButtons/MyCircleButton';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Habits"
      tabBarOptions={{ activeTintColor: 'white', inactiveTintColor: '#bbb', style: { backgroundColor: Colors[colorScheme].themeColor } }}>

      <BottomTab.Screen
        name="Habits"
        component={HabitsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} iconComponent={FontAwesome} />,
        }}
      />
      <BottomTab.Screen
        name="Journal"
        component={JournalNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="menu-book" color={color} iconComponent={MaterialIcons} />,
        }}
      />
      <BottomTab.Screen
        name="CBT"
        component={CBTNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="thought-bubble" color={color} iconComponent={MaterialCommunityIcons} />,
        }}
      />
      <BottomTab.Screen
        name="AWARE"
        component={AWARENavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="magnifying-glass" color={color} iconComponent={Foundation} />,
        }}
      />
      <BottomTab.Screen
        name="Data"
        component={DataNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="stats-chart" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: any; color: string, iconComponent?: React.ComponentProps<typeof Icon> }) {
  switch (props.iconComponent) {
    case MaterialCommunityIcons:
      return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
    case FontAwesome: 
      return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
    case MaterialIcons: 
      return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
    case Foundation: 
      return <Foundation size={30} style={{ marginBottom: -3 }} {...props} />;
    default: 
      return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
  }
}

function headerOptions(title: string) {
  return {
    headerTitle: title,
    headerLeft: () => (
      <MyCircleButton />
    ),
    headerRight: () => (
        <SettingsButton />
    )
  }
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HabitsStack = createStackNavigator<HabitsParamList>();

function HabitsNavigator() {
  return (
    <HabitsStack.Navigator>
      <HabitsStack.Screen
        name="HabitsScreen"
        component={HabitsScreen}
        options={() => headerOptions('My Habits')}
      />
    </HabitsStack.Navigator>
  );
}

const JournalStack = createStackNavigator<JournalParamList>();

function JournalNavigator() {
  return (
    <JournalStack.Navigator>
      <JournalStack.Screen
        name="JournalScreen"
        component={JournalScreen}
        options={() => headerOptions('Journal')}
      />
    </JournalStack.Navigator>
  );
}

const CBTStack = createStackNavigator<CBTParamList>();

function CBTNavigator() {
  return (
    <CBTStack.Navigator>
      <CBTStack.Screen
        name="CBTScreen"
        component={CBTScreen}
        options={() => headerOptions('Cognitive Behavioral Therapy')}
      />
    </CBTStack.Navigator>
  );
}

const AWAREStack = createStackNavigator<AWAREParamList>();

function AWARENavigator() {
  return (
    <AWAREStack.Navigator>
      <AWAREStack.Screen
        name="AWAREScreen"
        component={AWAREScreen}
        options={() => headerOptions('AWARE - Panic Attack Prevention')}
      />
    </AWAREStack.Navigator>
  );
}

const DataStack = createStackNavigator<DataParamList>();

function DataNavigator() {
  return (
    <DataStack.Navigator>
      <DataStack.Screen
        name="DataScreen"
        component={DataScreen}
        options={() => headerOptions('My Data')}
      />
    </DataStack.Navigator>
  );
}