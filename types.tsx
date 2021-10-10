/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import React from 'react';

export type RootStackParamList = {
  Home: undefined;
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
};

export type SettingsParamList = {
  SettingsScreen: undefined;
  ConfigureMyCircleScreen: undefined;
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
  [id: string]: {
    id: string;
    checked: boolean;
    text: string;
  };
};

export type JournalEntryType = {
  [id: string]: {
    id: string;
    date: string;
    text: string;
  };
};

export type AwareJournalEntryType = {
  [id: string]: {
    id: string;
    date: string;
    acknowledgeAndAcceptText: string;
    waitAndWatchText: string;
    actionsText: string;
    repeatText: string;
    endText: string;
  };
};

export type CbtJournalEntryType = {
  [id: string]: {
    id: string;
    date: string;
    situationText: string;
    thoughtsText: string;
    emotionsText: string;
    behaviorsText: string;
    alternativeThoughtsText: string;
  };
};

export type DayType = {
  [date: string]: {
    id: string;
    date: string;
    finishedHabitIds: Array<string>;
    remainingHabitIds: Array<string>;
    cbtIds: Array<string>;
    awareIds: Array<string>;
    journalIds: Array<string>;
    mood: string;
    endOfDayNotes: string;
    isDayFinished: boolean;
  }
};

export type MyCircleFriend = {
  id: string;
  name: string;
  phoneNumber: string;
};

export type CalendarDataType = {
  [date: string]: {
    marked?: boolean;
    dotColor?: string;
    color?: string;
    startingDay?: boolean;
    endingDay?: boolean;
    selected?: boolean;
  }
};

export type CalendarDayType = {
    dateString: string;
    day: number;
    month: number;
    timestamp: number;
    year: number;
}

export type GetComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? P
  : never;
