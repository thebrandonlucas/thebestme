import { Colors } from '../constants';

export default {
  '2021-05-15': { marked: true, dotColor: Colors.sadRed },
  '2021-05-16': { marked: true, dotColor: Colors.sadRed },
  '2021-05-21': { startingDay: true, color: Colors.happyGreen },
  '2021-05-22': { color: Colors.happyGreen },
  '2021-05-23': {
    color: Colors.happyGreen,
    marked: true,
    dotColor: Colors.sadRed,
  },
  '2021-05-24': { color: Colors.happyGreen },
  '2021-05-25': { endingDay: true, color: Colors.happyGreen },
  '2021-05-26': {
    selected: true,
    color: Colors.sadRed,
    startingDay: true,
    endingDay: true,
  },
  '2021-05-27': {
    selected: true,
    color: Colors.neutralYellow,
    startingDay: true,
    endingDay: true,
  },
};
