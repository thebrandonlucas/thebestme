import faker from '@faker-js/faker';
import { IDayType, IHabitType } from '../../types';
import { replaceHabitFrequencyIdsWithText } from '../../utils/graph';
import { getHabitFrequencyForMoodInTimeRange } from '../../utils/habit';
import { daysFixture } from '../../__fixtures__/factory/day';
import { habitsFixture } from '../../__fixtures__/factory/habit';

describe('Graph Data Converters', () => {
  describe('replaceHabitFrequencyIdsWithText', () => {
    let daysWithSelectedHabitCount5: IDayType;
    let selectedHabitId: string;
    let habits: IHabitType;
    beforeAll(() => {
      selectedHabitId = faker.datatype.uuid();
      daysWithSelectedHabitCount5 = daysFixture([
        {
          finishedHabitIds: [
            selectedHabitId,
            faker.datatype.uuid(),
            faker.datatype.uuid(),
          ],
          mood: ['Great'],
        },
        {
          finishedHabitIds: [
            faker.datatype.uuid(),
            faker.datatype.uuid(),
            selectedHabitId,
          ],
          mood: ['Not Good'],
        },
        {
          finishedHabitIds: [selectedHabitId],
          mood: ['Okay'],
        },
        {
          finishedHabitIds: [faker.datatype.uuid(), selectedHabitId],
          mood: ['Great'],
        },
        {
          finishedHabitIds: [selectedHabitId, faker.datatype.uuid()],
          mood: ['Great'],
        },
      ]);
      habits = habitsFixture([{}, { id: selectedHabitId, text: 'Test Habit' }]);
    });
    it('should replace 1 habitId with the corresponding habit text for 3 moods', () => {
      const habitFrequencyHappy = getHabitFrequencyForMoodInTimeRange(
        selectedHabitId,
        daysWithSelectedHabitCount5,
        'Great'
      );
      const habitFrequencyNeutral = getHabitFrequencyForMoodInTimeRange(
        selectedHabitId,
        daysWithSelectedHabitCount5,
        'Okay'
      );
      const habitFrequencySad = getHabitFrequencyForMoodInTimeRange(
        selectedHabitId,
        daysWithSelectedHabitCount5,
        'Not Good'
      );
      expect(
        replaceHabitFrequencyIdsWithText(
          [habitFrequencyHappy, habitFrequencyNeutral, habitFrequencySad],
          habits
        )
      ).toEqual([
        { habit: 'Test Habit', frequency: 3 },
        { habit: 'Test Habit', frequency: 1 },
        { habit: 'Test Habit', frequency: 1 },
      ]);
    });
  });
});
