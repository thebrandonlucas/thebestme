// FIXME: for some reason, everything has to be in a .tsx extension for Eslint
// to autoformat it on save, which is super annoying.
import { getMoodMode } from '../../utils/mood';
import { TableTest } from '../../__fixtures__/test-types';
import { runTableTests } from '../../__fixtures__/testutil';

describe('Utility Functions', () => {
  it('should get the most common (average/mode) mood from a list of moods', () => {
    const testCases: TableTest<string[][], string> = [
      [[['Great']], 'Great'],
      [[['Great', 'Not Good']], 'Not Good'],
      [[['Great', 'Not Good', 'Okay']], 'Okay'],
      [[['Great', 'Not Good', 'Not Good', 'Okay']], 'Not Good'],
      [[['Not Good', 'Not Good', 'Great', 'Okay']], 'Not Good'],
      [[['Great', 'Not Good', 'Okay', 'Okay']], 'Okay'],
      [[[]], 'No mood provided'],
      [[['Fake Mood']], 'Invalid mood found'],
    ];
    runTableTests(testCases, getMoodMode);
  });
});
