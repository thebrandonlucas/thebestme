import faker from '@faker-js/faker';
import { HabitType, IHabitType, OptionalHabitType } from '../../types';

export function habitFixture(overrides: Partial<HabitType> = {}): HabitType {
  const defaults: HabitType = {
    id: faker.datatype.uuid(),
    // id: '0d42a4e5-a42a-4dea-9768-a10a38b02ec7',
    checked: false,
    deleted: false,
    text: 'Test Habit',
  };
  return { ...defaults, ...overrides };
}

export function habitsFixture(overrides: Partial<HabitType>[] = []): IHabitType {
  let habits: IHabitType = {};
  for (const override of overrides) {
    const newHabit = habitFixture(override);
    habits[newHabit.id] = newHabit;
  }
  return habits;
}

/**
 * Randomly generates habits and days (with corresponding habit completions)
 * @param numHabits - number of habits to generate
 * @param overrides - Overrides for specific day or habit fields
 */
export function habitsFactory(
  numHabits: number = faker.datatype.number({ min: 1, max: 10 }),
  overrides?: OptionalHabitType
) {
  let habits: IHabitType = {};

  const habitDefaultFactory = {
    checked: () => faker.datatype.boolean(),
    deleted: () => faker.datatype.boolean(),
    id: () => faker.datatype.uuid(),
    text: () => faker.lorem.words(),
  };

  for (let i = 0; i < numHabits; i++) {
    let currentHabit: HabitType = {
      id: '',
      checked: false,
      text: '',
      deleted: false,
    };
    const id = habitDefaultFactory.id();
    for (const habitProp in habitDefaultFactory) {
      if (habitProp === 'id') {
        currentHabit.id = id;
        continue;
      } else {
        if (overrides !== undefined && overrides[habitProp] !== undefined) {
          currentHabit[habitProp] = overrides[habitProp];
        } else {
          currentHabit[habitProp] = habitDefaultFactory[habitProp]();
        }
      }
    }
    habits[id] = currentHabit;
  }
  return habits;
}
