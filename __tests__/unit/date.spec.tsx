import getDateString from '../../utils';

describe('Check whether date and time return successfully', () => {
  it('returns the current date', () => {
    const day = new Date().getDate();
    const month = new Date().toLocaleString('default', { month: 'long' });
    const year = new Date().getFullYear();
    const dayOfWeek = new Date().toLocaleString('default', { weekday: 'long' });
    const expectedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;
    const { date } = getDateString();
    expect(date).toEqual(expectedDate);
  });

  it('returns the correct time', () => {
    const expectedTime = new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    const { time } = getDateString();
    expect(time).toEqual(expectedTime);
  });
});
