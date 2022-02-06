import faker from '@faker-js/faker';
import { IDayType } from '../../types';
import {
  getHabitCount,
  getHabitCountForMoodInTimeRange,
  getHabitFinishedDays,
  getHabitRemainingDays,
} from '../../utils/habit';
import { daysFixture } from '../../__fixtures__/factory/day';

// TODO: should we add beforeAll() somewhere here?
describe('Habit', () => {
  let selectedHabitId: string;
  let daysWithSelectedHabitCount1: IDayType;
  let daysWithSelectedHabitCount3: IDayType;
  let daysWithSelectedHabitCount5: IDayType;
  let daysWithSelectedHabitCount0: IDayType;
  let happyDaysWithSelectedHabitCount1: IDayType;
  let happyDaysWithSelectedHabitCount5: IDayType;
  let happyDaysWithSelectedHabitCount0: IDayType;
  let daysWithSelectedRemainingHabitCount1: IDayType;
  let happyDaysWithSelectedRemainingHabitCount1: IDayType;
  beforeAll(() => {
    selectedHabitId = faker.datatype.uuid();

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
  });

  describe('getHabitCount', () => {
    it('should return frequency of 1 for the given habit id', () => {
      expect(
        getHabitCount(selectedHabitId, daysWithSelectedHabitCount1)
      ).toEqual({
        habit: selectedHabitId,
        frequency: 1,
      });
    });

    it('should return frequency of 3 for the given habit id', () => {
      expect(
        getHabitCount(selectedHabitId, daysWithSelectedHabitCount3)
      ).toEqual({
        habit: selectedHabitId,
        frequency: 3,
      });
    });

    it('should return a frequency of 5 for the habitId', () => {
      expect(
        getHabitCount(selectedHabitId, daysWithSelectedHabitCount5)
      ).toEqual({
        habit: selectedHabitId,
        frequency: 5,
      });
    });

    it('should return frequency of 0 for the habitId', () => {
      expect(
        getHabitCount(selectedHabitId, daysWithSelectedHabitCount0)
      ).toEqual({
        habit: selectedHabitId,
        frequency: 0,
      });
    });

    it('should return frequency of 1 for the habitId when it is a remaining habit', () => {
      expect(
        getHabitCount(
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

  describe('getHabitMoodCountForTimeRange', () => {
    it('should get finished habit count of 5 for days when mood not provided', () => {
      expect(
        getHabitCountForMoodInTimeRange(
          selectedHabitId,
          daysWithSelectedHabitCount5
        )
      ).toEqual({ habit: selectedHabitId, frequency: 5 });
    });

    it('should get finished habit count of 5 for happy mood', () => {
      expect(
        getHabitCountForMoodInTimeRange(
          selectedHabitId,
          happyDaysWithSelectedHabitCount5,
          'Great'
        )
      ).toEqual({ habit: selectedHabitId, frequency: 5 });
    });

    it('should get remaining habit count of 1 when when mood not provided', () => {
      expect(
        getHabitCountForMoodInTimeRange(
          selectedHabitId,
          daysWithSelectedRemainingHabitCount1,
          undefined,
          false
        )
      ).toEqual({ habit: selectedHabitId, frequency: 1 });
    });

    // it('should get remaining habit count of 1 for happy mood', () => {
    //   expect(
    //     getHabitCountForMoodInTimeRange(
    //       selectedHabitId,
    //       happyDaysWithSelectedRemainingHabitCount1,
    //       'Great',
    //       false
    //     )
    //   ).toEqual({ habit: selectedHabitId, frequency: 1 });
    // });
  });
});
