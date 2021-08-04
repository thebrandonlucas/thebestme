/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import React from 'react';

export type RootStackParamList = {
  Root: undefined;
  BottomTabNavigator: undefined;
  Signup: undefined;
  Login: undefined;
  Settings: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Habits: undefined;
  Journal: undefined;
  CBT: undefined;
  AWARE: undefined;
  Data: undefined;
};

export type HabitsParamList = {
  HabitsScreen: undefined;
};

export type JournalParamList = {
  JournalScreen: undefined;
};

export type CBTParamList = {
  CBTScreen: undefined;
  CBTAddScreen: undefined;
};

export type AWAREParamList = {
  AWAREScreen: undefined;
  AWAREAddScreen: undefined;
};

export type DataParamList = {
  DataScreen: undefined;
};

export type SettingsParamList = {
  SettingsScreen: undefined;
};

export type CheckBoxType = {
  id: number;
  text: string;
  checked: boolean;
  checkedTitle?: string;
};

export type DateTime = {
  date: string;
  time: string;
};

export type HabitType = {
  id: string;
  checked: boolean;
  text: string;
};

export type JournalEntryType = {
  id: string;
  date: string;
  text: string;
};

export type GetComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? P
  : never;
