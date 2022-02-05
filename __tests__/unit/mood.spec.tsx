import { IDayType } from '../../types';
import { getDaysWithSelectedMood } from '../../utils/mood';
import { daysFixture } from '../../__fixtures__/factory/day';

describe('Habit Mood correlation', () => {
  describe('getDaysWithSelectedMood', () => {
    describe('Happy', () => {
      let pureHappyDays: IDayType,
        pureHappyDay: IDayType,
        mixedHappyDay: IDayType,
        mixedHappyDays: IDayType;
      beforeAll(() => {
        pureHappyDay = daysFixture([{ mood: ['Great'] }]);
        pureHappyDays = daysFixture([
          { mood: ['Great'] },
          { mood: ['Great'] },
          { mood: ['Great'] },
        ]);
        mixedHappyDay = daysFixture([
          { mood: ['Great', 'Not Good', 'Okay', 'Great'] },
        ]);
        mixedHappyDays = daysFixture([
          { mood: ['Great', 'Not Good', 'Okay', 'Great'] },
          { mood: ['Great', 'Great', 'Not Good'] },
          { mood: ['Great', 'Okay', 'Great'] },
          { mood: ['Great'] },
        ]);
      });
      it('should return a single day given a single day', () => {
        expect(
          Object.keys(getDaysWithSelectedMood('Great', pureHappyDay)).length
        ).toBe(1);
      });
      it('should return a single day with happy mood given a single happy day with single happy mood', () => {
        const day = getDaysWithSelectedMood('Great', pureHappyDay);
        const date = Object.keys(day)[0];
        expect(day[date].mood).toEqual(['Great']);
      });
      it('should return a single day with happy mood given multiple moods but a happy majority', () => {
        const day = getDaysWithSelectedMood('Great', mixedHappyDay);
        const date = Object.keys(day)[0];
        expect(day[date].mood).toEqual(['Great', 'Not Good', 'Okay', 'Great']);
      });
      it('should return multiple happy days with happy moods', () => {
        const days = getDaysWithSelectedMood('Great', pureHappyDays);
        for (const date in days) {
          expect(days[date].mood).toEqual(pureHappyDays[date].mood);
        }
      });
      it('should return multiple happy days with mixed moods but happy majorities', () => {
        const days = getDaysWithSelectedMood('Great', mixedHappyDays);
        for (const date in days) {
          expect(days[date].mood).toEqual(mixedHappyDays[date].mood);
        }
      });
    });

    describe('Neutral', () => {
      let pureNeutralDays: IDayType,
        pureNeutralDay: IDayType,
        mixedNeutralDay: IDayType,
        mixedNeutralDays: IDayType;
      beforeAll(() => {
        pureNeutralDay = daysFixture([{ mood: ['Okay'] }]);
        pureNeutralDays = daysFixture([
          { mood: ['Okay'] },
          { mood: ['Okay'] },
          { mood: ['Okay'] },
        ]);
        mixedNeutralDay = daysFixture([
          { mood: ['Okay', 'Great', 'Okay', 'Okay'] },
        ]);
        mixedNeutralDays = daysFixture([
          { mood: ['Okay', 'Great', 'Okay', 'Okay'] },
          { mood: ['Okay', 'Okay', 'Great'] },
          { mood: ['Okay', 'Not Good', 'Okay'] },
          { mood: ['Okay'] },
        ]);
      });
      it('should return a single day given a single day', () => {
        expect(
          Object.keys(getDaysWithSelectedMood('Okay', pureNeutralDay)).length
        ).toBe(1);
      });
      it('should return a single day with neutral mood given a single neutral day with single neutral mood', () => {
        const day = getDaysWithSelectedMood('Okay', pureNeutralDay);
        const date = Object.keys(day)[0];
        expect(day[date].mood).toEqual(['Okay']);
      });
      it('should return a single day with neutral mood given multiple moods but a neutral majority', () => {
        const day = getDaysWithSelectedMood('Okay', mixedNeutralDay);
        const date = Object.keys(day)[0];
        expect(day[date].mood).toEqual(['Okay', 'Great', 'Okay', 'Okay']);
      });
      it('should return multiple neutral days with neutral moods', () => {
        const days = getDaysWithSelectedMood('Okay', pureNeutralDays);
        for (const date in days) {
          expect(days[date].mood).toEqual(pureNeutralDays[date].mood);
        }
      });
      it('should return multiple neutral days with mixed moods but neutral majorities', () => {
        const days = getDaysWithSelectedMood('Okay', mixedNeutralDays);
        for (const date in days) {
          expect(days[date].mood).toEqual(mixedNeutralDays[date].mood);
        }
      });
    });

    describe('Sad', () => {
      let pureSadDays: IDayType,
        pureSadDay: IDayType,
        mixedSadDay: IDayType,
        mixedSadDays: IDayType;
      beforeAll(() => {
        pureSadDay = daysFixture([{ mood: ['Not Good'] }]);
        pureSadDays = daysFixture([
          { mood: ['Not Good'] },
          { mood: ['Not Good'] },
          { mood: ['Not Good'] },
        ]);
        mixedSadDay = daysFixture([
          { mood: ['Not Good', 'Great', 'Not Good', 'Not Good'] },
        ]);
        mixedSadDays = daysFixture([
          { mood: ['Not Good', 'Great', 'Not Good', 'Not Good'] },
          { mood: ['Not Good', 'Not Good', 'Great'] },
          { mood: ['Not Good', 'Not Good', 'Not Good'] },
          { mood: ['Not Good'] },
        ]);
      });
      it('should return a single day given a single day', () => {
        expect(
          Object.keys(getDaysWithSelectedMood('Not Good', pureSadDay)).length
        ).toBe(1);
      });
      it('should return a single day with sad mood given a single sad day with single sad mood', () => {
        const day = getDaysWithSelectedMood('Not Good', pureSadDay);
        const date = Object.keys(day)[0];
        expect(day[date].mood).toEqual(['Not Good']);
      });
      it('should return a single day with sad mood given multiple moods but a sad majority', () => {
        const day = getDaysWithSelectedMood('Not Good', mixedSadDay);
        const date = Object.keys(day)[0];
        expect(day[date].mood).toEqual(['Not Good', 'Great', 'Not Good', 'Not Good']);
      });
      it('should return multiple sad days with sad moods', () => {
        const days = getDaysWithSelectedMood('Not Good', pureSadDays);
        for (const date in days) {
          expect(days[date].mood).toEqual(pureSadDays[date].mood);
        }
      });
      it('should return multiple sad days with mixed moods but sad majorities', () => {
        const days = getDaysWithSelectedMood('Not Good', mixedSadDays);
        for (const date in days) {
          expect(days[date].mood).toEqual(mixedSadDays[date].mood);
        }
      });
    });
  });

  describe('getDaysWithSelectedMoods', () => {
    it.todo('should return mood count for 3 days');
  });

  describe('getHabitMoodCountForTimeRange', () => {
    it.todo(
      'should return the correct number of finished habit completions for a given mood'
    );
  });
});
