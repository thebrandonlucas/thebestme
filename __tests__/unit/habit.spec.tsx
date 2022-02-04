import faker from '@faker-js/faker';
import { getHabitCount } from '../../utils/getHabitFrequencies';
import { daysFixture } from '../../__fixtures__/factory/day';

// TODO: should we add beforeAll() somewhere here?
describe('Habit', () => {
  describe('getHabitCount', () => {
    let selectedHabitId;
    beforeAll(() => {
      selectedHabitId = faker.datatype.uuid();
    });

    it('should return frequency of 3 for the given habit id', () => {
      const days = daysFixture([
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
      expect(getHabitCount(selectedHabitId, days)).toEqual({
        habit: selectedHabitId,
        frequency: 3,
      });
    });

    it('should return a frequency of 5 for the habitId', () => {
      const days = daysFixture([
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
      expect(getHabitCount(selectedHabitId, days)).toEqual({
        habit: selectedHabitId,
        frequency: 5,
      });
    });

    it('should return frequency of 0 for the habitId', () => {
      const days = daysFixture([
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
      expect(getHabitCount(selectedHabitId, days)).toEqual({
        habit: selectedHabitId,
        frequency: 0,
      });
    });
  });

  describe('getHabitMoodCountForTimeRange', () => {
    const days = daysFixture([
      { date: '2021-01-01', mood: ['Great', 'Okay', 'Okay', 'Not Good'] },
      { date: '2021-01-02', mood: ['Great', 'Not Good', 'Great'] },
      { date: '2021-01-03', mood: ['Not Good', 'Not Good', 'Great'] },
      { date: '2021-01-04', mood: ['Great'] },
      { date: '2021-01-05', mood: [] },
    ]);
    it('should get finished habits for all days provided', () => {
      
    })
  });
});
