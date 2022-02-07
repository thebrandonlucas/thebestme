import faker from '@faker-js/faker';
import { IDayType } from '../../types';
import {
  getHabitCount,
  getHabitCountForMood,
  getHabitFinishedDays,
  getHabitFrequency,
  getHabitFrequencyForMoodInTimeRange,
  getHabitRemainingDays,
  getTopHabitFrequenciesPerMood,
  getTopHabitFrequencyPerMood,
} from '../../utils/habit';
import { IHabitType } from '../../__fixtures__/component/types';
import { daysFixture } from '../../__fixtures__/factory/day';
import { habitsFixture } from '../../__fixtures__/factory/habit';

// TODO: should we add beforeAll() somewhere here?
describe('Habit', () => {
  let selectedHabitId: string;
  let habits: IHabitType;
  let daysWithSelectedHabitCount1: IDayType;
  let daysWithSelectedHabitCount3: IDayType;
  let daysWithSelectedHabitCount5: IDayType;
  let daysWithSelectedHabitCount0: IDayType;
  let happyDaysWithSelectedHabitCount1: IDayType;
  let happyDaysWithSelectedHabitCount5: IDayType;
  let happyDaysWithSelectedHabitCount0: IDayType;
  let daysWithSelectedRemainingHabitCount1: IDayType;
  let happyDaysWithSelectedRemainingHabitCount1: IDayType;
  let mixedDaysWithSelectedHabitCount3: IDayType;
  beforeAll(() => {
    selectedHabitId = faker.datatype.uuid();
    habits = habitsFixture([
      { text: 'running', id: 'runningId' },
      { text: 'homework', id: 'homeworkId' },
      { text: 'chores', id: 'choresId' },
      { text: 'workout', id: 'workoutId' },
      { text: 'hangout', id: 'hangoutId' },
      { text: 'write', id: 'writeId' },
      { text: 'eat', id: 'eatId' },
      { text: 'read', id: 'readId' },
      { text: 'pray', id: 'prayId' },
      { text: 'bass', id: 'bassId' },
    ]);
    // (finished) Days without Mood override
    daysWithSelectedHabitCount1 = daysFixture([
      { finishedHabitIds: [selectedHabitId] },
    ]);
    daysWithSelectedHabitCount3 = daysFixture([
      { finishedHabitIds: [faker.datatype.uuid(), faker.datatype.uuid()] },
      { finishedHabitIds: [faker.datatype.uuid(), selectedHabitId] },
      {
        finishedHabitIds: [
          selectedHabitId,
          faker.datatype.uuid(),
          faker.datatype.uuid(),
        ],
      },
      {
        finishedHabitIds: [
          faker.datatype.uuid(),
          selectedHabitId,
          faker.datatype.uuid(),
        ],
      },
      { finishedHabitIds: [faker.datatype.uuid()] },
      { finishedHabitIds: [] },
    ]);
    daysWithSelectedHabitCount5 = daysFixture([
      {
        finishedHabitIds: [
          selectedHabitId,
          faker.datatype.uuid(),
          faker.datatype.uuid(),
        ],
      },
      {
        finishedHabitIds: [
          faker.datatype.uuid(),
          faker.datatype.uuid(),
          selectedHabitId,
        ],
      },
      {
        finishedHabitIds: [selectedHabitId],
      },
      {
        finishedHabitIds: [faker.datatype.uuid(), selectedHabitId],
      },
      { finishedHabitIds: [selectedHabitId, faker.datatype.uuid()] },
    ]);
    daysWithSelectedHabitCount0 = daysFixture([
      {
        finishedHabitIds: [],
      },
      {
        finishedHabitIds: [faker.datatype.uuid()],
      },
      {
        finishedHabitIds: [faker.datatype.uuid(), faker.datatype.uuid()],
      },
      {
        finishedHabitIds: [
          faker.datatype.uuid(),
          faker.datatype.uuid(),
          faker.datatype.uuid(),
        ],
      },
    ]);

    // Remaining habits days without mood override
    daysWithSelectedRemainingHabitCount1 = daysFixture([
      {
        remainingHabitIds: [
          selectedHabitId,
          faker.datatype.uuid(),
          faker.datatype.uuid(),
        ],
      },
      { remainingHabitIds: [] },
      { remainingHabitIds: [faker.datatype.uuid()] },
    ]);

    // Remaining habit days with mood override
    happyDaysWithSelectedRemainingHabitCount1 = daysFixture([
      {
        remainingHabitIds: [
          selectedHabitId,
          faker.datatype.uuid(),
          faker.datatype.uuid(),
        ],
        mood: ['Not Good', 'Great', 'Okay', 'Great'],
      },
      { remainingHabitIds: [], mood: [] },
      { remainingHabitIds: [faker.datatype.uuid()], mood: ['Great'] },
    ]);

    // Happy days with mood override
    happyDaysWithSelectedHabitCount1 = daysFixture([
      {
        finishedHabitIds: [selectedHabitId, faker.datatype.uuid()],
        mood: ['Great', 'Not Good', 'Great'],
      },
      {
        finishedHabitIds: [faker.datatype.uuid()],
        mood: ['Okay', 'Not Good', 'Great', 'Great'],
      },
      {
        finishedHabitIds: [faker.datatype.uuid(), faker.datatype.uuid()],
        mood: ['Great'],
      },
    ]);
    happyDaysWithSelectedHabitCount5 = daysFixture([
      {
        finishedHabitIds: [selectedHabitId, faker.datatype.uuid()],
        mood: ['Great', 'Not Good', 'Great'],
      },
      {
        finishedHabitIds: [
          faker.datatype.uuid(),
          selectedHabitId,
          faker.datatype.uuid(),
        ],
        mood: ['Okay', 'Not Good', 'Great', 'Great'],
      },
      {
        finishedHabitIds: [
          faker.datatype.uuid(),
          selectedHabitId,
          faker.datatype.uuid(),
        ],
        mood: ['Okay', 'Great', 'Great'],
      },
      {
        finishedHabitIds: [faker.datatype.uuid(), faker.datatype.uuid()],
        mood: ['Great'],
      },
      {
        finishedHabitIds: [faker.datatype.uuid(), faker.datatype.uuid()],
        mood: ['Not Good', 'Not Good', 'Great', 'Great', 'Great'],
      },
      {
        finishedHabitIds: [
          faker.datatype.uuid(),
          faker.datatype.uuid(),
          selectedHabitId,
        ],
        mood: ['Great'],
      },
      {
        finishedHabitIds: [
          selectedHabitId,
          faker.datatype.uuid(),
          faker.datatype.uuid(),
        ],
        mood: ['Great'],
      },
    ]);
    happyDaysWithSelectedHabitCount0 = daysFixture([
      {
        finishedHabitIds: [faker.datatype.uuid()],
        mood: ['Great', 'Not Good', 'Great'],
      },
      {
        finishedHabitIds: [faker.datatype.uuid(), faker.datatype.uuid()],
        mood: ['Okay', 'Not Good', 'Great', 'Great'],
      },
      {
        finishedHabitIds: [faker.datatype.uuid(), faker.datatype.uuid()],
        mood: ['Okay', 'Great', 'Great'],
      },
      {
        finishedHabitIds: [faker.datatype.uuid(), faker.datatype.uuid()],
        mood: ['Great'],
      },
      {
        finishedHabitIds: [faker.datatype.uuid(), faker.datatype.uuid()],
        mood: ['Not Good', 'Not Good', 'Great', 'Great', 'Great'],
      },
      {
        finishedHabitIds: [faker.datatype.uuid(), faker.datatype.uuid()],
        mood: ['Great'],
      },
      {
        finishedHabitIds: [faker.datatype.uuid(), faker.datatype.uuid()],
        mood: ['Great'],
      },
    ]);

    // Mixed days with selectedHabit
    mixedDaysWithSelectedHabitCount3 = daysFixture([
      { finishedHabitIds: [selectedHabitId], mood: ['Not Good', 'Great'] },
      {
        finishedHabitIds: [faker.datatype.uuid(), selectedHabitId],
        mood: ['Okay'],
      },
      { finishedHabitIds: [selectedHabitId], mood: ['Okay'] },
      {
        finishedHabitIds: [faker.datatype.uuid()],
        mood: ['Great', 'Okay', 'Okay'],
      },
    ]);
  });

  describe('getHabitFrequency', () => {
    it('should return frequency of 1 for the given habit id', () => {
      expect(
        getHabitFrequency(selectedHabitId, daysWithSelectedHabitCount1)
      ).toEqual({
        habit: selectedHabitId,
        frequency: 1,
      });
    });

    it('should return frequency of 3 for the given habit id', () => {
      expect(
        getHabitFrequency(selectedHabitId, daysWithSelectedHabitCount3)
      ).toEqual({
        habit: selectedHabitId,
        frequency: 3,
      });
    });

    it('should return a frequency of 5 for the habitId', () => {
      expect(
        getHabitFrequency(selectedHabitId, daysWithSelectedHabitCount5)
      ).toEqual({
        habit: selectedHabitId,
        frequency: 5,
      });
    });

    it('should return frequency of 0 for the habitId', () => {
      expect(
        getHabitFrequency(selectedHabitId, daysWithSelectedHabitCount0)
      ).toEqual({
        habit: selectedHabitId,
        frequency: 0,
      });
    });

    it('should return frequency of 1 for the habitId when it is a remaining habit', () => {
      expect(
        getHabitFrequency(
          selectedHabitId,
          daysWithSelectedRemainingHabitCount1,
          false
        )
      ).toEqual({ habit: selectedHabitId, frequency: 1 });
    });
  });

  describe('getHabitFinishedDays', () => {
    let selectedHabitId;
    let singleDayWithSingleFinishedHabit: IDayType;
    let multipleDaysWithSingleFinishedHabit: IDayType;
    beforeAll(() => {
      selectedHabitId = faker.datatype.uuid();
      singleDayWithSingleFinishedHabit = daysFixture([
        { finishedHabitIds: [selectedHabitId] },
      ]);
      multipleDaysWithSingleFinishedHabit = daysFixture([
        { finishedHabitIds: [] },
        {},
        { finishedHabitIds: [selectedHabitId] },
        { finishedHabitIds: [faker.datatype.uuid(), faker.datatype.uuid()] },
      ]);
    });
    it('should return a single day with a finished habit when given a single day with single finished habit', () => {
      const date = Object.keys(singleDayWithSingleFinishedHabit)[0];
      expect(
        getHabitFinishedDays(selectedHabitId, singleDayWithSingleFinishedHabit)[
          date
        ].finishedHabitIds.length
      ).toBe(1);
    });
    it('should return a single day with a single finished habit when given multiple days with multiple finished habits', () => {
      const result = getHabitFinishedDays(
        selectedHabitId,
        multipleDaysWithSingleFinishedHabit
      );
      const date = Object.keys(result)[0];
      expect(result[date].finishedHabitIds.length).toBe(1);
    });
  });

  describe('getHabitRemainingDays', () => {
    let selectedHabitId;
    let singleDayWithSingleRemainingHabit: IDayType;
    let multipleDaysWithSingleRemainingHabit: IDayType;
    beforeAll(() => {
      selectedHabitId = faker.datatype.uuid();
      singleDayWithSingleRemainingHabit = daysFixture([
        { remainingHabitIds: [selectedHabitId] },
      ]);
      multipleDaysWithSingleRemainingHabit = daysFixture([
        { remainingHabitIds: [] },
        {},
        { remainingHabitIds: [selectedHabitId] },
        { remainingHabitIds: [faker.datatype.uuid(), faker.datatype.uuid()] },
      ]);
    });
    it('should return a single day with a remaining habit when given a single day with single remaining habit', () => {
      const date = Object.keys(singleDayWithSingleRemainingHabit)[0];
      expect(
        getHabitRemainingDays(
          selectedHabitId,
          singleDayWithSingleRemainingHabit
        )[date].remainingHabitIds.length
      ).toBe(1);
    });
    it('should return a single day with a single remaining habit when given multiple days with multiple remaining habits', () => {
      const result = getHabitRemainingDays(
        selectedHabitId,
        multipleDaysWithSingleRemainingHabit
      );
      const date = Object.keys(result)[0];
      expect(result[date].remainingHabitIds.length).toBe(1);
    });
  });

  describe('getHabitFrequencyForMoodInTimeRange', () => {
    it('should get finished habit count of 5 for days when mood not provided', () => {
      expect(
        getHabitFrequencyForMoodInTimeRange(
          selectedHabitId,
          daysWithSelectedHabitCount5
        )
      ).toEqual({ habit: selectedHabitId, frequency: 5 });
    });

    it('should get finished habit count of 5 for happy mood', () => {
      expect(
        getHabitFrequencyForMoodInTimeRange(
          selectedHabitId,
          happyDaysWithSelectedHabitCount5,
          'Great'
        )
      ).toEqual({ habit: selectedHabitId, frequency: 5 });
    });

    it('should get remaining habit count of 1 when when mood not provided', () => {
      expect(
        getHabitFrequencyForMoodInTimeRange(
          selectedHabitId,
          daysWithSelectedRemainingHabitCount1,
          undefined,
          false
        )
      ).toEqual({ habit: selectedHabitId, frequency: 1 });
    });

    it('should get remaining habit count of 1 for happy mood', () => {
      expect(
        getHabitFrequencyForMoodInTimeRange(
          selectedHabitId,
          happyDaysWithSelectedRemainingHabitCount1,
          'Great',
          false
        )
      ).toEqual({ habit: selectedHabitId, frequency: 1 });
    });
    it('should get finished habit count of 2 for neutral mood', () => {
      expect(
        getHabitFrequencyForMoodInTimeRange(
          selectedHabitId,
          mixedDaysWithSelectedHabitCount3,
          'Okay'
        )
      ).toEqual({ habit: selectedHabitId, frequency: 2 });
    });
    it('should get finished habit count of 3 for unspecified mood', () => {
      expect(
        getHabitFrequencyForMoodInTimeRange(
          selectedHabitId,
          mixedDaysWithSelectedHabitCount3
        )
      ).toEqual({ habit: selectedHabitId, frequency: 3 });
    });
  });

  describe('Top Habit Frequencies', () => {
    let happyDaysWithRunningTopHabit: IDayType;
    let mixedDaysWithRunningTopHabit: IDayType;
    let daysWithRunningTopHabitForHappyMood: IDayType;
    let mixedDaysWith10Habits: IDayType;
    let daysWithNoHabits: IDayType;
    beforeEach(() => {
      happyDaysWithRunningTopHabit = daysFixture([
        { finishedHabitIds: ['runningId'], mood: ['Great'] },
        { finishedHabitIds: ['homeworkId', 'runningId'], mood: ['Great'] },
      ]);
      mixedDaysWithRunningTopHabit = daysFixture([
        { finishedHabitIds: ['runningId'], mood: ['Not Good', 'Great'] },
        { finishedHabitIds: ['homeworkId', 'runningId'], mood: ['Okay'] },
        { finishedHabitIds: [], mood: ['Okay'] },
        {
          finishedHabitIds: ['runningId', 'choresId'],
          mood: ['Great', 'Okay', 'Okay'],
        },
      ]);
      daysWithRunningTopHabitForHappyMood = daysFixture([
        { finishedHabitIds: ['runningId'], mood: ['Great'] },
        { finishedHabitIds: ['homeworkId', 'runningId'], mood: ['Great'] },
        { finishedHabitIds: ['homeworkId', 'runningId'], mood: ['Okay'] },
        { finishedHabitIds: [], mood: ['Okay'] },
        { finishedHabitIds: ['choresId'], mood: ['Great', 'Okay', 'Okay'] },
      ]);
      mixedDaysWith10Habits = daysFixture([
        {
          remainingHabitIds: [
            'runningId',
            'homeworkId',
            'workoutId',
            'choresId',
            'hangoutId',
            'prayId',
          ],
          finishedHabitIds: ['writeId', 'eatId', 'readId', 'bassId'],
          mood: ['Great'],
        },
        {
          remainingHabitIds: [
            'runningId',
            'homeworkId',
            'workoutId',
            'bassId',
            'writeId',
            'eatId',
            'readId',
            'prayId',
          ],
          finishedHabitIds: ['choresId', 'hangoutId'],
          mood: ['Okay'],
        },
        {
          remainingHabitIds: [
            'runningId',
            'homeworkId',
            'workoutId',
            'hangoutId',
            'prayId',
            'writeId',
            'eatId',
            'readId',
          ],
          finishedHabitIds: ['choresId'],
          mood: ['Okay'],
        },
        {
          remainingHabitIds: ['writeId', 'eatId', 'readId'],
          finishedHabitIds: [
            'runningId',
            'homeworkId',
            'workoutId',
            'choresId',
            'hangoutId',
            'prayId',
            'bassId',
          ],
          mood: ['Okay'],
        },
      ]);
      daysWithNoHabits = daysFixture([
        { remainingHabitIds: [], finishedHabitIds: [] },
        { remainingHabitIds: [], finishedHabitIds: [] },
        { remainingHabitIds: [], finishedHabitIds: [] },
        { remainingHabitIds: [], finishedHabitIds: [] },
      ]);
    });
    describe('getTopHabitFrequencyPerMood', () => {
      it('should get "running" as the top habit frequency when no mood provided for happy days with a frequency of 2', () => {
        expect(
          getTopHabitFrequencyPerMood(happyDaysWithRunningTopHabit, habits)
        ).toEqual({ habit: 'runningId', frequency: 2 });
      });
      it('should get "running" as the top habit frequency when no mood provided for mixed days with a frequency of 3', () => {
        expect(
          getTopHabitFrequencyPerMood(mixedDaysWithRunningTopHabit, habits)
        ).toEqual({ habit: 'runningId', frequency: 3 });
      });
      it('should get "running" as the top habit frequency for the "happy" mood with a frequency of 2', () => {
        expect(
          getTopHabitFrequencyPerMood(
            daysWithRunningTopHabitForHappyMood,
            habits,
            'Great'
          )
        ).toEqual({ habit: 'runningId', frequency: 2 });
      });
      it('should an empty habit frequency if the days have no habits', () => {
        expect(getTopHabitFrequencyPerMood(daysWithNoHabits, habits)).toEqual({
          habit: '',
          frequency: 0,
        });
      });
    });
    describe('getTopHabitFrequenciesPerMood', () => {
      it('should return 1 habit frequency', () => {
        expect(
          getTopHabitFrequenciesPerMood(mixedDaysWith10Habits, habits, 1).length
        ).toBe(1);
      });
      it('should return 3 habit frequency', () => {
        expect(
          getTopHabitFrequenciesPerMood(mixedDaysWith10Habits, habits, 3).length
        ).toBe(3);
      });
      it('should return 10 habit frequencies when asked for 15', () => {
        expect(
          getTopHabitFrequenciesPerMood(mixedDaysWith10Habits, habits, 15)
            .length
        ).toBe(10);
      });
      it('should return 0 habit frequencies', () => {
        expect(
          getTopHabitFrequenciesPerMood(daysWithNoHabits, habits, 0).length
        ).toBe(0);
      });
      it('should get the top 1 habit frequency when no mood provided', () => {
        expect(
          getTopHabitFrequenciesPerMood(mixedDaysWith10Habits, habits, 1)
        ).toEqual([{ habit: 'choresId', frequency: 3 }]);
      });
      it('should get the top 3 habit frequencies when no mood provided', () => {
        expect(
          getTopHabitFrequenciesPerMood(
            mixedDaysWith10Habits,
            habits,
            3,
            undefined
          )
        ).toEqual([
          { habit: 'choresId', frequency: 3 },
          { habit: 'hangoutId', frequency: 2 },
          { habit: 'bassId', frequency: 2 },
        ]);
      });
      it('should get top 3 habits for happy mood', () => {
        expect(
          getTopHabitFrequenciesPerMood(
            mixedDaysWith10Habits,
            habits,
            3,
            'Great'
          )
        ).toEqual([
          { habit: 'writeId', frequency: 1 },
          { habit: 'eatId', frequency: 1 },
          { habit: 'readId', frequency: 1 },
        ]);
      });
      it('should get top 3 habits for neutral mood', () => {
        expect(
          getTopHabitFrequenciesPerMood(
            mixedDaysWith10Habits,
            habits,
            3,
            'Okay'
          )
        ).toEqual([
          { habit: 'choresId', frequency: 3 },
          { habit: 'hangoutId', frequency: 2 },
          { habit: 'runningId', frequency: 1 },
        ]);
      });
      it('should get all habit frequencies when no number of habits specified and no mood specified', () => {
        expect(
          getTopHabitFrequenciesPerMood(mixedDaysWith10Habits, habits)
        ).toEqual([
          { habit: 'choresId', frequency: 3 },
          { habit: 'hangoutId', frequency: 2 },
          { habit: 'bassId', frequency: 2 },
          { habit: 'runningId', frequency: 1 },
          { habit: 'homeworkId', frequency: 1 },
          { habit: 'workoutId', frequency: 1 },
          { habit: 'writeId', frequency: 1 },
          { habit: 'eatId', frequency: 1 },
          { habit: 'readId', frequency: 1 },
          { habit: 'prayId', frequency: 1 },
        ]);
      });
      it('should get all habit frequencies when no amount specified for neutral mood', () => {
        expect(
          getTopHabitFrequenciesPerMood(
            mixedDaysWith10Habits,
            habits,
            undefined,
            'Okay'
          )
        ).toEqual([
          { habit: 'choresId', frequency: 3 },
          { habit: 'hangoutId', frequency: 2 },
          { habit: 'runningId', frequency: 1 },
          { habit: 'homeworkId', frequency: 1 },
          { habit: 'workoutId', frequency: 1 },
          { habit: 'prayId', frequency: 1 },
          { habit: 'bassId', frequency: 1 },
        ]);
      });
    });
  });

  describe('getHabitCount', () => {
    it('should get a habit count of 1 for 1 day', () => {
      expect(getHabitCount(selectedHabitId, daysWithSelectedHabitCount1)).toBe(
        1
      );
    });
    it('should get a habit count of 0 when habit not in days', () => {
      expect(getHabitCount(selectedHabitId, daysWithSelectedHabitCount0)).toBe(
        0
      );
    });
    it('should get a habit count of 5 for multiple days', () => {
      expect(getHabitCount(selectedHabitId, daysWithSelectedHabitCount5)).toBe(
        5
      );
    });
  });

  describe('getHabitCountForMood', () => {
    it('should get a 1 habit count when theres 1 habit for happy mood', () => {
      expect(
        getHabitCountForMood(
          selectedHabitId,
          mixedDaysWithSelectedHabitCount3,
          'Great'
        )
      ).toBe(1);
    });
  });
});
