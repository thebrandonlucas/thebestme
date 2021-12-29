import { IDayType, IHabitType } from '../../../types';

const days: IDayType = {
  '2021-12-24': {
    awareIds: [],
    cbtIds: [],
    date: '2021-12-24',
    endOfDayNotes: [],
    finishDayClickedCount: 0,
    finishedHabitCount: 1,
    habitCount: 1,
    habitIds: ['e0e1d3b0-dd0f-4c45-9c52-9f62efda5f62'],
    habitPercentComplete: 100,
    id: '',
    journalIds: [],
    mood: ['Great'],
  },
  '2021-12-25': {
    awareIds: [],
    cbtIds: [],
    date: '2021-12-25',
    endOfDayNotes: [],
    finishDayClickedCount: 0,
    finishedHabitCount: 1,
    habitCount: 2,
    habitIds: [
      '2ea7e123-596a-4abb-b68e-899edbf3bd0b',
      'adda8857-9b7b-4ffc-9776-38c61bb52618',
    ],
    habitPercentComplete: 50,
    id: '',
    journalIds: [
      '8c8b8ed5-9d81-4907-8780-eb47121ae79c',
      'bc4813f9-4261-428c-891f-723437a655d4',
    ],
    mood: ['Okay'],
  },
  '2021-12-26': {
    awareIds: [],
    cbtIds: [],
    date: '2021-12-26',
    endOfDayNotes: [],
    finishDayClickedCount: 0,
    finishedHabitCount: 1,
    habitCount: 2,
    habitIds: [
      '2ea7e123-596a-4abb-b68e-899edbf3bd0b',
      'adda8857-9b7b-4ffc-9776-38c61bb52618',
    ],
    habitPercentComplete: 50,
    id: '',
    journalIds: [
      '8c8b8ed5-9d81-4907-8780-eb47121ae79c',
      'bc4813f9-4261-428c-891f-723437a655d4',
    ],
    mood: ['Okay'],
  },
  '2021-12-27': {
    awareIds: [],
    cbtIds: [],
    date: '2021-12-27',
    endOfDayNotes: [],
    finishDayClickedCount: 0,
    finishedHabitCount: 1,
    habitCount: 2,
    habitIds: [
      '2ea7e123-596a-4abb-b68e-899edbf3bd0b',
      'adda8857-9b7b-4ffc-9776-38c61bb52618',
    ],
    habitPercentComplete: 50,
    id: '',
    journalIds: [
      '8c8b8ed5-9d81-4907-8780-eb47121ae79c',
      'bc4813f9-4261-428c-891f-723437a655d4',
    ],
    mood: ['Okay'],
  },
};

const habits: IHabitType = {
  '2ea7e123-596a-4abb-b68e-899edbf3bd0b': {
    checked: true,
    deleted: false,
    id: '2ea7e123-596a-4abb-b68e-899edbf3bd0b',
    text: 'Running',
  },
  'adda8857-9b7b-4ffc-9776-38c61bb52618': {
    checked: true,
    deleted: false,
    id: 'adda8857-9b7b-4ffc-9776-38c61bb52618',
    text: 'Brush Teeth',
  },
  'e0e1d3b0-dd0f-4c45-9c52-9f62efda5f62': {
    checked: false,
    deleted: true,
    id: 'e0e1d3b0-dd0f-4c45-9c52-9f62efda5f62',
    text: 'Get lunch',
  },
};

export const topHabitFrequenciesResult = [
  [
    { mood: 'Running', frequency: 4 },
    { mood: 'Brush Teeth', frequency: 3 },
    { mood: 'Get lunch', frequency: 1 },
  ],
  [
    { mood: 'Running', frequency: 1 },
    { mood: 'Brush Teeth', frequency: 6 },
    { mood: 'Get lunch', frequency: 2 },
  ],
  [
    { mood: 'Running', frequency: 5 },
    { mood: 'Brush Teeth', frequency: 2 },
    { mood: 'Get lunch', frequency: 5 },
  ],
];

// TODO: figure out why the types aren't right
// The actual test input and outputs that are used in test function
// export const habitFrequenciesPerMoodTestData: TableTest<
//   GetTopHabitFrequenciesPerMoodInput,
//   GetTopHabitFrequenciesPerMoodResult
// > = [[te, p]]

// const te: GetTopHabitFrequenciesPerMoodInput =['2021-12-24','2021-12-25',
// 3,
// days,
// habits];

// const p: GetTopHabitFrequenciesPerMoodResult = topHabitFrequenciesResult;
