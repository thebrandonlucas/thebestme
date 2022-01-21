import { TableTest } from './test-types';

/**
 * Helper function to run Table Tests given a testCases table and the function to be tested
 * @param testCases - Test params and expected results where testCases[i][0] is an array of input
 *                    params and testCases[i][1] is the expected result at index i
 * @param functionToTest - The function definition to be tested
 */
export function runTableTests(
  testCases: TableTest<any, any>,
  functionToTest: (...parameters: any[]) => any
) {
  for (let i = 0; i < testCases.length; i++) {
    const parameters = testCases[i][0];
    const expectedResult = testCases[i][1];
    expect(functionToTest(...parameters)).toEqual(expectedResult);
  }
}
