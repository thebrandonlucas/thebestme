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
  ConfigureMyCircleFriends: undefined;
  ConfigureMyCircleMessage: undefined;
  Info: undefined;
  FinishDayScreen: undefined;
  NotFound: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Habits: undefined;
  Journal: undefined;
  CBT: undefined;
  AWARE: undefined;
  Data: undefined;
  FinishDayScreen: undefined;
};

export type HomeParamList = {
  HomeScreen: JSX.Element;
};

export type HabitsParamList = {
  HabitsScreen: JSX.Element;
  FinishDayScreen: JSX.Element;
  Data: JSX.Element;
  DayMetricsScreen: JSX.Element;
  EndOfDayNotesScreen: JSX.Element;
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

export type ConfigureMyCircleFriendsParamList = {
  ConfigureMyCircleFriendsScreen: undefined;
};

export type ConfigureMyCircleMessageParamList = {
  ConfigureMyCircleMessageScreen: undefined;
};

export type InfoParamList = {
  InfoScreen: undefined;
};

export type FinishDayParamList = {
  FinishDayScreen: undefined;
};

export type CheckBoxType = {
  id: number;
  text: string;
  checked: boolean;
  checkedTitle?: string;
};

export type HabitType = {
  id: string;
  checked: boolean;
  text: string;
  deleted: boolean;
};

export type OptionalHabitType = {
  id?: string;
  checked?: boolean;
  text?: string;
  deleted?: boolean;
};

export type IHabitType = { [id: string]: HabitType };

export type JournalEntryType = {
  id: string;
  date: string;
  text: string;
};

export type OptionalJournalEntryType = {
  id?: string;
  date?: string;
  text?: string;
};

export type IJournalEntryType = { [id: string]: JournalEntryType };

export type OptionalIJournalEntryType = {
  [id: string]: OptionalJournalEntryType;
};

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

export type OptionalCbtJournalEntryType = {
  id?: string;
  date?: string;
  situationText?: string;
  thoughtsText?: string;
  emotionsText?: string;
  behaviorsText?: string;
  alternativeThoughtsText?: string;
};

export type ICbtJournalEntryType = { [id: string]: CbtJournalEntryType };

export type OptionalICbtJournalEntryType = {
  [id: string]: OptionalCbtJournalEntryType;
};

export type OnlyIJournalType = {
  primary: IJournalEntryType;
  guided?: never;
};

export type EndOfDayNotesEntryType = {
  text: string;
};

export type OnlyIGuidedJournalType = {
  primary?: never;
  guided: ICbtJournalEntryType | IAwareJournalEntryType;
};

export type UnionJournalEntryType =
  | JournalEntryType
  | CbtJournalEntryType
  | AwareJournalEntryType
  | EndOfDayNotesEntryType;

export type DayType = {
  date: string;
  finishedHabitIds: Array<string>;
  remainingHabitIds: Array<string>;
  cbtIds: Array<string>;
  journalIds: Array<string>;
  mood: Array<ValidMood>;
  endOfDayNotes: string[];
  finishedHabitCount: number;
  habitCount: number;
  habitPercentComplete: number;
  finishDayClickedCount: number;
};

export type OptionalDayType = {
  id?: string;
  date?: string;
  remainingHabitIds?: string[];
  finishedHabitIds?: string[];
  cbtIds?: Array<string>;
  awareIds?: Array<string>;
  journalIds?: Array<string>;
  mood?: Array<ValidMood>;
  endOfDayNotes?: string[];
  finishedHabitCount?: number;
  habitCount?: number;
  habitPercentComplete?: number;
  finishDayClickedCount?: number;
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
  Great: string;
  Okay: string;
  'Not Good': string;
};

export type CalendarDayType = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

export type DescriptionType = 'home' | 'habits' | 'journal' | 'data';

export type QuestionButtonType = {
  infoType?: DescriptionType;
};

export type InfoScreenType = {
  infoType?: DescriptionType;
};

export type JournalListPageType = {
  navigation: any;
  update?: () => void;
  save?: () => void;
  clickPlus: () => void;
  clickPastEntry: (
    props:
      | JournalEntryType
      | CbtJournalEntryType
      | AwareJournalEntryType
      | EndOfDayNotesEntryType
  ) => void;
  closeModal: () => void;
  entries: UnionJournalEntryType;
  modalVisible?: boolean;
  date: string;
  text?: string;
  setText?: React.Dispatch<React.SetStateAction<string>>;
  setDate?: React.Dispatch<React.SetStateAction<string>>;
  deleteJournal: (id: string) => void;
  journalType: 'primary' | 'cbt' | 'aware' | 'endOfDay';
  loading: boolean;
};

export type MyCircleFriendType = {
  checked: boolean;
  id: string;
  name: string;
  phoneNumber: string;
};

export type MyCircleReducerType = {
  myCircle: Array<MyCircleFriendType>;
  isSendingPanicMessage: boolean;
  panicMessage: string;
};

export type HabitReducerType = {
  habits: IHabitType;
};

export type DayReducerType = {
  days: IDayType;
};

export type HabitSummaryCardType = {
  remainingHabits: HabitType[];
  finishedHabits: HabitType[];
  habitCount: number;
  habitPercentComplete: number;
};

export type Styles = {
  viewStyle?: StyleProp<ViewProps>;
  textStyle?: StyleProp<TextStyle>;
};

export type ValidMood = 'Great' | 'Okay' | 'Not Good';

export type ISODateString = '';

export type HabitFrequency = {
  habit: string;
  frequency: number;
};

export type HabitFrequencyByMood = {
  [mood in ValidMood]: HabitFrequency;
};

export type MoodFrequency = {
  [mood in ValidMood]: number;
};

export type FrequencyByDate = {
  date: Date;
  frequency: number;
};

export type HabitFrequencyMultiMoodBarChartData = HabitFrequency[];

export type GetComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? P
  : never;
