/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { ViewProps } from './components/Themed';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  ConfigureMyCircle: undefined;
  Info: undefined;
  NotFound: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
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
  FinishDayScreen: undefined;
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
  DayMetricsScreen: undefined;
};

export type SettingsParamList = {
  SettingsScreen: undefined;
};

export type ConfigureMyCircleParamList = {
  ConfigureMyCircleScreen: undefined;
};

export type InfoParamList = {
  InfoScreen: undefined;
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
  deleted: boolean;
};

export type IHabitType = { [id: string]: HabitType };

export type JournalEntryType = {
  id: string;
  date: string;
  text: string;
};

export type IJournalEntryType = { [id: string]: JournalEntryType };

export type AwareJournalEntryType = {
  id: string;
  date: string;
  acknowledgeAndAcceptText: string;
  waitAndWatchText: string;
  actionsText: string;
  repeatText: string;
  endText: string;
};

export type IAwareJournalEntryType = { [id: string]: AwareJournalEntryType };

export type CbtJournalEntryType = {
  id: string;
  date: string;
  situationText: string;
  thoughtsText: string;
  emotionsText: string;
  behaviorsText: string;
  alternativeThoughtsText: string;
};

export type ICbtJournalEntryType = { [id: string]: CbtJournalEntryType };

export type DayType = {
  id: string;
  date: string;
  habitIds: Array<string>;
  cbtIds: Array<string>;
  awareIds: Array<string>;
  journalIds: Array<string>;
  mood: Array<string>;
  endOfDayNotes: string;
  isDayFinished: boolean;
  finishedHabitCount: number;
  habitCount: number;
  habitPercentComplete: number;
};

export type IDayType = { [date: string]: DayType };

export type MyCircleFriend = {
  id: string;
  name: string;
  phoneNumber: string;
};

export type CalendarDataType = {
  marked?: boolean;
  dotColor?: string;
  color?: string;
  startingDay?: boolean;
  endingDay?: boolean;
  selected?: boolean;
};

export type ICalendarDataType = { [date: string]: CalendarDataType };

export type MoodToColorType = {
  Happy: string;
  Neutral: string;
  Sad: string;
};

export type CalendarDayType = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

export type DescriptionType =
  | 'habits'
  | 'journal'
  | 'cbtJournal'
  | 'awareJournal'
  | 'data';

export type QuestionButtonType = {
  infoType?: DescriptionType;
};

export type InfoScreenType = {
  infoType?: DescriptionType;
};

export type Styles = {
  viewStyle?: StyleProp<ViewProps>;
  textStyle?: StyleProp<TextStyle>;
};

export type GetComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? P
  : never;
