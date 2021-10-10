import { Colors } from '../constants';

export default {
  '2021-10-15': { marked: true, dotColor: Colors.sadRed },
  '2021-10-16': { marked: true, dotColor: Colors.sadRed },
  '2021-10-21': { startingDay: true, color: Colors.happyGreen },
  '2021-10-22': { color: Colors.happyGreen },
  '2021-10-23': {
    color: Colors.happyGreen,
    marked: true,
    dotColor: Colors.sadRed,
  },
  '2021-10-24': { color: Colors.happyGreen },
  '2021-10-25': { endingDay: true, color: Colors.happyGreen },
  '2021-10-26': {
    selected: true,
    color: Colors.sadRed,
    startingDay: true,
    endingDay: true,
  },
  '2021-10-27': {
    selected: true,
    color: Colors.neutralYellow,
    startingDay: true,
    endingDay: true,
  },
};
