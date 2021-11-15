export const today = {
  id: '',
  // ISO string YYYY-MM-DD (in local time) representing the date
  date: '2021-01-01',
  // ISO timestamp (via new Date().toISOString()) holding the exact time the user finishDay (append new timestamp for each press)
  // datetimes: [],
  // FIXME: AsyncStorage doesn't recognize set objects, should we use array instead or convert to array upon upload
  // then back to set when downloading?
  habitIds: [],
  cbtIds: [],
  awareIds: [],
  journalIds: [],
  // Array of 'mood' chars: ['happy', 'neutral', 'sad', ...]
  habitCount: 0,
  habitPercentComplete: 0,
  finishedHabitCount: 0,
  mood: [],
  // String Array of EOD Notes
  endOfDayNotes: [],
  // How many times did the user actually click "finish Day"? If none, default to 0
  finishDayClickedCount: 0,
};
