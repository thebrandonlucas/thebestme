import faker from '@faker-js/faker';
import { IDayType } from '../../types';
import {
  getHabitCount,
  getHabitCountForMoodInTimeRange,
} from '../../utils/habit';
import { daysFixture } from '../../__fixtures__/factory/day';

// TODO: should we add beforeAll() somewhere here?
describe('Habit', () => {
  let selectedHabitId: string;
  let daysWithFinishedHabitCount1: IDayType;
  let daysWithSelectedHabitCount3: IDayType;
  let daysWithSelectedHabitCount5: IDayType;
  let daysWithSelectedHabitCount0: IDayType;
  beforeAll(() => {
    selectedHabitId = faker.datatype.uuid();

    // Days without Mood override
    daysWithFinishedHabitCount1 = daysFixture([
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

    // Days with mood override
    
  });

  describe('getHabitCount', () => {
    it('should return frequency of 1 for the given habit id', () => {
      expect(
        getHabitCount(selectedHabitId, daysWithFinishedHabitCount1)
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
  });

  describe('getHabitMoodCountForTimeRange', () => {
    it('should get finished habit count of 5 for days when mood not provided', () => {
      expect(
        getHabitCountForMoodInTimeRange(
          selectedHabitId,
          daysWithSelectedHabitCount5
        )
      ).toEqual({ habit: selectedHabitId, frequency: 5 });

      it('should get finished habit count of 5 for happy mood')
    });
  });
});
