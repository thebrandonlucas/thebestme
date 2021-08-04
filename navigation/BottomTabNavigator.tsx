/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
import {
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Icon } from 'react-native-elements';
import MyCircleButton from '../components/HeaderButtons/MyCircleButton';
import SettingsButton from '../components/HeaderButtons/SettingsButton';
import { Colors } from '../constants';
import AWAREAddScreen from '../screens/AWAREAddScreen';
import AWAREScreen from '../screens/AWAREScreen';
import CBTAddScreen from '../screens/CBTAddScreen';
import CBTScreen from '../screens/CBTScreen';
import DataScreen from '../screens/DataScreen';
import HabitsScreen from '../screens/HabitsScreen';
import JournalScreen from '../screens/JournalScreen';
import {
  AWAREParamList,
  BottomTabParamList,
  CBTParamList,
  DataParamList,
  HabitsParamList,
  JournalParamList,
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Habits"
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#bbb',
        style: { backgroundColor: Colors.themeColor },
      }}
    >
      <BottomTab.Screen
        name="Habits"
        component={HabitsNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="home" color={color} iconComponent={FontAwesome} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Journal"
        component={JournalNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon
              name="menu-book"
              color={color}
              iconComponent={MaterialIcons}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="CBT"
        component={CBTNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon
              name="thought-bubble"
              color={color}
              iconComponent={MaterialCommunityIcons}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="AWARE"
        component={AWARENavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon
              name="magnifying-glass"
              color={color}
              iconComponent={Foundation}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Data"
        component={DataNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon
              name="stats-chart"
              color={color}
              iconComponent={Ionicons}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

interface TabBarIconProps {
  name: any;
  color: string;
  iconComponent?: React.ComponentProps<typeof Icon>;
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: TabBarIconProps) {
  const { color, iconComponent, name } = props;
  switch (props.iconComponent) {
    case MaterialCommunityIcons:
      return (
        <MaterialCommunityIcons
          size={30}
          style={{ marginBottom: -3 }}
          color={color}
          iconComponent={iconComponent}
          name={name}
        />
      );
    case FontAwesome:
      return (
        <FontAwesome
          size={30}
          style={{ marginBottom: -3 }}
          color={color}
          iconComponent={iconComponent}
          name={name}
        />
      );
    case MaterialIcons:
      return (
        <MaterialIcons
          size={30}
          style={{ marginBottom: -3 }}
          color={color}
          iconComponent={iconComponent}
          name={name}
        />
      );
    case Foundation:
      return (
        <Foundation
          size={30}
          style={{ marginBottom: -3 }}
          color={color}
          iconComponent={iconComponent}
          name={name}
        />
      );
    default:
      return (
        <Ionicons
          size={30}
          style={{ marginBottom: -3 }}
          color={color}
          iconComponent={iconComponent}
          name={name}
        />
      );
  }
}

TabBarIcon.defaultProps = {
  iconComponent: Icon,
};

function headerOptions(title: string) {
  return {
    headerTitle: title,
    headerLeft: () => <MyCircleButton />,
    headerRight: () => <SettingsButton />,
  };
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
        options={() => headerOptions('CBT')}
      />
      <CBTStack.Screen
        name="CBTAddScreen"
        component={CBTAddScreen}
        options={() => headerOptions('CBT - Add Entry')}
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
        options={() => headerOptions('AWARE')}
      />
      <AWAREStack.Screen
        name="AWAREAddScreen"
        component={AWAREAddScreen}
        options={() => headerOptions('AWARE - Add Entry')}
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
