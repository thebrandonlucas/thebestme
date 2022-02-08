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
import QuestionButton from '../components/HeaderButtons/QuestionButton';
import SettingsButton from '../components/HeaderButtons/SettingsButton';
import { View } from '../components/Themed';
import { Colors } from '../constants';
import CBTAddScreen from '../screens/CBTAddScreen';
import CBTScreen from '../screens/CBTScreen';
import DataScreen from '../screens/DataScreen';
import DayMetricsScreen from '../screens/DayMetricsScreen';
import EndOfDayNotesScreen from '../screens/EndOfDayNotesScreen';
import FinishDayScreen from '../screens/FinishDayScreen';
import HabitsScreen from '../screens/HabitsScreen';
import JournalScreen from '../screens/JournalScreen';
import {
  AWAREParamList,
  BottomTabParamList,
  CBTParamList,
  DataParamList,
  DescriptionType,
  HabitsParamList,
  JournalParamList,
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Habits"
      tabBarOptions={{
        activeTintColor: Colors.activeTabColor,
        inactiveTintColor: Colors.translucentThemeColor,
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
      {/* <BottomTab.Screen
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
      /> */}
      {/* <BottomTab.Screen
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
      /> */}
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

function headerOptions(title: string, infoType?: DescriptionType) {
  return {
    headerTitle: title,
    headerLeft: () => <MyCircleButton />,
    headerRight: () => (
      <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
        <QuestionButton infoType={infoType} />
        <SettingsButton />
      </View>
    ),
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
        options={() => headerOptions('My Habits', 'habits')}
      />
      <HabitsStack.Screen
        name="FinishDayScreen"
        component={FinishDayScreen}
        options={() => headerOptions('Day Summary')}
      />
      <HabitsStack.Screen
        name="Data"
        component={DataScreen}
        options={() => headerOptions('Data')}
      />
      <HabitsStack.Screen
        name="DayMetricsScreen"
        component={DayMetricsScreen}
        options={() => headerOptions('Day Metrics')}
      />
      <HabitsStack.Screen
        name="EndOfDayNotesScreen"
        component={EndOfDayNotesScreen}
        options={() => headerOptions('End of Day Notes')}
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
        options={() => headerOptions('Journal', 'journal')}
      />
      <CBTStack.Screen
        name="CBTScreen"
        component={CBTScreen}
        options={() => headerOptions('Thought Challenging', 'cbtJournal')}
      />
      <CBTStack.Screen
        name="CBTAddScreen"
        component={CBTAddScreen}
        options={() => headerOptions('CBT - Add Entry', 'cbtJournal')}
      />
    </JournalStack.Navigator>
  );
}

const CBTStack = createStackNavigator<CBTParamList>();

// function CBTNavigator() {
//   return (
//     <CBTStack.Navigator>
//       <CBTStack.Screen
//         name="CBTScreen"
//         component={CBTScreen}
//         options={() => headerOptions('Thought Challenging', 'cbtJournal')}
//       />
//       <CBTStack.Screen
//         name="CBTAddScreen"
//         component={CBTAddScreen}
//         options={() => headerOptions('CBT - Add Entry', 'cbtJournal')}
//       />
//     </CBTStack.Navigator>
//   );
// }

const AWAREStack = createStackNavigator<AWAREParamList>();

// function AWARENavigator() {
//   return (
//     <AWAREStack.Navigator>
//       <AWAREStack.Screen
//         name="AWAREScreen"
//         component={AWAREScreen}
//         options={() => headerOptions('AWARE', 'awareJournal')}
//       />
//       <AWAREStack.Screen
//         name="AWAREAddScreen"
//         component={AWAREAddScreen}
//         options={() => headerOptions('AWARE - Add Entry', 'awareJournal')}
//       />
//     </AWAREStack.Navigator>
//   );
// }

const DataStack = createStackNavigator<DataParamList>();

function DataNavigator() {
  return (
    <DataStack.Navigator>
      <DataStack.Screen
        name="DataScreen"
        component={DataScreen}
        options={() => headerOptions('My Data', 'data')}
      />
      <DataStack.Screen
        name="DayMetricsScreen"
        component={DayMetricsScreen}
        options={() => headerOptions('Day Metrics', 'data')}
      />
    </DataStack.Navigator>
  );
}
