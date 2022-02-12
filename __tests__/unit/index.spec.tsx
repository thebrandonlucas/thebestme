import { getPercentage } from "../../utils";

describe('getPercentage', () => {
  it('should return 0 when theres 10 total but 0 finished', () => {
    expect(getPercentage(0, 10)).toBe(0);
  });
  it('should return 1 when theres 1 complete and 1 total', () => {
    expect(getPercentage(1, 1)).toBe(100);
  });
  it('should return 33 percent complete for 1 out of 3 completed', () => {
    expect(getPercentage(1, 3)).toBe(33.33);
  });
  it('should return 0 when theres 0 total and 0 finished', () => {
    expect(getPercentage(0, 0)).toBe(0);
  });
});