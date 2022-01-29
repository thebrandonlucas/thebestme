import faker from '@faker-js/faker';
import { getHabitCount } from '../../utils/getHabitFrequencies';
import { daysFixture } from '../../__fixtures__/factory/day';

// TODO: should we add beforeAll() somewhere here?
describe('Get habit counts given selected habit', () => {
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
    expect(getHabitCount(selectedHabitId, days)).toEqual({habit: selectedHabitId, frequency: 5});
  });

  it('should return frequency of 0 for the habitId', () => {
    const days = daysFixture([
      {
        finishedHabitIds: 
        []
      },
      {
        finishedHabitIds: [
          faker.datatype.uuid(),
        ],
      },
      {
        finishedHabitIds: [
          faker.datatype.uuid(),
          faker.datatype.uuid(),
        ],
      },
      {
        finishedHabitIds: [faker.datatype.uuid(), faker.datatype.uuid(), faker.datatype.uuid()],
      },
    ]); 
    expect(getHabitCount(selectedHabitId, days)).toEqual({habit: selectedHabitId, frequency: 0});
  });
});
